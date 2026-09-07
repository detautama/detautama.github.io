"use client";

import { useLocale } from "@/app/lib/LocaleContext";
import { Porjects } from "@/app/(clean-layout)/projects/project";
import { EditorialReveal } from "./EditorialReveal";
import { SmallWebShell } from "./SmallWebShell";

export default function ProjectsContent() {
  const { locale, t } = useLocale();
  const copy =
    locale === "id"
      ? {
          count: "7 proyek",
          note: "Klik sebuah kartu untuk membuka catatan proyek",
          title: "Karya yang pernah kubangun",
        }
      : {
          count: "7 projects",
          note: "Open a card to read its project note",
          title: "Things I have helped build",
        };

  return (
    <SmallWebShell
      activeSection="projects"
      contentClassName="small-web-projects-content"
    >
      <header className="small-web-page-header">
        <h1>{t.projects.title}.</h1>
        <div className="small-web-rule" />
        <div className="small-web-page-intro">
          <p>{t.projects.description}</p>
          <span>{copy.count}</span>
        </div>
      </header>

      <section className="small-web-section">
        <header className="small-web-section-heading">
          <div>
            <span className="small-web-section-icon" aria-hidden="true">
              ◇
            </span>
            <div>
              <h2>{copy.title}</h2>
              <p>{copy.note}</p>
            </div>
          </div>
        </header>
        <EditorialReveal>
          <Porjects />
        </EditorialReveal>
      </section>
    </SmallWebShell>
  );
}
