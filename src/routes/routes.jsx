import { createBrowserRouter } from "react-router-dom";
import Root from "../Layout/Root";
import Dashboard from "../pages/Dashboard";
import RoadRouteAdd from "../pages/roadRoute/RoadRouteAdd";
import BusAdd from "../pages/bus/BusAdd";
import TripAdd from "../pages/trips/Trips";
import Login from "../pages/Login";
import SignUp from "../pages/Signup";
import CommuterProfile from "../pages/profiles/CommuterProfile";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
          element: <Dashboard />
      },
      {
        path: '/add-road-routes',
        element: <RoadRouteAdd />
      },
      {
        path: '/add-bus',
        element: <BusAdd />
      },
      {
        path: '/add-trip',
        element: <TripAdd />
      },
      {
        path: '/add-commuter-profile',
        element: <CommuterProfile />
      }
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <SignUp />
  }
]);

export default router;
