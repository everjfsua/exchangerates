import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Exchange Rate Dashboard',
  description: 'Real-time currency exchange rates and conversion calculator',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-gradient-to-br from-blue-50 via-white to-indigo-50 min-h-screen">
        {children}
      </body>
    </html>
  )
}
