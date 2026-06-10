"use client";

import { useActionState } from "react";
import { sendAdminEmail, logoutAdmin, type SendEmailState } from "./actions";
import type { EmailStats } from "./stats";
import type { EmailLog } from "@/lib/supabase";

function StatCard({
    label,
    value,
    description,
}: {
    label: string;
    value: number;
    description: string;
}) {
    return (
        <div className="rounded-2xl border border-stone-200 bg-white p-5 shadow-sm">
            <p className="text-sm text-stone-500">{label}</p>
            <p className="mt-1 text-3xl font-semibold text-stone-900">
                {value}
            </p>
            <p className="mt-1 text-xs text-stone-400">{description}</p>
        </div>
    );
}

function EmailRow({ email }: { email: EmailLog }) {
    const isInbound = email.type === "inbound";
    const date = new Date(email.created_at).toLocaleDateString("nb-NO", {
        day: "numeric",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    });

    return (
        <div className="flex items-start gap-3 border-b border-stone-100 py-3 last:border-0">
            <span
                className={`mt-0.5 shrink-0 rounded-full px-2 py-0.5 text-xs font-medium ${
                    isInbound
                        ? "bg-blue-50 text-blue-700"
                        : "bg-green-50 text-green-700"
                }`}
            >
                {isInbound ? "Mottatt" : "Sendt"}
            </span>
            <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-stone-800">
                    {email.subject}
                </p>
                <p className="text-xs text-stone-500">
                    {isInbound
                        ? `Fra: ${email.from_name ?? ""} (${email.from_email})`
                        : `Til: ${email.to_email}`}
                </p>
                <p className="mt-0.5 line-clamp-1 text-xs text-stone-400">
                    {email.message}
                </p>
            </div>
            <span className="shrink-0 text-xs text-stone-400">{date}</span>
        </div>
    );
}

function EmailComposer({ defaultTo }: { defaultTo: string }) {
    const [state, action, pending] = useActionState<
        SendEmailState | undefined,
        FormData
    >(sendAdminEmail, undefined);

    return (
        <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-base font-semibold text-stone-900">
                Ny e-post
            </h2>
            <form action={action} className="flex flex-col gap-4">
                <div className="flex flex-col gap-1.5">
                    <label
                        htmlFor="to"
                        className="text-sm font-medium text-stone-700"
                    >
                        Til
                    </label>
                    <input
                        id="to"
                        name="to"
                        type="email"
                        required
                        defaultValue={defaultTo}
                        className="rounded-lg border border-stone-300 bg-stone-50 px-3 py-2 text-sm text-stone-900 outline-none focus:border-stone-500 focus:ring-2 focus:ring-stone-200"
                    />
                </div>

                <div className="flex flex-col gap-1.5">
                    <label
                        htmlFor="subject"
                        className="text-sm font-medium text-stone-700"
                    >
                        Emne
                    </label>
                    <input
                        id="subject"
                        name="subject"
                        type="text"
                        required
                        placeholder="Skriv inn emne…"
                        className="rounded-lg border border-stone-300 bg-stone-50 px-3 py-2 text-sm text-stone-900 outline-none focus:border-stone-500 focus:ring-2 focus:ring-stone-200"
                    />
                </div>

                <div className="flex flex-col gap-1.5">
                    <label
                        htmlFor="body"
                        className="text-sm font-medium text-stone-700"
                    >
                        Melding
                    </label>
                    <textarea
                        id="body"
                        name="body"
                        required
                        rows={7}
                        placeholder="Skriv meldingen her…"
                        className="rounded-lg border border-stone-300 bg-stone-50 px-3 py-2 text-sm text-stone-900 outline-none focus:border-stone-500 focus:ring-2 focus:ring-stone-200"
                    />
                </div>

                {state?.error && (
                    <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">
                        {state.error}
                    </p>
                )}
                {state?.success && (
                    <p className="rounded-lg bg-green-50 px-3 py-2 text-sm text-green-700">
                        E-post sendt!
                    </p>
                )}

                <div className="flex justify-end">
                    <button
                        type="submit"
                        disabled={pending}
                        className="rounded-lg bg-stone-900 px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-stone-700 disabled:opacity-60"
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
    defaultTo,
}: {
    stats: EmailStats;
    defaultTo: string;
}) {
    return (
        <div className="min-h-screen bg-stone-50 px-4 py-12">
            <div className="mx-auto max-w-4xl">
                <div className="mb-8 flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-semibold text-stone-900">
                            Dashboard
                        </h1>
                        <p className="mt-1 text-sm text-stone-500">
                            andreastak.no · hei@andreastak.no
                        </p>
                    </div>
                    <form action={logoutAdmin}>
                        <button
                            type="submit"
                            className="rounded-lg border border-stone-200 bg-white px-3 py-1.5 text-sm text-stone-600 transition-colors hover:bg-stone-100"
                        >
                            Logg ut
                        </button>
                    </form>
                </div>

                {/* Statistikk */}
                <div className="mb-8 grid grid-cols-2 gap-4 sm:grid-cols-3">
                    <StatCard
                        label="Mottatte meldinger"
                        value={stats.inboundCount}
                        description="Fra kontaktskjemaet"
                    />
                    <StatCard
                        label="Sendte e-poster"
                        value={stats.outboundCount}
                        description="Sendt fra dashboard"
                    />
                    <StatCard
                        label="Totalt"
                        value={stats.inboundCount + stats.outboundCount}
                        description="Alle e-poster"
                    />
                </div>

                <div className="grid gap-6 lg:grid-cols-2">
                    {/* Historikk */}
                    <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
                        <h2 className="mb-4 text-base font-semibold text-stone-900">
                            Siste aktivitet
                        </h2>
                        {stats.recent.length === 0 ? (
                            <p className="text-sm text-stone-400">
                                Ingen e-poster enda.
                            </p>
                        ) : (
                            <div>
                                {stats.recent.map((email) => (
                                    <EmailRow key={email.id} email={email} />
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Composer */}
                    <EmailComposer defaultTo={defaultTo} />
                </div>
            </div>
        </div>
    );
}
