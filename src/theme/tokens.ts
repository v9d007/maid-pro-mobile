/**
 * MaidPro Design System Tokens (Pristine Authority)
 * Exact palette, typography, and shape specifications aligned with Stitch designs.
 */

export const colors = {
  primary: {
    DEFAULT: '#005c55',
    container: '#0f766e',
    fixed: '#9cf2e8',
    fixedDim: '#80d5cb',
    dark: '#004842',
    lightTint: '#e6f4f2',
  },
  accent: {
    DEFAULT: '#10b981',
    emerald: '#007952',
    whatsapp: '#25D366',
    softTint: '#e6f9f2',
  },
  surface: {
    DEFAULT: '#f7f9fb',
    containerLowest: '#ffffff',
    containerLow: '#f2f4f6',
    container: '#eceef0',
    containerHigh: '#e6e8ea',
    containerHighest: '#e0e3e5',
  },
  text: {
    primary: '#191c1e',
    secondary: '#565e74',
    tertiary: '#6e7977',
    inverse: '#eff1f3',
  },
  border: {
    default: '#e2e8f0',
    variant: '#bdc9c6',
    activeTeal: '#005c55',
  },
  feedback: {
    error: '#ba1a1a',
    errorContainer: '#ffdad6',
    success: '#007952',
    warning: '#f59e0b',
  },
} as const;

export const spacing = {
  xxs: 2,
  xs: 4,
  sm: 8,
  md: 12,
  base: 16,
  lg: 20,
  xl: 24,
  xxl: 32,
  huge: 48,
} as const;

export const radii = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  full: 9999,
} as const;

export const shadows = {
  soft: {
    shadowColor: '#0f766e',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  card: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
  },
  elevated: {
    shadowColor: '#004842',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.12,
    shadowRadius: 16,
    elevation: 6,
  },
} as const;
