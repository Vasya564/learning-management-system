import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

// import components
import Sidebar from './components/Sidebar/Sidebar';

// import pages
import Error from './pages/Error/Error';
import Home from './pages/Home/Home';
import Grades from './pages/Grades/Grades';
import CreateCourse from './pages/CreateCourse/CreateCourse';

// import global styles
import './global.css'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Sidebar />,
    errorElement: <Error />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "grades",
        element: <Grades />,
      },
      {
        path: "create-course",
        element: <CreateCourse />,
      }
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
