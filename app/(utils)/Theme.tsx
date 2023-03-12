'use client';
import { useState, useEffect, useContext, createContext } from "react";


const saved = 'bubblebee';
const ThemeContext = createContext(saved);
const ToggleThemeContext = createContext((theme:string)=>{});

export function useTheme(){
  return useContext(ThemeContext)
}

export function useToggleTheme(){
  return useContext(ToggleThemeContext)
}

export default function ThemeProvider({children}:{children: React.ReactNode}) {
  // const saved = localStorage.getItem('theme') || 'bubblebee';  
  const [theme, setTheme] = useState('bubblebee');
  useEffect(() => {
    setTheme(localStorage.getItem('theme') || 'bubblebee')
  }, [])

  const toggleTheme = (theme:string) => {
    if (theme == 'bubblebee') {
      setTheme('dark');
      localStorage.setItem('theme', 'dark');
    }
    else {
      setTheme('bubblebee');
      localStorage.setItem('theme', 'bubblebee')
    }
  }

  return (
    <ThemeContext.Provider value={theme}>
    <ToggleThemeContext.Provider value={toggleTheme}>
    <body data-theme={theme} className="min-h-screen">
      {children}
    </body>  
    </ToggleThemeContext.Provider>
    </ThemeContext.Provider>
  )
}