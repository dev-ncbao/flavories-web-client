import { Routes, Route } from 'react-router';
import { appRoutes } from './routes';

export default function AppRoutes() {
    return (
        <Routes>
            {appRoutes.map((route) =>
                route.children ? (
                    <Route
                        key={route.path}
                        path={route.path}
                        element={route.element}
                    >
                        {route.children.map((child) => (
                            <Route
                                key={child.path || 'index'}
                                index={!!child.index}
                                path={child.path}
                                element={child.element}
                            />
                        ))}
                    </Route>
                ) : (
                    <Route
                        key={route.path}
                        path={route.path}
                        element={route.element}
                    />
                )
            )}
        </Routes>
    );
}
