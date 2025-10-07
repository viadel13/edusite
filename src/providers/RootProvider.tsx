"use client";

import ReduxProvider from "@/providers/ReduxProvider";

export function RootProvider({ children }: { children: React.ReactNode }) {
  return <ReduxProvider>{children}</ReduxProvider>;
}
