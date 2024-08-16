import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./styles.css";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Predict Quest",
  description: "Welcome to Predict Quest, a social platform where you can predict the outcomes of events for fun ",
  icons: {
    icon: "/football.png", 
    shortcut: "/football.png", 
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} `}>{children}</body>
    </html>
  );
}
