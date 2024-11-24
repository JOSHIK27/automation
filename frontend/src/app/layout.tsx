import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Nav } from "@/components/nav";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "sonner";
import { store } from "./store/store";
import { Provider } from "react-redux";
import Providers from "./providers";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
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
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SessionProvider>
          <Providers>
            <Nav />
            {children}
          </Providers>
          <Toaster expand={true} richColors position="bottom-right" />
        </SessionProvider>
      </body>
    </html>
  );
}
