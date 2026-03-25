type Project = {
    title: string;
    role: string;
    description: string;
    outcome: string;
    stack: string[];
};

export function ProjectCard({ project }: { project: Project }) {
    return (
        <article className='rounded-3xl border border-stone-200 bg-white p-8 shadow-sm'>
            <div className='flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between'>
                <div className='max-w-2xl'>
                    <h3 className='text-2xl font-semibold tracking-tight text-stone-900'>
                        {project.title}
                    </h3>

                    <p className='mt-2 text-sm font-medium text-stone-500'>
                        {project.role}
                    </p>

                    <p className='mt-5 text-base leading-8 text-stone-700'>
                        {project.description}
                    </p>

                    <p className='mt-3 text-base leading-8 text-stone-600'>
                        {project.outcome}
                    </p>
                </div>

                <div className='min-w-50 rounded-2xl bg-stone-50 p-5'>
                    <p className='text-sm font-medium text-stone-500'>Stack</p>

                    <div className='mt-4 flex flex-wrap gap-2'>
                        {project.stack.map((tech) => (
                            <span
                                key={tech}
                                className='rounded-full border border-stone-200 bg-white px-3 py-1 text-sm text-stone-700'
                            >
                                {tech}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </article>
    );
}
