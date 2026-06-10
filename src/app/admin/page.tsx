import { cookies } from "next/headers";
import { LoginForm } from "./login-form";
import { Dashboard } from "./dashboard";
import { getEmailStats } from "./stats";
import { getJobApplications } from "./job-actions";
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

    const [stats, jobs] = await Promise.all([
        getEmailStats(),
        getJobApplications(),
    ]);

    return (
        <Dashboard
            stats={stats}
            jobs={jobs}
            defaultTo={process.env.CONTACT_TO_EMAIL ?? ""}
        />
    );
}
