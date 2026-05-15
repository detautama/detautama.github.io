"use client";

import { useTheme } from "next-themes";
import { useEffect } from "react";

const utterancesTheme = (theme: string | undefined) =>
  theme === "dark" ? "github-dark" : "github-light";

const Comment = () => {
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    const commentsElement = document.getElementById("comments");
    if (!commentsElement) return;

    if (commentsElement.children.length > 0) {
      const iframe = commentsElement.querySelector<HTMLIFrameElement>(
        ".utterances-frame"
      );
      if (iframe) {
        iframe.contentWindow?.postMessage(
          { type: "set-theme", theme: utterancesTheme(resolvedTheme) },
          "https://utteranc.es"
        );
      }
      return;
    }

    const script = document.createElement("script");
    script.setAttribute("src", "https://utteranc.es/client.js");
    script.setAttribute("repo", "detautama/detautama.github.io");
    script.setAttribute("issue-term", "pathname");
    script.setAttribute("theme", utterancesTheme(resolvedTheme));
    script.setAttribute("crossorigin", "anonymous");
    script.setAttribute("async", "true");
    commentsElement.appendChild(script);
  }, [resolvedTheme]);

  return <div id="comments" />;
};

export default Comment;
