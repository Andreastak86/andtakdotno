"use server";

import { resend } from "@/lib/resend";

export async function sendContactEmail(formData: FormData) {
    const name = String(formData.get("name") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();
    const message = String(formData.get("message") ?? "").trim();

    const company = String(formData.get("company") ?? "").trim();

    if (company) {
        console.warn("Bot detected via honeypot");
        return;
    }

    if (!name || !email || !message) {
        console.error("Missing fields");
        return;
    }

    try {
        await resend.emails.send({
            from: "Portfolio <onboarding@resend.dev>",
            to: process.env.CONTACT_TO_EMAIL!,
            subject: `Ny melding fra ${name}`,
            replyTo: email,
            text: `Navn: ${name}\nE-post: ${email}\n\n${message}`,
        });
    } catch (error) {
        console.error("Email error:", error);
    }
}
