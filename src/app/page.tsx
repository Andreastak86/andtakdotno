import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { ProjectGrid } from "@/components/portfolio/project-grid";
import { Skills } from "@/components/sections/skills";
import { Contact } from "@/components/sections/contact";
import { IdentitySection } from "@/components/sections/identity-section";

export default function HomePage() {
    return (
        <main>
            <Hero />
            <About />
            <ProjectGrid />
            <Skills />
            <IdentitySection />
            <Contact />
        </main>
    );
}
