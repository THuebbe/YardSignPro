"use client";

import { Loader2 } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useCallback } from "react";
import { createContext, useContext, useEffect, useState } from "react";

type LoadingContextType = {
  isLoading: boolean;
  startLoading: () => void;
  stopLoading: () => void;
};

const LoadingContext = createContext<LoadingContextType>({
  isLoading: false,
  startLoading: () => {},
  stopLoading: () => {},
});

export const useLoading = () => useContext(LoadingContext);

export function LoadingProvider({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter() as any; // Type assertion to handle both Pages and App Router
  const pathname = usePathname();

  // Expose methods to manually control loading state
  const startLoading = useCallback(() => setIsLoading(true), []);
  const stopLoading = useCallback(() => setIsLoading(false), []);

  useEffect(() => {
    const handleStart = () => {
      setIsLoading(true);
    };

    const handleComplete = () => {
      setIsLoading(false);
    };

    // Use Next.js router events for navigation state
    router.events?.on("routeChangeStart", handleStart);
    router.events?.on("routeChangeComplete", handleComplete);
    router.events?.on("routeChangeError", handleComplete);

    // Fallback for Next.js App Router which doesn't have router events
    if (typeof window !== "undefined") {
      window.addEventListener("beforeunload", handleStart);
      window.addEventListener("load", handleComplete);
    }

    return () => {
      router.events?.off("routeChangeStart", handleStart);
      router.events?.off("routeChangeComplete", handleComplete);
      router.events?.off("routeChangeError", handleComplete);

      if (typeof window !== "undefined") {
        window.removeEventListener("beforeunload", handleStart);
        window.removeEventListener("load", handleComplete);
      }
    };
  }, [router, pathname]);

  return (
    <LoadingContext.Provider value={{ isLoading, startLoading, stopLoading }}>
      {children}
      {isLoading && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[100] flex items-center justify-center">
          <div className="bg-white p-4 rounded-lg shadow-lg flex items-center gap-3">
            <Loader2 className="h-6 w-6 text-green-600 animate-spin" />
            <span className="text-gray-800 font-medium">Loading...</span>
          </div>
        </div>
      )}
    </LoadingContext.Provider>
  );
}
