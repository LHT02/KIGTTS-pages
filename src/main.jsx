import React from 'react';
import ReactDOM from 'react-dom/client';
import { CssBaseline, GlobalStyles, ThemeProvider } from '@mui/material';
import '@fontsource/google-sans/latin-400.css';
import '@fontsource/google-sans/latin-500.css';
import '@fontsource/google-sans/latin-700.css';
import '@fontsource/material-symbols-sharp/400.css';
import '@fontsource/noto-sans-sc/400.css';
import '@fontsource/noto-sans-sc/500.css';
import '@fontsource/noto-sans-sc/700.css';
import App from './App';
import { theme } from './theme';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <GlobalStyles
        styles={{
          ':root': {
            colorScheme: 'dark',
            '--glow-x': '70vw',
            '--glow-y': '80vh',
          },
          '.material-symbols-sharp': {
            fontFamily: '"Material Symbols Sharp"',
            fontWeight: 400,
            fontStyle: 'normal',
            fontSize: '24px',
            lineHeight: 1,
            letterSpacing: 'normal',
            textTransform: 'none',
            display: 'inline-block',
            whiteSpace: 'nowrap',
            wordWrap: 'normal',
            direction: 'ltr',
            WebkitFontSmoothing: 'antialiased',
            fontFeatureSettings: '"liga"',
          },
          html: {
            height: '100%',
            minHeight: '100%',
            overflow: 'hidden',
            touchAction: 'pan-y',
            backgroundColor: '#041011',
          },
          body: {
            width: '100%',
            height: '100%',
            minHeight: '100%',
            margin: 0,
            overflow: 'hidden',
            backgroundColor: '#041011',
            color: '#f5fbfb',
            overscrollBehavior: 'none',
            touchAction: 'pan-y',
          },
          '#root': {
            width: '100%',
            height: '100%',
            minHeight: '100%',
            overflow: 'hidden',
            touchAction: 'pan-y',
          },
          '::selection': {
            backgroundColor: 'rgba(3, 131, 135, 0.35)',
            color: '#f5fbfb',
          },
        }}
      />
      <App />
    </ThemeProvider>
  </React.StrictMode>,
);
