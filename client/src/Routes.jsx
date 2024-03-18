import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Loginform } from "./Components/forms/Loginform";
import { useAuthContext } from "./hooks/useAuthContext";
import { Home } from "./pages/Home";
import App from "./App";

const AllRoutes = () => {
 const { user } = useAuthContext();
 return (
    <div>
      <Router>
        <Routes>
          {/* Unprotected Routes */}
          <Route
            path="/"
            element={!user ? <Loginform/>: <Navigate to='/admin'/>}
          />
          {/* Protected Routes */}
          <Route path="/" element={<App />}>
            <Route path="/admin/*" element={<Home/>} />
          </Route>
        </Routes>
      </Router>
    </div>
 );
};

export default AllRoutes;