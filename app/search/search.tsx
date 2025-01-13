"use client";

import React from "react";
import { ArticleData } from "../lib/articles";
import Link from "next/link";

export const Search: React.FC<{
  articles: ArticleData[];
}> = (props) => {
  console.log(props.articles);
  const [result, setResult] = React.useState<ArticleData[]>([]);

  const search = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    const searchResult = props.articles.filter((article) => {
      return article.title.toLowerCase().includes(query.toLowerCase());
    });
    if (query === "") {
      return setResult([]);
    }
    setResult(searchResult);
  };

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
      {result.map(({ id, title, date }) => (
        <Link href={`/articles/${id}`} key={id} className="mb-4 block">
          <h3>{title}</h3>
          <p>{date}</p>
        </Link>
      ))}
    </div>
  );
};
