"use client";

import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Sidebar } from '@/components/layout/sidebar'
import { Header } from '@/components/layout/header'
import { ToasterProvider } from '@/components/providers/toaster-provider'
import { usePathname } from 'next/navigation'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname();
  const isLoginPage = pathname === '/login';

  return (
    <html lang="en">
      <body className={inter.className}>
        <ToasterProvider />
        <div className="relative flex min-h-screen">
          {!isLoginPage && (
            <div className="hidden md:flex md:w-72 md:flex-col md:fixed md:inset-y-0 z-[80] bg-gray-900">
              <Sidebar />
            </div>
          )}
          <main className={!isLoginPage ? "md:pl-72 flex-1" : "flex-1"}>
            {!isLoginPage && <Header />}
            {children}
          </main>
        </div>
      </body>
    </html>
  )
}
