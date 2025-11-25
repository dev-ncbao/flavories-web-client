import App from '../App';
import SignIn from '../pages/Authentication/SignIn';
import SignUp from '../pages/Authentication/SignUp';
import Community from '../pages/Community';
import LandingPage from '../pages/LandingPage/LandingPage';
import NotFound from '../pages/NotFound';
import RecipeSummaryPage from '../pages/Recipe/RecipeSummaryPage';
import NewRecipeList from '../pages/Recipe/NewRecipeList';
import MostPopularRecipeList from '../pages/Recipe/MostPopularRecipeList';
import TrendingRecipeList from '../pages/Recipe/TrendingRecipeList';

export const appRoutes = [
    {
        path: '/',
        element: <App />,
        children: [
            { index: true, element: <LandingPage /> },
            { path: 'recipe', element: <RecipeSummaryPage /> },
            { path: 'recipe/new', element: <NewRecipeList /> },
            { path: 'recipe/popular', element: <MostPopularRecipeList /> },
            { path: 'recipe/trending', element: <TrendingRecipeList /> },
            { path: 'community', element: <Community /> }
        ]
    },
    { path: '/sign-in', element: <SignIn /> },
    { path: '/sign-up', element: <SignUp /> },
    { path: '*', element: <NotFound /> }
];
