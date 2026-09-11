"use client";
import { useState, type FormEvent } from "react";
import { site } from "@/content/site";
import { Arrow } from "./ui";
import { formatProjectBrief } from "@/lib/project-brief";

/** Prepares a local brief. No submission is claimed and no personal data leaves the browser automatically. */
export function ContactForm() {
  const [message, setMessage] = useState("");
  const emailReady = !site.email.endsWith(".example");
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const body = formatProjectBrief({
      name: String(form.get("name") || ""),
      email: String(form.get("email") || ""),
      company: String(form.get("company") || ""),
      service: String(form.get("service") || ""),
      details: String(form.get("details") || ""),
    });
    if (emailReady) {
      window.location.href = `mailto:${site.email}?subject=${encodeURIComponent("A new project conversation")}&body=${encodeURIComponent(body)}`;
      setMessage(
        "Your email app has been requested. Review and send your brief there.",
      );
    } else {
      const url = URL.createObjectURL(
        new Blob([body], { type: "text/plain;charset=utf-8" }),
      );
      const anchor = document.createElement("a");
      anchor.href = url;
      anchor.download = "psametra-project-brief.txt";
      anchor.click();
      // Revoke on the next event-loop turn, after the browser consumes the download link.
      setTimeout(() => URL.revokeObjectURL(url), 0);
      setMessage(
        "Your project brief is ready to download. Nothing has been sent or stored by Psametra.",
      );
    }
  }
  return (
    <form className="contact-form" onSubmit={submit}>
      <div className="form-row">
        <label>
          Your name <span>*</span>
          <input
            name="name"
            autoComplete="name"
            required
            maxLength={100}
            placeholder="Alex Morgan"
          />
        </label>
        <label>
          Email address <span>*</span>
          <input
            name="email"
            type="email"
            autoComplete="email"
            required
            maxLength={254}
            placeholder="alex@company.com"
          />
        </label>
      </div>
      <label>
        Company <span className="optional">Optional</span>
        <input
          name="company"
          autoComplete="organization"
          maxLength={150}
          placeholder="Your company"
        />
      </label>
      <label>
        What are you thinking about?
        <select name="service" defaultValue="Not sure yet">
          <option>Not sure yet</option>
          {site.services.map((service) => (
            <option key={service.id}>{service.title}</option>
          ))}
        </select>
      </label>
      <label>
        A little about your project <span>*</span>
        <textarea
          name="details"
          rows={5}
          minLength={20}
          maxLength={2000}
          required
          placeholder="The idea, the challenge, or what you’d like to make possible…"
        />
      </label>
      <p className="form-note">
        {emailReady
          ? "This opens your email app. You review and send the message yourself."
          : "Prepare a brief to keep. Direct enquiries will open once our contact address is confirmed."}
      </p>
      <button className="button primary" type="submit">
        {emailReady ? "Prepare your email" : "Download project brief"}
        <Arrow diagonal />
      </button>
      <p className="form-status" role="status">
        {message}
      </p>
    </form>
  );
}
