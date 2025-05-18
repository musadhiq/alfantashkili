import AboutUs from "../pages/user/AboutUs";
import LandingPage from "../pages/user/LandingPage";
import Store from "../pages/user/Store";
import UserLayout from "../pages/user/UserLayout";

const UserRoutes = [
  {
    path: "/",
    element: <UserLayout />,
    children: [
      {
        index: true,
        element: <LandingPage />,
      },
      {
        path: "store",
        element: <Store />,
      },
      {
        path: "about-us",
        element: <AboutUs />,
      }
    ],
  },
];

export default UserRoutes;
