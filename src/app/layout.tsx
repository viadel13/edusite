import { Metadata } from "next";
import { Merriweather, Roboto } from "next/font/google";
import "../assets/styles/globals.css";
import Navbar from "@/components/layout/Navbar/Navbar";
import PageContainer from "@/components/layout/PageContainer/PageContainer";
import { PageLoaderProvider } from "@/contexts/PageLoaderContext";
import PageLoadEffect from "@/components/common/PageLoadEffect/PageLoadEffect";
import GlobalLoader from "@/components/layout/GlobalLoader/GlobalLoader";

const merriweather = Merriweather({
  variable: "--font-merriweather",
  subsets: ["latin"],
});

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Edusite",
  description: "Browse and discover a world of books",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${merriweather.variable} ${roboto.variable}`}>
        <PageLoaderProvider>
          <PageLoadEffect />
          <GlobalLoader />
          <Navbar />
          {children}
        </PageLoaderProvider>
      </body>
    </html>
  );
}
