"use client";

import { useActionState } from "react";
import { loginAdmin } from "./actions";

export function LoginForm() {
    const [state, action, pending] = useActionState(loginAdmin, undefined);

    return (
        <div className="flex min-h-screen items-center justify-center bg-background">
            <div className="w-full max-w-sm rounded-2xl border border-border bg-surface p-8 shadow-sm">
                <h1 className="mb-1 font-heading text-xl font-semibold text-text">
                    Admin
                </h1>
                <p className="mb-6 text-sm text-muted">
                    Logg inn for å sende e-post
                </p>

                <form action={action} className="flex flex-col gap-4">
                    <div className="flex flex-col gap-1.5">
                        <label
                            htmlFor="password"
                            className="text-sm font-medium text-text"
                        >
                            Passord
                        </label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            required
                            autoFocus
                            placeholder="••••••••"
                            className="rounded-lg border border-border bg-background px-3 py-2 text-sm text-text outline-none focus:border-primary focus:ring-2 focus:ring-primary-soft"
                        />
                    </div>

                    {state?.error && (
                        <p className="text-sm text-red-600">{state.error}</p>
                    )}

                    <button
                        type="submit"
                        disabled={pending}
                        className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90 disabled:opacity-50"
                    >
                        {pending ? "Logger inn…" : "Logg inn"}
                    </button>
                </form>
            </div>
        </div>
    );
}
