import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Nav } from "@/components/nav";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "sonner";
import Providers from "./providers";
import { AuthToast } from "@/components/auth-toast";
import { usePathname } from "next/navigation";

const parkinsans = localFont({
  src: "./fonts/Parkinsans-VariableFont_wght.ttf",
  variable: "--font-parkinsans",
});

export const metadata: Metadata = {
  title: "Automate Your Workflow",
  description: "Automate Your Workflow",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${parkinsans.variable} font-parkinsans antialiased`}>
        <SessionProvider>
          <Providers>
            <AuthToast />
            <Nav />
            {children}
          </Providers>
          <Toaster expand={true} richColors position="bottom-right" />
        </SessionProvider>
      </body>
    </html>
  );
}
