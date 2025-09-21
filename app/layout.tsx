import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import { Analytics } from '@vercel/analytics/next'
import { ThemeProvider } from '@/components/theme-provider'
import './globals.css'

export const metadata: Metadata = {
  title: 'ArcBuilder - AI-Powered Website Generator',
  description: 'Transform your ideas into production-ready React applications with AI-powered scaffolding. From brief to deployment in minutes.',
  generator: 'ArcBuilder',
  keywords: ['AI', 'website generator', 'React', 'Next.js', 'Tailwind CSS', 'shadcn/ui'],
  authors: [{ name: 'ArcBuilder Team' }],
  creator: 'ArcBuilder',
  publisher: 'ArcBuilder',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://arcbuilder.com'),
  openGraph: {
    title: 'ArcBuilder - AI-Powered Website Generator',
    description: 'Transform your ideas into production-ready React applications with AI-powered scaffolding.',
    url: 'https://arcbuilder.com',
    siteName: 'ArcBuilder',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'ArcBuilder - AI-Powered Website Generator',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ArcBuilder - AI-Powered Website Generator',
    description: 'Transform your ideas into production-ready React applications with AI-powered scaffolding.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
