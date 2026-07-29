"use client";

import { usePathname } from "next/navigation";
import { Header } from "../server-components/Header";

export function ConditionalHeader() {
  const pathname = usePathname();
  const isHome = pathname === "/" || pathname === "/id" || pathname === "/en";
  if (isHome) return null;
  return <Header />;
}
