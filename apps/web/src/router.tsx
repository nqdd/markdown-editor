import { createBrowserRouter } from 'react-router-dom';
import { RootLayout } from './layouts/root-layout.tsx';
import { HomePage } from './pages/home.tsx';
import { SettingsPage } from './pages/settings.tsx';
import { DocumentationPage } from './pages/documentation.tsx';
import { GettingStartedPage } from './pages/documentation/getting-started.tsx';
import { ApiReferencePage } from './pages/documentation/api.tsx';
import { NotFoundPage } from './pages/not-found.tsx';
import { FolderPage } from './pages/folders/[id].tsx';
import { LoginPage } from './pages/login.tsx';
import { ProtectedRoute } from './components/protected-route.tsx';
import { OAuthCallbackPage } from './pages/oauth-callback.tsx';

export const router = createBrowserRouter([
  {
    children: [
      {
        path: '/login',
        element: <LoginPage />,
      },
      {
        path: '/oauth/callback',
        element: <OAuthCallbackPage />,
      },
      {
        path: '*',
        element: <NotFoundPage />,
      },
      {
        path: '/',
        element: (
          <ProtectedRoute>
            <RootLayout />
          </ProtectedRoute>
        ),
        children: [
          {
            index: true,
            element: <HomePage />,
          },
          {
            path: 'documentation',
            element: <DocumentationPage />,
          },
          {
            path: 'documentation/getting-started',
            element: <GettingStartedPage />,
          },
          {
            path: 'documentation/api',
            element: <ApiReferencePage />,
          },
          {
            path: 'settings',
            element: <SettingsPage />,
          },
          {
            path: 'folders/:id',
            element: <FolderPage />,
          },
        ],
      },
    ],
  },
]);
