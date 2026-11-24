import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Smart Project Scoping | Cynbit Technologies",
  description:
    "Cynbit's AI-powered project intake assistant. Tell us what you're building and get a personalized project brief in minutes.",
  openGraph: {
    title: "Smart Project Scoping | Cynbit Technologies",
    description:
      "Cynbit's AI-powered project intake assistant. Tell us what you're building and get a personalized project brief in minutes.",
    url: "https://cynbit-intake.vercel.app",
    siteName: "Cynbit Technologies",
    locale: "en_IN",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
        />
      </head>
      <body className="antialiased min-h-screen bg-white">{children}</body>
    </html>
  );
}
