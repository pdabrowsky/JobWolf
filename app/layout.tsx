import { cn } from '@/lib/utils'
import './globals.css'
import type { Metadata } from 'next'
import { Open_Sans } from 'next/font/google'

const font = Open_Sans({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'JobWolf',
  description: 'Discover and apply for top job opportunities with JobWolf.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={cn(font.className, 'bg-dark')}>{children}</body>
    </html>
  )
}
