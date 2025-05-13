// import React, { createContext, useContext, useState, useEffect  } from 'react';

// // Create the UserContext with default value being null (user not logged in)
// const UserContext = createContext(null);

// export const useUser = () => {
//   return useContext(UserContext); // Custom hook to use user context
// };

// export const UserProvider = ({ children }) => {
//   const [user, setUser] = useState(null);

//   // Load user from localStorage on component mount
//   useEffect(() => {
//     const storedUser = localStorage.getItem("user");
//     if (storedUser) {
//       setUser(JSON.parse(storedUser));
//     }
//   }, []);

//   const login = (username, token) => {
//     const userData = { username, token };
//     setUser(userData);
//     localStorage.setItem('user', JSON.stringify(userData)); // Save to storage
//   };
//   console.log(localStorage.getItem('user')); // Debugging: Check if the user data is stored

//   const userlogout = () => {
//     setUser(null);
//     localStorage.removeItem('user'); // Remove token from storage
//   };

//   return (
//     <UserContext.Provider value={{ user, login, userlogout }}>
//       {children}
//     </UserContext.Provider>
//   );
// };

// import React, { createContext, useContext, useState, useEffect } from 'react';

// // Create the UserContext with default value being null (user not logged in)
// const UserContext = createContext(null);

// export const useUser = () => {
//   return useContext(UserContext); // Custom hook to use user context
// };

// export const UserProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [staff, setStaff] = useState(null);

//   // Load user and staff from localStorage on component mount
//   useEffect(() => {
//     const storedUser = localStorage.getItem("user");
//     const storedStaff = localStorage.getItem("staff");
    
//     if (storedUser) {
//       setUser(JSON.parse(storedUser));
//     }

//     if (storedStaff) {
//       setStaff(JSON.parse(storedStaff));
//     }
//   }, []);

//   // Login for users
//   const login = (username, token) => {
//     const userData = { username, token };
//     setUser(userData);
//     localStorage.setItem("user", JSON.stringify(userData));
//   };

//   // Login for staff
//   const loginStaff = (username, token) => {
//     const staffData = { username, token };
//     setStaff(staffData);
//     localStorage.setItem("staff", JSON.stringify(staffData));
//   };

//   // Logout functions
//   const userlogout = () => {
//     setUser(null);
//     localStorage.removeItem("user");
//   };

//   const staffLogout = () => {
//     setStaff(null);
//     localStorage.removeItem("staff");
//   };

//   return (
//     <UserContext.Provider value={{ user, staff, login, loginStaff, userlogout, staffLogout }}>
//       {children}
//     </UserContext.Provider>
//   );
// };


// With ADMIN

// import React, { createContext, useContext, useState, useEffect } from 'react';

// // Create the UserContext with default value being null (user not logged in)
// const UserContext = createContext(null);

// export const useUser = () => {
//   return useContext(UserContext); // Custom hook to use user context
// };

// export const UserProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [staff, setStaff] = useState(null);
//   const [admin, setAdmin] = useState(null); // 🔥 new state

//   useEffect(() => {
//     const storedUser = localStorage.getItem("user");
//     const storedStaff = localStorage.getItem("staff");
//     const storedAdmin = localStorage.getItem("admin"); // 🔥 load from storage

//     if (storedUser) setUser(JSON.parse(storedUser));
//     if (storedStaff) setStaff(JSON.parse(storedStaff));
//     if (storedAdmin) setAdmin(JSON.parse(storedAdmin)); // 🔥
//   }, []);

//   const login = (username, token) => {
//     const userData = { username, token };
//     setUser(userData);
//     localStorage.setItem("user", JSON.stringify(userData));
//   };

//   const loginStaff = (username, token) => {
//     const staffData = { username, token };
//     setStaff(staffData);
//     localStorage.setItem("staff", JSON.stringify(staffData));
//   };

//   const loginAdmin = (username, token) => { // 🔥 new function
//     const adminData = { username, token };
//     setAdmin(adminData);
//     localStorage.setItem("admin", JSON.stringify(adminData));
//   };

//   const userlogout = () => {
//     setUser(null);
//     localStorage.removeItem("user");
//   };

//   const staffLogout = () => {
//     setStaff(null);
//     localStorage.removeItem("staff");
//   };

//   const adminLogout = () => { // 🔥 new function
//     setAdmin(null);
//     localStorage.removeItem("admin");
//   };

//   return (
//     <UserContext.Provider value={{
//       user, staff, admin,
//       login, loginStaff, loginAdmin,
//       userlogout, staffLogout, adminLogout
//     }}>
//       {children}
//     </UserContext.Provider>
//   );
// };


