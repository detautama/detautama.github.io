"use client";

import { useTransitionRouter as useRouter } from "next-view-transitions";
import { useLocale } from "../lib/LocaleContext";

interface FeelingLuckyButtonProps {
  articleIds: string[];
}

export default function FeelingLuckyButton({
  articleIds,
}: FeelingLuckyButtonProps) {
  const router = useRouter();
  const { localePath } = useLocale();

  const handleClick = () => {
    if (articleIds.length === 0) return;

    const randomIndex = Math.floor(Math.random() * articleIds.length);
    const randomArticleId = articleIds[randomIndex];
    router.push(localePath(`/articles/${randomArticleId}`));
  };

  return (
    <button onClick={handleClick} className="brand-button text-brand-accent">
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
