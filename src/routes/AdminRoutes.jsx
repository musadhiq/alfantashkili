// routes/AdminRoutes.js
import ProtectedRoute from "../components/ProtectedRoute";
import LoginPage from "../pages/admin/loginPage";
import ProductForm from "../pages/admin/addProduct";
import AdminLayout from "../pages/admin/AdminLayout"; // create this if not already present
import AdminPanel from "../pages/admin/AdminPanel";

const AdminRoutes = [
  {
    path: "/admin",
    element: (
      <ProtectedRoute>
        <AdminLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "dashboard",
        element: <AdminPanel />,
      },
      {
        path: "add-product",
        element: <ProductForm />,
      },
      {
        path: "edit-product/:id",
        element: <ProductForm />,
      },
    ],
  },
  {
    path: "/auth/login",
    element: <LoginPage />,
  },
];

export default AdminRoutes;
