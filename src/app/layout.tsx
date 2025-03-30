import { TempoInit } from "@/components/tempo-init";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { LoadingProvider } from "@/components/loading-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "YardSignPro - Streamline Your Yard Sign Rental Business",
  description:
    "A comprehensive SaaS solution for event yard sign rental companies",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <Script src="https://api.tempolabs.ai/proxy-asset?url=https://storage.googleapis.com/tempo-public-assets/error-handling.js" />
      <Script src="https://js.stripe.com/v3/pricing-table.js" async />
      <body className={inter.className}>
        <LoadingProvider>{children}</LoadingProvider>
        <TempoInit />
      </body>
    </html>
  );
}
