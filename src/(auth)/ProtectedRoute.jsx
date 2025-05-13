// import { Navigate } from "react-router-dom";
// import { useUser } from "./UserContext";

// const ProtectedRoute = ({ element: Component, role }) => {
//   const { user, staff, admin } = useUser();

//   // Role-based protection
//   if (role === "user" && !user) return <Navigate to="/login" replace />;
//   if (role === "staff" && !staff) return <Navigate to="/login-staff" replace />;
//   if (role === "admin" && !admin) return <Navigate to="/admin" replace />;

//   return Component;  
// }; 

// export default ProtectedRoute;


// With activeUserID

import { Navigate } from "react-router-dom";
import { useUser } from "./UserContext";

const ProtectedRoute = ({ element: Component, role }) => {
  const { user, staff, admin } = useUser();

  // Check if activeUserID is present for user, staff, and admin
  if (role === "user" && !user) return <Navigate to="/login" replace />;
  if (role === "staff" && !staff) return <Navigate to="/login-staff" replace />;
  if (role === "admin" && !admin) return <Navigate to="/admin" replace />;

  return Component;
};

export default ProtectedRoute;
