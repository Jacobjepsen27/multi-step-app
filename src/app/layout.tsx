import './globals.css'
import type { Metadata } from 'next'
import localFont from 'next/font/local'


const ubuntu = localFont({
  src: [
    {
      path: '../fonts/Ubuntu-Regular.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../fonts/Ubuntu-Medium.ttf',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../fonts/Ubuntu-Bold.ttf',
      weight: '700',
      style: 'normal',
    },
  ],
})

export const metadata: Metadata = {
  title: 'Multi step app',
  description: 'Coding challenge',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={ubuntu.className}>{children}</body>
    </html>
  )
}
