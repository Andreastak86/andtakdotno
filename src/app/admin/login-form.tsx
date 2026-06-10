"use client";

import { useActionState } from "react";
import { loginAdmin } from "./actions";

export function LoginForm() {
    const [state, action, pending] = useActionState(loginAdmin, undefined);

    return (
        <div className="flex min-h-screen items-center justify-center bg-stone-50">
            <div className="w-full max-w-sm rounded-2xl border border-stone-200 bg-white p-8 shadow-sm">
                <h1 className="mb-1 text-xl font-semibold text-stone-900">
                    Admin
                </h1>
                <p className="mb-6 text-sm text-stone-500">
                    Logg inn for å sende e-post
                </p>

                <form action={action} className="flex flex-col gap-4">
                    <div className="flex flex-col gap-1.5">
                        <label
                            htmlFor="password"
                            className="text-sm font-medium text-stone-700"
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
                            className="rounded-lg border border-stone-300 bg-stone-50 px-3 py-2 text-sm text-stone-900 outline-none focus:border-stone-500 focus:ring-2 focus:ring-stone-200"
                        />
                    </div>

                    {state?.error && (
                        <p className="text-sm text-red-600">{state.error}</p>
                    )}

                    <button
                        type="submit"
                        disabled={pending}
                        className="rounded-lg bg-stone-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-stone-700 disabled:opacity-60"
                    >
                        {pending ? "Logger inn…" : "Logg inn"}
                    </button>
                </form>
            </div>
        </div>
    );
}
