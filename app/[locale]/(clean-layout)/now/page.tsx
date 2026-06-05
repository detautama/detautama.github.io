import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Now - I Putu Deta Utama Putra",
  description: "What I'm doing now — work, reading, and thoughts.",
};

export default function NowPage() {
  return (
    <div className="animate-in font-serif text-lg leading-relaxed text-brand-text-primary dark:text-brand-dark-text">
      <div className="mb-8 border-b border-brand-tan pb-8 dark:border-brand-dark-border">
        <h1 className="mb-2 font-display text-3xl font-bold text-brand-text-primary dark:text-brand-dark-text sm:text-4xl">
          Now
        </h1>
        <p className="text-sm text-brand-text-secondary dark:text-brand-dark-text/60">
          Last updated: June 2026 &middot; from Denpasar, Bali
        </p>
      </div>

      <p className="mb-8 text-base text-brand-text-secondary dark:text-brand-dark-text/70">
        This page captures what I&apos;m doing these days. Inspired by the{" "}
        <Link href="https://nownownow.com/about" className="text-brand-accent hover:underline">
          /now movement
        </Link>
        .
      </p>

      <div className="space-y-10">
        <section>
          <h2 className="mb-4 font-display text-xl font-bold text-brand-text-primary dark:text-brand-dark-text">
            Working on
          </h2>
          <ul className="space-y-2 text-base">
            <li className="flex gap-2">
              <span className="mt-1 shrink-0 text-brand-accent">→</span>
              <span>Building new features at work — lots of TypeScript, a little sleep.</span>
            </li>
            <li className="flex gap-2">
              <span className="mt-1 shrink-0 text-brand-accent">→</span>
              <span>Redesigning this website to feel more like a <em>human</em>, less like a developer portfolio.</span>
            </li>
            <li className="flex gap-2">
              <span className="mt-1 shrink-0 text-brand-accent">→</span>
              <span>Writing more consistently — not just about code, but about life.</span>
            </li>
          </ul>
        </section>

        <section>
          <h2 className="mb-4 font-display text-xl font-bold text-brand-text-primary dark:text-brand-dark-text">
            Reading
          </h2>
          <ul className="space-y-2 text-base">
            <li className="flex gap-2">
              <span className="mt-1 shrink-0 text-brand-accent">→</span>
              <span>
                <em>Meditations</em> by Marcus Aurelius — a book I can open to any page and find something
                relevant.
              </span>
            </li>
            <li className="flex gap-2">
              <span className="mt-1 shrink-0 text-brand-accent">→</span>
              <span>Articles on parenting and realistic productivity (not the hustle culture kind).</span>
            </li>
          </ul>
        </section>

        <section>
          <h2 className="mb-4 font-display text-xl font-bold text-brand-text-primary dark:text-brand-dark-text">
            Enjoying
          </h2>
          <ul className="space-y-2 text-base">
            <li className="flex gap-2">
              <span className="mt-1 shrink-0 text-brand-accent">→</span>
              <span>Morning rides in Bali before traffic hits — this is my moving meditation.</span>
            </li>
            <li className="flex gap-2">
              <span className="mt-1 shrink-0 text-brand-accent">→</span>
              <span>The small moments with my kid who keeps growing faster than I expected.</span>
            </li>
          </ul>
        </section>

        <section>
          <h2 className="mb-4 font-display text-xl font-bold text-brand-text-primary dark:text-brand-dark-text">
            Thinking about
          </h2>
          <ul className="space-y-2 text-base">
            <li className="flex gap-2">
              <span className="mt-1 shrink-0 text-brand-accent">→</span>
              <span>
                How to be truly present for family while doing work I love — without either one becoming the
                sacrifice.
              </span>
            </li>
            <li className="flex gap-2">
              <span className="mt-1 shrink-0 text-brand-accent">→</span>
              <span>
                What it means to be a good developer in the AI era — not about fear of being replaced, but
                staying relevant and meaningful.
              </span>
            </li>
          </ul>
        </section>
      </div>

      <div className="mt-12 border-t border-brand-tan pt-8 dark:border-brand-dark-border">
        <p className="text-sm text-brand-text-secondary dark:text-brand-dark-text/60">
          I update this page occasionally when things change.{" "}
          <a href="mailto:detautama11@gmail.com" className="text-brand-accent hover:underline">
            Get in touch
          </a>{" "}
          if you have book recommendations, cycling routes, or just want to chat.
        </p>
      </div>
    </div>
  );
}
