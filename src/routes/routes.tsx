import App from '../App';
import SignIn from '../pages/Authentication/SignIn';
import SignUp from '../pages/Authentication/SignUp';
import Community from '../pages/Community';
import LandingPage from '../pages/LandingPage/LandingPage';
import NotFound from '../pages/NotFound';
import RecipeSummary from '../pages/Recipe/RecipeSummary';
import RecipeDiscovery from '../pages/Recipe/RecipeDiscovery';
import RecipeDetail from '../pages/Recipe/RecipeDetail';

export const appRoutes = [
    {
        path: '/',
        element: <App />,
        children: [
            { index: true, element: <LandingPage /> },
            { path: 'recipe', element: <RecipeSummary /> },
            { path: 'recipe/discovery', element: <RecipeDiscovery /> },
            { path: 'recipe/:id', element: <RecipeDetail /> },
            { path: 'community', element: <Community /> }
        ]
    },
    { path: '/sign-in', element: <SignIn /> },
    { path: '/sign-up', element: <SignUp /> },
    { path: '*', element: <NotFound /> }
];
