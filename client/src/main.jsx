import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { AuthContextProvider } from './context/AuthContext';

// import components
import Sidebar from './components/Sidebar/Sidebar';

// import pages
import Error from './pages/Error/Error';
import Home from './pages/Home/Home';
import Grades from './pages/Grades/Grades';
import CreateCourse from './pages/CreateCourse/CreateCourse';
import Login from './pages/Login/Login';
import Signup from './pages/Signup/Signup';

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
      },
      {
        path: "signup",
        element: <Signup />,
      },
      {
        path: "login",
        element: <Login />,
      }
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthContextProvider>
      <RouterProvider router={router} />
    </AuthContextProvider>
  </React.StrictMode>,
)
