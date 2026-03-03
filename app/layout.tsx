import type { Metadata } from 'next'
import { CommerceProvider } from '@logiteria/commerce-sdk/react'
import { commerceConfig } from '@/lib/commerce'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import '@/styles/globals.css'

export const metadata: Metadata = {
  title: 'Store | Powered by Logiteria Commerce',
  description: 'Modern headless commerce storefront',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen flex flex-col">
        <CommerceProvider config={commerceConfig}>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </CommerceProvider>
      </body>
    </html>
  )
}
