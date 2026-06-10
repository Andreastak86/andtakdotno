"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getResendClient } from "@/lib/resend";
import { getSupabaseClient } from "@/lib/supabase";

const COOKIE_NAME = "admin_session";

async function isAuthenticated(): Promise<boolean> {
    const cookieStore = await cookies();
    const session = cookieStore.get(COOKIE_NAME);
    return session?.value === process.env.ADMIN_SESSION_TOKEN;
}

export async function loginAdmin(
    _prevState: { error?: string } | undefined,
    formData: FormData
) {
    const password = String(formData.get("password") ?? "");

    if (!password || password !== process.env.ADMIN_PASSWORD) {
        return { error: "Feil passord" };
    }

    const cookieStore = await cookies();
    cookieStore.set(COOKIE_NAME, process.env.ADMIN_SESSION_TOKEN!, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/admin",
        maxAge: 60 * 60 * 8, // 8 hours
    });

    redirect("/admin");
}

export async function logoutAdmin(_formData?: FormData) {
    const cookieStore = await cookies();
    cookieStore.delete(COOKIE_NAME);
    redirect("/admin");
}

export type SendEmailState = {
    success?: boolean;
    error?: string;
};

export async function sendAdminEmail(
    _prevState: SendEmailState | undefined,
    formData: FormData
): Promise<SendEmailState> {
    if (!(await isAuthenticated())) {
        return { error: "Ikke autorisert" };
    }

    const to = String(formData.get("to") ?? "").trim();
    const subject = String(formData.get("subject") ?? "").trim();
    const body = String(formData.get("body") ?? "").trim();

    if (!to || !subject || !body) {
        return { error: "Alle felt må fylles ut" };
    }

    try {
        await getResendClient().emails.send({
            from: "Andreas Takvam <hei@andreastak.no>",
            to,
            subject,
            text: body,
        });

        await getSupabaseClient().from("emails").insert({
            type: "outbound",
            from_name: "Andreas Takvam",
            from_email: "hei@andreastak.no",
            to_email: to,
            subject,
            message: body,
        });

        return { success: true };
    } catch (err) {
        console.error("Admin email error:", err);
        return { error: "Kunne ikke sende e-post. Prøv igjen." };
    }
}
