import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import { useAuthContext } from "./hooks/useAuthContext";
import { useState, useEffect } from "react";
  
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
  
const App = () => {
    const { user, isLoading } = useAuthContext()
    const [appLoading, setAppLoading] = useState(true);

    useEffect(() => {
        setAppLoading(false);
    }, [isLoading]);

    const router = createBrowserRouter([
        {
          path: "/",
          element: <Sidebar />,
          errorElement: <Error />,
          children: [
            {
              path: "",
              element: appLoading ? (<div>1</div>) : user ? <Home /> : <Navigate to="/login"/>,
            },
            {
              path: "grades",
              element: appLoading ? (<div>1</div>) : user ? <Grades /> : <Navigate to="/login"/>,
            },
            {
              path: "create-course",
              element: appLoading ? (<div>1</div>) : user ? <CreateCourse /> : <Navigate to="/login"/>,
            },
            {
              path: "signup",
              element: appLoading ? (<div></div>) : user ? <Signup /> : <Navigate to="/login"/>,
            }
          ],
        },
        {
          path: "/login",
          element: appLoading ? (<div>1</div>) : !user ? <Login /> : <Navigate to="/" />,
        },
    ]);

    return (
        <RouterProvider router={router}/>
    );
}
 
export default App;