import type { Metadata } from "next";
import { Geist, Geist_Mono, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Beetle Network | Leading Competitive Minecraft SMP",
  description: "Leading upcoming Asian competitive Minecraft SMP. Join Beetle Network for the best competitive experience with enterprise grade anticheat and premium hardware.",
  keywords: ["Beetle Network", "Minecraft SMP", "competitive SMP", "Asian Minecraft", "beetlesmp", "Minecraft server"],
  authors: [{ name: "Denial" }],
  icons: {
    icon: "/logo.jpg",
    apple: "/logo.jpg",
  },
  openGraph: {
    title: "Beetle Network",
    description: "Leading upcoming Asian competitive Minecraft SMP",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} antialiased`}
        style={{ background: '#0c0c0c', color: '#f0f0f0' }}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
