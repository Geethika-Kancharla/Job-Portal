import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import Home from '../Pages/Home';  // Ensure the casing matches the actual file name

import About from '../Pages/About';
import CreateJob from '../Pages/CreateJob';
import MyJobs from '../Pages/MyJobs';
import SalaryPage from '../Pages/SalaryPage';
import UpdateJob from '../Pages/UpdateJob';


const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/about',
        element: <About />
      },
      {
        path: '/post-job',
        element: <CreateJob />
      },
      {
        path: '/my-job',
        element: <MyJobs />
      },
      {
        path: '/salary',
        element: <SalaryPage />
      },
      {
        path: '/edit-job/:id',
        element: <UpdateJob />,


      }
    ],
  },
]);

export default router;
