import { site } from "./site";

export type ContactEmailDraft = {
  name: string;
  email: string;
  phone?: string;
  topic?: string;
  message: string;
};

export function buildContactEmailHref(draft: ContactEmailDraft): string {
  const name = draft.name.trim();
  const email = draft.email.trim();
  const phone = draft.phone?.trim();
  const topic = draft.topic?.trim();
  const message = draft.message.trim();

  const subject = topic ? `Website enquiry: ${topic}` : "Website enquiry";
  const lines = [
    `Name: ${name}`,
    `Email: ${email}`,
    ...(phone ? [`Phone: ${phone}`] : []),
    ...(topic ? [`Service: ${topic}`] : []),
    "",
    "Message:",
    message,
  ];

  return `${site.contact.emailHref}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines.join("\n"))}`;
}
