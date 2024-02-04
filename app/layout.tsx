import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ReactNode } from "react";

interface Props {
  children: ReactNode
}

const kamerik = localFont({
  src: [
    {
      path: '../public/fonts/kamerik205-heavy.woff2',
      weight: '900',
    },
    // {
    //   path: '../public/fonts/merriweather-regular-italic.woff2',
    //   weight: '400',
    // },
  ],
});

export const metadata: Metadata = {
  title: "Natural Forest",
  description: "3D Lens Effect",
};

export default function RootLayout({children}: Readonly<Props>) {
  return (
    <>
      <html lang="en">
        <body className={kamerik.className}>{children}</body>
      </html>
    </>
  );
}
