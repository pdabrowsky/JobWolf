import './globals.css'
import type { Metadata } from 'next'
import SessionProvider from '@/components/atoms/SessionProvider/SessionProvider'
import { getServerSession } from 'next-auth'
import { Navbar } from '@/components/molecules/Navbar'
import { authOptions } from './api/auth/[...nextauth]/route'
import { ToastContainerWrapper } from '@/components/atoms/ToastContainer'
import { EdgeStoreProvider } from '../lib/edgestore'

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
    <html
      lang="en"
      className="scrollbar-thin scrollbar-thumb-rounded-full scrollbar-thumb-darkGray scrollbar-track-neutral-900"
    >
      <body className="bg-dark text-gray font-sans">
        <SessionProvider session={session}>
          <EdgeStoreProvider>
            <Navbar />
            {children}
            <ToastContainerWrapper />
          </EdgeStoreProvider>
        </SessionProvider>
      </body>
    </html>
  )
}
