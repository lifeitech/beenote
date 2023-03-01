import './globals.css'
import ThemeProvider from '@utils/Theme'
import Toast from '@utils/Toaster'

export default function RootLayout({children}:{children: React.ReactNode}) {
  
  return (
    <html lang="en" data-theme="bumblebee">
      <head/>
        <ThemeProvider>
          <>
          <Toast/>
          {children}
          </>
        </ThemeProvider>
    </html>
  )
}


