import { sendContactEmail } from "@/app/actions";
import { SubmitButton } from "@/components/portfolio/submit-button";
import { TfiGithub } from "react-icons/tfi";
import { MdMail } from "react-icons/md";
import { FaLinkedin } from "react-icons/fa6";

export function Contact() {
    return (
        <section id='kontakt' className='bg-stone-50'>
            <div className='mx-auto max-w-6xl px-6 py-16 sm:px-8 md:py-20 lg:px-10'>
                <div className='grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16'>
                    <div>
                        <p className='text-sm font-medium uppercase tracking-[0.2em] text-stone-500'>
                            Kontakt
                        </p>

                        <h2 className='mt-3 max-w-xl text-3xl font-semibold tracking-tight text-stone-900 sm:text-4xl'>
                            Har du noe{" "}
                            <span className='text-primary'>spennende</span> på
                            gang?
                        </h2>

                        <p className='mt-5 max-w-lg text-base leading-8 text-stone-700 sm:text-lg'>
                            Jeg er alltid åpen for en god prat om utvikling,
                            samarbeid, digitale løsninger eller nye muligheter.
                        </p>

                        <ul className='mt-8 space-y-3 text-base text-stone-700'>
                            <li className='flex items-center gap-2'>
                                <MdMail size={20} className='shrink-0' />
                                <a
                                    href='mailto:andreas.takvam@gmail.com'
                                    className='leading-none hover:underline'
                                >
                                    andreas.takvam@gmail.com
                                </a>
                            </li>

                            <li className='flex items-center gap-2'>
                                <TfiGithub size={20} className='shrink-0' />
                                <a
                                    href='https://github.com/Andreastak86'
                                    target='_blank'
                                    rel='noreferrer'
                                    className='leading-none hover:underline'
                                >
                                    GitHub
                                </a>
                            </li>

                            <li className='flex items-center gap-2'>
                                <FaLinkedin size={20} className='shrink-0' />
                                <a
                                    href='https://linkedin.com/in/andreas-takvam-623068a4'
                                    target='_blank'
                                    rel='noreferrer'
                                    className='leading-none hover:underline'
                                >
                                    LinkedIn
                                </a>
                            </li>
                        </ul>
                    </div>

                    <div className='rounded-3xl border border-stone-200 bg-white p-6 shadow-sm sm:p-8'>
                        <form action={sendContactEmail} className='space-y-5'>
                            <div>
                                <label
                                    htmlFor='name'
                                    className='mb-2 block text-sm font-medium text-stone-700'
                                >
                                    Navn
                                </label>
                                <input
                                    id='name'
                                    name='name'
                                    type='text'
                                    required
                                    className='w-full rounded-2xl border border-stone-300 bg-white px-4 py-3 text-stone-900 outline-none transition focus:border-stone-500'
                                />
                            </div>

                            <div>
                                <label
                                    htmlFor='email'
                                    className='mb-2 block text-sm font-medium text-stone-700'
                                >
                                    E-post
                                </label>
                                <input
                                    id='email'
                                    name='email'
                                    type='email'
                                    required
                                    className='w-full rounded-2xl border border-stone-300 bg-white px-4 py-3 text-stone-900 outline-none transition focus:border-stone-500'
                                />
                            </div>

                            <div>
                                <label
                                    htmlFor='message'
                                    className='mb-2 block text-sm font-medium text-stone-700'
                                >
                                    Melding
                                </label>
                                <textarea
                                    id='message'
                                    name='message'
                                    rows={6}
                                    required
                                    className='w-full rounded-2xl border border-stone-300 bg-white px-4 py-3 text-stone-900 outline-none transition focus:border-stone-500'
                                />
                            </div>

                            <SubmitButton />
                            <input
                                type='text'
                                name='website'
                                className='hidden'
                                tabIndex={-1}
                                autoComplete='off'
                            />
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}
