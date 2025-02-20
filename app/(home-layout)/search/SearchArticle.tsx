"use client";

import React from "react";
import { ArticleData } from "../../lib/articles";
import Link from "next/link";
import { useSearch } from "./useSearch";

export const Search: React.FC<{
  articles: ArticleData[];
}> = (props) => {
  const { result, highlightedText, search, highlightText } = useSearch(
    props.articles
  );

  return (
    <div>
      <h1 className="text-center text-2xl font-bold">Search</h1>
      <div className="mb-5" />
      <div className="mb-5" />
      <form>
        <input
          type="text"
          placeholder="Search..."
          className="w-full rounded-md border border-gray-300 p-2 focus:border-green-300 focus:outline-none focus:ring focus:ring-green-200"
          onChange={search}
        />
      </form>
      <div className="mb-5" />
      {result.map(({ id, title, content, date, tag }) => (
        <Link href={`/articles/${id}`} key={id} className="mb-4 block">
          <h3 className="text-xl font-bold hover:text-green-700">
            {highlightText(title, highlightedText)}
          </h3>
          <p>{highlightText(content, highlightedText)}</p>
          <p className="text-sm text-gray-500">
            {date} - <span className="text-purple-700">{tag}</span>
          </p>
        </Link>
      ))}
    </div>
  );
};
