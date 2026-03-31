"use client";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export function Hero() {
    return (
        <section className='border-b border-stone-200 bg-stone-50'>
            <div className='mx-auto grid min-h-[80vh] max-w-6xl items-center gap-12 px-6 py-16 sm:px-8 md:py-24 lg:grid-cols-[1.15fr_0.85fr] lg:px-10'>
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                        duration: 0.6,
                        ease: [0.22, 1, 0.36, 1],
                    }}
                >
                    <p className='mb-4 text-sm font-medium uppercase tracking-[0.2em] text-stone-500'>
                        Andreas Takvam
                    </p>

                    <h1 className='max-w-3xl text-4xl font-semibold leading-tight tracking-tight text-stone-900 sm:text-5xl md:text-6xl'>
                        Jeg bygger{" "}
                        <span className='text-primary'>digitale</span> løsninger
                        som faktisk blir brukt.
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
                            className='inline-flex items-center justify-center rounded-2xl bg-primary px-6 py-3 text-sm font-medium text-white transition hover:opacity-90'
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
                </motion.div>

                <motion.div
                    className='mx-auto w-full max-w-xs sm:max-w-sm md:max-w-sm lg:max-w-md'
                    initial={{ opacity: 0, y: 32 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                        duration: 0.7,
                        delay: 0.1,
                        ease: [0.22, 1, 0.36, 1],
                    }}
                >
                    <div className='overflow-hidden rounded-4xl border border-stone-200 bg-white shadow-sm'>
                        <Image
                            src='/funny-profile.webp'
                            alt='Portrett av Andreas Takvam'
                            width={800}
                            height={1000}
                            className='h-auto w-full object-cover object-top'
                        />
                    </div>

                    <div className='mt-4 grid grid-cols-2 gap-3'>
                        <motion.div
                            className='rounded-2xl border border-stone-200 bg-white p-4 shadow-sm'
                            whileHover={{ y: -3 }}
                            transition={{ duration: 0.2, ease: "easeOut" }}
                        >
                            <p className='text-sm font-medium text-stone-900'>
                                Basert i Bergen
                            </p>
                            <p className='mt-1 text-sm leading-6 text-stone-600'>
                                Utvikler & teknisk prosjektleder
                            </p>
                        </motion.div>

                        <motion.div
                            className='rounded-2xl border border-stone-200 bg-white p-4 shadow-sm'
                            whileHover={{ y: -3 }}
                            transition={{ duration: 0.2, ease: "easeOut" }}
                        >
                            <p className='text-sm font-medium text-stone-900'>
                                Arbeidsform
                            </p>
                            <p className='mt-1 text-sm leading-6 text-stone-600'>
                                Fra idé til produksjon
                            </p>
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
