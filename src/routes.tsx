import {createBrowserRouter} from "react-router-dom";
import {MainLayout} from "./layouts/MainLayout";
import {HomePage} from "./pages/HomePage";
import {EventsList} from "./components/EventsList";
import {MyEvents} from "./components/MyEvents";
import {OrganizationsList} from "./components/OrganizationsList";
import {ProfilePage} from "./pages/ProfilePage";
import {PrivateRoute} from "./helpers/PrivateRoute";

const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout/>,
        children: [
            {path: "/", element: <HomePage/>},
            {path: "/profile", element: <ProfilePage/>},
            {path: "/events", element: <EventsList/>},
            {
                path: "/my-events",
                element: (
                    <PrivateRoute roles={['USER']}>
                        <MyEvents/>
                    </PrivateRoute>
                ),
            },
            {path: "/organizations", element: <OrganizationsList/>},
        ],
    },
]);

export default router;
