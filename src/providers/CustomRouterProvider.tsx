import useGetUserRole from '../hooks/auth/useGetUserRole/useGetUserRole.ts';
import {createBrowserRouter, Navigate, RouterProvider} from 'react-router-dom';
import {MainLayout} from '../layouts/MainLayout.tsx';
import {SidebarLayout} from '../layouts/SidebarLayout.tsx';
import {AllActivities} from '../pages/AllActivities.tsx';
import {OrganizationsPage} from '../pages/OrganizationsPage.tsx';
import {LoginPage} from '../pages/LoginPage.tsx';
import {RegistrationVolunteerPage} from '../pages/registration/RegistrationVolunteerPage.tsx';
import {RegistrationOrgPage} from '../pages/registration/RegistrationOrgPage.tsx';
// import ProfileSettings from '../pages/ProfileSettings.tsx';
import ActivityDetailsPage from '../pages/ActivityDetailsPage.tsx';
import ErrorPage from '../pages/ErrorPage.tsx';
import {
  ROLE_ORGANISATION,
  ROLE_VOLUNTEER,
} from '../utils/constants/authConstants.ts';
import {AddActivityPage} from '../pages/AddActivityPage.tsx';
import VolunteerProfileSettings from '../pages/VolunteerProfileSettings.tsx';
import OrganizationDetailsPage from '../pages/OrganizationDetailsPage.tsx';
import {
  ROUTE_LOGIN,
  ROUTE_ORGANIZATION_ADD_ACTIVITY,
  ROUTE_ORGANIZATION_MY_ACTIVITIES,
  ROUTE_ORGANIZATION_REGISTRATION,
  ROUTE_VOLUNTEER_EVENTS,
  ROUTE_VOLUNTEER_ORGANIZATIONS,
  ROUTE_VOLUNTEER_REGISTRATION,
} from '../utils/constants/routesConstants.ts';
import {ProtectedRoute} from '../components/navigation/ProtectedRoute.tsx';
import {OrganisationActivities} from '../pages/OrganisationActivities.tsx';
import OrganisationProfileSettings from '../pages/OrganisationProfileSettings.tsx';

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
                  <Navigate to={ROUTE_VOLUNTEER_EVENTS} replace />
                ) : userRole === ROLE_ORGANISATION ? (
                  <Navigate to={ROUTE_ORGANIZATION_ADD_ACTIVITY} replace />
                ) : (
                  <></>
                ),
            },
            {
              path: ROUTE_VOLUNTEER_EVENTS,
              element: (
                <ProtectedRoute roles={[ROLE_VOLUNTEER]}>
                  <AllActivities />
                </ProtectedRoute>
              ),
            },
            {
              path: ROUTE_VOLUNTEER_ORGANIZATIONS,
              element: (
                <ProtectedRoute roles={[ROLE_VOLUNTEER]}>
                  <OrganizationsPage />
                </ProtectedRoute>
              ),
            },
            {
              path: ROUTE_ORGANIZATION_ADD_ACTIVITY,
              element: (
                <ProtectedRoute roles={[ROLE_ORGANISATION]}>
                  <AddActivityPage />
                </ProtectedRoute>
              ),
            },
            {
              path: ROUTE_ORGANIZATION_MY_ACTIVITIES,
              element: (
                <ProtectedRoute roles={[ROLE_ORGANISATION]}>
                  <OrganisationActivities />
                </ProtectedRoute>
              ),
            },
          ],
        },
        {path: ROUTE_LOGIN, element: <LoginPage />},
        {
          path: ROUTE_VOLUNTEER_REGISTRATION,
          element: <RegistrationVolunteerPage />,
        },
        {
          path: ROUTE_ORGANIZATION_REGISTRATION,
          element: <RegistrationOrgPage />,
        },

        {
          path: 'volunteer/profile',
          element: (
            <ProtectedRoute roles={[ROLE_ORGANISATION, ROLE_VOLUNTEER]}>
              <VolunteerProfileSettings />
            </ProtectedRoute>
          ),
        },
        {
          path: 'organization/profile',
          element: (
            <ProtectedRoute>
              <OrganisationProfileSettings />
            </ProtectedRoute>
          ),
        },
        {
          path: 'activity/:activityId',
          element: (
            <ProtectedRoute roles={[ROLE_ORGANISATION, ROLE_VOLUNTEER]}>
              <ActivityDetailsPage />
            </ProtectedRoute>
          ),
        },
        {
          path: 'organisation/:organizationId',
          element: <OrganizationDetailsPage />,
        },
        {
          path: '*',
          element: <ErrorPage />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};
