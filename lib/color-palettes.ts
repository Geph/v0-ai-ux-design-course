export interface ColorPalette {
  id: string
  name: string
  preview: string[] // 4 preview colors
  light: {
    background: string
    foreground: string
    card: string
    cardForeground: string
    primary: string
    primaryForeground: string
    secondary: string
    secondaryForeground: string
    muted: string
    mutedForeground: string
    accent: string
    accentForeground: string
    border: string
    input: string
    ring: string
  }
  dark: {
    background: string
    foreground: string
    card: string
    cardForeground: string
    primary: string
    primaryForeground: string
    secondary: string
    secondaryForeground: string
    muted: string
    mutedForeground: string
    accent: string
    accentForeground: string
    border: string
    input: string
    ring: string
  }
}

export const colorPalettes: ColorPalette[] = [
  {
    id: "vibrant-blue",
    name: "Vibrant Blue",
    preview: ["#4f46e5", "#f59e0b", "#06b6d4", "#f8fafc"],
    light: {
      background: "oklch(0.98 0.005 85)",
      foreground: "oklch(0.18 0.02 260)",
      card: "oklch(1 0 0)",
      cardForeground: "oklch(0.18 0.02 260)",
      primary: "oklch(0.55 0.22 250)",
      primaryForeground: "oklch(1 0 0)",
      secondary: "oklch(0.92 0.03 85)",
      secondaryForeground: "oklch(0.25 0.02 260)",
      muted: "oklch(0.94 0.01 85)",
      mutedForeground: "oklch(0.45 0.02 260)",
      accent: "oklch(0.75 0.18 40)",
      accentForeground: "oklch(0.18 0.02 260)",
      border: "oklch(0.88 0.02 260)",
      input: "oklch(0.92 0.01 260)",
      ring: "oklch(0.55 0.22 250)",
    },
    dark: {
      background: "oklch(0.15 0.02 260)",
      foreground: "oklch(0.96 0.01 85)",
      card: "oklch(0.20 0.02 260)",
      cardForeground: "oklch(0.96 0.01 85)",
      primary: "oklch(0.65 0.22 250)",
      primaryForeground: "oklch(0.15 0.02 260)",
      secondary: "oklch(0.28 0.03 260)",
      secondaryForeground: "oklch(0.96 0.01 85)",
      muted: "oklch(0.28 0.02 260)",
      mutedForeground: "oklch(0.65 0.02 260)",
      accent: "oklch(0.80 0.18 40)",
      accentForeground: "oklch(0.15 0.02 260)",
      border: "oklch(0.32 0.02 260)",
      input: "oklch(0.28 0.02 260)",
      ring: "oklch(0.65 0.22 250)",
    },
  },
  {
    id: "coral-sunset",
    name: "Coral Sunset",
    preview: ["#f43f5e", "#fb923c", "#fbbf24", "#fff7ed"],
    light: {
      background: "oklch(0.98 0.01 40)",
      foreground: "oklch(0.20 0.04 15)",
      card: "oklch(1 0 0)",
      cardForeground: "oklch(0.20 0.04 15)",
      primary: "oklch(0.62 0.22 15)",
      primaryForeground: "oklch(1 0 0)",
      secondary: "oklch(0.94 0.03 50)",
      secondaryForeground: "oklch(0.30 0.04 15)",
      muted: "oklch(0.95 0.02 50)",
      mutedForeground: "oklch(0.50 0.03 15)",
      accent: "oklch(0.78 0.15 55)",
      accentForeground: "oklch(0.20 0.04 15)",
      border: "oklch(0.90 0.03 40)",
      input: "oklch(0.93 0.02 40)",
      ring: "oklch(0.62 0.22 15)",
    },
    dark: {
      background: "oklch(0.15 0.03 15)",
      foreground: "oklch(0.96 0.02 50)",
      card: "oklch(0.20 0.03 15)",
      cardForeground: "oklch(0.96 0.02 50)",
      primary: "oklch(0.70 0.20 15)",
      primaryForeground: "oklch(0.15 0.03 15)",
      secondary: "oklch(0.28 0.04 15)",
      secondaryForeground: "oklch(0.96 0.02 50)",
      muted: "oklch(0.28 0.03 15)",
      mutedForeground: "oklch(0.65 0.03 40)",
      accent: "oklch(0.82 0.15 55)",
      accentForeground: "oklch(0.15 0.03 15)",
      border: "oklch(0.32 0.03 15)",
      input: "oklch(0.28 0.03 15)",
      ring: "oklch(0.70 0.20 15)",
    },
  },
  {
    id: "forest-mint",
    name: "Forest Mint",
    preview: ["#059669", "#34d399", "#a7f3d0", "#f0fdf4"],
    light: {
      background: "oklch(0.98 0.01 145)",
      foreground: "oklch(0.20 0.04 145)",
      card: "oklch(1 0 0)",
      cardForeground: "oklch(0.20 0.04 145)",
      primary: "oklch(0.55 0.18 155)",
      primaryForeground: "oklch(1 0 0)",
      secondary: "oklch(0.94 0.04 150)",
      secondaryForeground: "oklch(0.30 0.04 145)",
      muted: "oklch(0.95 0.02 145)",
      mutedForeground: "oklch(0.50 0.04 145)",
      accent: "oklch(0.80 0.12 145)",
      accentForeground: "oklch(0.20 0.04 145)",
      border: "oklch(0.90 0.04 145)",
      input: "oklch(0.93 0.02 145)",
      ring: "oklch(0.55 0.18 155)",
    },
    dark: {
      background: "oklch(0.15 0.03 155)",
      foreground: "oklch(0.96 0.02 145)",
      card: "oklch(0.20 0.03 155)",
      cardForeground: "oklch(0.96 0.02 145)",
      primary: "oklch(0.68 0.16 155)",
      primaryForeground: "oklch(0.15 0.03 155)",
      secondary: "oklch(0.28 0.04 155)",
      secondaryForeground: "oklch(0.96 0.02 145)",
      muted: "oklch(0.28 0.03 155)",
      mutedForeground: "oklch(0.65 0.04 145)",
      accent: "oklch(0.82 0.12 145)",
      accentForeground: "oklch(0.15 0.03 155)",
      border: "oklch(0.32 0.03 155)",
      input: "oklch(0.28 0.03 155)",
      ring: "oklch(0.68 0.16 155)",
    },
  },
  {
    id: "royal-purple",
    name: "Royal Purple",
    preview: ["#7c3aed", "#a855f7", "#c4b5fd", "#faf5ff"],
    light: {
      background: "oklch(0.98 0.01 290)",
      foreground: "oklch(0.20 0.04 290)",
      card: "oklch(1 0 0)",
      cardForeground: "oklch(0.20 0.04 290)",
      primary: "oklch(0.52 0.22 290)",
      primaryForeground: "oklch(1 0 0)",
      secondary: "oklch(0.94 0.04 290)",
      secondaryForeground: "oklch(0.30 0.04 290)",
      muted: "oklch(0.95 0.02 290)",
      mutedForeground: "oklch(0.50 0.04 290)",
      accent: "oklch(0.72 0.16 320)",
      accentForeground: "oklch(0.20 0.04 290)",
      border: "oklch(0.90 0.04 290)",
      input: "oklch(0.93 0.02 290)",
      ring: "oklch(0.52 0.22 290)",
    },
    dark: {
      background: "oklch(0.14 0.04 290)",
      foreground: "oklch(0.96 0.02 290)",
      card: "oklch(0.19 0.04 290)",
      cardForeground: "oklch(0.96 0.02 290)",
      primary: "oklch(0.68 0.20 290)",
      primaryForeground: "oklch(0.14 0.04 290)",
      secondary: "oklch(0.28 0.05 290)",
      secondaryForeground: "oklch(0.96 0.02 290)",
      muted: "oklch(0.28 0.04 290)",
      mutedForeground: "oklch(0.65 0.04 290)",
      accent: "oklch(0.78 0.14 320)",
      accentForeground: "oklch(0.14 0.04 290)",
      border: "oklch(0.32 0.04 290)",
      input: "oklch(0.28 0.04 290)",
      ring: "oklch(0.68 0.20 290)",
    },
  },
  {
    id: "ocean-teal",
    name: "Ocean Teal",
    preview: ["#0891b2", "#22d3ee", "#a5f3fc", "#ecfeff"],
    light: {
      background: "oklch(0.98 0.01 195)",
      foreground: "oklch(0.20 0.04 200)",
      card: "oklch(1 0 0)",
      cardForeground: "oklch(0.20 0.04 200)",
      primary: "oklch(0.58 0.15 195)",
      primaryForeground: "oklch(1 0 0)",
      secondary: "oklch(0.94 0.03 195)",
      secondaryForeground: "oklch(0.30 0.04 200)",
      muted: "oklch(0.95 0.02 195)",
      mutedForeground: "oklch(0.50 0.04 200)",
      accent: "oklch(0.82 0.10 195)",
      accentForeground: "oklch(0.20 0.04 200)",
      border: "oklch(0.90 0.03 195)",
      input: "oklch(0.93 0.02 195)",
      ring: "oklch(0.58 0.15 195)",
    },
    dark: {
      background: "oklch(0.15 0.03 200)",
      foreground: "oklch(0.96 0.02 195)",
      card: "oklch(0.20 0.03 200)",
      cardForeground: "oklch(0.96 0.02 195)",
      primary: "oklch(0.72 0.13 195)",
      primaryForeground: "oklch(0.15 0.03 200)",
      secondary: "oklch(0.28 0.04 200)",
      secondaryForeground: "oklch(0.96 0.02 195)",
      muted: "oklch(0.28 0.03 200)",
      mutedForeground: "oklch(0.65 0.03 195)",
      accent: "oklch(0.85 0.10 195)",
      accentForeground: "oklch(0.15 0.03 200)",
      border: "oklch(0.32 0.03 200)",
      input: "oklch(0.28 0.03 200)",
      ring: "oklch(0.72 0.13 195)",
    },
  },
  {
    id: "midnight-gold",
    name: "Midnight Gold",
    preview: ["#1e293b", "#f59e0b", "#fcd34d", "#0f172a"],
    light: {
      background: "oklch(0.97 0.005 250)",
      foreground: "oklch(0.20 0.02 250)",
      card: "oklch(1 0 0)",
      cardForeground: "oklch(0.20 0.02 250)",
      primary: "oklch(0.28 0.03 250)",
      primaryForeground: "oklch(1 0 0)",
      secondary: "oklch(0.93 0.02 60)",
      secondaryForeground: "oklch(0.28 0.03 250)",
      muted: "oklch(0.94 0.01 250)",
      mutedForeground: "oklch(0.50 0.02 250)",
      accent: "oklch(0.78 0.16 70)",
      accentForeground: "oklch(0.20 0.02 250)",
      border: "oklch(0.88 0.02 250)",
      input: "oklch(0.92 0.01 250)",
      ring: "oklch(0.28 0.03 250)",
    },
    dark: {
      background: "oklch(0.12 0.02 250)",
      foreground: "oklch(0.96 0.01 60)",
      card: "oklch(0.17 0.02 250)",
      cardForeground: "oklch(0.96 0.01 60)",
      primary: "oklch(0.78 0.16 70)",
      primaryForeground: "oklch(0.12 0.02 250)",
      secondary: "oklch(0.25 0.02 250)",
      secondaryForeground: "oklch(0.96 0.01 60)",
      muted: "oklch(0.25 0.02 250)",
      mutedForeground: "oklch(0.65 0.02 60)",
      accent: "oklch(0.82 0.14 70)",
      accentForeground: "oklch(0.12 0.02 250)",
      border: "oklch(0.30 0.02 250)",
      input: "oklch(0.25 0.02 250)",
      ring: "oklch(0.78 0.16 70)",
    },
  },
]

export const PALETTE_STORAGE_KEY = "ux-ai-color-palette"
export const THEME_STORAGE_KEY = "ux-ai-theme-mode"

export function applyPalette(palette: ColorPalette, isDark: boolean) {
  const root = document.documentElement
  const colors = isDark ? palette.dark : palette.light

  root.style.setProperty("--background", colors.background)
  root.style.setProperty("--foreground", colors.foreground)
  root.style.setProperty("--card", colors.card)
  root.style.setProperty("--card-foreground", colors.cardForeground)
  root.style.setProperty("--primary", colors.primary)
  root.style.setProperty("--primary-foreground", colors.primaryForeground)
  root.style.setProperty("--secondary", colors.secondary)
  root.style.setProperty("--secondary-foreground", colors.secondaryForeground)
  root.style.setProperty("--muted", colors.muted)
  root.style.setProperty("--muted-foreground", colors.mutedForeground)
  root.style.setProperty("--accent", colors.accent)
  root.style.setProperty("--accent-foreground", colors.accentForeground)
  root.style.setProperty("--border", colors.border)
  root.style.setProperty("--input", colors.input)
  root.style.setProperty("--ring", colors.ring)
}
