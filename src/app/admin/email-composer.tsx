"use client";

import { useActionState } from "react";
import { sendAdminEmail, logoutAdmin, type SendEmailState } from "./actions";

export function EmailComposer({ defaultTo }: { defaultTo: string }) {
    const [state, action, pending] = useActionState<
        SendEmailState | undefined,
        FormData
    >(sendAdminEmail, undefined);

    return (
        <div className="min-h-screen bg-stone-50 px-4 py-12">
            <div className="mx-auto max-w-2xl">
                <div className="mb-8 flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-semibold text-stone-900">
                            Send e-post
                        </h1>
                        <p className="mt-1 text-sm text-stone-500">
                            Fra: hei@andreastak.no
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

                <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
                    <form action={action} className="flex flex-col gap-5">
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
                                rows={10}
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
            </div>
        </div>
    );
}
