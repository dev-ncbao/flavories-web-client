import App from '../App';
import SignIn from '../pages/Authentication/SignIn';
import SignUp from '../pages/Authentication/SignUp';
import CourseSummary from '../pages/CourseSummary/CourseSummary';
import LandingPage from '../pages/LandingPage/LandingPage';
import NotFound from '../pages/NotFound';
import RecipeSummary from '../pages/RecipeSummary/RecipeSummary';
import RecipeDiscovery from '../pages/RecipeSummary/RecipeDiscovery';
import RecipeDetail from '../pages/RecipeDetail/RecipeDetail';

export const appRoutes = [
    {
        path: '/',
        element: <App />,
        children: [
            { index: true, element: <LandingPage /> },
            { path: 'recipe/summary', element: <RecipeSummary /> },
            { path: 'recipe/discovery', element: <RecipeDiscovery /> },
            { path: 'recipe/:id/detail', element: <RecipeDetail /> },
            // { path: 'course', element: <Community /> }
            { path: 'course/summary', element: <CourseSummary /> }
        ]
    },
    { path: '/sign-in', element: <SignIn /> },
    { path: '/sign-up', element: <SignUp /> },
    { path: '*', element: <NotFound /> }
];
