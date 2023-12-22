import { Inter } from 'next/font/google'
import './globals.css'
import { NextAuthProvider } from './Providers'
import Head from 'next/head'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Head>
        {/* Add the font link */}
        <link href='https://fonts.googleapis.com/css?family=Lexend+Deca' rel='stylesheet' />
      </Head>
      <NextAuthProvider>
        <body className={inter.className}>{children}</body>
      </NextAuthProvider>
    </html>
  )
}
