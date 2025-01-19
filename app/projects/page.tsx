import { Metadata } from "next";
import { Porjects } from "./project";

export const metadata: Metadata = {
  title: "Projects - I Putu Deta Utama Putra",
  description: "A collection of projects worked on by I Putu Deta Utama Putra",
};

export default function Page() {
  return (
    <div>
      <h1 className="text-center text-2xl font-bold">Projects</h1>
      <div className="mb-5" />
      <p>
        {
          "These are some of the projects I’ve worked on in my spare time. Most of these projects are not open source. However, I’d be happy to share insights or discuss them further if you’re interested."
        }
      </p>
      <div className="mb-5" />
      <Porjects />
    </div>
  );
}
