"use client";

import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useLoading } from "./loading-provider";

interface LoadingButtonProps {
  href: string;
  className?: string;
  children: React.ReactNode;
}

export function LoadingButton({
  href,
  className,
  children,
}: LoadingButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const { startLoading } = useLoading();

  const handleClick = () => {
    setIsLoading(true);
    startLoading(); // Also trigger the global loading state
    router.push(href);
  };

  return (
    <Button className={className} onClick={handleClick} disabled={isLoading}>
      {isLoading ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Loading...
        </>
      ) : (
        children
      )}
    </Button>
  );
}
