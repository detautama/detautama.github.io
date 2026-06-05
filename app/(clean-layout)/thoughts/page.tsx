import { Metadata } from "next";
import { thoughts } from "./thoughtsData";
import { ThoughtsContent } from "./ThoughtsContent";

export const metadata: Metadata = {
  title: "Pikiran - I Putu Deta Utama Putra",
  description: "Opini dan pikiran singkat — tidak ada agenda, tidak ada kesimpulan wajib.",
};

export default function Page() {
  return (
    <div>
      <div className="mb-8 border-b border-brand-tan pb-8 dark:border-brand-dark-border">
        <h1 className="mb-2 font-display text-2xl font-bold text-brand-text-primary dark:text-brand-dark-text">
          Pikiran
        </h1>
        <p className="font-serif text-brand-text-secondary dark:text-brand-dark-text/70">
          Opini singkat. Dipertimbangkan, tapi tidak berlebihan.
        </p>
      </div>
      <ThoughtsContent thoughts={thoughts} />
    </div>
  );
}
