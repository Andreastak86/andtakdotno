import { cookies } from "next/headers";
import { LoginForm } from "./login-form";
import { EmailComposer } from "./email-composer";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Admin",
    robots: { index: false, follow: false },
};

export default async function AdminPage() {
    const cookieStore = await cookies();
    const session = cookieStore.get("admin_session");
    const isAuthenticated =
        session?.value === process.env.ADMIN_SESSION_TOKEN;

    if (!isAuthenticated) {
        return <LoginForm />;
    }

    return (
        <EmailComposer
            defaultTo={process.env.CONTACT_TO_EMAIL ?? ""}
        />
    );
}
