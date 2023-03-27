import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

// import pages
import Sidebar from './pages/Sidebar/Sidebar';
import Error from './pages/Error/Error';
import Home from './pages/Home/Home';

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
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
