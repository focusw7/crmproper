import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Sidebar } from '@/components/layout/sidebar'
import { ToasterProvider } from '@/components/providers/toaster-provider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'CRM',
  description: 'CRM Application',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ToasterProvider />
        <div className="relative flex min-h-screen">
          <div className="hidden md:flex md:w-72 md:flex-col md:fixed md:inset-y-0 z-[80] bg-gray-900">
            <Sidebar />
          </div>
          <main className="md:pl-72 flex-1">
            {children}
          </main>
        </div>
      </body>
    </html>
  )
}
