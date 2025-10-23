import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '@fontsource-variable/inter';
import { BrowserRouter } from 'react-router';
import { CssVarsProvider, CssBaseline, GlobalStyles } from '@mui/joy';
import { theme } from './theme.ts';
import AppRoutes from './routes/AppRoutes.tsx';

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
                        },
                        'input::-ms-reveal, input::-ms-clear ': {
                            display: 'none'
                        }
                    }}
                />
                {/* The rest of your application */}
                <AppRoutes />
            </CssVarsProvider>
        </BrowserRouter>
    </StrictMode>
);
