import { createBrowserRouter } from 'react-router-dom';
import { RootLayout } from './layouts/root-layout.tsx';
import { HomePage } from './pages/home.tsx';
import { SettingsPage } from './pages/settings.tsx';
import { DocumentationPage } from './pages/documentation.tsx';
import { GettingStartedPage } from './pages/documentation/getting-started.tsx';
import { ApiReferencePage } from './pages/documentation/api.tsx';
import { NotFoundPage } from './pages/not-found.tsx';
import { FolderPage } from './pages/folders/[id].tsx';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
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
      {
        path: '*',
        element: <NotFoundPage />,
      },
    ],
  },
]);
