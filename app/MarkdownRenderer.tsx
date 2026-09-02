/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/cjs/styles/prism";

type MarkdownRendererProps = {
  readonly children: string;
};

export function MarkdownRenderer({
  children: markdown,
}: MarkdownRendererProps) {
  return (
    <Markdown
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeRaw]}
      components={{
        pre({ children }: any) {
          return <div className="nagare-code-shell">{children}</div>;
        },
        code({ inline, className, children, ...props }: any) {
          const match = /language-(\w+)/.exec(className || "");

          return !inline && match ? (
            <div className="nagare-code-block">
              <div className="nagare-code-header" aria-hidden="true">
                <span>{match[1]}</span>
                <span>CODE</span>
              </div>
              <SyntaxHighlighter
                style={dracula}
                PreTag="div"
                language={match[1]}
                customStyle={{
                  margin: 0,
                  borderRadius: 0,
                  background: "#191816",
                  padding: "1.5rem",
                }}
                codeTagProps={{
                  style: {
                    fontFamily: "var(--font-geist-mono), monospace",
                    fontSize: "0.86rem",
                    lineHeight: "1.75",
                  },
                }}
                {...props}
              >
                {String(children).replace(/\n$/, "")}
              </SyntaxHighlighter>
            </div>
          ) : (
            <code className={className} {...props}>
              {children}
            </code>
          );
        },
      }}
    >
      {markdown}
    </Markdown>
  );
}
