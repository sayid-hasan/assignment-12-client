import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layout/mainLayout/MainLayout";
import Home from "../Pages/Home/Home/Home";
import Login from "../Pages/Login/Login";
import SignUp from "../Pages/SignUp/SignUp";
import ErrorPage from "../Pages/Errorpage/ErrorPage";
import ScholarshipDetails from "../Pages/ScholarshipDetails/ScholarshipDetails";
import Payment from "../Pages/Payment/Payment";
import PrivateRoute from "./PrivateRoute";
import Dashboard from "../Layout/Dashboard/Dashboard";
import AllScholarships from "../Pages/allscholarship/AllScholarsShips";
import Myprofile from "../Pages/Dashboard/User/Myprofile/Myprofile";
import MyApplications from "../Pages/Dashboard/User/MyApplications/MyApplications";
import MyReviews from "../Pages/Dashboard/User/MyReviews/MyReviews";
import ManageUsers from "../Pages/Dashboard/Admin/ManageUsers/ManageUsers";
import AdminRoute from "./AdminRoute";
import ManagaeScholarship from "../Pages/Dashboard/Moderator/shared/ManagaeScholarship/ManagaeScholarship";
import ModeratorRoute from "./ModeratorRoute";
import AddScholarship from "../Pages/Dashboard/Moderator/shared/AddScholarship/AddScholarship";
import AllReviews from "../Pages/Dashboard/Moderator/shared/AllReviews/AllReviews";
import ManageAllAppliedScholarship from "../Pages/Dashboard/Moderator/shared/ManageAllAppliedScholarship/ManageAllAppliedScholarship";
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
        path: "/allscholarship",
        element: <AllScholarships></AllScholarships>,
      },
      {
        path: "/scholarships/:id",
        element: (
          <PrivateRoute>
            <ScholarshipDetails></ScholarshipDetails>
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "dashboard",
    element: (
      <PrivateRoute>
        <Dashboard></Dashboard>
      </PrivateRoute>
    ),
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      // dashboard api need to relocate after creating dashboard layout
      // user related api
      {
        path: "payment",
        element: (
          <PrivateRoute>
            <Payment></Payment>
          </PrivateRoute>
        ),
      },
      {
        path: "myprofile",
        element: <Myprofile></Myprofile>,
      },
      {
        path: "myapplications",
        element: <MyApplications></MyApplications>,
      },
      {
        path: "myreviews",
        element: <MyReviews></MyReviews>,
      },
      // admin Api
      {
        path: "manageusers",
        element: (
          <AdminRoute>
            <ManageUsers></ManageUsers>
          </AdminRoute>
        ),
      },
      // moderator apis
      {
        path: "managescholarship",
        element: (
          <ModeratorRoute>
            <ManagaeScholarship></ManagaeScholarship>
          </ModeratorRoute>
        ),
      },
      {
        path: "addscholarship",
        element: (
          <ModeratorRoute>
            <AddScholarship></AddScholarship>
          </ModeratorRoute>
        ),
      },
      {
        path: "allreviews",
        element: (
          <ModeratorRoute>
            <AllReviews></AllReviews>
          </ModeratorRoute>
        ),
      },
      {
        path: "appliedscholarships",
        element: (
          <ModeratorRoute>
            <ManageAllAppliedScholarship></ManageAllAppliedScholarship>
          </ModeratorRoute>
        ),
      },
    ],
  },
]);

export default router;
