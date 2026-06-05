"use client";

import tanam from "./images/tanam.jpg";
import pnpm from "./images/pnpm.jpg";
import cg from "./images/CG.jpg";
import ayuna from "./images/ayuna.jpg";
import xvd from "./images/xvd.jpg";
import zustand from "./images/zustand.jpg";
import prapen from "./images/prapen.jpg";
import Image, { StaticImageData } from "next/image";
import React, { useState } from "react";
import Link from "next/link";
import { useLocale } from "@/app/lib/LocaleContext";

interface Project {
  title: string;
  description: {
    id: string;
    en: string;
  };
  link?: string;
  image: StaticImageData;
}

const projects: Project[] = [
  {
    title: "Tanam",
    description: {
      en: "Tanam is plugin CMS for Firebase. I contributed to this project by developing a Shimmer Table Component to enhance loading performance, optimizing NPM cache configuration for faster build times, and integrating Firebase UI for secure and efficient authentication workflows.",
      id: "Tanam adalah plugin CMS untuk Firebase. Aku berkontribusi pada proyek ini dengan mengembangkan Shimmer Table Component untuk meningkatkan performa loading, mengoptimalkan konfigurasi cache NPM untuk mempercepat build, dan mengintegrasikan Firebase UI untuk alur autentikasi yang aman dan efisien.",
    },
    link: "https://github.com/oddbit/tanam",
    image: tanam,
  },
  {
    title: "pnpm",
    description: {
      en: "Fast, disk space efficient package manager. For this project, I contributed by creating detailed documentation for setting up Azure Pipelines. This addition simplifies the continuous integration process for developers using pnpm, providing clear guidance and practical examples for seamless integration.",
      id: "Package manager yang cepat dan hemat ruang disk. Untuk proyek ini, aku berkontribusi dengan membuat dokumentasi lengkap untuk pengaturan Azure Pipelines. Tambahan ini menyederhanakan proses continuous integration bagi developer yang menggunakan pnpm, dengan panduan yang jelas dan contoh praktis untuk integrasi yang mulus.",
    },
    link: "https://pnpm.io/",
    image: pnpm,
  },
  {
    title: "Cantik Grosir",
    description: {
      en: "Wholesale Store Management System. In this project, I managed the overall development, including task management and client meetings to gather requirements. My main focus was building the user interface for stock management, transaction handling, and reporting. These features helped streamline the store's operations by improving the efficiency of inventory control and transaction tracking while ensuring accurate and comprehensive reporting.",
      id: "Sistem Manajemen Toko Grosir. Dalam proyek ini, aku mengelola keseluruhan pengembangan, termasuk manajemen tugas dan pertemuan klien untuk mengumpulkan kebutuhan. Fokus utamaku adalah membangun antarmuka pengguna untuk manajemen stok, penanganan transaksi, dan pelaporan. Fitur-fitur ini membantu memperlancar operasional toko dengan meningkatkan efisiensi kontrol inventaris dan pelacakan transaksi, sekaligus memastikan pelaporan yang akurat dan komprehensif.",
    },
    link: undefined,
    image: cg,
  },
  {
    title: "XOVID20",
    description: {
      en: "For the XOVID20 project, an online jewelry store built on Shopify, I managed the project from start to finish. I handled task management and met with clients to gather their requirements. My main focus was on setting up Shopify, designing the user interface, and training employees. This ensured that the store was user-friendly for both operators and customers, while also streamlining inventory and sales processes.",
      id: "Untuk proyek XOVID20, toko perhiasan online yang dibangun di atas Shopify, aku mengelola proyek dari awal hingga akhir. Aku menangani manajemen tugas dan bertemu dengan klien untuk mengumpulkan kebutuhan mereka. Fokus utamaku adalah menyiapkan Shopify, merancang antarmuka pengguna, dan melatih karyawan. Ini memastikan toko ramah pengguna bagi operator maupun pelanggan, sekaligus menyederhanakan proses inventaris dan penjualan.",
    },
    link: "https://xovid20.com/",
    image: xvd,
  },
  {
    title: "Zustand",
    description: {
      en: " state-management solution. In this project, I contributed by adding a comprehensive example of the Slice Pattern to the documentation, demonstrating its integration with middlewares. This enhancement improves clarity for developers, particularly those using TypeScript, and aids in the adoption of advanced patterns within Zustand.",
      id: "Solusi state-management. Dalam proyek ini, aku berkontribusi dengan menambahkan contoh lengkap tentang Slice Pattern ke dalam dokumentasi, menunjukkan integrasinya dengan middleware. Peningkatan ini meningkatkan kejelasan bagi para developer, terutama yang menggunakan TypeScript, dan membantu adopsi pola lanjutan dalam Zustand.",
    },
    link: "https://zustand-demo.pmnd.rs/",
    image: zustand,
  },
  {
    title: "Prapen",
    description: {
      en: "For the prapen project, an online jewelry store built on Shopify, I led the project from start to finish. I was responsible for managing tasks and collaborating with clients to understand their specific needs. My key focus areas included setting up Shopify, designing the user interface, and training the team. These efforts made the store more user-friendly for both operators and customers, while enhancing the overall efficiency of the inventory and sales systems.",
      id: "Untuk proyek Prapen, toko perhiasan online yang dibangun di atas Shopify, aku memimpin proyek dari awal hingga akhir. Aku bertanggung jawab mengelola tugas dan berkolaborasi dengan klien untuk memahami kebutuhan spesifik mereka. Fokus utamaku meliputi menyiapkan Shopify, merancang antarmuka pengguna, dan melatih tim. Upaya ini membuat toko lebih ramah pengguna bagi operator maupun pelanggan, sekaligus meningkatkan efisiensi keseluruhan sistem inventaris dan penjualan.",
    },
    link: "https://prapen.com/",
    image: prapen,
  },
  {
    title: "Ayuna Silver",
    description: {
      en: "Ayuna Silver is a Balinese jewelry business website that showcases the finest quality handcrafted silver jewelry. The site represents a family business that has grown since 1986, combining traditional craftsmanship with modern e-commerce. I worked on this project to create a website that effectively presents their artisanal jewelry collection and tells their story.",
      id: "Ayuna Silver adalah website bisnis perhiasan perak Bali yang menampilkan perhiasan perak kerajinan tangan berkualitas terbaik. Situs ini mewakili bisnis keluarga yang telah berkembang sejak 1986, memadukan keahlian tradisional dengan e-commerce modern. Aku bekerja pada proyek ini untuk membuat website yang secara efektif mempresentasikan koleksi perhiasan artisanal mereka dan menceritakan kisah mereka.",
    },
    link: "https://ayunasilver.com/",
    image: ayuna,
  },
];

export const Porjects: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const { locale, t } = useLocale();

  const getDescription = (project: Project) =>
    locale === "en" ? project.description.en : project.description.id;

  return (
    <>
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
            <p className="line-clamp-4 text-center">{getDescription(project)}</p>
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
            <p className="mb-4">{getDescription(selectedProject)}</p>
            {selectedProject.link && (
              <Link
                href={selectedProject.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
              >
                {t.projects.visitProject}
              </Link>
            )}
          </div>
        </div>
      )}
    </>
  );
};
