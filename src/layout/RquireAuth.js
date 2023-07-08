import React from 'react';
import { useLocation, Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

function RequireAuth() {
  const location = useLocation();
  const user = useSelector((state) => state.user.userInfo);
  
console.log("helloaaaaaa"+user);
  // Check if the user is authenticated
  const isAuthenticated = Object.entries(user).length !== 0;

  // If user is not authenticated, navigate to the unauthorized page
  if (!isAuthenticated) {
    return <Navigate to="/Unauthorized" state={{ from: location }} />;
  }

  // If user is authenticated, render the nested routes
  return <Outlet />;
}

export default RequireAuth;
