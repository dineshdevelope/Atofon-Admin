import "./App.css";
import { ToastContainer } from "react-toastify";
import { Routes, Route } from "react-router-dom";
import EmployeeCards from "./components/EmployeeCards";
import SingleEmployeeDetail from "./pages/SingleEmployeeDetail";
import EmployeeForm from "./pages/EmployeeForm";
import EmployeeEditForm from "./pages/EmployeeEditForm";
import SystemList from "./pages/SystemList";
import { AuthProvider } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import PrivateRoute from "./components/PrivateRoute";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import SalaryCalculator from "./pages/SalaryCalculator";
import PaymentSuccess from "./pages/PaymentSuccess";
import Users from "./pages/Users";

function App() {
  return (
    <>
      <ToastContainer limit={1} />
      <AuthProvider>
        <Navbar />
        <div className="container">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/dashboard"
              element={
                <PrivateRoute>
                  <EmployeeCards />
                </PrivateRoute>
              }
            />
            <Route
              path="/systems"
              element={
                <PrivateRoute>
                  <SystemList />
                </PrivateRoute>
              }
            />
            <Route
              path="/employee/:id"
              element={
                <PrivateRoute>
                  <SingleEmployeeDetail />
                </PrivateRoute>
              }
            />
            <Route
              path="/salary/:id"
              element={
                <PrivateRoute>
                  <SalaryCalculator />
                </PrivateRoute>
              }
            />
            <Route
              path="/users"
              element={
                <PrivateRoute>
                  <Users />
                </PrivateRoute>
              }
            />
            <Route path="/employee/new" element={<EmployeeForm />} />

            <Route path="/paymentSuccess" element={<PaymentSuccess />} />

            <Route path="/employee/edit/:id" element={<EmployeeEditForm />} />
          </Routes>
        </div>
      </AuthProvider>
    </>
  );
}

export default App;
