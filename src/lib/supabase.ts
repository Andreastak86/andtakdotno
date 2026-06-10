import { createClient } from "@supabase/supabase-js";

export type EmailType = "inbound" | "outbound";

export type EmailLog = {
    id: string;
    type: EmailType;
    from_name: string | null;
    from_email: string;
    to_email: string;
    subject: string;
    message: string;
    created_at: string;
};

export function getSupabaseClient() {
    const url = process.env.SUPABASE_URL;
    const key = process.env.SUPABASE_ANON_KEY;

    if (!url || !key) {
        throw new Error("Supabase environment variables are not configured");
    }

    return createClient(url, key);
}
