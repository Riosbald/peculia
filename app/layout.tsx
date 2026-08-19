import type React from "react"
import type { Metadata } from "next"
import "@fontsource/inter/400.css"
import "@fontsource/inter/500.css"
import "@fontsource/inter/600.css"
import "@fontsource/inter/700.css"
import "@fontsource/space-mono/400.css"
import "@fontsource/space-mono/700.css"
import "./globals.css"
import { Web3Provider } from "@/components/providers/web3-provider"
import { ThemeProvider } from "@/components/theme-provider"
import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"

export const metadata: Metadata = {
  title: "Peculia | Multi-Chain Web3 Platform",
  description:
    "Decentralized prediction markets, token pitching, and quadratic governance across multiple blockchains.",
  generator: "v0.dev",
  themeColor: "#000000",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5, viewport-fit=cover" />
        <meta name="theme-color" content="#000000" />
        <meta name="color-scheme" content="dark" />
      </head>
      <body className="font-sans min-h-screen bg-black text-white flex flex-col touch-manipulation">
        <ThemeProvider>
          <Web3Provider>
            <div className="flex flex-col min-h-screen">
              <Header />
              <main className="flex-1">{children}</main>
              <Footer />
            </div>
          </Web3Provider>
        </ThemeProvider>
      </body>
    </html>
  )
}
