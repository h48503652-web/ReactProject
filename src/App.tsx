import { Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/header";
import Login from "./components/login";
import Dashboard from "./components/dashboard";
import NotFound from "./components/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";
import NewTicket from "./components/newTicket";
import TicketDetails from "./components/ticketDetails";
import TicketsList from "./components/ticketsList";
import Register from "./components/register";
import GetUsers from "./components/users";
import CreateUser from "./components/createUser";
import AdminSettings from "./components/settingsAdmin";
import Footer from "./components/footer";


function App() {
  return (
    <>
      <Header />


      <Routes>

        <Route path="/register" element={<Register />}
        />

        <Route path="/login" element={<Login />}
        />

        <Route path="/dashboard" element={
          <ProtectedRoute allowedRoles={["customer", "agent", "admin"]}>
            <Dashboard />
          </ProtectedRoute>}
        />

        <Route path="/users" element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <GetUsers />
          </ProtectedRoute>}
        />

        <Route path="/users/new" element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <CreateUser />
          </ProtectedRoute>}
        />

        <Route path="/settings" element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <AdminSettings />
          </ProtectedRoute>
        }
        />

        <Route path="/tickets/new" element={
          <ProtectedRoute allowedRoles={["customer"]}>
            <NewTicket />
          </ProtectedRoute>}
        />
        <Route path="/tickets/:id" element={
          <ProtectedRoute allowedRoles={["customer", "agent", "admin"]}>
            <TicketDetails />
          </ProtectedRoute>}
        />
        <Route path="/tickets" element={
          <ProtectedRoute allowedRoles={["customer", "agent", "admin"]}>
            <TicketsList />
          </ProtectedRoute>}
        />
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
