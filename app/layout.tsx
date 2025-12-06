// app/layout.tsx
import "./globals.css";
import type { Metadata } from "next";
import { ReactNode } from "react";
import { Navbar } from "@/components/Navbar";

export const metadata: Metadata = {
  title: "ARMMAX Handyman & Painting in Orange County",
  description:
    "Family-owned handyman, painting, furniture assembly and gazebo installation in Orange County, CA. Quality work, fair prices, free estimates.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  const phone = process.env.ARM_MAX_PHONE || "+1628279622"; // из .env

  return (
    <html lang="en">
      <body className="min-h-screen bg-white text-slate-900">
        <Navbar phone={phone} />
        <main>{children}</main>
      </body>
    </html>
  );
}
