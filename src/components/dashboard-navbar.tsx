"use client";

import Link from "next/link";
import { createClient } from "../../supabase/client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { UserCircle, Home } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { toast } from "./ui/use-toast";

export default function DashboardNavbar() {
  const supabase = createClient();
  const router = useRouter();
  const [showUrlDialog, setShowUrlDialog] = useState(false);
  const [customerUrl, setCustomerUrl] = useState("");

  const generateCustomerUrl = async () => {
    try {
      // Get current user
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        toast({
          title: "Error",
          description: "You must be logged in to generate a URL",
          variant: "destructive",
        });
        return;
      }

      // Generate URL with user ID as identifier
      const baseUrl = window.location.origin;
      const uniqueUrl = `${baseUrl}?customer=${user.id}`;
      setCustomerUrl(uniqueUrl);
      setShowUrlDialog(true);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate customer URL",
        variant: "destructive",
      });
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(customerUrl);
    toast({
      title: "Success",
      description: "URL copied to clipboard",
    });
  };

  return (
    <>
      <nav className="w-full border-b border-gray-200 bg-white py-4">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Link href="/" prefetch className="text-xl font-bold">
              Logo
            </Link>
          </div>
          <div className="flex gap-4 items-center">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <UserCircle className="h-6 w-6" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={generateCustomerUrl}>
                  Get Customer URL
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={async () => {
                    await supabase.auth.signOut();
                    router.push("/");
                  }}
                >
                  Sign out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </nav>

      <Dialog open={showUrlDialog} onOpenChange={setShowUrlDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Your Customer URL</DialogTitle>
            <DialogDescription>
              Use this URL on your website to identify your customers for
              features and billing purposes.
            </DialogDescription>
          </DialogHeader>
          <div className="flex items-center space-x-2">
            <Input value={customerUrl} readOnly className="flex-1" />
            <Button onClick={copyToClipboard}>Copy</Button>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowUrlDialog(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
