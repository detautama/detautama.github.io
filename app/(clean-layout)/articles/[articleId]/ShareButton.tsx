"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

const ShareButton = () => {
  const [isShareSupported, setIsShareSupported] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setIsShareSupported(!!navigator.share);
  }, []);

  const articleUrl = typeof window !== "undefined" ? window.location.href : "";
  const articleTitle =
    typeof document !== "undefined" ? document.title : "Check this out!";

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: articleTitle,
          url: articleUrl,
        });
      } catch (error) {
        console.warn("Wwarning sharing", error);
      }
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(`${articleTitle} - ${articleUrl}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // Reset after 2 sec
    } catch (error) {
      console.error("Failed to copy", error);
    }
  };

  return (
    <div className="mt-6">
      {/* Text Above Buttons */}
      <p className="mb-2 text-center text-sm text-gray-700 md:text-left md:text-right dark:text-gray-300">
        Like the article? Share it with others or copy the link!
      </p>

      {/* Buttons */}
      <div className="flex justify-center gap-2 md:justify-end">
        {isShareSupported && (
          <button
            onClick={handleShare}
            className="flex transform gap-2 rounded-md bg-gradient-to-r from-teal-700 to-purple-700 px-4 py-1.5 text-sm font-medium text-white shadow-md transition-transform hover:scale-105 active:scale-95"
          >
            Share
            <Image
              src="/images/share-nodes.svg"
              alt="share"
              width={16}
              height={16}
            />
          </button>
        )}

        <button
          onClick={handleCopy}
          className="flex transform gap-2 rounded-md bg-gradient-to-r from-teal-700 to-purple-700 px-4 py-1.5 text-sm font-medium text-white shadow-md transition-transform hover:scale-105 active:scale-95"
        >
          {copied ? "Copied!" : "Copy"}
          <Image src="/images/copy.svg" alt="copy" width={16} height={16} />
        </button>
      </div>
    </div>
  );
};

export default ShareButton;
