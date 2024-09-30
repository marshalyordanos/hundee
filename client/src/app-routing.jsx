import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./utils/ProtectedRoute";

import LayoutRouting from "./LayoutRouting";
import LoginPage from "./views/auth/LoginPage";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "./redux/auth/authSlice";

const AppRoute = () => {
  const user = useSelector(selectCurrentUser);
  console.log(user);
  return (
    <div>
      <Routes>
        {user && (
          <Route element={<ProtectedRoute />}>
            <Route element={<Navigate to="/dash" />} path="/" />
            <Route element={<Navigate to="/dash" />} path="/login" />
            <Route path="/dash/*" element={<LayoutRouting />} />
          </Route>
        )}

        {!user && (
          <>
            <Route element={<Navigate to="/login" />} path="/" />

            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<div>Signup</div>} />
          </>
        )}

        <Route path="*" element={<h1>Page is not found</h1>} />
      </Routes>
    </div>
  );
};

export default AppRoute;
