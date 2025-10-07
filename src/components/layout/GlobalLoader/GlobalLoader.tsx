"use client";

import Backdrop from "@/components/ui/Backdrop/Backdrop";
import { usePageLoader } from "@/contexts/PageLoaderContext";

export function GlobalLoader() {
  const { loadPage } = usePageLoader();
  return <Backdrop load={loadPage} />;
}
export default GlobalLoader;
