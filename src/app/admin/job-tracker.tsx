"use client";

import { useActionState, useState } from "react";
import { addJobApplication, updateJobStatus, updateJobNotes } from "./job-actions";
import type { JobApplication, JobStatus } from "@/lib/supabase";
import type { JobFormState } from "./job-actions";

const STATUS_CONFIG: Record<
    JobStatus,
    { label: string; classes: string }
> = {
    søkt: {
        label: "Søkt",
        classes: "bg-primary-soft text-primary",
    },
    til_intervju: {
        label: "Til intervju",
        classes: "bg-accent-soft text-accent",
    },
    tilbud: {
        label: "Tilbud",
        classes: "bg-green-50 text-green-700",
    },
    avslag: {
        label: "Avslag",
        classes: "bg-red-50 text-red-700",
    },
    trukket: {
        label: "Trukket",
        classes: "bg-background text-muted",
    },
};

const STATUS_ORDER: JobStatus[] = [
    "søkt",
    "til_intervju",
    "tilbud",
    "avslag",
    "trukket",
];

function JobStatCard({
    label,
    value,
    variant = "default",
}: {
    label: string;
    value: number;
    variant?: "default" | "primary" | "accent" | "green" | "red";
}) {
    const styles = {
        default: "bg-surface border-border",
        primary: "bg-primary-soft border-border",
        accent: "bg-accent-soft border-border",
        green: "bg-green-50 border-border",
        red: "bg-red-50 border-border",
    };

    return (
        <div className={`rounded-2xl border p-4 shadow-sm ${styles[variant]}`}>
            <p className="text-xs font-medium tracking-wide text-muted uppercase">
                {label}
            </p>
            <p className="mt-1 font-heading text-2xl font-semibold text-text">
                {value}
            </p>
        </div>
    );
}

