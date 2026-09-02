"use client";

import { useLocale } from "@/app/lib/LocaleContext";
import { Porjects } from "@/app/(clean-layout)/projects/project";
import { OrganicBackground } from "./OrganicBackground";
import { EditorialNav } from "./EditorialNav";
import { EditorialReveal } from "./EditorialReveal";

export default function ProjectsContent() {
  const { t } = useLocale();

  return (
    <div className="nagare-home nagare-editorial-page nagare-projects-page">
      <OrganicBackground />
      <EditorialNav />
      <main className="nagare-editorial-main">
        <header className="nagare-editorial-hero">
          <h1>{t.projects.title}.</h1>
          <div className="nagare-editorial-intro">{t.projects.description}</div>
        </header>
        <EditorialReveal>
          <Porjects />
        </EditorialReveal>
      </main>
    </div>
  );
}
