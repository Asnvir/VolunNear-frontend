import {createBrowserRouter} from 'react-router-dom';
import {Home} from './pages/Home';
// import {Login} from './pages/Login';
// import {Profile} from './pages/Profile';
// import {ProfileVolunteer} from './pages/ProfileVolunteer';
// import {ProfileOrganization} from './pages/ProfileOrganization';
// import {Events} from './pages/Events';
// import {Organizations} from './pages/Organizations';
// import {Activities} from './pages/Activities';
// import {Feedbacks} from './pages/Feedbacks';
// import {Recommendations} from './pages/Recommendations';
// import {Notifications} from './pages/Notifications';
// import {SocialNetworks} from './pages/SocialNetworks';
// import {ProtectedRoute} from './components/ProtectedRoute';
import {MainLayout} from './layouts/MainLayout';
import {RegistrationOrg} from './pages/registration/RegistrationOrg.tsx';
import {RegistrationVol} from './pages/registration/RegistrationVol.tsx';
import {LoginPage} from './pages/LoginPage.tsx';
// import {EventsList} from './components/EventsList';
// import {MyEvents} from './components/MyEvents';
// import {OrganizationsList} from './components/OrganizationsList';
// import {ProfilePage} from './pages/ProfilePage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {path: '/', element: <Home />},
      {path: '/login', element: <LoginPage />},
      {path: 'registration/volunteer', element: <RegistrationVol />},
      {
        path: 'registration/organization',
        element: <RegistrationOrg />,
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
      //             <Organizations />
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
      //             <MyEvents />
      //         </ProtectedRoute>
      //     ),
      // },
      // { path: 'events-list', element: <EventsList /> },
      // { path: 'organizations-list', element: <OrganizationsList /> },
      // { path: 'profile-page', element: <ProfilePage /> },
    ],
  },
]);
