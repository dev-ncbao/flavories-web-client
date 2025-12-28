import App from '../App';
import SignIn from '../pages/Authentication/SignIn';
import SignUp from '../pages/Authentication/SignUp';
import CourseSummary from '../pages/CourseSummary/CourseSummary';
import LandingPage from '../pages/LandingPage/LandingPage';
import NotFound from '../pages/NotFound';
import RecipeSummary from '../pages/RecipeSummary/RecipeSummary';
import RecipeDiscovery from '../pages/RecipeSummary/RecipeDiscovery';
import RecipeDetail from '../pages/RecipeDetail/RecipeDetail';
import CreateRecipe from '../pages/CreateRecipe/CreateRecipe';
import CreateCourse from '../pages/CreateCourse/CreateCourse';
import CourseDetail from '../pages/CourseDetail/CourseDetail';
import AdminLogin from '../pages/Admin/AdminLogin';
import PaymentCallback from '../pages/Payment/PaymentCallback';
import MyRecipes from '../pages/MyRecipes/MyRecipes';
import MyCourses from '../pages/MyCourses/MyCourses';

export const appRoutes = [
    {
        path: '/',
        element: <App />,
        children: [
            { index: true, element: <LandingPage /> },
            { path: 'recipe/summary', element: <RecipeSummary /> },
            { path: 'recipe/discovery', element: <RecipeDiscovery /> },
            { path: 'recipe/:id/detail', element: <RecipeDetail /> },
            { path: 'recipe/create', element: <CreateRecipe /> },
            { path: 'recipe/my-recipes', element: <MyRecipes /> },
            { path: 'course/summary', element: <CourseSummary /> },
            { path: 'course/create', element: <CreateCourse /> },
            { path: 'course/my-courses', element: <MyCourses /> },
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
