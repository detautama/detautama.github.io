"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { ArticleData } from "../../lib/articles";

interface TagContentProps {
  allArticlesData: ArticleData[];
  uniqueTags: string[];
}

export function TagContent({ allArticlesData, uniqueTags }: TagContentProps) {
  const [activeTag, setActiveTag] = useState<string | null>(null);

  useEffect(() => {
    // Get hash from URL on mount and when hash changes
    const handleHashChange = () => {
      const hash = globalThis.location.hash.slice(1); // Remove #
      if (hash) {
        setActiveTag(hash);
        // Remove highlight after 2 seconds
        setTimeout(() => setActiveTag(null), 2000);
      }
    };

    // Check initial hash
    handleHashChange();

    // Listen for hash changes
    globalThis.addEventListener("hashchange", handleHashChange);

    return () => {
      globalThis.removeEventListener("hashchange", handleHashChange);
    };
  }, []);

  const handleTagClick = (tag: string) => {
    setActiveTag(tag);
    setTimeout(() => setActiveTag(null), 2000);
  };

  return (
    <>
      <h1 className="text-center text-2xl font-bold">
        Tags ({uniqueTags.length})
      </h1>
      <div className="mb-5" />
      <div className="flex flex-wrap gap-2">
        {uniqueTags.map((tag) => (
          <Link
            key={tag}
            href={`/tag/#${tag}`}
            onClick={() => handleTagClick(tag)}
            className="claude-badge flex gap-1 transition-colors hover:bg-claude-brown hover:text-white"
          >
            <Image src="/images/tag.svg" alt="tag" width={16} height={16} />
            {tag}
          </Link>
        ))}
      </div>
      <div className="mb-5" />
      <hr className="pb-4" />
      {uniqueTags.map((tag) => (
        <div
          key={tag}
          id={tag}
          className={`-mx-4 rounded-lg p-4 transition-all duration-500 ${
            activeTag === tag
              ? "bg-claude-accent/15 dark:bg-claude-accent/10"
              : ""
          }`}
        >
          <p className="text-2xl font-bold">
            {tag} (
            {
              allArticlesData.filter((article) => article.tags.includes(tag))
                .length
            }
            )
          </p>
          <div className="mb-5" />
          <div className="flex flex-wrap gap-4">
            {allArticlesData
              .filter((article) => article.tags.includes(tag))
              .map((article) => (
                <div key={article.id}>
                  <article>
                    <Link href={`/articles/${article.id}`}>
                      <h3 className="mb-1 text-base hover:text-claude-accent dark:hover:text-claude-accent">
                        {article.title}
                      </h3>
                    </Link>
                  </article>
                </div>
              ))}
          </div>
          <div className="mb-5" />
          <hr />
          <div className="mb-5" />
        </div>
      ))}
    </>
  );
}
