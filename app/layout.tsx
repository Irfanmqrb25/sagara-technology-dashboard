import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/nav/navbar";
import Sidebar from "@/components/nav/sidebar";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/components/providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Sagara Technology Dashboard",
  description:
    "Sagara Technology dashboard using Next.j, Tailwind CSS, Drizzle, Shadcn UI and Supabase",
  icons: "/images/sagara_red_icon.png",
  authors: [
    {
      name: "Irfan Muqorib",
      url: "https://github.com/Irfanmqrb25",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Toaster />
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <Sidebar />
          <Navbar />
          <div className="lg:ml-[280px] lg:px-10 lg:py-8 lg:w-[calc(100%-280px)] px-3 py-6">
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
