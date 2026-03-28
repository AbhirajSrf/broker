import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useAuthStore } from "./store/useAuthStore";

import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Favourites from "./pages/Favourites";
import Dashboard from "./pages/Dashboard";

const App = () => {
  const { checkAuth, authUser, isCheckingAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, []);

  if (isCheckingAuth) return null;

  return (
    <div>
      <BrowserRouter>
        <Toaster />
        <Routes>
          <Route
            path="/"
            element={authUser ? <Dashboard /> : <Navigate to="/login" />}
          />
          <Route
            path="/favourites"
            element={authUser ? <Favourites /> : <Navigate to="/login" />}
          />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/login"
            element={!authUser ? <Login /> : <Navigate to="/" />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
