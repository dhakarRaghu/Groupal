"use client";
import React from "react";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import { ThemeProvider as NextThemesProvider } from "next-themes";
type Props = {
  children: React.ReactNode;
};

const queryClient = new QueryClient();

const Providers = ({ children }: Props) => {
  return (
    <QueryClientProvider client={queryClient}>
         {/* <NextThemesProvider
        attribute="class"
        defaultTheme="system"
       disableTransitionOnChange
      > */}
      {children}
        {/* <Toaster />
      </NextThemesProvider> */}
      </QueryClientProvider>

  );
};

export default Providers;