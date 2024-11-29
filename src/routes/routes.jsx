import { createBrowserRouter } from "react-router-dom";
import Root from "../Layout/Root";
import Dashboard from "../pages/Dashboard";
import RoadRouteAdd from "../pages/roadRoute/RoadRouteAdd";
import BusAdd from "../pages/bus/BusAdd";
import Login from "../pages/Login";
import AccountAdd from "../pages/account/AccountAdd";

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
        path: '/add-account',
        element: <AccountAdd />
      }
    ],
  },
  {
    path: "/login",
    element: <Login />,
  }
]);

export default router;
