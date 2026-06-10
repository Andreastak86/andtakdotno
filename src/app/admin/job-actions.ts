"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { getSupabaseClient } from "@/lib/supabase";
import type { JobStatus, JobApplication } from "@/lib/supabase";

async function isAuthenticated(): Promise<boolean> {
    const cookieStore = await cookies();
    const session = cookieStore.get("admin_session");
    return session?.value === process.env.ADMIN_SESSION_TOKEN;
}

export type JobFormState = {
    error?: string;
};

export async function addJobApplication(
    _prevState: JobFormState | undefined,
    formData: FormData
): Promise<JobFormState> {
    if (!(await isAuthenticated())) return { error: "Ikke autorisert" };

    const company = String(formData.get("company") ?? "").trim();
    const position = String(formData.get("position") ?? "").trim();
    const url = String(formData.get("url") ?? "").trim() || null;
    const applied_at = String(formData.get("applied_at") ?? "").trim();
    const notes = String(formData.get("notes") ?? "").trim() || null;

    if (!company || !position || !applied_at) {
        return { error: "Bedrift, stilling og dato må fylles ut" };
    }

    const { error } = await getSupabaseClient()
        .from("job_applications")
        .insert({ company, position, url, applied_at, notes });

    if (error) {
        console.error("Job insert error:", error);
        return { error: "Kunne ikke lagre søknaden" };
    }

    revalidatePath("/admin");
    return {};
}

export async function updateJobStatus(id: string, status: JobStatus) {
    if (!(await isAuthenticated())) return;

    await getSupabaseClient()
        .from("job_applications")
        .update({ status, updated_at: new Date().toISOString() })
        .eq("id", id);

    revalidatePath("/admin");
}

export async function updateJobNotes(id: string, notes: string) {
    if (!(await isAuthenticated())) return;

    await getSupabaseClient()
        .from("job_applications")
        .update({ notes: notes || null, updated_at: new Date().toISOString() })
        .eq("id", id);

    revalidatePath("/admin");
}

export async function getJobApplications(): Promise<JobApplication[]> {
    const { data } = await getSupabaseClient()
        .from("job_applications")
        .select("*")
        .order("applied_at", { ascending: false });

    return (data ?? []) as JobApplication[];
}
