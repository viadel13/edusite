"use client";

import { useEffect } from "react";

import { usePathname } from "next/navigation";
import { usePageLoader } from "@/contexts/PageLoaderContext";

export const PageLoadEffect = () => {
  const pathname = usePathname();
  const { setLoadPage } = usePageLoader();

  useEffect(() => {
    setLoadPage(false);
  }, [pathname]);

  return null;
};

export default PageLoadEffect;
