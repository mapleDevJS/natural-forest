import type {Metadata} from "next";
import localFont from "next/font/local";
import "./globals.css";
import {ReactNode} from "react";

interface Props {
    children: ReactNode
}

const kamerik = localFont({
    src: '../public/fonts/kamerik205-heavy.woff2',
    variable: '--font-kamerik'
})
const merriWeather = localFont({
    src: '../public/fonts/merriweather-regular-italic.woff2',
    variable: '--font-merriweather'
})

export const metadata: Metadata = {
    title: "Natural Forest",
    description: "3D Lens Effect",
};

export default function RootLayout({children}: Readonly<Props>) {
    return (
        <>
            <html lang="en">
            <body className={`${kamerik.variable} ${merriWeather.variable}`}>{children}</body>
            </html>
        </>
    );
}
