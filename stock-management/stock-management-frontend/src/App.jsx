import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./components/Login";
import Register from "./components/Register";
import AddMaterialPage from "./pages/AddMaterialPage";
import NotFound from "./pages/NotFound";
import { getToken } from "./auth";
import IssueMaterialPage from "./pages/IssueMaterialPage";
import RemainingMaterialPage from "./pages/RemainingMaterialPage";
import Footer from "./components/Footer";

// Inside your <Routes>


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" />} />

        <Route
          path="/dashboard"
          element={getToken() ? <Dashboard /> : <Navigate to="/login" />}
        />

        <Route
          path="/add"
          element={getToken() ? <AddMaterialPage /> : <Navigate to="/login" />}
        />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/issue" element={<IssueMaterialPage />} />
<Route path="/remaining" element={<RemainingMaterialPage />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
       <Footer />
    </Router>
  );
};

export default App;
