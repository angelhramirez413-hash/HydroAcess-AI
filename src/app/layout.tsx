import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "HydroAccess AI",
  description: "AI-assisted clean water and sanitation recommendations from structured engineering knowledge."
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
