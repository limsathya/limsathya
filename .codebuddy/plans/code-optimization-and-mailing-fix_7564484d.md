---
name: code-optimization-and-mailing-fix
overview: 优化项目代码质量，修复邮件发送系统的潜在问题，提升网站性能和可维护性。
todos:
  - id: fix-mailing-security
    content: 修复邮件 API 安全性：添加 XSS 防护（HTML 转义）、环境变量校验、蜜罐响应统一化
    status: completed
  - id: delete-duplicate-css
    content: 删除根目录重复的 globals.css，确保 app/globals.css 包含 @layer base 表单字体继承
    status: completed
  - id: optimize-performance
    content: 性能优化：contact-form 的 update 函数改为内联 onChange，language-provider 的 t 对象使用 useMemo，theme-provider 的 cycleTheme 修复竞态
    status: completed
  - id: extract-components
    content: 从 site.jsx 提取 ContactRow、Timeline、Eyebrow、ThemeToggle 为独立组件，修复 Timeline 的 undefined 回退逻辑
    status: completed
  - id: enhance-next-config
    content: 增强 next.config.mjs：添加安全响应头（X-Frame-Options、X-Content-Type-Options、Referrer-Policy）
    status: completed
  - id: cleanup-unused-code
    content: 清理未使用代码：移除 card.jsx 中未使用的导出，清理 site.jsx 中冗余的 imports
    status: completed
    dependencies:
      - extract-components
---

## 用户需求
对 Limsathya San 个人网站进行代码优化，重点包括：修复邮件系统的安全漏洞、清理重复代码、提升性能和可维护性、完善 Next.js 配置。

## 产品概述
Limsathya San 是一个三语（英语/中文/高棉语）个人作品集网站，展示医学教育背景、软件开发技能、摄影作品和内容创作经历。网站使用 Next.js 14 构建，包含联系表单（通过 Resend 发送邮件）、深色/浅色主题切换和语言切换功能。

## 核心优化目标
- **邮件系统安全修复**：添加 XSS 防护、环境变量校验、多语言错误消息、蜜罐响应优化
- **代码重复清理**：删除根目录重复的 `globals.css`，统一使用 `app/globals.css`
- **性能优化**：`contact-form.jsx` 中 `update` 函数使用 `useCallback`，`language-provider.jsx` 中使用 `useMemo` 缓存翻译对象
- **组件提取与解耦**：将 `site.jsx` (~487行) 中的 `ContactRow`、`Timeline`、`Eyebrow`、`ThemeToggle` 提取为独立组件
- **配置完善**：`next.config.mjs` 添加安全头（CSP、X-Frame-Options 等）
- **未使用代码清理**：移除 `card.jsx` 中未使用的导出
- **代码质量修复**：修复 `timeline` 组件的 undefined 回退逻辑、`scrollTo` 的边界检查、`theme-provider` 的竞态问题


## 技术栈
- **框架**: Next.js 14 (App Router) + React 18
- **样式**: Tailwind CSS 3.4 + CSS Variables（双主题系统）
- **邮件服务**: Resend v4
- **图标**: Lucide React
- **工具库**: clsx + tailwind-merge + class-variance-authority

## 实现方案

### 1. 邮件系统安全增强 (`app/api/contact/route.js`)

**XSS 防护**：对用户输入的 `name`、`email`、`subject`、`message` 字段进行 HTML 实体转义，防止邮件内容中注入恶意脚本。

**环境变量校验**：在 API 入口处检查 `RESEND_API_KEY`、`CONTACT_FROM_EMAIL`、`CONTACT_TO_EMAIL` 是否存在，缺少时返回明确的服务端错误日志，但不向前端暴露敏感信息。

**蜜罐响应优化**：当 `company` 字段有值时（机器人触发），返回与正常成功完全相同的响应格式，不暴露检测逻辑。

**错误消息**：保持统一的错误响应格式，catch 块中返回 `{ error: "Internal server error" }` 不变（不向前端泄露细节），但服务端日志记录完整错误信息。

**实现细节**：
- 添加 `escapeHtml` 辅助函数，转义 `<` `>` `&` `"` `'` 五个字符
- 在构造 HTML 邮件内容前对 `name`、`email`、`subject`、`message` 进行转义
- 请求开始时验证必需环境变量，缺少则 `console.error` 并返回 500
- 蜜罐触发时返回 `NextResponse.json({ ok: true, data: null })` 与成功结构一致

### 2. 删除重复 CSS (`globals.css`)

根目录的 `globals.css` 与 `app/globals.css` 内容 95% 重复。`app/globals.css` 额外包含 `@layer base` 块（表单元素字体继承），是更完整的版本。

**方案**：删除根目录的 `globals.css`，确保 `app/layout.jsx` 中 `import "./globals.css"` 正确指向 `app/globals.css`（已经是这样）。

### 3. 性能优化