// import React, { createContext, useContext, useState, useEffect } from 'react';

// // Create the UserContext with default value being null (user not logged in)
// const UserContext = createContext(null);

// export const useUser = () => {
//   return useContext(UserContext); // Custom hook to use user context
// };

// export const UserProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [staff, setStaff] = useState(null);
//   const [admin, setAdmin] = useState(null);
//   const [loading, setLoading] = useState(true); // ⬅️ New loading state

//   useEffect(() => {
//     const storedUser = localStorage.getItem("user");
//     const storedStaff = localStorage.getItem("staff");
//     const storedAdmin = localStorage.getItem("admin");

//     if (storedUser) setUser(JSON.parse(storedUser));
//     if (storedStaff) setStaff(JSON.parse(storedStaff));
//     if (storedAdmin) setAdmin(JSON.parse(storedAdmin));

//     setLoading(false); // ⬅️ Done loading
//   }, []);

//   const login = (username, token) => {
//     const userData = { username, token };
//     setUser(userData);
//     localStorage.setItem("user", JSON.stringify(userData));
//   };

//   const loginStaff = (username, token) => {
//     const staffData = { username, token };
//     setStaff(staffData);
//     localStorage.setItem("staff", JSON.stringify(staffData));
//   };

//   const loginAdmin = (username, token) => {
//     const adminData = { username, token };
//     setAdmin(adminData);
//     localStorage.setItem("admin", JSON.stringify(adminData));
//   };

//   // const userlogout = () => {
//   //   setUser(null);
//   //   localStorage.removeItem("user");
//   // };

//   const userlogout = async () => {
//     const storedUser = JSON.parse(localStorage.getItem("user"));
//     if (storedUser?.username) {
//       try {
//         await fetch('https://online-shop-server-1.onrender.com/api/logout', {
//           method: 'POST',
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify({ username: storedUser.username }),
//         });
//       } catch (error) {
//         console.error("Logout API failed:", error);
//       }
//     }
  
//     setUser(null);
//     localStorage.removeItem("user");
//   };  

//   const staffLogout = () => {
//     setStaff(null);
//     localStorage.removeItem("staff");
//   };

//   const adminLogout = () => {
//     setAdmin(null);
//     localStorage.removeItem("admin");
//   };

//   // ⬇️ Don't render children until loading is complete
//   if (loading) return null;

//   return (
//     <UserContext.Provider value={{
//       user, staff, admin,
//       login, loginStaff, loginAdmin,
//       userlogout, staffLogout, adminLogout
//     }}>
//       {children}
//     </UserContext.Provider>
//   );
// };


// With activeUserID

import React, { createContext, useContext, useState, useEffect } from 'react';

// Create the UserContext with default value being null (user not logged in)
const UserContext = createContext(null);

export const useUser = () => {
  return useContext(UserContext); // Custom hook to use user context
};

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [staff, setStaff] = useState(null);
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true); // ⬅️ New loading state

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedStaff = localStorage.getItem("staff");
    const storedAdmin = localStorage.getItem("admin");

    if (storedUser) setUser(JSON.parse(storedUser));
    if (storedStaff) setStaff(JSON.parse(storedStaff));
    if (storedAdmin) setAdmin(JSON.parse(storedAdmin));

    setLoading(false); // ⬅️ Done loading
  }, []); 

  const login = (username, token) => {
    const userData = { username, token };
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const loginStaff = (username, token) => {
    const staffData = { username, token };
    setStaff(staffData);
    localStorage.setItem("staff", JSON.stringify(staffData));
  };

  const loginAdmin = (username, token) => {
    const adminData = { username, token };
    setAdmin(adminData);
    localStorage.setItem("admin", JSON.stringify(adminData));
  };

  const userlogout = async () => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser?.username) {
      try {
        await fetch('https://online-shop-server-1.onrender.com/api/logout', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username: storedUser.username }),
        });
      } catch (error) {
        console.error("Logout API failed:", error);
      }
    }
  
    setUser(null);
    localStorage.removeItem("user");
  };  

  const staffLogout = () => {
    setStaff(null);
    localStorage.removeItem("staff");
  };

  const adminLogout = () => {
    setAdmin(null);
    localStorage.removeItem("admin");
  };

  // ⬇️ Don't render children until loading is complete
  if (loading) return null;

  return (
    <UserContext.Provider value={{
      user, staff, admin,
      login, loginStaff, loginAdmin,
      userlogout, staffLogout, adminLogout
    }}>
      {children}
    </UserContext.Provider>
  );
};
