"use client";

import { useRouter } from "next/navigation";

interface FeelingLuckyButtonProps {
  articleIds: string[];
}

export default function FeelingLuckyButton({
  articleIds,
}: FeelingLuckyButtonProps) {
  const router = useRouter();

  const handleClick = () => {
    if (articleIds.length === 0) return;

    const randomIndex = Math.floor(Math.random() * articleIds.length);
    const randomArticleId = articleIds[randomIndex];
    router.push(`/articles/${randomArticleId}`);
  };

  return (
    <button
      onClick={handleClick}
      className="brand-button inline-flex items-center justify-center rounded-lg border-2 border-brand-accent bg-transparent px-4 py-2 text-sm font-medium text-brand-accent transition-all duration-200 hover:bg-brand-accent hover:text-white focus:outline-none focus:ring-2 focus:ring-brand-accent focus:ring-offset-2 dark:border-brand-accent dark:text-brand-accent dark:hover:bg-brand-accent dark:hover:text-white"
    >
      <svg
        className="mr-2 h-4 w-4"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M13 10V3L4 14h7v7l9-11h-7z"
        />
      </svg>
      <span>I&apos;m feeling lucky</span>
    </button>
  );
}
