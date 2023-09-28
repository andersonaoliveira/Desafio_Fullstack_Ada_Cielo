// import React, { useState } from 'react';
// import { Route, Navigate } from 'react-router-dom';

// function ProtectedRoute({ element, ...rest }) {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);

//   return isAuthenticated ? (
//     <Route {...rest} element={element} />
//   ) : (
//     <Navigate to="/login" />
//   );
// }

// export default ProtectedRoute;