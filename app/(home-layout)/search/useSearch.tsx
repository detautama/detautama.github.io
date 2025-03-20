import React from "react";
import { ArticleData } from "../../lib/articles";

export const useSearch = (articles: ArticleData[]) => {
  const [result, setResult] = React.useState<ArticleData[]>([]);
  const [highlightedText, setHighlightedText] = React.useState<string>("");
  const debounceTimeout = React.useRef<NodeJS.Timeout | null>(null);

  const highlightText = (text: string, query: string) => {
    const regex = new RegExp(`([^.!?]*?${query}[^.!?]*[.!?])`, "gi");
    const match = regex.exec(text);
    if (!match) return text;

    const sentence = match[0];
    const parts = sentence.split(new RegExp(`(${query})`, "gi"));
    return (
      <span>
        {parts.map((part, index) =>
          part.toLowerCase() === query.toLowerCase() ? (
            <mark key={index}>{part}</mark>
          ) : (
            part
          )
        )}
      </span>
    );
  };

  const search = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value.toLowerCase();
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }
    debounceTimeout.current = setTimeout(() => {
      const searchResult = articles.filter((article) => {
        return (
          (article.title ?? "").toLowerCase().includes(query) ||
          (article.content ?? "").toLowerCase().includes(query)
        );
      });
      if (query === "") {
        return setResult([]);
      }
      setHighlightedText(query);
      setResult(searchResult);
    }, 500);
  };

  return { result, highlightedText, search, highlightText };
};
