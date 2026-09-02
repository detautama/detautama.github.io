"use client";

import { ReactNode, useEffect, useRef, useState } from "react";

export function EditorialReveal({
  children,
  className = "",
}: Readonly<{ children: ReactNode; className?: string }>) {
  const ref = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setIsVisible(true);
        observer.disconnect();
      },
      { rootMargin: "0px 0px -40% 0px", threshold: 0 }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      className={`nagare-editorial-reveal ${isVisible ? "is-visible" : ""} ${className}`}
    >
      {children}
    </section>
  );
}
