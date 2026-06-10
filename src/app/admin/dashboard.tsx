"use client";

import { useActionState, useState, useRef, useEffect } from "react";
import { sendAdminEmail, logoutAdmin, type SendEmailState } from "./actions";
import { JobTracker } from "./job-tracker";
import type { EmailStats } from "./stats";
import type { EmailLog, JobApplication } from "@/lib/supabase";

type ActiveTab = "email" | "jobs";

type Filter = "all" | "inbound" | "outbound";
type ReplyData = { to: string; subject: string };

function StatCard({
    label,
    value,
    description,
    variant = "default",
}: {
    label: string;
    value: number;
    description: string;
    variant?: "default" | "primary" | "accent";
}) {
    const styles = {
        default: "bg-surface border-border",
        primary: "bg-primary-soft border-border",
        accent: "bg-accent-soft border-border",
    };

    return (
        <div
            className={`rounded-2xl border p-5 shadow-sm ${styles[variant]}`}
        >
            <p className="text-xs font-medium tracking-wide text-muted uppercase">
                {label}
            </p>
            <p className="mt-2 font-heading text-3xl font-semibold text-text">
                {value}
            </p>
            <p className="mt-1 text-xs text-muted">{description}</p>
        </div>
    );
}

function EmailRow({
    email,
    onReply,
}: {
    email: EmailLog;
    onReply: (data: ReplyData) => void;
}) {
    const [expanded, setExpanded] = useState(false);
    const isInbound = email.type === "inbound";

    const date = new Date(email.created_at).toLocaleDateString("nb-NO", {
        day: "numeric",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    });

    return (
        <div className="border-b border-border last:border-0">
            <button
                onClick={() => setExpanded((v) => !v)}
                className="flex w-full items-start gap-3 py-3 text-left transition-colors hover:bg-background"
            >
                <span
                    className={`mt-0.5 shrink-0 rounded-full px-2 py-0.5 text-xs font-medium ${
                        isInbound
                            ? "bg-primary-soft text-primary"
                            : "bg-accent-soft text-accent"
                    }`}
                >
                    {isInbound ? "Mottatt" : "Sendt"}
                </span>
                <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-text">
                        {email.subject}
                    </p>
                    <p className="text-xs text-muted">
                        {isInbound
                            ? `${email.from_name ?? ""} · ${email.from_email}`
                            : `Til: ${email.to_email}`}
                    </p>
                    {!expanded && (
                        <p className="mt-0.5 line-clamp-1 text-xs text-muted">
                            {email.message}
                        </p>
                    )}
                </div>
                <span className="shrink-0 text-xs text-muted">{date}</span>
            </button>

            {expanded && (
                <div className="mb-3 ml-[72px] mr-2">
                    <p className="whitespace-pre-wrap rounded-xl bg-background px-4 py-3 text-sm text-text">
                        {email.message}
                    </p>
                    {isInbound && (
                        <button
                            onClick={() =>
                                onReply({
                                    to: email.from_email,
                                    subject: `Re: ${email.subject}`,
                                })
                            }
                            className="mt-2 rounded-lg bg-primary px-3 py-1.5 text-xs font-medium text-white transition-colors hover:opacity-90"
                        >
                            Svar på denne
                        </button>
                    )}
                </div>
            )}
        </div>
    );
}

function EmailComposer({
    defaultTo,
    reply,
    onReplyHandled,
}: {
    defaultTo: string;
    reply: ReplyData | null;
    onReplyHandled: () => void;
}) {
    const [state, action, pending] = useActionState<
        SendEmailState | undefined,
        FormData
    >(sendAdminEmail, undefined);

    const toRef = useRef<HTMLInputElement>(null);
    const subjectRef = useRef<HTMLInputElement>(null);
    const composerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!reply) return;
        if (toRef.current) toRef.current.value = reply.to;
        if (subjectRef.current) subjectRef.current.value = reply.subject;
        composerRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
        onReplyHandled();
    }, [reply, onReplyHandled]);

    return (
        <div ref={composerRef} className="rounded-2xl border border-border bg-surface p-6 shadow-sm">
            <h2 className="mb-4 font-heading text-base font-semibold text-text">
                Ny e-post
            </h2>
            <form action={action} className="flex flex-col gap-4">
                <div className="flex flex-col gap-1.5">
                    <label
                        htmlFor="to"
                        className="text-sm font-medium text-text"
                    >
                        Til
                    </label>
                    <input
                        ref={toRef}
                        id="to"
                        name="to"
                        type="email"
                        required
                        defaultValue={defaultTo}
                        className="rounded-lg border border-border bg-background px-3 py-2 text-sm text-text outline-none focus:border-primary focus:ring-2 focus:ring-primary-soft"
                    />
                </div>

                <div className="flex flex-col gap-1.5">
                    <label
                        htmlFor="subject"
                        className="text-sm font-medium text-text"
                    >
                        Emne
                    </label>
                    <input
                        ref={subjectRef}
                        id="subject"
                        name="subject"
                        type="text"
                        required
                        placeholder="Skriv inn emne…"
                        className="rounded-lg border border-border bg-background px-3 py-2 text-sm text-text outline-none focus:border-primary focus:ring-2 focus:ring-primary-soft"
                    />
                </div>

                <div className="flex flex-col gap-1.5">
                    <label
                        htmlFor="body"
                        className="text-sm font-medium text-text"
                    >
                        Melding
                    </label>
                    <textarea
                        id="body"
                        name="body"
                        required
                        rows={7}
                        placeholder="Skriv meldingen her…"
                        className="rounded-lg border border-border bg-background px-3 py-2 text-sm text-text outline-none focus:border-primary focus:ring-2 focus:ring-primary-soft"
                    />
                </div>

                {state?.error && (
                    <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">
                        {state.error}
                    </p>
                )}
                {state?.success && (
                    <p className="rounded-lg bg-primary-soft px-3 py-2 text-sm text-primary">
                        E-post sendt!
                    </p>
                )}

                <div className="flex justify-end">
                    <button
                        type="submit"
                        disabled={pending}
                        className="rounded-lg bg-primary px-5 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90 disabled:opacity-50"
                    >
                        {pending ? "Sender…" : "Send e-post"}
                    </button>
                </div>
            </form>
        </div>
    );
}

