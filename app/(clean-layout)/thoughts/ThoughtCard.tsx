import Image from "next/image";
import React from "react";
import { Thought } from "./thoughtsData";

interface ThoughtCardProps {
  thought: Thought;
  highlight?: string;
  highlightContent?: (text: string, query: string) => React.ReactNode;
}

function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export const ThoughtCard: React.FC<ThoughtCardProps> = ({
  thought,
  highlight = "",
  highlightContent,
}) => {
  const content =
    highlight && highlightContent
      ? highlightContent(thought.content, highlight)
      : thought.content;

  return (
    <article className="brand-card flex flex-col gap-3 p-5">
      <time className="text-xs text-brand-text-secondary dark:text-brand-dark-text/50">
        {formatDate(thought.date)}
      </time>
      <p className="whitespace-pre-wrap font-serif leading-relaxed text-brand-text-primary dark:text-brand-dark-text">
        {content}
      </p>
      {thought.image && (
        <div className="relative mt-1 overflow-hidden rounded-lg">
          <Image
            src={thought.image}
            alt=""
            width={600}
            height={400}
            className="h-auto w-full object-cover"
          />
        </div>
      )}
    </article>
  );
};
