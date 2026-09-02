import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Links - I Putu Deta Utama Putra",
  description: "Other links that you might be interested in.",
};

export default async function Page() {
  return (
    <div>
      <span className="hud-label">External nodes</span>
      <h1 className="mt-4 font-display text-4xl font-bold uppercase tracking-[-0.06em]">
        Other links
      </h1>
      <div className="mb-5" />
      <p className="text-center md:text-left">
        Here are some other links that you might be interested in.
      </p>
      <div className="mb-5" />
    </div>
  );
}
