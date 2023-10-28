import { cn } from '@/lib/utils'
import './globals.css'
import type { Metadata } from 'next'
import { Open_Sans } from 'next/font/google'
import SessionProvider from '@/components/SessionProvider/SessionProvider'
import { getServerSession } from 'next-auth'
import { Navbar } from '@/components/Navbar'
import { authOptions } from './api/auth/[...nextauth]/route'

const font = Open_Sans({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'JobWolf',
  description: 'Discover and apply for top job opportunities with JobWolf.',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession(authOptions)
  return (
    <html lang="en">
      <body className={cn(font.className, 'bg-dark')}>
        <SessionProvider session={session}>
          <Navbar />
          {children}
        </SessionProvider>
      </body>
    </html>
  )
}
