import './globals.css'
import ThemeProvider from '@utils/Theme'
import Toast from '@utils/Toaster'
import { AnalyticsWrapper } from '@utils/analytics';
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'BeeNote',
  description: 'Your online language learning notes',
  viewport: {
    width: 'device-width',
    initialScale: 1,
  },

}

export default function RootLayout({children}:{children: React.ReactNode}) {
  
  return (
    <html lang="en" data-theme="bumblebee">
      <head>
        <link rel="preload" href="/bg1.jpg" as="image" />
        <link rel="preload" href="/bg2.jpg" as="image" />
        <link rel="preload" href="/bg3.jpg" as="image" />
        <link rel="preload" href="/bg4.jpg" as="image" />
        <link rel="icon" href="/logo.png" />
      </head>
        <ThemeProvider>
          <Toast/>
          {children}
          <AnalyticsWrapper />
        </ThemeProvider>
    </html>
  )
}