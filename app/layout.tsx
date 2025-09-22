import "./globals.css";
import type { Metadata } from "next";
import { Toaster } from "react-hot-toast";
import { Open_Sans, Roboto_Mono } from 'next/font/google'
import { Geist, Geist_Mono,Inter } from "next/font/google";

import {
  ClerkProvider
} from '@clerk/nextjs'

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const inter = Inter({
  subsets :["latin"],
  weight: '400',
  variable : '--font-inter'
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const openSans = Open_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-opensans',
})

const robotoMono = Roboto_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-roboto-mono',
})

export const metadata: Metadata = {
  title: "buildyourhackathonteam",
  description: "find peers for hackathons.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${openSans.variable} ${robotoMono.variable} ${geistMono.variable} ${inter.variable} antialiased`}
        >
          <Toaster position="top-center" toastOptions={{ className:'bg-black px-8 text-xs text-white rounded shadow' }} />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
