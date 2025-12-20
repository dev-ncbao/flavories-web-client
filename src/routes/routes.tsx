import App from '../App';
import SignIn from '../pages/Authentication/SignIn';
import SignUp from '../pages/Authentication/SignUp';
import CourseSummary from '../pages/CourseSummary/CourseSummary';
import LandingPage from '../pages/LandingPage/LandingPage';
import NotFound from '../pages/NotFound';
import RecipeSummary from '../pages/RecipeSummary/RecipeSummary';
import RecipeDiscovery from '../pages/RecipeSummary/RecipeDiscovery';
import RecipeDetail from '../pages/RecipeDetail/RecipeDetail';
import CourseDetail from '../pages/CourseDetail/CourseDetail';
import AdminLogin from '../pages/Admin/AdminLogin';
import PaymentCallback from '../pages/Payment/PaymentCallback';

export const appRoutes = [
    {
        path: '/',
        element: <App />,
        children: [
            { index: true, element: <LandingPage /> },
            { path: 'recipe/summary', element: <RecipeSummary /> },
            { path: 'recipe/discovery', element: <RecipeDiscovery /> },
            { path: 'recipe/:id/detail', element: <RecipeDetail /> },
            { path: 'course/summary', element: <CourseSummary /> },
            { path: 'course/:id/detail', element: <CourseDetail /> },
            { path: 'payment/success', element: <PaymentCallback /> },
            { path: 'payment/cancel', element: <PaymentCallback /> }
        ]
    },
    { path: '/sign-in', element: <SignIn /> },
    { path: '/sign-up', element: <SignUp /> },
    { path: '/admin/login', element: <AdminLogin /> },
    { path: '*', element: <NotFound /> }
];
