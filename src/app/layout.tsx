import { type Metadata } from 'next'
import { Inter } from 'next/font/google'
import localFont from 'next/font/local'
import clsx from 'clsx'

import { Providers } from '@/app/providers'

import '@/styles/tailwind.css'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

const monaSans = localFont({
  src: '../fonts/Mona-Sans.var.woff2',
  display: 'swap',
  variable: '--font-mona-sans',
  weight: '200 900',
})

const koulen = localFont({
  src: '../fonts/Koulen-Regular.ttf',
  display: 'swap',
  variable: '--font-koulen-regular',
  weight: '200 900',
})

export const metadata: Metadata = {
  title: 'Dumb Pipe',
  description: 'Iroh connections are dumb pipes: easy, direct connections that punch through NATs & stay connected as network conditions change.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={clsx('h-full antialiased', inter.variable, koulen.variable)}
      suppressHydrationWarning
    >
      <body className="flex min-h-full flex-col bg-white dark:bg-gray-950">
        <Providers>{children}</Providers>
        <script defer data-domain="dumbpipe.dev" src="https://plausible.io/js/script.js"></script>
      </body>
    </html>
  )
}
