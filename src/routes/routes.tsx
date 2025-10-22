import Community from '../pages/Community';
import LandingPage from '../pages/LandingPage/LandingPage';
import NotFound from '../pages/NotFound';
import Recipe from '../pages/Recipe';

export const appRoutes = [
    { path: '/', label: 'Home', element: <LandingPage /> },
    { path: '/recipe', label: 'Recipe', element: <Recipe /> },
    { path: '/community', label: 'Community', element: <Community /> },
    { path: '*', label: 'Not Found', element: <NotFound /> }
];