"use client";

import React, { useMemo, useState, useRef } from "react";
import { Thought } from "./thoughtsData";
import { ThoughtCard } from "./ThoughtCard";
import { useLocale } from "@/app/lib/LocaleContext";

function highlightContent(text: string, query: string): React.ReactNode {
  if (!query) return text;
  const parts = text.split(new RegExp(`(${query})`, "gi"));
  return (
    <>
      {parts.map((part, i) => {
        const key = `${i}-${part}`;
        return part.toLowerCase() === query.toLowerCase() ? (
          <mark key={key} className="rounded bg-brand-accent/20 text-brand-accent dark:bg-brand-accent/30 dark:text-brand-accent">
            {part}
          </mark>
        ) : (
          <span key={key}>{part}</span>
        );
      })}
    </>
  );
}

export const ThoughtsContent: React.FC<{ thoughts: Thought[] }> = ({ thoughts }) => {
  const { t } = useLocale();
  const [query, setQuery] = useState("");
  const [activeQuery, setActiveQuery] = useState("");
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      setActiveQuery(value.toLowerCase().trim());
    }, 300);
  };

  const filtered = useMemo(() => {
    if (!activeQuery) return thoughts;
    return thoughts.filter((t) => t.content.toLowerCase().includes(activeQuery));
  }, [thoughts, activeQuery]);

  const isSearching = activeQuery.length > 0;

  return (
    <div>
      <div className="relative mb-6">
        <svg
          className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-brand-text-secondary dark:text-brand-dark-text/50"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input
          type="text"
          value={query}
          onChange={handleSearch}
          placeholder={t.thoughts.searchPlaceholder}
          className="w-full rounded-lg border border-brand-tan bg-white py-2.5 pl-9 pr-4 text-sm text-brand-text-primary placeholder-brand-text-secondary transition-all focus:border-brand-accent focus:outline-none focus:ring-2 focus:ring-brand-accent/20 dark:border-brand-dark-border dark:bg-brand-dark-bg dark:text-brand-dark-text dark:placeholder-brand-dark-text/50"
        />
      </div>

      {isSearching && (
        <p className="mb-4 text-sm text-brand-text-secondary dark:text-brand-dark-text/60">
          {filtered.length > 0 ? t.thoughts.result(filtered.length) : t.thoughts.noResult}
        </p>
      )}

      {thoughts.length === 0 && (
        <div className="py-16 text-center">
          <p className="mb-2 text-4xl">✏️</p>
          <p className="font-display font-semibold text-brand-text-primary dark:text-brand-dark-text">
            {t.thoughts.emptyTitle}
          </p>
          <p className="mt-1 text-sm text-brand-text-secondary dark:text-brand-dark-text/50">
            {t.thoughts.emptySubtitle}
          </p>
        </div>
      )}
      {thoughts.length > 0 && filtered.length === 0 && isSearching && (
        <div className="py-16 text-center text-brand-text-secondary dark:text-brand-dark-text/50">
          <p>{t.thoughts.noResult}</p>
        </div>
      )}
      {thoughts.length > 0 && filtered.length > 0 && (
        <div className="flex flex-col gap-4">
          {filtered.map((thought) => (
            <ThoughtCard
              key={thought.id}
              thought={thought}
              highlight={activeQuery}
              highlightContent={highlightContent}
            />
          ))}
        </div>
      )}
    </div>
  );
};
