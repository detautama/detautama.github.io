"use client";
import { useState } from "react";
import Image from "next/image";

const galleryData = [
  {
    year: 2025,
    images: ["/images/gallery/feb-2025.jpg"],
  },
];

export default function GalleryPage() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <div className="min-h-screen">
      <h1 className="text-center text-2xl font-bold md:text-3xl">Gallery</h1>
      <div className="mb-5" />
      <p className="text-center md:text-left">
        {`Welcome to Celuk, a village in Bali renowned for its traditional silver craftsmanship and vibrant community life. This gallery showcases yearly snapshots from my hometown — capturing local events, cultural moments, and the everyday beauty that makes Celuk special.`}
      </p>
      <div className="mb-5" />

      {galleryData.map((section) => (
        <section key={section.year} className="mx-auto max-w-6xl px-4 pb-12">
          <h2 className="mb-4 border-b border-gray-300 text-2xl font-semibold">
            {section.year}
          </h2>
          <div className="columns-1 gap-4 space-y-4 sm:columns-2 md:columns-3">
            {section.images.map((src, index) => (
              <Image
                key={index}
                src={src}
                alt={`Celuk ${section.year} - ${index + 1}`}
                className="w-full cursor-pointer rounded-xl shadow-md transition-transform duration-200 hover:scale-[1.02]"
                onClick={() => setSelectedImage(src)}
                width={800}
                height={800}
              />
            ))}
          </div>
        </section>
      ))}

      {selectedImage && (
        <button
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75"
          onClick={() => setSelectedImage(null)}
        >
          <Image
            src={selectedImage}
            alt="Selected"
            className="max-h-[90%] max-w-[90%] rounded-lg shadow-lg"
            width={800}
            height={800}
          />
        </button>
      )}

      <footer className="py-4 text-center text-sm text-gray-500">
        &copy; 2025 detautama.me - Galeri Celuk
      </footer>
    </div>
  );
}
