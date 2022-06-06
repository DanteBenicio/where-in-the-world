import React, { createContext, useEffect, useState } from 'react'

interface AppContextType {
  themeMode: 'light' | 'dark' | string
  setThemeMode: React.Dispatch<React.SetStateAction<string>>
  selectedRegion: 'Africa' | 'Americas' | 'Asia' | 'Europe' | 'Oceania' | string
  setSelectedRegion: React.Dispatch<
    React.SetStateAction<
      'Africa' | 'Americas' | 'Asia' | 'Europe' | 'Oceania' | string
    >
  >
}

interface ContextProviderProps {
  children: React.ReactNode
}

export const AppContext = createContext<AppContextType>({
  themeMode: '',
  setThemeMode: () => {},
})

export function ContextProvider({ children }: ContextProviderProps) {
  const [themeMode, setThemeMode] = useState<string>('')

  useEffect(() => {
    if (!themeMode) {
      setThemeMode(localStorage.getItem('themeMode') || 'light')
      return
    }

    if (themeMode === 'light') {
      document.documentElement.classList.add('dark')
      localStorage.setItem('themeMode', 'dark')
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('themeMode', 'light')
    }
  }, [themeMode])

  return (
    <AppContext.Provider value={{ themeMode, setThemeMode }}>
      {children}
    </AppContext.Provider>
  )
}
