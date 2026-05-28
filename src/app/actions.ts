"use server";

import { getResendClient } from "@/lib/resend";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function sendContactEmail(formData: FormData) {
    const name = String(formData.get("name") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();
    const message = String(formData.get("message") ?? "").trim();

    const website = String(formData.get("website") ?? "").trim();

    if (website) {
        console.warn("Bot detected via honeypot");
        return;
    }

    if (!name || !emailPattern.test(email) || !message) {
        console.error("Invalid contact form submission");
        return;
    }

    const to = process.env.CONTACT_TO_EMAIL;

    if (!to) {
        console.error("CONTACT_TO_EMAIL is not configured");
        return;
    }

    try {
        await getResendClient().emails.send({
            from: "Portfolio <onboarding@resend.dev>",
            to,
            subject: `Ny melding fra ${name}`,
            replyTo: email,
            text: `Navn: ${name}\nE-post: ${email}\n\n${message}`,
        });
    } catch (error) {
        console.error("Email error:", error);
    }
}
