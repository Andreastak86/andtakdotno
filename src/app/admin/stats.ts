"use server";

import { getSupabaseClient } from "@/lib/supabase";
import type { EmailLog } from "@/lib/supabase";

export type EmailStats = {
    inboundCount: number;
    outboundCount: number;
    recent: EmailLog[];
};

export async function getEmailStats(): Promise<EmailStats> {
    const supabase = getSupabaseClient();

    const [inbound, outbound, recent] = await Promise.all([
        supabase
            .from("emails")
            .select("id", { count: "exact", head: true })
            .eq("type", "inbound"),
        supabase
            .from("emails")
            .select("id", { count: "exact", head: true })
            .eq("type", "outbound"),
        supabase
            .from("emails")
            .select("*")
            .order("created_at", { ascending: false })
            .limit(20),
    ]);

    return {
        inboundCount: inbound.count ?? 0,
        outboundCount: outbound.count ?? 0,
        recent: (recent.data ?? []) as EmailLog[],
    };
}
