export type SkillGroup = {
    title: string;
    items: string[];
};

export const skillGroups: SkillGroup[] = [
    {
        title: "Frontend",
        items: ["Next.js", "TypeScript", "React", "Tailwind"],
    },
    {
        title: "Backend",
        items: ["Python", "FastAPI", "Pandas", "API-utvikling"],
    },
    {
        title: "Sky & drift",
        items: ["GCP", "Azure", "AWS", "Docker", "Linux"],
    },
    {
        title: "CMS",
        items: ["Sanity", "Webflow", "WordPress"],
    },
];
