import { createBrowserRouter } from "react-router-dom";
import Root from "../Layout/Root";
import Dashboard from "../pages/Dashboard";
import RoadRouteAdd from "../pages/roadRoute/RoadRouteAdd";
import BusAdd from "../pages/bus/BusAdd";
import TripAdd from "../pages/trips/Trips";
import Login from "../pages/Login";

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
      }
    ],
  },
  {
    path: "/login",
    element: <Login />,
  }
]);

export default router;
