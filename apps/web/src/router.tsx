import { createBrowserRouter, Outlet } from 'react-router-dom';
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
import { AuthProvider } from './providers/auth-provider.tsx';

// Create a wrapper component that provides auth context
const AuthLayout = () => (
  <AuthProvider>
    <Outlet />
  </AuthProvider>
);

export const router = createBrowserRouter([
  {
    element: <AuthLayout />,
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
        path: '/',
        element: <RootLayout />,
        children: [
          {
            index: true,
            element: (
              <ProtectedRoute>
                <HomePage />
              </ProtectedRoute>
            ),
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
            element: (
              <ProtectedRoute>
                <SettingsPage />
              </ProtectedRoute>
            ),
          },
          {
            path: 'folders/:id',
            element: (
              <ProtectedRoute>
                <FolderPage />
              </ProtectedRoute>
            ),
          },
          {
            path: '*',
            element: <NotFoundPage />,
          },
        ],
      },
    ],
  },
]);
