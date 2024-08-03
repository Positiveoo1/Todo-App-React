// // src/components/Auth/PrivateRoute.js
// import React from 'react';
// import { Navigate, useLocation } from 'react-router-dom';
// import { useAuth } from './AuthContext';

// const PrivateRoute = ({ children }) => {
//   const { currentUser } = useAuth();
//   const location = useLocation();

//   if (!currentUser) {
//     return <Navigate to="/login" state={{ from: location, message: "Please log in to view your todos or create new ones." }} />;
//   }

//   return children;
// };

// export default PrivateRoute;
// src/components/Auth/PrivateRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

const PrivateRoute = ({ children }) => {
  const { currentUser } = useAuth();

  return currentUser ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
