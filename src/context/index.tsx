/* eslint-disable no-undef */
import React, {
  createContext, useEffect, useMemo, useState,
} from 'react';

interface AppContextType {
  themeMode: 'light' | 'dark' | string
  setThemeMode: React.Dispatch<React.SetStateAction<string>>
  selectedRegion: 'Africa' | 'Americas' | 'Asia' | 'Europe' | 'Oceania' | string
  setSelectedRegion: React.Dispatch<
    React.SetStateAction<
      'Africa' | 'Americas' | 'Asia' | 'Europe' | 'Oceania' | string
    >
  >
  countries: CountryInformations[] | undefined
  setCountries: React.Dispatch<
    React.SetStateAction<CountryInformations[] | undefined>
  >
  setWaitCursor: React.Dispatch<React.SetStateAction<boolean>>
  waitCursor: boolean
}

interface ContextProviderProps {
  children: React.ReactNode
}

export const AppContext = createContext<AppContextType>({
  countries: undefined,
  themeMode: '',
  selectedRegion: '',
  waitCursor: false,
  setCountries: () => {},
  setThemeMode: () => {},
  setSelectedRegion: () => {},
  setWaitCursor: () => {},
})

export function ContextProvider({ children }: ContextProviderProps) {
  const [themeMode, setThemeMode] = useState<string>('')
  const [selectedRegion, setSelectedRegion] = useState<
    'Africa' | 'Americas' | 'Asia' | 'Europe' | 'Oceania' | 'All Countries' | string
  >('');
  const [countries, setCountries] = useState<CountryInformations[]>();
  const [waitCursor, setWaitCursor] = useState<boolean>(false);

  useEffect(() => {
    if (waitCursor) {
      document.documentElement.style.cursor = 'wait'
    } else {
      document.documentElement.style.cursor = 'auto'
    }
  })

  useEffect(() => {
    if (!themeMode) {
      setThemeMode(localStorage.getItem('themeMode') || 'light')
      return
    }

    if (themeMode === 'light') {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('themeMode', 'light')
    } else {
      document.documentElement.classList.add('dark')
      localStorage.setItem('themeMode', 'dark')
    }
  }, [themeMode])

  const AppContextValue = useMemo(() => ({
    themeMode,
    countries,
    waitCursor,
    selectedRegion,
    setWaitCursor,
    setThemeMode,
    setSelectedRegion,
    setCountries,
  }), [themeMode, countries, waitCursor, selectedRegion]);

  return (
    <AppContext.Provider
      value={AppContextValue}
    >
      {children}
    </AppContext.Provider>
  );
}
