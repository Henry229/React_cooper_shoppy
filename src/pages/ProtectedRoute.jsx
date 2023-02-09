import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';

const ProtectedRoute = ({ children, requireAdmin }) => {
  const { user } = useAuthContext();

  if (!user || (requireAdmin && !user.isAdmin)) {
    // 현재 경로가 잘못된 경로이므로 history에 넣고 싶지 않다. 그래서 replace
    return <Navigate to='/' replace />;
  }
  return children;
};

export default ProtectedRoute;
