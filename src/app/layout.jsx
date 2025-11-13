import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import React from 'react';
import Footer from "./components/Footer";
import ConditionalNavbar from "./components/ConditionalNavbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Yala Cafe - Authentic flavors, unforgettable dining experience",
  description: "Yala Cafe is a good restaurant serving authentic flavors with warm hospitality",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ConditionalNavbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}