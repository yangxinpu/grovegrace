import { create } from 'zustand'

type Theme = 'light' | 'dark' | 'system'

interface ThemeState {
  theme: Theme
  resolved: 'light' | 'dark'
  setTheme: (theme: Theme) => void
}

const STORAGE_KEY = 'grovegrace-theme'

function getSystemPreference(): 'light' | 'dark' {
  if (typeof window === 'undefined') return 'dark'
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

function resolveTheme(theme: Theme): 'light' | 'dark' {
  return theme === 'system' ? getSystemPreference() : theme
}

function applyToDOM(resolved: 'light' | 'dark') {
  const root = document.documentElement
  root.classList.toggle('dark', resolved === 'dark')
}

function readStoredTheme(): Theme {
  if (typeof window === 'undefined') return 'system'
  const stored = localStorage.getItem(STORAGE_KEY)
  if (stored === 'light' || stored === 'dark' || stored === 'system') return stored
  return 'system'
}

export const useTheme = create<ThemeState>((set) => {
  const initial = readStoredTheme()
  const resolved = resolveTheme(initial)

  if (typeof window !== 'undefined') {
    applyToDOM(resolved)
  }

  return {
    theme: initial,
    resolved,
    setTheme: (theme) => {
      const resolved = resolveTheme(theme)
      localStorage.setItem(STORAGE_KEY, theme)
      applyToDOM(resolved)
      set({ theme, resolved })
    },
  }
})

if (typeof window !== 'undefined') {
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
    const state = useTheme.getState()
    if (state.theme === 'system') {
      const resolved = getSystemPreference()
      applyToDOM(resolved)
      useTheme.setState({ resolved })
    }
  })
}
