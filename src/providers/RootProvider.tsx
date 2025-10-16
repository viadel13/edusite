"use client";

import ReduxProvider from "@/providers/ReduxProvider";
import { ThemeProvider } from "@/providers/ThemeProvider";
import { Toaster } from "react-hot-toast";

export function RootProvider({ children }: { children: React.ReactNode }) {
  return (
    <ReduxProvider>
      <ThemeProvider>
        <Toaster position="top-right" />
        {children}
      </ThemeProvider>
    </ReduxProvider>
  );
}
