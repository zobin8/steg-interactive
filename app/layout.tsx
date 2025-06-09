import type { Metadata } from "next";
import { Roboto, Roboto_Mono } from "next/font/google";
import "./globals.css";
import Footer from "@/app/ui/footer";
import Header from "@/app/ui/header";
import { createTheme, ThemeModeScript, ThemeProvider } from 'flowbite-react';

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

const customTheme = createTheme({
  sidebar: {
    root: {
      inner: "dark:bg-gray-900"
    }
  }
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <ThemeModeScript />
      </head>
      <body className={`${robotoSans.variable} ${robotoMono.variable} antialiased`}>
        <ThemeProvider theme={customTheme}>
          <div className="flex flex-col min-h-screen">
            <Header></Header>
            <div className="flex grow">
            {children}
            </div>
            <Footer></Footer>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
