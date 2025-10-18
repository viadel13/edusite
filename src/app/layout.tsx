import { Metadata } from "next";

import "./globals.css";
import Navbar from "@/components/layout/Navbar/Navbar";
import { PageLoaderProvider } from "@/contexts/PageLoaderContext";
import PageLoadEffect from "@/components/common/PageLoadEffect/PageLoadEffect";
import GlobalLoader from "@/components/layout/GlobalLoader/GlobalLoader";
import { RootProvider } from "@/providers/RootProvider";
import Footer from "@/components/layout/Footer/Footer";

export const metadata: Metadata = {
  title: "Edusite",
  description: "Parcourez et découvrez un monde de livres",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <RootProvider>
          <PageLoaderProvider>
            <PageLoadEffect />
            <GlobalLoader />
            <Navbar />
            {children}

            <Footer />
          </PageLoaderProvider>
        </RootProvider>
      </body>
    </html>
  );
}
