import localFont from "next/font/local";
import "./globals.css";
import Header from "@components/Header";
import Footer from "@components/Footer";
import { ReactNode } from "react";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "Track builder",
  description: "Create and share your tracks",
};

export default function RootLayout({ children }: { children:  ReactNode}) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="flex flex-col gap-2 bg-black justify-between relative min-h-screen overflow-auto">
          <Header />
          <main
            className="w-full mx-5 lg:mx-auto min-h-[80vh] flex justify-center items-center"
            style={{ backgroundColor: "var(--color-purple)" }}
          >
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
