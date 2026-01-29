import { useContext } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthContext } from "./context/AuthContext";
import Dashboard from "./pages/Dashboard";
import AddMaterialPage from "./pages/AddMaterialPage";
import IssueMaterialPage from "./pages/IssueMaterialPage";
import RemainingMaterialPage from "./pages/RemainingMaterialPage";
import Login from "./components/Login";
import Register from "./components/Register";
import NotFound from "./pages/NotFound";
import Footer from "./components/Footer";

const App = () => {
  const { token, isAdmin } = useContext(AuthContext);
  const isAuthenticated = !!token;

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/dashboard" element={isAuthenticated && isAdmin ? <Dashboard /> : <Navigate to="/login" replace />} />
        <Route path="/add" element={isAuthenticated && isAdmin ? <AddMaterialPage /> : <Navigate to="/login" replace />} />
        <Route path="/issue" element={isAuthenticated ? <IssueMaterialPage /> : <Navigate to="/login" replace />} />
        <Route path="/remaining" element={isAuthenticated ? <RemainingMaterialPage /> : <Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
