import * as ROUTE from "./utils/routesConst";
import Auth from "./pages/Auth";
import Home from "./pages/Home";
import Points from "./pages/Points";

export const publicRoutes = [
    {
        path: ROUTE.LOGIN_ROUTE,
        Component: Auth
    },
    {
        path: ROUTE.REGISTRATION_ROUTE,
        Component: Auth
    },
    {
        path: ROUTE.HOME_ROUTE,
        Component: Home
    },
];

export const authRoutes = [
    {
        path: ROUTE.POINT_ROUTE,
        Component: Points
    },
];
