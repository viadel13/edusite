import { Metadata } from "next";

import "./globals.css";

import { RootProvider } from "@/providers/RootProvider";

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
    <html lang="fr">
      <body className="layout">
        <RootProvider>{children}</RootProvider>
      </body>
    </html>
  );
}
