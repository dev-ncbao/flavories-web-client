import App from '../App';
import SignIn from '../pages/Authentication/SignIn';
import SignUp from '../pages/Authentication/SignUp';
import Community from '../pages/Community';
import LandingPage from '../pages/LandingPage/LandingPage';
import NotFound from '../pages/NotFound';
import RecipePage from '../pages/Recipe/RecipePage';

export const appRoutes = [
    {
        path: '/',
        element: <App />,
        children: [
            { index: true, element: <LandingPage /> },
            { path: 'recipe', element: <RecipePage /> },
            { path: 'community', element: <Community /> }
        ]
    },
    { path: '/sign-in', element: <SignIn /> },
    { path: '/sign-up', element: <SignUp /> },
    { path: '*', element: <NotFound /> }
];
