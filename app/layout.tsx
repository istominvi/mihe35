import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });
const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? ''
const withBase = (path: string) => `${BASE_PATH}${path}`

export const metadata: Metadata = {
  title: 'С Днём Рождения, Миша! 🎉',
  description: 'Поздравительная открытка для Миши с 35-летием!',
  generator: 'v0.app',
  icons: {
    icon: withBase('/favicon.png'),
    shortcut: withBase('/favicon.png'),
    apple: withBase('/apple-icon.png'),
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  )
}
