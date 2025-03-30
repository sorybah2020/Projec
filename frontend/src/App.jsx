import "./App.css";
import Transactions from "./pages/Transactions";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";

function App() {
  const { auth } = useContext(AuthContext);
  return (
    <Router>
      <Routes>
        <Route path="/transactions" element={<Transactions auth={auth} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile" element={<Profile auth={auth} />} />
      </Routes>
    </Router>
  );
}

export default App;
