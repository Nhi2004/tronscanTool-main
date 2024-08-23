/* eslint-disable @next/next/no-sync-scripts */
import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Tools',
  description: 'Tools',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className='w-full h-full'>
      <body className={inter.className}>{children}
      <script src="https://kit.fontawesome.com/ea710486df.js" crossOrigin="anonymous"></script>
      </body>
    </html>
  )
}
