import { Metadata } from "next";
import { thoughts } from "./thoughtsData";
import { ThoughtsContent } from "./ThoughtsContent";

export const metadata: Metadata = {
  title: "Pikiran - I Putu Deta Utama Putra",
  description:
    "Opini dan pikiran singkat — tidak ada agenda, tidak ada kesimpulan wajib.",
};

export default function Page() {
  return (
    <div>
      <div className="border-brand-accent/20 mb-8 border-b pb-8">
        <span className="hud-label">Thought stream</span>
        <h1 className="mb-2 mt-4 font-display text-4xl font-bold uppercase tracking-[-0.06em] text-brand-text-primary">
          Pikiran
        </h1>
        <p className="dark:text-brand-dark-text/70 font-serif text-brand-text-secondary">
          Opini singkat. Dipertimbangkan, tapi tidak berlebihan.
        </p>
      </div>
      <ThoughtsContent thoughts={thoughts} />
    </div>
  );
}
