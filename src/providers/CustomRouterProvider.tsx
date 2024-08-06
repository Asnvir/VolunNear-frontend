import useGetUserRole from '../hooks/auth/useGetUserRole/useGetUserRole.ts';
import {createBrowserRouter, Navigate, RouterProvider} from 'react-router-dom';
import {MainLayout} from '../layouts/MainLayout.tsx';
import {SidebarLayout} from '../layouts/SidebarLayout.tsx';
import ProtectedRoute from '../components/navigation/ProtectedRoute.tsx';
import {AllEvents} from '../pages/AllEvents.tsx';
import {OrganizationsPage} from '../pages/OrganizationsPage.tsx';
import {LoginPage} from '../pages/LoginPage.tsx';
import {RegistrationVolunteerPage} from '../pages/registration/RegistrationVolunteerPage.tsx';
import {RegistrationOrgPage} from '../pages/registration/RegistrationOrgPage.tsx';
// import ProfileSettings from '../pages/ProfileSettings.tsx';
import ActivityDetailsPage from '../pages/ActivityDetailsPage.tsx';
import ErrorPage from '../pages/ErrorPage.tsx';
import {ROLE_VOLUNTEER} from '../utils/constants/routes.ts';
import {AddActivityPage} from '../pages/AddActivityPage.tsx';
import VolunteerProfileSettings from '../pages/VolunteerProfileSettings.tsx';

export const CustomRouterProvider = () => {
  const userRole = useGetUserRole();

  const router = createBrowserRouter([
    {
      path: '/',
      element: <MainLayout />,
      children: [
        {
          path: '/',
          element: <SidebarLayout />,
          children: [
            {
              index: true,
              element:
                userRole == ROLE_VOLUNTEER ? (
                  <Navigate to="all-events" replace />
                ) : (
                  <Navigate to="add-activity" replace />
                ),
            },
            {
              path: 'all-events',
              element: (
                <ProtectedRoute>
                  <AllEvents />
                </ProtectedRoute>
              ),
            },
            {
              path: 'organizations-list',
              element: (
                <ProtectedRoute>
                  <OrganizationsPage />
                </ProtectedRoute>
              ),
            },
            {
              path: 'add-activity',
              element: (
                <ProtectedRoute>
                  <AddActivityPage />
                </ProtectedRoute>
              ),
            },
          ],
        },
        {path: 'login', element: <LoginPage />},
        {
          path: 'registration/volunteer',
          element: <RegistrationVolunteerPage />,
        },
        {
          path: 'registration/organization',
          element: <RegistrationOrgPage />,
        },

        {
          path: 'volunteer/profile',
          element: (
            <ProtectedRoute>
              <VolunteerProfileSettings />
            </ProtectedRoute>
          ),
        },
        {
          path: 'activity/:activityId',
          element: (
            // <ProtectedRoute>
            <ActivityDetailsPage />
            // </ProtectedRoute>
          ),
        },
        {
          path: '*',
          element: <ErrorPage />,
        },
        // {
        //     path: 'profile',
        //     element: (
        //         <ProtectedRoute>
        //             <Profile />
        //         </ProtectedRoute>
        //     ),
        //     children: [
        //         { path: 'volunteer', element: <ProfileVolunteer /> },
        //         { path: 'organization', element: <ProfileOrganization /> },
        //     ],
        // },
        // {
        //     path: 'events',
        //     element: (
        //         <ProtectedRoute>
        //             <Events />
        //         </ProtectedRoute>
        //     ),
        // },
        // {
        //     path: 'organizations',
        //     element: (
        //         <ProtectedRoute>
        //             <OrganizationsPage />
        //         </ProtectedRoute>
        //     ),
        // },
        // {
        //     path: 'activities',
        //     element: (
        //         <ProtectedRoute>
        //             <Activities />
        //         </ProtectedRoute>
        //     ),
        // },
        // {
        //     path: 'feedbacks',
        //     element: (
        //         <ProtectedRoute>
        //             <Feedbacks />
        //         </ProtectedRoute>
        //     ),
        // },
        // {
        //     path: 'recommendations',
        //     element: (
        //         <ProtectedRoute>
        //             <Recommendations />
        //         </ProtectedRoute>
        //     ),
        // },
        // {
        //     path: 'notifications',
        //     element: (
        //         <ProtectedRoute>
        //             <Notifications />
        //         </ProtectedRoute>
        //     ),
        // },
        // {
        //     path: 'social-networks',
        //     element: (
        //         <ProtectedRoute>
        //             <SocialNetworks />
        //         </ProtectedRoute>
        //     ),
        // },
        // {
        //     path: 'my-events',
        //     element: (
        //         <ProtectedRoute roles={['USER']}>
        //             <MyActivities />
        //         </ProtectedRoute>
        //     ),
        // },
        // { path: 'events-list', element: <EventsList /> },
        // { path: 'organizations-list', element: <OrganizationsList /> },
        // { path: 'profile-page', element: <ProfilePage /> },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};
