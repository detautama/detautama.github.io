import { Metadata } from "next";
import { thoughts } from "@/app/(clean-layout)/thoughts/thoughtsData";
import { ThoughtsContent } from "@/app/(clean-layout)/thoughts/ThoughtsContent";

export const metadata: Metadata = {
  title: "Thoughts - I Putu Deta Utama Putra",
  description: "Short opinions and thoughts — no agenda, no forced conclusions.",
};

export default function Page() {
  return (
    <div>
      <div className="mb-8 border-b border-brand-tan pb-8 dark:border-brand-dark-border">
        <h1 className="mb-2 font-display text-2xl font-bold text-brand-text-primary dark:text-brand-dark-text">
          Thoughts
        </h1>
        <p className="font-serif text-brand-text-secondary dark:text-brand-dark-text/70">
          Short opinions. Considered, but not over-thought.
        </p>
      </div>
      <ThoughtsContent thoughts={thoughts} />
    </div>
  );
}
