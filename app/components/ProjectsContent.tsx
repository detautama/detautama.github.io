"use client";

import { useLocale } from "@/app/lib/LocaleContext";
import { Porjects } from "@/app/(clean-layout)/projects/project";

export default function ProjectsContent() {
  const { t } = useLocale();

  return (
    <div className="animate-in">
      <span className="hud-label">Project registry</span>
      <h1 className="mt-4 font-display text-4xl font-bold uppercase tracking-[-0.06em]">
        {t.projects.title}
      </h1>
      <div className="mb-5" />
      <p>{t.projects.description}</p>
      <div className="mb-5" />
      <Porjects />
    </div>
  );
}
