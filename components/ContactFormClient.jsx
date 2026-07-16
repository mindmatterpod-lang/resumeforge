"use client";

import { useState } from "react";
import { Check, Send } from "lucide-react";
import { Field, TextInput, TextArea } from "./UI";

export default function ContactFormClient() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);
  const update = (field, value) => setForm((f) => ({ ...f, [field]: value }));

  if (sent) {
    return (
      <div className="contact-success">
        <Check size={20} />
        <div>
          <div className="contact-success-title">Message ready</div>
          <div className="contact-success-body">
            This demo form doesn't send email on its own yet — for now, reach out directly at{" "}
            <a href="mailto:mindmatterpod@gmail.com">mindmatterpod@gmail.com</a>, or wire this form up to a service
            like Formspree, or your own backend, to receive messages here too.
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="contact-form">
      <Field label="Your name">
        <TextInput value={form.name} onChange={(e) => update("name", e.target.value)} placeholder="Jane Alvarez" />
      </Field>
      <Field label="Email">
        <TextInput value={form.email} onChange={(e) => update("email", e.target.value)} placeholder="jane@email.com" />
      </Field>
      <Field label="Message">
        <TextArea
          className="input-field textarea"
          value={form.message}
          onChange={(e) => update("message", e.target.value)}
          placeholder="What's on your mind?"
        />
      </Field>
      <button className="btn-primary" onClick={() => setSent(true)}>
        <Send size={15} /> Send message
      </button>
    </div>
  );
}
