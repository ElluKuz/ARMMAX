import "./globals.css";
import type { Metadata } from "next";
import { ReactNode } from "react";
import { Navbar } from "@/components/Navbar";
import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "ARMMAX Handyman & Painting in Orange County",
  description:
    "Family-owned handyman, painting, furniture assembly and gazebo installation in Orange County, CA. Quality work, fair prices, free estimates.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  const phone = process.env.ARM_MAX_PHONE || "+1628279622";

  return (
    <html lang="en">
      <body className={cn("min-h-screen bg-white text-slate-900", poppins.className)}>
        <Navbar phone={phone} />
        <main>{children}</main>
      </body>
    </html>
  );
}
