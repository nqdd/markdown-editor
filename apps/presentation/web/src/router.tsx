import { createBrowserRouter } from 'react-router-dom';
import { RootLayout } from './layouts/root-layout.tsx';
import { HomePage } from './pages/home.tsx';
import { NotFoundPage } from './pages/not-found.tsx';
import { FolderPage } from './pages/folder.tsx';
import { LoginPage } from './pages/login.tsx';
import { ProtectedRoute } from './components/protected-route.tsx';

export const router = createBrowserRouter([
  {
    children: [
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
            path: 'folders/:id',
            element: <FolderPage />,
          },
        ],
      },
      {
        path: '/login',
        element: <LoginPage />,
      },
      {
        path: '*',
        element: <NotFoundPage />,
      },
    ],
  },
]);
