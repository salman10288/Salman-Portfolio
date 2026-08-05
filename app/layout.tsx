import type { ReactNode } from "react";
import type { Metadata, Viewport } from "next";

import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Salman Saeed — Full Stack Developer",
    template: "%s — Salman Saeed",
  },
  description:
    "Cinematic 3D developer portfolio for Salman Saeed, a frontend-focused full stack developer building responsive, scalable and immersive digital products.",
  keywords: [
    "Salman Saeed",
    "Full Stack Developer",
    "Frontend Developer",
    "Angular Developer",
    "Next.js Developer",
    "React Developer",
    "Karachi",
    "3D Portfolio",
  ],
  authors: [{ name: "Salman Saeed" }],
  creator: "Salman Saeed",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    title: "Salman Saeed — Full Stack Developer",
    description:
      "Modern, scalable and immersive digital experiences — presented through a cinematic real-time 3D portfolio.",
    siteName: "Salman Saeed Portfolio",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Salman Saeed — Full Stack Developer portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Salman Saeed — Full Stack Developer",
    description: "A cinematic, performance-minded 3D developer portfolio.",
    images: ["/og-image.png"],
  },
  icons: {
    icon: "/favicon.svg",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  colorScheme: "dark",
  themeColor: "#06080b",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en" className="bg-[#06080b]" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
