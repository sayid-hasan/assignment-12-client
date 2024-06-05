import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layout/mainLayout/MainLayout";
import Home from "../Pages/Home/Home/Home";
import Login from "../Pages/Login/Login";
import SignUp from "../Pages/SignUp/SignUp";
import ErrorPage from "../Pages/Errorpage/ErrorPage";
import ScholarshipDetails from "../Pages/ScholarshipDetails/ScholarshipDetails";
const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/signup",
        element: <SignUp></SignUp>,
      },
      {
        path: "/scholarships/:id",
        element: <ScholarshipDetails></ScholarshipDetails>,
      },
    ],
  },
]);

export default router;
