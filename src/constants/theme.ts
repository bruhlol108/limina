// Limina App Theme

export const Colors = {
  // Primary brand colors
  primary: '#6C63FF',      // Purple - main brand color
  primaryDark: '#5A52D5',
  primaryLight: '#8F88FF',

  // Secondary colors
  secondary: '#FF6584',    // Coral pink for accents
  secondaryDark: '#E5486C',
  secondaryLight: '#FF8BA0',

  // Success/Warning/Error
  success: '#4CAF50',
  warning: '#FFC107',
  error: '#F44336',

  // Neutral colors
  background: '#F8F9FA',
  surface: '#FFFFFF',
  border: '#E0E0E0',
  text: '#212121',
  textSecondary: '#757575',
  textLight: '#9E9E9E',

  // Spending comparison colors
  spendingAbove: '#FF6584',    // Spending more than peers
  spendingBelow: '#4CAF50',    // Spending less than peers
  spendingSimilar: '#FFC107',  // Similar to peers
};

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const Typography = {
  h1: {
    fontSize: 32,
    fontWeight: '700' as const,
    lineHeight: 40,
  },
  h2: {
    fontSize: 24,
    fontWeight: '700' as const,
    lineHeight: 32,
  },
  h3: {
    fontSize: 20,
    fontWeight: '600' as const,
    lineHeight: 28,
  },
  body: {
    fontSize: 16,
    fontWeight: '400' as const,
    lineHeight: 24,
  },
  bodyBold: {
    fontSize: 16,
    fontWeight: '600' as const,
    lineHeight: 24,
  },
  caption: {
    fontSize: 14,
    fontWeight: '400' as const,
    lineHeight: 20,
  },
  small: {
    fontSize: 12,
    fontWeight: '400' as const,
    lineHeight: 16,
  },
};

export const BorderRadius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  round: 9999,
};

export const Shadows = {
  small: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  medium: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  large: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 8,
  },
};
