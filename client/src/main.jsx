import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App';
import DashboardLayout from './Dashboard/DashboardLayout';
import Authorization from './Authorization/Authorization';
import Main from './Dashboard/main/Main';
import Workspace from './Dashboard/workspace/Workspace';
import { Provider } from 'react-redux';
import store from './redux/store';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />
  },
  {
    path: "/Dashboard",
    element: <DashboardLayout />,
    children: [
      {
        path: "",
        element: <Main />
      },
      {
        path: "workspace",
        element: <Workspace />
      },
      {
        path: "access-control",
        element: <Authorization />
      }
    ]
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
)
