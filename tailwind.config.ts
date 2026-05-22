import type { Config } from 'tailwindcss'

export default {
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          a: 'var(--color-brand-a)',
          b: 'var(--color-brand-b)',
          'a-hover': 'var(--color-brand-a-hover)',
          'b-hover': 'var(--color-brand-b-hover)',
        },
        hover: 'var(--color-hover)',
        highlight: 'var(--color-highlight)',
      },
    },
  },
} satisfies Config
