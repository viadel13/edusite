"use client";

import ReduxProvider from "@/providers/ReduxProvider";
import { ThemeProvider } from "@/providers/ThemeProvider";
import { Toaster } from "react-hot-toast";
import { Stack } from "@mui/material";
import { usePathname } from "next/navigation";
import Navbar from "@/components/layout/Navbar/Navbar";
import Footer from "@/components/layout/Footer/Footer";
import { PageLoaderProvider } from "@/contexts/PageLoaderContext";
import PageLoadEffect from "@/components/common/PageLoadEffect/PageLoadEffect";
import GlobalLoader from "@/components/layout/GlobalLoader/GlobalLoader";
import { useEffect } from "react";
import { AuthProvider } from "@/contexts/AuthContext";

export function RootProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const hideLayout = pathname === "/livres";

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname]);

  return (
    <ReduxProvider>
      <ThemeProvider>
        <Toaster position="top-right" />
        <AuthProvider>
          <Stack
            sx={{
              mt: !hideLayout
                ? (theme) => `calc(${theme.mixins.toolbar.minHeight}px + 40px)`
                : 0,
            }}
          >
            <PageLoaderProvider>
              <PageLoadEffect />
              <GlobalLoader />
              <main className="content">
                {!hideLayout && <Navbar />}
                {children}
                {!hideLayout && <Footer />}
              </main>
            </PageLoaderProvider>
          </Stack>
        </AuthProvider>
      </ThemeProvider>
    </ReduxProvider>
  );
}
