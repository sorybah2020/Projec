import "./App.css";
import Transactions from "./pages/Transactions";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/transactions" element={<Transactions />} />
        <Route path= "/Dashboard" element ={<Dashboard/>} />
      </Routes>
    </Router>
  );
}

export default App;
