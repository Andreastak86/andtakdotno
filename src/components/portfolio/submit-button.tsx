"use client";

import { useFormStatus } from "react-dom";

export function SubmitButton() {
    const { pending } = useFormStatus();

    return (
        <button
            type='submit'
            disabled={pending}
            className='inline-flex items-center justify-center rounded-2xl bg-primary px-6 py-3 text-sm font-medium text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60'
        >
            {pending ? "Sender..." : "Send melding"}
        </button>
    );
}
