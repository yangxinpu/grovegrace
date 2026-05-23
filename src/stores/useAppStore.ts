import { create } from 'zustand'

interface AppState {
  isLoading: boolean
  setLoading: (loading: boolean) => void
  showLoading: () => void
  hideLoading: () => void
}

export const useAppStore = create<AppState>((set) => ({
  isLoading: true,
  setLoading: (loading) => set({ isLoading: loading }),
  showLoading: () => set({ isLoading: true }),
  hideLoading: () => set({ isLoading: false }),
}))
