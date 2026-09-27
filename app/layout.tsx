import { AuthProvider } from "@/components/session-provider";
import "./globals.css";
import {Figtree} from "next/font/google"
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hornworm",
  description:
  "Hornworm is an intelligent AI agent for conversation, reasoning, and getting things done.",
};

const figtree = Figtree({ subsets: ['latin']})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body style={{ margin: 0, padding: 0 }} className={figtree.className}>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
