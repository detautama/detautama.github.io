import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Links - I Putu Deta Utama Putra",
  description: "Other links that you might be interested in.",
};

export default function Page() {
  return (
    <div>
      <h1 className="text-center text-2xl font-bold">Other links</h1>
      <div className="mb-5" />
      <p className="text-center md:text-left">
        Here are some other links that you might be interested in.
      </p>
      <div className="mb-5" />

    </div>
  );
}
