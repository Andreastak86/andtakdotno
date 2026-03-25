import { skillGroups } from "@/lib/data/skills";

export function Skills() {
    return (
        <section className='bg-white'>
            <div className='mx-auto max-w-6xl px-6 py-16 sm:px-8 md:py-20 lg:px-10'>
                <div className='grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16'>
                    <div>
                        <p className='text-sm font-medium uppercase tracking-[0.2em] text-stone-500'>
                            Kompetanse
                        </p>

                        <h2 className='mt-3 max-w-xl text-3xl font-semibold tracking-tight text-stone-900 sm:text-4xl'>
                            Teknologi jeg bruker, og områder jeg jobber i.
                        </h2>

                        <p className='mt-5 max-w-lg text-base leading-8 text-stone-700 sm:text-lg'>
                            Jeg jobber bredt, men liker best teknologi som gjør
                            det lettere å bygge stabile, forståelige og nyttige
                            løsninger over tid.
                        </p>
                    </div>

                    <div className='grid gap-5 sm:grid-cols-2'>
                        {skillGroups.map((group) => (
                            <div
                                key={group.title}
                                className='rounded-3xl border border-stone-200 bg-stone-50 p-6'
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
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
