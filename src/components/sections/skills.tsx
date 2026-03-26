"use client";

import { motion } from "framer-motion";
import { skillGroups } from "@/lib/data/skills";
import { Variants } from "framer-motion";

const containerVariants = {
    hidden: {},
    show: {
        transition: {
            staggerChildren: 0.08,
        },
    },
};

const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.45,
            ease: "easeOut",
        },
    },
};

export function Skills() {
    return (
        <section className='bg-white'>
            <div className='mx-auto max-w-6xl px-6 py-16 sm:px-8 md:py-20 lg:px-10'>
                <div className='grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16'>
                    <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                    >
                        <p className='text-sm font-medium uppercase tracking-[0.2em] text-stone-500'>
                            Kompetanse
                        </p>

                        <h2 className='mt-3 max-w-xl text-3xl font-semibold tracking-tight text-stone-900 sm:text-4xl'>
                            Teknologi jeg bruker, og områder jeg{" "}
                            <span className='text-primary'>jobber</span> med.
                        </h2>

                        <p className='mt-5 max-w-lg text-base leading-8 text-stone-700 sm:text-lg'>
                            Jeg jobber bredt, men liker best teknologi som gjør
                            det lettere å bygge stabile, forståelige og nyttige
                            løsninger over tid.
                        </p>
                    </motion.div>

                    <motion.div
                        className='grid gap-5 sm:grid-cols-2'
                        variants={containerVariants}
                        initial='hidden'
                        whileInView='show'
                        viewport={{ once: true, amount: 0.2 }}
                    >
                        {skillGroups.map((group) => (
                            <motion.div
                                key={group.title}
                                variants={itemVariants}
                                whileHover={{ y: -4 }}
                                transition={{ duration: 0.2, ease: "easeOut" }}
                                className='rounded-3xl border border-stone-200 bg-stone-50 p-6 shadow-sm transition-shadow duration-200 hover:shadow-md'
                            >
                                <h3 className='text-lg font-semibold text-stone-900'>
                                    {group.title}
                                </h3>

                                <div className='mt-4 flex flex-wrap gap-2'>
                                    {group.items.map((item) => (
                                        <span
                                            key={item}
                                            className='rounded-full border border-stone-200 bg-white px-3 py-1.5 text-sm text-stone-700'
                                        >
                                            {item}
                                        </span>
                                    ))}
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
