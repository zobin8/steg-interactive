import type { Metadata } from "next";
import { Roboto, Roboto_Mono } from "next/font/google";
import "./globals.css";
import Footer from "@/app/ui/footer";
import Header from "@/app/ui/header";

const robotoSans = Roboto({
  variable: "--font-roboto-sans",
  subsets: ["latin"],
});

const robotoMono = Roboto_Mono({
  variable: "--font-roboto-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Steg Interactive",
  description: "A collection of interactive playgrounds to learn about steganography and cryptography techniques throughout history.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${robotoSans.variable} ${robotoMono.variable} antialiased`}
      >
        <div className="flex flex-col min-h-screen">
          <Header></Header>
          <div className="grow">
          {children}
          </div>
          <Footer></Footer>
        </div>
      </body>
    </html>
  );
}
