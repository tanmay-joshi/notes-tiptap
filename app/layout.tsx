import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import AuthProvider from './context/AuthProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'TipTap Notes',
  description: 'Create notes with TipTap and Next.js',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html data-theme="cupcake" lang="en">
      <body className={inter.className}>
        <AuthProvider>
          {children}
        </AuthProvider>
        </body>
    </html>
  )
}
