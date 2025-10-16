"use client";

import ReduxProvider from "@/providers/ReduxProvider";
import { ThemeProvider } from "@/providers/ThemeProvider";
import { Toaster } from "react-hot-toast";
import { Stack } from "@mui/material";

export function RootProvider({ children }: { children: React.ReactNode }) {
  return (
    <ReduxProvider>
      <ThemeProvider>
        <Toaster position="top-right" />
        <Stack
          sx={{
            mt: (theme) => `calc(${theme.mixins.toolbar.minHeight}px + 40px)`,
          }}
        >
          {children}
        </Stack>
      </ThemeProvider>
    </ReduxProvider>
  );
}
