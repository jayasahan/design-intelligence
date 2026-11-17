import { createTheme } from '@mui/material/styles'

export const theme = createTheme({
  palette: {
    mode: 'light',
    primary: { main: '#176b87', dark: '#0f4d63', contrastText: '#ffffff' },
    secondary: { main: '#d97742', contrastText: '#ffffff' },
    background: { default: '#f5f7f9', paper: '#ffffff' },
    text: { primary: '#172b3a', secondary: '#526575' },
    success: { main: '#25855a' },
    warning: { main: '#a86112' },
    error: { main: '#b23a48' },
  },
  typography: {
    fontFamily: 'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    h1: { fontSize: 'clamp(1.8rem, 2.8vw, 2.5rem)', fontWeight: 750, letterSpacing: '-0.035em', lineHeight: 1.1 },
    h2: { fontSize: '1.35rem', fontWeight: 700, letterSpacing: '-0.02em' },
    h3: { fontSize: '1rem', fontWeight: 700 },
    body1: { fontSize: '0.95rem' },
    body2: { fontSize: '0.84rem' },
    button: { textTransform: 'none', fontWeight: 700 },
  },
  shape: { borderRadius: 12 },
  components: {
    MuiButton: { defaultProps: { disableRipple: true }, styleOverrides: { root: { minHeight: 42, borderRadius: 10, paddingInline: 16 } } },
    MuiIconButton: { styleOverrides: { root: { borderRadius: 10 } } },
    MuiCard: { styleOverrides: { root: { border: '1px solid #e3e9ee', boxShadow: '0 8px 24px rgba(23, 43, 58, 0.05)' } } },
    MuiOutlinedInput: { styleOverrides: { root: { borderRadius: 10 } } },
    MuiChip: { styleOverrides: { root: { fontWeight: 700 } } },
  },
})
