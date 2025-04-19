import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Navigate } from "react-router-dom";
import Transactions from "./pages/Transactions";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ProtectedRoute from "./components/ProtectedRoute";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/transactions"
          element={
            <ProtectedRoute>
              <Transactions />
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/login" replace />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
