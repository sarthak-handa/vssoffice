"use client";

import { FormEvent, useState } from "react";
import { TactileButton } from "@/components/ui/tactile-button";

export function BookingForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "setup">("idle");
  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("sending");
    const data = Object.fromEntries(new FormData(event.currentTarget));
    const response = await fetch("/api/book-demo", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
    setStatus(response.ok ? "success" : "setup");
  };
  return <form onSubmit={submit}><div className="form-grid"><div className="field"><label htmlFor="name">Name</label><input id="name" name="name" autoComplete="name" required /></div><div className="field"><label htmlFor="phone">Phone</label><input id="phone" name="phone" inputMode="tel" autoComplete="tel" required /></div><div className="field"><label htmlFor="email">Email</label><input id="email" name="email" type="email" autoComplete="email" required /></div><div className="field"><label htmlFor="interest">I want to explore</label><select id="interest" name="interest" defaultValue=""><option value="" disabled>Select an area</option><option>Home security</option><option>Smart home</option><option>Home theatre</option><option>Commercial security & communication</option><option>Experience Centre visit</option></select></div><div className="field field-wide"><label htmlFor="message">Project note</label><textarea id="message" name="message" placeholder="Tell us a little about the space or requirement." /></div></div><TactileButton className="form-submit" type="submit" disabled={status === "sending"}>{status === "sending" ? "Sending request" : "Request a consultation"}</TactileButton>{status === "success" && <p className="notice">Thank you. Your request has been received by the configured booking destination.</p>}{status === "setup" && <p className="notice">This preview form is ready for a CRM/webhook endpoint, but no booking destination is configured yet. No information was submitted.</p>}</form>;
}
