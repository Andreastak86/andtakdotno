"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export function IdentitySection() {
    return (
        <section className='bg-background'>
            <div className='mx-auto grid max-w-6xl gap-10 px-6 py-20 sm:px-8 md:py-24 lg:grid-cols-[1fr_0.9fr] lg:items-center lg:gap-16 lg:px-10'>
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.25 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className='relative overflow-hidden rounded-3xl border border-border bg-surface shadow-sm'
                >
                    <Image
                        src='/andreas-nature.webp'
                        alt='Andreas i naturen'
                        width={900}
                        height={1200}
                        priority
                        className='h-full w-full object-cover grayscale contrast-105'
                    />
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.25 }}
                    transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
                    className='max-w-xl'
                >
                    <p className='text-sm font-medium uppercase tracking-[0.2em] text-accent'>
                        Perspektiv
                    </p>

                    <h2 className='mt-3 text-3xl font-semibold tracking-tight text-text sm:text-4xl'>
                        Jeg liker å løfte{" "}
                        <span className='text-primary'>blikket</span> litt.
                    </h2>

                    <p className='mt-6 text-base leading-8 text-muted sm:text-lg'>
                        Da blir det lettere å se sammenhengen - og gjøre ting
                        litt enklere.
                    </p>
                </motion.div>
            </div>
        </section>
    );
}