function JobRow({ job }: { job: JobApplication }) {
    const [expanded, setExpanded] = useState(false);
    const [notes, setNotes] = useState(job.notes ?? "");
    const [savingNotes, setSavingNotes] = useState(false);
    const [notesSaved, setNotesSaved] = useState(false);

    const cfg = STATUS_CONFIG[job.status];

    const date = new Date(job.applied_at).toLocaleDateString("nb-NO", {
        day: "numeric",
        month: "short",
        year: "numeric",
    });

    async function handleStatusChange(status: JobStatus) {
        await updateJobStatus(job.id, status);
    }

    async function handleSaveNotes() {
        setSavingNotes(true);
        await updateJobNotes(job.id, notes);
        setSavingNotes(false);
        setNotesSaved(true);
        setTimeout(() => setNotesSaved(false), 2000);
    }

    return (
        <div className="border-b border-border last:border-0">
            <button
                onClick={() => setExpanded((v) => !v)}
                className="flex w-full items-start gap-3 py-3 text-left transition-colors hover:bg-background"
            >
                <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                        <p className="font-medium text-text">{job.company}</p>
                        <span
                            className={`rounded-full px-2 py-0.5 text-xs font-medium ${cfg.classes}`}
                        >
                            {cfg.label}
                        </span>
                    </div>
                    <p className="text-sm text-muted">{job.position}</p>
                </div>
                <span className="shrink-0 text-xs text-muted">{date}</span>
            </button>

            {expanded && (
                <div className="mb-4 ml-0 space-y-3 px-1">
                    {/* URL */}
                    {job.url && (
                        <a
                            href={job.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-xs text-primary underline underline-offset-2 hover:opacity-80"
                        >
                            Se stillingsannonse
                        </a>
                    )}

                    {/* Statusoppdatering */}
                    <div>
                        <p className="mb-1.5 text-xs font-medium text-muted">
                            Oppdater status
                        </p>
                        <div className="flex flex-wrap gap-1.5">
                            {STATUS_ORDER.map((s) => {
                                const c = STATUS_CONFIG[s];
                                return (
                                    <button
                                        key={s}
                                        onClick={() => handleStatusChange(s)}
                                        className={`rounded-full px-3 py-1 text-xs font-medium transition-opacity ${c.classes} ${
                                            job.status === s
                                                ? "ring-2 ring-offset-1 ring-primary opacity-100"
                                                : "opacity-60 hover:opacity-100"
                                        }`}
                                    >
                                        {c.label}
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* Notater */}
                    <div>
                        <p className="mb-1.5 text-xs font-medium text-muted">
                            Notater
                        </p>
                        <textarea
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                            rows={3}
                            placeholder="Inntrykk, oppfølging, kontaktperson…"
                            className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-text outline-none focus:border-primary focus:ring-2 focus:ring-primary-soft"
                        />
                        <div className="mt-1.5 flex items-center gap-2">
                            <button
                                onClick={handleSaveNotes}
                                disabled={savingNotes}
                                className="rounded-lg bg-primary px-3 py-1.5 text-xs font-medium text-white transition-opacity hover:opacity-90 disabled:opacity-50"
                            >
                                {savingNotes ? "Lagrer…" : "Lagre notater"}
                            </button>
                            {notesSaved && (
                                <span className="text-xs text-primary">
                                    Lagret!
                                </span>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

function AddJobForm({ onAdded }: { onAdded: () => void }) {
    const [state, action, pending] = useActionState<
        JobFormState | undefined,
        FormData
    >(async (prev, formData) => {
        const result = await addJobApplication(prev, formData);
        if (!result?.error) onAdded();
        return result;
    }, undefined);

    const today = new Date().toISOString().split("T")[0];

    return (
        <div className="rounded-2xl border border-border bg-surface p-6 shadow-sm">
            <h2 className="mb-4 font-heading text-base font-semibold text-text">
                Legg til søknad
            </h2>
            <form action={action} className="flex flex-col gap-4">
                <div className="grid grid-cols-2 gap-3">
                    <div className="flex flex-col gap-1.5">
                        <label className="text-sm font-medium text-text">
                            Bedrift
                        </label>
                        <input
                            name="company"
                            required
                            placeholder="f.eks. Bekk"
                            className="rounded-lg border border-border bg-background px-3 py-2 text-sm text-text outline-none focus:border-primary focus:ring-2 focus:ring-primary-soft"
                        />
                    </div>
                    <div className="flex flex-col gap-1.5">
                        <label className="text-sm font-medium text-text">
                            Stilling
                        </label>
                        <input
                            name="position"
                            required
                            placeholder="f.eks. Frontend-utvikler"
                            className="rounded-lg border border-border bg-background px-3 py-2 text-sm text-text outline-none focus:border-primary focus:ring-2 focus:ring-primary-soft"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                    <div className="flex flex-col gap-1.5">
                        <label className="text-sm font-medium text-text">
                            Søknadsdato
                        </label>
                        <input
                            name="applied_at"
                            type="date"
                            required
                            defaultValue={today}
                            className="rounded-lg border border-border bg-background px-3 py-2 text-sm text-text outline-none focus:border-primary focus:ring-2 focus:ring-primary-soft"
                        />
                    </div>
                    <div className="flex flex-col gap-1.5">
                        <label className="text-sm font-medium text-text">
                            Link til annonse
                        </label>
                        <input
                            name="url"
                            type="url"
                            placeholder="finn.no/…"
                            className="rounded-lg border border-border bg-background px-3 py-2 text-sm text-text outline-none focus:border-primary focus:ring-2 focus:ring-primary-soft"
                        />
                    </div>
                </div>

                <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-medium text-text">
                        Notater (valgfritt)
                    </label>
                    <textarea
                        name="notes"
                        rows={2}
                        placeholder="Første inntrykk, kontaktperson…"
                        className="rounded-lg border border-border bg-background px-3 py-2 text-sm text-text outline-none focus:border-primary focus:ring-2 focus:ring-primary-soft"
                    />
                </div>

                {state?.error && (
                    <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">
                        {state.error}
                    </p>
                )}

                <div className="flex justify-end">
                    <button
                        type="submit"
                        disabled={pending}
                        className="rounded-lg bg-primary px-5 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90 disabled:opacity-50"
                    >
                        {pending ? "Lagrer…" : "Legg til søknad"}
                    </button>
                </div>
            </form>
        </div>
    );
}

export function JobTracker({ jobs }: { jobs: JobApplication[] }) {
    const [showForm, setShowForm] = useState(false);

    const active = jobs.filter((j) =>
        ["søkt", "til_intervju"].includes(j.status)
    ).length;
    const interviews = jobs.filter((j) => j.status === "til_intervju").length;
    const offers = jobs.filter((j) => j.status === "tilbud").length;
    const rejections = jobs.filter((j) => j.status === "avslag").length;

    return (
        <div className="space-y-6">
            {/* Statistikk */}
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                <JobStatCard label="Totalt søkt" value={jobs.length} />
                <JobStatCard
                    label="Aktive"
                    value={active}
                    variant="primary"
                />
                <JobStatCard
                    label="Til intervju"
                    value={interviews}
                    variant="accent"
                />
                <JobStatCard
                    label="Tilbud"
                    value={offers}
                    variant="green"
                />
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
                {/* Liste */}
                <div className="rounded-2xl border border-border bg-surface p-6 shadow-sm">
                    <div className="mb-4 flex items-center justify-between">
                        <h2 className="font-heading text-base font-semibold text-text">
                            Søknader
                        </h2>
                        <span className="text-xs text-muted">
                            {rejections > 0 && `${rejections} avslag`}
                        </span>
                    </div>
                    {jobs.length === 0 ? (
                        <p className="text-sm text-muted">
                            Ingen søknader enda. Legg til din første!
                        </p>
                    ) : (
                        <div>
                            {jobs.map((job) => (
                                <JobRow key={job.id} job={job} />
                            ))}
                        </div>
                    )}
                </div>

                {/* Legg til / knapp */}
                <div>
                    {showForm ? (
                        <AddJobForm onAdded={() => setShowForm(false)} />
                    ) : (
                        <button
                            onClick={() => setShowForm(true)}
                            className="flex w-full items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-border bg-surface py-10 text-sm text-muted transition-colors hover:border-primary hover:text-primary"
                        >
                            <span className="text-xl">+</span>
                            Legg til ny søknad
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}
