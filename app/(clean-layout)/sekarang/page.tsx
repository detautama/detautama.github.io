"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function SekarangRedirect() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/now");
  }, [router]);

  return null;
}
