import { ReactNode } from "react";

export function EditorialReveal({
  children,
  className = "",
}: Readonly<{ children: ReactNode; className?: string }>) {
  return <section className={className}>{children}</section>;
}
