import { useRoutes } from "react-router-dom";
import AdminRoutes from "./AdminRoutes";
import UserRoutes from "./UserRoutes";

const allRoutes = [...AdminRoutes, ...UserRoutes];

function AppRouter() {
  const routes = useRoutes(allRoutes);
  return routes;
}

export default AppRouter;
