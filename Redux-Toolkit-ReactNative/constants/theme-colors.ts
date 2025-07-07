// Light theme color palette
export const LightThemeColors = {
  primary: '#3498db',
  secondary: '#2ecc71',
  background: '#ffffff',
  card: '#f8f9fa',
  text: '#333333',
  border: '#e0e0e0',
  notification: '#ff3b30',
  success: '#27ae60',
  warning: '#f39c12',
  error: '#e74c3c',
};

// Dark theme color palette
export const DarkThemeColors = {
  primary: '#2980b9',
  secondary: '#27ae60',
  background: '#121212',
  card: '#1e1e1e',
  text: '#f5f5f5',
  border: '#333333',
  notification: '#ff453a',
  success: '#2ecc71',
  warning: '#f1c40f',
  error: '#c0392b',
};

export type AppTheme = 'light' | 'dark' | 'system';
export type ThemeColors = typeof LightThemeColors;