import { Hero } from "@/components/portfolio/hero";
import { About } from "@/components/portfolio/about";
import { ProjectGrid } from "@/components/portfolio/project-grid";
import { Skills } from "@/components/portfolio/skills";
import { Contact } from "@/components/portfolio/contact";

export default function HomePage() {
    return (
        <main>
            <Hero />
            <About />
            <ProjectGrid />
            <Skills />
            <Contact />
        </main>
    );
}
