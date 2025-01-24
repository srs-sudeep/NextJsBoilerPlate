import ProtectedRoute from "../../../components/protectedRoute";

export default function AdminDashboard() {
  return (
    <ProtectedRoute role="ROLE_ADMIN">
      <h1>Admin Dashboard</h1>
    </ProtectedRoute>
  );
}
