import Link from "next/link";

export function Hero() {
    return (
        <section className='border-b border-stone-200 bg-stone-50'>
            <div className='mx-auto grid min-h-[80vh] max-w-6xl items-center gap-12 px-6 py-16 sm:px-8 md:py-24 lg:grid-cols-[1.2fr_0.8fr] lg:px-10'>
                <div>
                    <p className='mb-4 text-sm font-medium uppercase tracking-[0.2em] text-stone-500'>
                        Andreas Takvam
                    </p>

                    <h1 className='max-w-3xl text-4xl font-semibold leading-tight tracking-tight text-stone-900 sm:text-5xl md:text-6xl'>
                        Jeg bygger{" "}
                        <span className=' text-primary'>digitale</span>{" "}
                        løsninger som faktisk blir brukt.
                    </h1>

                    <p className='mt-6 max-w-2xl text-base leading-8 text-stone-600 sm:text-lg'>
                        Utvikler og teknisk prosjektleder med bakgrunn i både
                        teknologi, mennesker og leveranser. Jeg trives best når
                        idéer får form, systemer blir forståelige, og løsninger
                        går fra skisse til drift.
                    </p>

                    <div className='mt-8 flex flex-col gap-3 sm:flex-row'>
                        <Link
                            href='#prosjekter'
                            className='inline-flex items-center justify-center rounded-2xl bg-stone-900 px-6 py-3 text-sm font-medium text-white transition hover:opacity-90'
                        >
                            Se prosjekter
                        </Link>

                        <Link
                            href='#kontakt'
                            className='inline-flex items-center justify-center rounded-2xl border border-stone-300 bg-white px-6 py-3 text-sm font-medium text-stone-700 transition hover:bg-stone-100'
                        >
                            Ta kontakt
                        </Link>
                    </div>
                </div>

                <div className='rounded-3xl border border-stone-200 bg-white p-6 shadow-sm sm:p-8'>
                    <div className='space-y-6'>
                        <div>
                            <p className='text-sm font-medium text-stone-500'>
                                Basert i Bergen
                            </p>
                            <p className='mt-2 text-base leading-7 text-stone-700'>
                                Jeg jobber i skjæringspunktet mellom utvikling,
                                struktur og menneskelige behov.
                            </p>
                        </div>

                        <div className='grid gap-3 sm:grid-cols-2'>
                            <div className='rounded-2xl bg-stone-100 p-4'>
                                <p className='text-sm font-medium text-stone-900'>
                                    Frontend
                                </p>
                                <p className='mt-1 text-sm leading-6 text-stone-600'>
                                    Next.js, TypeScript, Tailwind
                                </p>
                            </div>

                            <div className='rounded-2xl bg-stone-100 p-4'>
                                <p className='text-sm font-medium text-stone-900'>
                                    Backend
                                </p>
                                <p className='mt-1 text-sm leading-6 text-stone-600'>
                                    Python, FastAPI, API-utvikling
                                </p>
                            </div>

                            <div className='rounded-2xl bg-stone-100 p-4'>
                                <p className='text-sm font-medium text-stone-900'>
                                    Sky & drift
                                </p>
                                <p className='mt-1 text-sm leading-6 text-stone-600'>
                                    GCP, Docker, Linux
                                </p>
                            </div>

                            <div className='rounded-2xl bg-stone-100 p-4'>
                                <p className='text-sm font-medium text-stone-900'>
                                    Arbeidsform
                                </p>
                                <p className='mt-1 text-sm leading-6 text-stone-600'>
                                    Fra idé til produksjon
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
