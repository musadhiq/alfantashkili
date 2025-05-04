// routes/AdminRoutes.js
import ProtectedRoute from "../components/ProtectedRoute";
import Dashboard from "../pages/admin/Dashboard";
import LoginPage from "../pages/admin/loginPage";
import ProductForm from "../pages/admin/addProduct";

const AdminRoutes = [
  {
    path: "/admin/dashboard",
    element: (
      <ProtectedRoute>
        <Dashboard/>
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/add-product",
    element: (
      <ProtectedRoute>
        <ProductForm/>
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/edit-product/:id",
    element: (
      <ProtectedRoute>
        <ProductForm/>
      </ProtectedRoute>
    ),
  },
  {
    path: "/auth/login",
    element: <LoginPage/>,
  },
];
export default AdminRoutes;
