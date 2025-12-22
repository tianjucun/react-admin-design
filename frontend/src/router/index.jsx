import { createBrowserRouter, Navigate } from 'react-router-dom';
import { getToken } from '@/utils/auth';
import Login from '@/pages/Login';
import Layout from '@/components/Layout';
import User from '@/pages/User';
import Role from '@/pages/Role';
import Menu from '@/pages/Menu';
import Log from '@/pages/Log';

// 路由守卫
const PrivateRoute = ({ children }) => {
  const token = getToken();
  return token ? children : <Navigate to="/login" replace />;
};

const router = createBrowserRouter([
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/',
    element: (
      <PrivateRoute>
        <Layout />
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        element: <Navigate to="/system/user" replace />
      },
      {
        path: 'system/user',
        element: <User />
      },
      {
        path: 'system/role',
        element: <Role />
      },
      {
        path: 'system/menu',
        element: <Menu />
      },
      {
        path: 'system/log',
        element: <Log />
      }
    ]
  }
]);

export default router;

