"use client";

import { useState } from "react";
import toast from "react-hot-toast";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function ContactForm() {
  const [values, setValues] = useState({ name: "", email: "", message: "" });
  const [touched, setTouched] = useState({});

  const errors = {};
  if (values.name.trim().length < 2) errors.name = "Enter your name.";
  if (!EMAIL_RE.test(values.email.trim())) errors.email = "Enter a valid email address.";
  if (values.message.trim().length < 10) errors.message = "Write a message of at least 10 characters.";

  const show = (k) => (touched[k] ? errors[k] : undefined);
  const bind = (k) => ({
    id: k,
    name: k,
    value: values[k],
    onChange: (e) => setValues((v) => ({ ...v, [k]: e.target.value })),
    onBlur: () => setTouched((t) => ({ ...t, [k]: true })),
    "aria-invalid": Boolean(show(k)),
    "aria-describedby": show(k) ? `${k}-error` : undefined,
    className: "field-input",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setTouched({ name: true, email: true, message: true });
    if (Object.keys(errors).length) return;
    toast.success("Message sent. We reply within one working day.");
    setValues({ name: "", email: "", message: "" });
    setTouched({});
  };

  return (
    <form onSubmit={handleSubmit} noValidate className="surface space-y-5 p-6 sm:p-8">
      <div>
        <label htmlFor="name" className="field-label">Name</label>
        <input {...bind("name")} type="text" autoComplete="name" />
        {show("name") && <p id="name-error" className="field-error" role="alert">{errors.name}</p>}
      </div>
      <div>
        <label htmlFor="email" className="field-label">Email</label>
        <input {...bind("email")} type="email" autoComplete="email" />
        {show("email") && <p id="email-error" className="field-error" role="alert">{errors.email}</p>}
      </div>
      <div>
        <label htmlFor="message" className="field-label">Message</label>
        <textarea {...bind("message")} rows={5} />
        {show("message") && <p id="message-error" className="field-error" role="alert">{errors.message}</p>}
      </div>
      <button type="submit" className="btn btn-primary btn-lg">
        Send message
      </button>
    </form>
  );
}
