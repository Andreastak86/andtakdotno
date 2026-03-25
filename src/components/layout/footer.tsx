export function Footer() {
    const year = new Date().getFullYear();

    return (
        <footer className='border-t border-stone-200 bg-white'>
            <div className='mx-auto flex max-w-6xl flex-col gap-6 px-6 py-10 text-sm text-stone-600 sm:px-8 lg:flex-row lg:items-center lg:justify-between lg:px-10'>
                <div>
                    <p className='font-medium text-stone-800'>Andreas Takvam</p>
                    <p className='mt-1'>Bedre enn i går er mitt eneste mål.</p>
                </div>

                <div className='flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-6'>
                    <a
                        href='mailto:andreas.takvam@gmail.com'
                        className='transition hover:text-stone-900'
                    >
                        E-post
                    </a>

                    <a
                        href='https://github.com/Andreastak86'
                        target='_blank'
                        rel='noopener noreferrer'
                        className='transition hover:text-stone-900'
                    >
                        GitHub
                    </a>

                    <a
                        href='https://www.linkedin.com/in/andreas-takvam-623068a4'
                        target='_blank'
                        rel='noopener noreferrer'
                        className='transition hover:text-stone-900'
                    >
                        LinkedIn
                    </a>
                </div>

                <div className='text-stone-500'>© {year}</div>
            </div>
        </footer>
    );
}
