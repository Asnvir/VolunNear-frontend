import {createBrowserRouter, Navigate} from 'react-router-dom';
// import {Login} from './pages/Login';
// import {Profile} from './pages/Profile';
// import {ProfileVolunteer} from './pages/ProfileVolunteer';
// import {ProfileOrganization} from './pages/ProfileOrganization';
// import {Events} from './pages/Events';
// import {OrganizationsPage} from './pages/OrganizationsPage';
// import {Activities} from './pages/Activities';
// import {Feedbacks} from './pages/Feedbacks';
// import {Recommendations} from './pages/Recommendations';
// import {Notifications} from './pages/Notifications';
// import {SocialNetworks} from './pages/SocialNetworks';
// import {ProtectedRoute} from './components/ProtectedRoute';
import {MainLayout} from './layouts/MainLayout';
import {RegistrationOrgPage} from './pages/registration/RegistrationOrgPage.tsx';
import {RegistrationVolunteerPage} from './pages/registration/RegistrationVolunteerPage.tsx';
import {LoginPage} from './pages/LoginPage.tsx';
import ErrorPage from './pages/ErrorPage.tsx';
import VolunteerProfileSettings from './pages/VolunteerProfileSettings.tsx';
import ProtectedRoute from './components/navigation/ProtectedRoute.tsx';
import ActivityDetailsPage from './pages/ActivityDetailsPage.tsx';
import {AllEvents} from './pages/AllEvents.tsx';
import {OrganizationsPage} from './pages/OrganizationsPage.tsx';
import {SidebarLayout} from './layouts/SidebarLayout.tsx';
import OrganisationProfileSettings from './pages/OrganisationProfileSettings.tsx';

// import {EventsList} from './components/EventsList';
// import {MyActivities} from './components/MyActivities';
// import {OrganizationsList} from './components/OrganizationsList';
// import {ProfilePage} from './pages/ProfilePage';

export const router = createBrowserRouter([
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
            element: <Navigate to="all-events" replace />,
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
        ],
      },
      {path: 'login', element: <LoginPage />},
      {path: 'registration/volunteer', element: <RegistrationVolunteerPage />},
      {
        path: 'registration/organization',
        element: <RegistrationOrgPage />,
      },

      {
        path: '/',
        element: <SidebarLayout />,
        children: [
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
        ],
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
           <ProtectedRoute>
          <ActivityDetailsPage />
           </ProtectedRoute>
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
