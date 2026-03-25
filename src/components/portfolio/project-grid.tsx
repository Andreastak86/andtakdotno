import { projects } from "@/lib/data/portfolio";
import { ProjectCard } from "./project-card";

export function ProjectGrid() {
    return (
        <section id='prosjekter' className='bg-stone-50'>
            <div className='mx-auto max-w-6xl px-6 py-16 sm:px-8 md:py-20 lg:px-10'>
                <div className='mb-10'>
                    <p className='text-sm font-medium uppercase tracking-[0.2em] text-stone-500'>
                        Utvalgte prosjekter
                    </p>
                </div>

                <div className='grid gap-6'>
                    {projects.map((project) => (
                        <ProjectCard key={project.title} project={project} />
                    ))}
                </div>
            </div>
        </section>
    );
}
