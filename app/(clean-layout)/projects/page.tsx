import { Metadata } from "next";
import ProjectsContent from "@/app/components/ProjectsContent";

export const metadata: Metadata = {
  title: "Projects - I Putu Deta Utama Putra",
  description: "A collection of projects worked on by I Putu Deta Utama Putra",
};

export default function Page() {
  return <ProjectsContent />;
}
