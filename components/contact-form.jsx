"use client";

import { useState, useRef, useEffect } from "react";
import { useLang } from "@/components/language-provider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Loader2, Send, CheckCircle2, AlertCircle } from "lucide-react";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const INITIAL = { name: "", email: "", subject: "", message: "", company: "" };

export function ContactForm() {
  const { t, locale } = useLang();
  const f = t.contact.form;

  const [values, setValues] = useState(INITIAL);
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error
  const [errorMsg, setErrorMsg] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});
  const formRef = useRef(null);

  // Auto-dismiss success after 6s
  useEffect(() => {
    if (status === "sent") {
      const t = setTimeout(() => setStatus("idle"), 6000);
      return () => clearTimeout(t);
    }
  }, [status]);

  function validate() {
    const errs = {};
    if (!values.name.trim()) errs.name = true;
    if (!values.email.trim() || !EMAIL_RE.test(values.email.trim()))
      errs.email = true;
    if (!values.message.trim()) errs.message = true;
    return errs;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setErrorMsg("");
    setFieldErrors({});

    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setFieldErrors(errs);
      setStatus("error");
      setErrorMsg(f.required);
      return;
    }

    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, locale }),
      });

      if (!res.ok) throw new Error("request failed");

      setStatus("sent");
      setValues(INITIAL);
      setFieldErrors({});
    } catch {
      setStatus("error");
      setErrorMsg(f.error);
    }
  }

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      noValidate
      className="space-y-5"
    >
      {/* honeypot: hidden from people, tempting to bots */}
      <div className="absolute left-[-9999px]" aria-hidden="true">
        <label htmlFor="company">Company</label>
        <input
          id="company"
          name="company"
          tabIndex={-1}
          autoComplete="off"
          value={values.company}
          onChange={(e) => setValues((v) => ({ ...v, company: e.target.value }))}
        />
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        <div className="space-y-2">
          <Label htmlFor="name">{f.name}</Label>
          <Input
            id="name"
            name="name"
            value={values.name}
            onChange={(e) => {
              setValues((v) => ({ ...v, name: e.target.value }));
              if (fieldErrors.name) setFieldErrors((p) => ({ ...p, name: false }));
            }}
            placeholder={f.namePh}
            autoComplete="name"
            className={fieldErrors.name ? "ring-2 ring-flame/60" : ""}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">{f.email}</Label>
          <Input
            id="email"
            name="email"
            type="email"
            value={values.email}
            onChange={(e) => {
              setValues((v) => ({ ...v, email: e.target.value }));
              if (fieldErrors.email) setFieldErrors((p) => ({ ...p, email: false }));
            }}
            placeholder={f.emailPh}
            autoComplete="email"
            className={fieldErrors.email ? "ring-2 ring-flame/60" : ""}
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="subject">{f.subject}</Label>
        <Input
          id="subject"
          name="subject"
          value={values.subject}
          onChange={(e) => setValues((v) => ({ ...v, subject: e.target.value }))}
          placeholder={f.subjectPh}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="message">{f.message}</Label>
        <Textarea
          id="message"
          name="message"
          value={values.message}
          onChange={(e) => {
            setValues((v) => ({ ...v, message: e.target.value }));
            if (fieldErrors.message)
              setFieldErrors((p) => ({ ...p, message: false }));
          }}
          placeholder={f.messagePh}
          className={fieldErrors.message ? "ring-2 ring-flame/60" : ""}
          required
        />
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <Button
          type="submit"
          variant="ember"
          size="lg"
          disabled={status === "sending"}
          className="transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
        >
          {status === "sending" ? (
            <span className="inline-flex items-center gap-2">
              <Loader2 className="h-4 w-4 animate-spin" />
              {f.sending}
            </span>
          ) : (
            <span className="inline-flex items-center gap-2">
              <Send className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              {f.send}
            </span>
          )}
        </Button>

        <div aria-live="polite" className="min-h-[1.5rem] text-sm">
          {status === "sent" && (
            <span className="inline-flex animate-rise items-center gap-2 text-accentInk">
              <CheckCircle2 className="h-4 w-4" />
              {f.sent}
            </span>
          )}
          {status === "error" && errorMsg && (
            <span className="inline-flex animate-rise items-center gap-2 text-flame">
              <AlertCircle className="h-4 w-4" />
              {errorMsg}
            </span>
          )}
        </div>
      </div>
    </form>
  );
}
