import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import Header from "@/components/Header";
import { SanityLive } from "@/sanity/lib/live";
import { VisualEditing } from "next-sanity";
import { draftMode } from "next/headers";
import { DisableDraftModeButton } from "@/components/DisableDraftMode";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider dynamic>
      <html lang="en">
        <body>
          {(await draftMode()).isEnabled && (
            <>
              <DisableDraftModeButton />
              <VisualEditing />
            </>
          )}
          <main>
            <Header />
            {children}
          </main>
          <SanityLive />
        </body>
      </html>
    </ClerkProvider>
  );
}
