import { Routes, Route } from 'react-router';
import { appRoutes } from './routes';

export default function AppRoutes() {
    return (
        <Routes>
            {appRoutes.map(({ path, element }) => (
                <Route
                    key={path}
                    path={path}
                    element={element}
                />
            ))}
        </Routes>
    );
}
