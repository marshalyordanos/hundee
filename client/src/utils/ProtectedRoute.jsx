import { Route, Navigate, Outlet } from "react-router-dom";

import React from "react";
import { useSelector } from "react-redux";
import { token } from "../redux/auth/authSlice";

const ProtectedRoute = () => {
  const tokens = useSelector(token);
  const t = JSON.parse(localStorage.getItem("user"))?.accessToken;
  console.log("wwwwwwwwwwwwwwwww",t,tokens)
  return tokens || t ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
