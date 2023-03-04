import './globals.css'
import ThemeProvider from '@utils/Theme'
import Toast from '@utils/Toaster'
import { AnalyticsWrapper } from '@utils/analytics';

export default function RootLayout({children}:{children: React.ReactNode}) {
  
  return (
    <html lang="en" data-theme="bumblebee">
      <head/>
        <ThemeProvider>
          <Toast/>
          {children}
          <AnalyticsWrapper />
        </ThemeProvider>
    </html>
  )
}


