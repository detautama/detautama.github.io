"use client";

import { useEffect } from "react";

const Comment = () => {
  useEffect(() => {
    // check first if the script is already loaded by comments has child
    const commentsElement = document.getElementById("comments");
    if (commentsElement && commentsElement.children.length > 0) {
      return;
    }
    const script = document.createElement("script");
    script.setAttribute("src", "https://utteranc.es/client.js");
    script.setAttribute("repo", "detautama/detautama.github.io");
    script.setAttribute("issue-term", "pathname");
    script.setAttribute("theme", "preferred-color-scheme");
    script.setAttribute("crossorigin", "anonymous");
    script.setAttribute("async", "true");
    // appemd to id="comments"
    if (commentsElement) {
      commentsElement.appendChild(script);
    }
  }, []);

  return <div id="comments" />;
};

export default Comment;
