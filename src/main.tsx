import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import '@fontsource-variable/inter';
import { BrowserRouter } from 'react-router';
import { CssVarsProvider, CssBaseline, GlobalStyles } from '@mui/joy';
import { theme } from './theme.ts';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <BrowserRouter>
            <CssVarsProvider theme={theme}>
                {/* must be used under CssVarsProvider */}
                <CssBaseline />
                <GlobalStyles
                    styles={{
                        // CSS object styles
                        html: {
                            fontFamily: 'Inter Variable, sans-serif'
                        },
                        body: {
                            backgroundColor: 'var(--background.body)',
                            // 'var(--joy-palette-background-body)',
                            height: '100vh',
                            width: '100vw',

                            '> div#root': {
                                width: 'inherit',
                                height: 'inherit'
                            }
                        }
                    }}
                />
                {/* The rest of your application */}
                <App />
            </CssVarsProvider>
        </BrowserRouter>
    </StrictMode>
);
