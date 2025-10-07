"use client";

import { createContext, useState, useContext, ReactNode } from "react";

interface PageLoaderContextType {
  loadPage: boolean;
  setLoadPage: (val: boolean) => void;
}

const PageLoaderContext = createContext<PageLoaderContextType | undefined>(
  undefined,
);

export const PageLoaderProvider = ({ children }: { children: ReactNode }) => {
  const [loadPage, setLoadPage] = useState(false);

  return (
    <PageLoaderContext.Provider value={{ loadPage, setLoadPage }}>
      {children}
    </PageLoaderContext.Provider>
  );
};

export const usePageLoader = (): PageLoaderContextType => {
  const context = useContext(PageLoaderContext);
  if (!context)
    throw new Error("usePageLoader must be used within a PageLoaderProvider");
  return context;
};