**`contact-form.jsx` 的 `update` 函数**：
- 当前：`const update = (key) => (e) => setValues((v) => ({ ...v, [key]: e.target.value }))` 每次渲染创建新闭包
- 优化：使用 `useCallback` 包装，或改用 `useReducer`。考虑到表单字段固定，直接内联 `onChange` 更简单高效：
```jsx
onChange={(e) => setValues(v => ({ ...v, name: e.target.value }))}
```

**`language-provider.jsx` 的 `t` 对象**：
- 当前：`const t = dictionaries[locale] || dictionaries[defaultLocale]` 每次渲染重新引用
- 优化：使用 `useMemo` 包装，依赖 `locale`

**`theme-provider.jsx` 的竞态问题**：
- `cycleTheme` 依赖 `preference`，快速点击时可能读取旧值
- 优化：使用函数式 setState `setPreference(prev => ...)` 模式

### 4. 组件提取 (`site.jsx` 拆分)

将 `site.jsx` 中的内部组件提取到独立文件：
- `ContactRow` → `components/contact-row.jsx`
- `Timeline` → `components/timeline.jsx`
- `Eyebrow` → `components/eyebrow.jsx`
- `ThemeToggle` → `components/theme-toggle.jsx`

每个组件文件包含完整的逻辑和类型，使用 `useLang` 和 `useTheme` hooks 获取所需上下文。

### 5. Next.js 配置增强 (`next.config.mjs`)

添加以下配置：
- **安全头**：通过 `headers()` 配置 `X-Frame-Options: DENY`、`X-Content-Type-Options: nosniff`、`Referrer-Policy: strict-origin-when-cross-origin`
- **图片优化**：配置 `images.remotePatterns` 如果使用了远程图片
- **环境变量校验**：添加构建时必需环境变量检查（`RESEND_API_KEY` 等）

### 6. 未使用代码清理

- `components/ui/card.jsx`：移除 `CardHeader`、`CardTitle`、`CardDescription`、`CardFooter` 导出（保留文件，删除未使用的导出）
- `site.jsx`：移除 `Send` 图标的直接 import（已在 `SOCIAL_ICONS` 中通过字符串 key 使用）

### 7. 代码质量修复

- **Timeline 组件的 undefined 回退**：当 `item.start` 为空时，回退逻辑 `\`${item.start} – ${present}\`` 显示 "undefined – Present"。修复为：优先使用 `item.when`，其次检查 `item.start` 存在性再拼接，最后回退为空字符串。
- **`scrollTo` 函数**：添加 `document` 存在性检查和元素查找失败时的静默处理。
- **`eslint-disable` 注释**：保留必要的（logo 和 profile 图片使用 `<img>` 是合理选择，因为使用静态 SVG），但统一注释风格。

## 目录结构

```
c:/code/limsathya/
├── globals.css                          # [DELETE] 与 app/globals.css 重复
├── next.config.mjs                      # [MODIFY] 添加安全头配置
├── app/
│   ├── api/contact/
│   │   └── route.js                     # [MODIFY] XSS防护+环境变量校验+蜜罐优化
│   └── globals.css                      # [MODIFY] 添加缺失的 @layer base（合并根目录globals.css的额外内容）
├── components/
│   ├── site.jsx                         # [MODIFY] 提取内部组件到独立文件
│   ├── contact-form.jsx                 # [MODIFY] update函数优化
│   ├── contact-row.jsx                  # [NEW] 从 site.jsx 提取的 ContactRow 组件
│   ├── timeline.jsx                     # [NEW] 从 site.jsx 提取的 Timeline 组件，修复undefined回退
│   ├── eyebrow.jsx                      # [NEW] 从 site.jsx 提取的 Eyebrow 组件
│   ├── theme-toggle.jsx                 # [NEW] 从 site.jsx 提取的 ThemeToggle 组件
│   ├── theme-provider.jsx               # [MODIFY] 修复 cycleTheme 竞态
│   ├── language-provider.jsx            # [MODIFY] t 对象使用 useMemo
│   └── ui/
│       └── card.jsx                     # [MODIFY] 移除未使用的导出
```

## 关键代码结构

### 邮件 API 的 HTML 转义函数
```js
function escapeHtml(str) {
  if (!str) return "";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
```

### 环境变量校验模式
```js
// 在 POST handler 开头（try 块之外）
if (!process.env.RESEND_API_KEY) {
  console.error("Missing RESEND_API_KEY environment variable");
}
const FROM_EMAIL = process.env.CONTACT_FROM_EMAIL;
const TO_EMAIL = process.env.CONTACT_TO_EMAIL;
if (!FROM_EMAIL || !TO_EMAIL) {
  console.error("Missing CONTACT_FROM_EMAIL or CONTACT_TO_EMAIL");
  return NextResponse.json({ error: "Service configuration error" }, { status: 500 });
}
```

### 蜜罐响应统一
```js
if (company) {
  // 与成功响应结构完全一致，不暴露检测信息
  return NextResponse.json({ ok: true, data: null });
}
```

