import type { Metadata, Viewport } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import ServiceWorkerRegistrar from "@/components/ServiceWorkerRegistrar";

const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin", "cyrillic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "DocMaker — Davernos Blanka Yasatuvchi",
  description:
    "Professional davernos blanka (letterhead) onlayn yarating va PDF sifatida yuklab oling",
  keywords: ["davernos", "blanka", "letterhead", "hujjat", "pdf"],
  authors: [{ name: "DocMaker" }],
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "DocMaker",
  },
  formatDetection: {
    telephone: false,
  },
};

export const viewport: Viewport = {
  themeColor: "#1e40af",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="uz">
      <head>
        <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="mobile-web-app-capable" content="yes" />
      </head>
      <body className={`${roboto.className} antialiased bg-gray-50 min-h-screen`}>
        <ServiceWorkerRegistrar />
        {children}
      </body>
    </html>
  );
}
