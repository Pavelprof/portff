import './globals.css'
import { Inter } from 'next/font/google'
import { TheHeader } from '@/components/TheHeader'
import { TheFooter } from '@/components/TheFooter'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Portff main',
  description: 'All the levels of a structure of your investment portfolio',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <TheHeader />
        <maim className="container">{children}</maim>
        <TheFooter />
      </body>
    </html>
  )
}
