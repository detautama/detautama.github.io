"use client";

import { useLocale } from "@/app/lib/LocaleContext";
import { Porjects } from "@/app/(clean-layout)/projects/project";

export default function ProjectsContent() {
  const { t } = useLocale();

  return (
    <div>
      <h1 className="text-center text-2xl font-bold">{t.projects.title}</h1>
      <div className="mb-5" />
      <p>{t.projects.description}</p>
      <div className="mb-5" />
      <Porjects />
    </div>
  );
}
