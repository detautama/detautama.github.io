"use client";
import { useState } from "react";

import Image from "next/image";
import { Project, projects } from "./project";
import Link from "next/link";

export default function Page() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

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
      <div className="grid grid-cols-2 gap-4">
        {projects.map((project) => (
          <button
            key={project.title}
            className="flex cursor-pointer flex-col items-center justify-center gap-4 rounded-md p-4 shadow-md transition-shadow hover:shadow-lg dark:border dark:border-gray-500"
            onClick={() => setSelectedProject(project)}
          >
            <Image
              src={project.image}
              alt={project.title}
              className="rounded-lg border"
              width={300}
            />
            <h2 className="text-center font-bold">{project.title}</h2>
            <p className="line-clamp-4 text-center">{project.description}</p>
          </button>
        ))}
      </div>

      {/* Project Detail Dialog */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-lg bg-white p-6 dark:bg-gray-800">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="w-full text-center text-2xl font-bold">
                {selectedProject.title}
              </h2>
              <button
                onClick={() => setSelectedProject(null)}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                ✕
              </button>
            </div>
            <Image
              src={selectedProject.image}
              alt={selectedProject.title}
              className="mx-auto mb-4 rounded-lg border"
              width={300}
            />
            <p className="mb-4">{selectedProject.description}</p>
            {selectedProject.link && (
              <Link
                href={selectedProject.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
              >
                Visit Project →
              </Link>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
