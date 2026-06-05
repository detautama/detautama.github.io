"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useLocale } from "../../../lib/LocaleContext";

export default function SekarangRedirect() {
  const router = useRouter();
  const { localePath } = useLocale();

  useEffect(() => {
    router.replace(localePath("/now"));
  }, [router, localePath]);

  return null;
}
