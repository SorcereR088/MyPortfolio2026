import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import SmoothScroll from "@/components/SmoothScroll";
import ContactDrawerProvider from "@/components/layout/ContactDrawerProvider";
import MotionProvider from "@/components/motion/MotionProvider";
import Navbar from "@/components/layout/Navbar";
import "lenis/dist/lenis.css";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Sachin | UI/UX Designer",
    template: "%s | Sachin",
  },
  description:
    "Portfolio of Sachin, a UI/UX designer crafting clean, user-focused digital experiences.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-dvh flex-col overflow-x-clip">
        <MotionProvider>
          <SmoothScroll>
            <ContactDrawerProvider>
              <a
                href="#main-content"
                className="sr-only rounded bg-[var(--highlight)] px-4 py-2 text-black focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[110]"
              >
                Skip to content
              </a>
              <Navbar />
              <main
                id="main-content"
                className="mx-auto w-full max-w-[1280px] flex-1 px-4 sm:px-6 lg:px-8 xl:px-0"
              >
                {children}
              </main>
            </ContactDrawerProvider>
          </SmoothScroll>
        </MotionProvider>
      </body>
    </html>
  );
}