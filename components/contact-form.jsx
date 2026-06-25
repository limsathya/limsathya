"use client";

import { useState } from "react";
import { useLang } from "@/components/language-provider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Loader2, Send, CheckCircle2, AlertCircle } from "lucide-react";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function ContactForm() {
  const { t, locale } = useLang();
  const f = t.contact.form;

  const [values, setValues] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    company: "", // honeypot
  });
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error
  const [errorMsg, setErrorMsg] = useState("");

  const update = (key) => (e) => setValues((v) => ({ ...v, [key]: e.target.value }));

  async function handleSubmit(e) {
    e.preventDefault();
    setErrorMsg("");

    if (!values.name.trim() || !values.email.trim() || !values.message.trim()) {
      setStatus("error");
      setErrorMsg(f.required);
      return;
    }
    if (!EMAIL_RE.test(values.email.trim())) {
      setStatus("error");
      setErrorMsg(f.invalidEmail);
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
      setValues({ name: "", email: "", subject: "", message: "", company: "" });
    } catch {
      setStatus("error");
      setErrorMsg(f.error);
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      {/* honeypot: hidden from people, tempting to bots */}
      <div className="absolute left-[-9999px]" aria-hidden="true">
        <label htmlFor="company">Company</label>
        <input
          id="company"
          name="company"
          tabIndex={-1}
          autoComplete="off"
          value={values.company}
          onChange={update("company")}
        />
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        <div className="space-y-2">
          <Label htmlFor="name">{f.name}</Label>
          <Input
            id="name"
            name="name"
            value={values.name}
            onChange={update("name")}
            placeholder={f.namePh}
            autoComplete="name"
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
            onChange={update("email")}
            placeholder={f.emailPh}
            autoComplete="email"
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
          onChange={update("subject")}
          placeholder={f.subjectPh}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="message">{f.message}</Label>
        <Textarea
          id="message"
          name="message"
          value={values.message}
          onChange={update("message")}
          placeholder={f.messagePh}
          required
        />
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <Button type="submit" variant="ember" size="lg" disabled={status === "sending"}>
          {status === "sending" ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              {f.sending}
            </>
          ) : (
            <>
              <Send className="h-4 w-4" />
              {f.send}
            </>
          )}
        </Button>

        <div aria-live="polite" className="min-h-[1.25rem] text-sm">
          {status === "sent" && (
            <span className="inline-flex items-center gap-2 text-accentInk">
              <CheckCircle2 className="h-4 w-4" />
              {f.sent}
            </span>
          )}
          {status === "error" && errorMsg && (
            <span className="inline-flex items-center gap-2 text-flame">
              <AlertCircle className="h-4 w-4" />
              {errorMsg}
            </span>
          )}
        </div>
      </div>
    </form>
  );
};
