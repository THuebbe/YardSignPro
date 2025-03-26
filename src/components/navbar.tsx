"use client";

import Link from "next/link";
import { createClient } from "../../supabase/client";
import { Button } from "./ui/button";
import { Flag, Loader2 } from "lucide-react";
import UserProfile from "./user-profile";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function Navbar() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const supabase = createClient();

  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser();
      setUser(data.user);
    };

    getUser();
  }, []);

  // This would normally be a server component, but for the loading state
  // we're converting it to a client component

  return (
    <nav className="w-full border-b border-gray-200 bg-white py-4 sticky top-0 z-50 shadow-sm">
      <div className="w-full max-w-[1180px] mx-auto px-4 flex justify-between items-center">
        <Link
          href="/"
          prefetch
          className="text-xl font-bold flex items-center gap-2"
        >
          <Flag className="h-8 w-8 text-green-600" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-blue-600 font-bold text-2xl">
            YardSignPro
          </span>
        </Link>

        <div className="hidden md:flex gap-8 items-center">
          <Link
            href="#features"
            className="text-gray-700 hover:text-green-600 transition-colors font-medium"
          >
            Features
          </Link>
          <Link
            href="#pricing"
            className="text-gray-700 hover:text-green-600 transition-colors font-medium"
          >
            Pricing
          </Link>

          <Link
            href="#"
            className="text-gray-700 hover:text-green-600 transition-colors font-medium"
          >
            Contact
          </Link>
        </div>

        <div className="flex gap-4 items-center">
          {user ? (
            <>
              <Button
                className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 shadow-md hover:shadow-lg transition-all"
                onClick={() => {
                  setIsLoading(true);
                  router.push("/dashboard");
                }}
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Loading...
                  </>
                ) : (
                  "Dashboard"
                )}
              </Button>
              <UserProfile />
            </>
          ) : (
            <>
              <Button
                className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 shadow-md hover:shadow-lg transition-all"
                onClick={() => {
                  setIsLoading(true);
                  router.push("/sign-in");
                }}
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Loading...
                  </>
                ) : (
                  "Sign In"
                )}
              </Button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
