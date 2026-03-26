import type { Metadata } from "next";
import { Manrope, Work_Sans } from "next/font/google";
import "./globals.css";
import { Footer } from "@/components/layout/footer";

const manrope = Manrope({
    variable: "--font-manrope",
    subsets: ["latin"],
});

const workSans = Work_Sans({
    variable: "--font-work-sans",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    metadataBase: new URL("https://andreastak.no"),
    title: {
        default: "Andreas Takvam | Utvikler i Bergen",
        template: "%s | Andreas Takvam",
    },
    icons: {
        apple: "/apple-touch-icon.png",
    },
    description:
        "Portfolioen til Andreas Takvam – utvikler med erfaring fra utvikling, prosjektarbeid og digitale løsninger. Jeg bygger robuste, forståelige og nyttige løsninger med fokus på teknologi, struktur og mennesker.",
    keywords: [
        "Andreas Takvam",
        "utvikler Bergen",
        "frontend utvikler",
        "software engineer",
        "webutvikler",
        "Next.js",
        "React",
        "TypeScript",
        "Tailwind CSS",
        "FastAPI",
        "Supabase",
        "portfolio utvikler",
    ],
    manifest: "/manifest.json",
    authors: [{ name: "Andreas Takvam" }],
    creator: "Andreas Takvam",
    publisher: "Andreas Takvam",
    applicationName: "Andreas Takvam Portfolio",
    category: "technology",
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            "max-image-preview": "large",
            "max-snippet": -1,
            "max-video-preview": -1,
        },
    },
    openGraph: {
        type: "website",
        locale: "nb_NO",
        url: "https://andreastak.no",
        siteName: "Andreas Takvam",
        title: "Andreas Takvam | Utvikler i Bergen",
        description:
            "Andreas Takvam er utvikler i Bergen med erfaring fra utvikling, prosjektarbeid og digitale løsninger. Portfolio med prosjekter, kompetanse og fokus på robuste og forståelige løsninger.",
        images: [
            {
                url: "/og-image.png",
                width: 1200,
                height: 630,
                alt: "Portfolioen til Andreas Takvam",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Andreas Takvam | Utvikler i Bergen",
        description:
            "Portfolioen til Andreas Takvam – utvikler med erfaring fra utvikling, prosjektarbeid og digitale løsninger.",
        images: ["/og-image.png"],
    },
    alternates: {
        canonical: "https://andreastak.no",
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang='no'>
            <body
                className={`${workSans.variable} ${manrope.variable} min-h-screen bg-stone-50 text-stone-900`}
            >
                <div className='flex min-h-screen flex-col'>
                    <main className='flex-1'>{children}</main>
                    <Footer />
                </div>
            </body>
        </html>
    );
}
