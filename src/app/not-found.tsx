export default function NotFound() {
    return (
        <div className='flex min-h-screen items-center justify-center bg-background px-6'>
            <div className='text-center'>
                <h1 className='text-3xl font-semibold text-text'>
                    Denne siden finnes ikke
                </h1>
                <p className='mt-4 text-muted'>
                    Kanskje du tok en liten omvei — det gjør jeg også av og til.
                </p>
            </div>
        </div>
    );
}