export function Dashboard({
    stats,
    jobs,
    defaultTo,
}: {
    stats: EmailStats;
    jobs: JobApplication[];
    defaultTo: string;
}) {
    const [activeTab, setActiveTab] = useState<ActiveTab>("email");
    const [filter, setFilter] = useState<Filter>("all");
    const [reply, setReply] = useState<ReplyData | null>(null);

    const filtered = stats.recent.filter(
        (e) => filter === "all" || e.type === filter
    );

    const filters: { key: Filter; label: string }[] = [
        { key: "all", label: "Alle" },
        { key: "inbound", label: "Mottatte" },
        { key: "outbound", label: "Sendte" },
    ];

    return (
        <div className="min-h-screen bg-background px-4 py-12">
            <div className="mx-auto max-w-4xl">

                {/* Header */}
                <div className="mb-8 flex items-center justify-between">
                    <div>
                        <h1 className="font-heading text-2xl font-semibold text-text">
                            Dashboard
                        </h1>
                        <p className="mt-1 text-sm text-muted">
                            andreastak.no · hei@andreastak.no
                        </p>
                    </div>
                    <form action={logoutAdmin}>
                        <button
                            type="submit"
                            className="rounded-lg border border-border bg-surface px-3 py-1.5 text-sm text-muted transition-colors hover:text-text"
                        >
                            Logg ut
                        </button>
                    </form>
                </div>

                {/* Tabs */}
                <div className="mb-8 flex gap-1 rounded-xl bg-surface border border-border p-1 w-fit shadow-sm">
                    {([
                        { key: "email", label: "E-post" },
                        { key: "jobs", label: "Jobbsøknader" },
                    ] as { key: ActiveTab; label: string }[]).map(({ key, label }) => (
                        <button
                            key={key}
                            onClick={() => setActiveTab(key)}
                            className={`rounded-lg px-4 py-1.5 text-sm font-medium transition-colors ${
                                activeTab === key
                                    ? "bg-primary text-white shadow-sm"
                                    : "text-muted hover:text-text"
                            }`}
                        >
                            {label}
                        </button>
                    ))}
                </div>

                {activeTab === "jobs" && <JobTracker jobs={jobs} />}

                {activeTab === "email" && <>

                {/* Statistikk */}
                <div className="mb-8 grid grid-cols-2 gap-4 sm:grid-cols-3">
                    <StatCard
                        label="Mottatte meldinger"
                        value={stats.inboundCount}
                        description="Fra kontaktskjemaet"
                        variant="primary"
                    />
                    <StatCard
                        label="Sendte e-poster"
                        value={stats.outboundCount}
                        description="Sendt fra dashboard"
                        variant="accent"
                    />
                    <StatCard
                        label="Totalt"
                        value={stats.inboundCount + stats.outboundCount}
                        description="Alle e-poster"
                    />
                </div>

                <div className="grid gap-6 lg:grid-cols-2">
                    {/* Historikk */}
                    <div className="rounded-2xl border border-border bg-surface p-6 shadow-sm">
                        <div className="mb-4 flex items-center justify-between">
                            <h2 className="font-heading text-base font-semibold text-text">
                                Siste aktivitet
                            </h2>
                            <div className="flex gap-1 rounded-lg bg-background p-1">
                                {filters.map(({ key, label }) => (
                                    <button
                                        key={key}
                                        onClick={() => setFilter(key)}
                                        className={`rounded-md px-2.5 py-1 text-xs font-medium transition-colors ${
                                            filter === key
                                                ? "bg-surface text-text shadow-sm"
                                                : "text-muted hover:text-text"
                                        }`}
                                    >
                                        {label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {filtered.length === 0 ? (
                            <p className="text-sm text-muted">
                                Ingen e-poster enda.
                            </p>
                        ) : (
                            <div>
                                {filtered.map((email) => (
                                    <EmailRow
                                        key={email.id}
                                        email={email}
                                        onReply={setReply}
                                    />
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Composer */}
                    <EmailComposer
                        defaultTo={defaultTo}
                        reply={reply}
                        onReplyHandled={() => setReply(null)}
                    />
                </div>

                </>}
            </div>
        </div>
    );
}
