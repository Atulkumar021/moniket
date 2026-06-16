"use client";

import { useState } from "react";
import type { Block } from "@/lib/types";

function CodeBlock({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);
  const lines = code.split("\n");
  function copy() {
    navigator.clipboard?.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1400);
  }
  return (
    <pre className="code">
      <button className="copy" onClick={copy}>
        {copied ? "Copied" : "Copy"}
      </button>
      {lines.map((line, i) => {
        const isComment = line.trimStart().startsWith("#");
        return (
          <span key={i} className={isComment ? "cm" : undefined}>
            {line}
            {i < lines.length - 1 ? "\n" : ""}
          </span>
        );
      })}
    </pre>
  );
}

export default function ArticleBody({ blocks }: { blocks: Block[] }) {
  return (
    <>
      {blocks.map((b, i) => {
        switch (b.t) {
          case "h":
            return <h2 key={i}>{b.c}</h2>;
          case "p":
            return <p key={i}>{b.c}</p>;
          case "note":
            return (
              <div className="note" key={i}>
                {b.c}
              </div>
            );
          case "ul":
            return (
              <ul key={i}>
                {b.c.map((it, j) => (
                  <li key={j}>{it}</li>
                ))}
              </ul>
            );
          case "ol":
            return (
              <ol key={i}>
                {b.c.map((it, j) => (
                  <li key={j}>{it}</li>
                ))}
              </ol>
            );
          case "code":
            return <CodeBlock key={i} code={b.c} />;
          default:
            return null;
        }
      })}
    </>
  );
}
