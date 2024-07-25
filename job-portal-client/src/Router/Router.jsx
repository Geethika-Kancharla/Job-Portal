import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import Home from '../Pages/Home';
import CreateJob from '../Pages/CreateJob';
import MyJobs from '../Pages/MyJobs';
import SalaryPage from '../Pages/SalaryPage';
import UpdateJob from '../Pages/UpdateJob';
import Login from '../Pages/Login';
import Register from '../Pages/Register'
import ProtectedRoute from '../components/ProtectedRoute';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <Login />,
      },
      {
        path: '/register',
        element: <Register />
      },
      {
        path: '/home',
        element: <Home />
      },
      {
        path: '/post-job',
        element: (
          <ProtectedRoute allowedRoles={['admin']}>
            <CreateJob />
          </ProtectedRoute>
        )
      },
      {
        path: '/my-job',
        element: (
          <ProtectedRoute allowedRoles={['admin']}>
            <MyJobs />
          </ProtectedRoute>
        )
      },
      {
        path: '/salary',
        element: <SalaryPage />
      },
      {
        path: '/edit-job/:id',
        element: (
          <ProtectedRoute allowedRoles={['admin']}>
            <UpdateJob />
          </ProtectedRoute>
        )
      },

    ],
  },
]);

export default router;
