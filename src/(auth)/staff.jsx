// import React, { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { TextInput } from '../components'
// import { homepage } from "../assets/image"


// const LoginStaff = () => {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const navigate = useNavigate(); 

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     try {
//       // Send login request to backend API
//       const response = await axios.post("http://localhost:3000/api/staffLogin", {
//         username,
//         password,
//       });

//       if (response.status === 200) {
//         navigate("/staff-dashboard"); // Redirect to plagiarism checker page
//       }
//     } catch (error) {
//       setError("Invalid username or password");
//     }
//   };

//   return (
//     <div className='flex flex-row'>
//       <div className='flex flex-col justify-center h-[100vh] content-center w-5/12 mx-20 max-md:w-full max-md:mx-5 max-sm:mx-2'>
//         <div className="mb-8">
//           <h1 className="text-2xl font-bold text-[#444B59] mb-2">MACKY ONLINE SHOP</h1>
//           <p className="text-sm text-[#444B59]">Login as Staff</p>
//         </div>

//         <form className="w-full" onSubmit={handleLogin}>
//           {/* Name Input */}
//           <TextInput
//             label="Username"
//             placeholder="Username"
//             type="text"
//             value={username}
//             onChange={(e) => setUsername(e.target.value)}
//           />

//           {/* Password Input */}
//           <TextInput
//             label="Password"
//             placeholder="Password"
//             type="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//           />

//           {error && <p className="text-red-500">{error}</p>} {/* Display error message */}

//           <a href="" className="flex justify-end text-sm text-[#8699DA] hover:text-[#6172a9] mb-5">Forget password?</a>

//           {/* Submit Button */}
//           <button
//             type="submit"
//             className="w-full bg-[#8699DA] text-white py-2 rounded-full hover:bg-[#798dce] cursor-pointer focus:outline-none"
//           >
//             Login
//           </button>
//         </form>

//       </div>

//       <div className='w-7/12 h-[100vh] max-md:hidden flex justify-center items-center'>
//         <img
//           src={homepage}
//           alt="homepage"
//           className="w-12/12 h-10/12 object-contain"
//         />
//       </div>

//     </div>
//   ) 
// }

// export default LoginStaff

// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { TextInput } from "../components";
// import { homepage } from "../assets/image";
// import { useUser } from "./UserContext";

// const LoginStaff = () => {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const { staff, loginStaff } = useUser();
//   const navigate = useNavigate(); 
 
//   useEffect(() => {
//     if (staff) { 
//       navigate("/staff-dashboard");
//     }
//   }, [staff, navigate]);

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post("http://localhost:3000/api/staffLogin", {
//         username,
//         password,
//       });

//       if (response.status === 200) {
//         const { token } = response.data; // Extract token
//         loginStaff(username, token); // Store staff token
//         navigate("/staff-dashboard"); // Redirect
//       }
//     } catch (error) { 
//       setError("Invalid username or password");
//     }
//   };

//   return (
//     <div className='flex flex-row'>
//       <div className='flex flex-col justify-center h-[100vh] content-center w-5/12 mx-20 max-md:w-full max-md:mx-5 max-sm:mx-2'>
//         <div className="mb-8">
//           <h1 className="text-2xl font-bold text-[#444B59] mb-2">MACKY ONLINE SHOP</h1>
//           <p className="text-sm text-[#444B59]">Login as Staff</p>
//         </div>

//         <form className="w-full" onSubmit={handleLogin}>
//           <TextInput
//             label="Username"
//             placeholder="Username"
//             type="text"
//             value={username}
//             onChange={(e) => setUsername(e.target.value)}
//           />

//           <TextInput
//             label="Password"
//             placeholder="Password"
//             type="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//           />

//           {error && <p className="text-red-500">{error}</p>}

//           <button
//             type="submit"
//             className="w-full bg-[#8699DA] text-white py-2 rounded-full hover:bg-[#798dce] cursor-pointer focus:outline-none"
//           >
//             Login
//           </button>
//         </form>
//       </div>

//       <div className='w-7/12 h-[100vh] max-md:hidden flex justify-center items-center'>
//         <img
//           src={homepage}
//           alt="homepage"
//           className="w-12/12 h-10/12 object-contain"
//         />
//       </div>
//     </div>
//   );
// };

// export default LoginStaff;
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { TextInput } from "../components";
import { homepage } from "../assets/image";
import { useUser } from "./UserContext";

const LoginStaff = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { staff, loginStaff } = useUser();
  const navigate = useNavigate();
 
  useEffect(() => {
    if (staff) { 
      navigate("/staff-dashboard");
    }
  }, [staff, navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
 
    try {
      const response = await axios.post("https://online-shop-server-1.onrender.com/api/staffLogin", {
        username,
        password,
      }); 

      if (response.status === 200) {
        const { token } = response.data;
        loginStaff(username, token);
        navigate("/staff-dashboard");
      }
    } catch (error) { 
      setError("Invalid username or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='flex flex-row'>
      <div className='flex flex-col justify-center h-[100vh] content-center w-5/12 mx-20 max-md:w-full max-md:mx-5 max-sm:mx-2'>
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-[#444B59] mb-2">MACKY ONLINE SHOP</h1>
          <p className="text-sm text-[#444B59]">Login as Staff</p>
        </div>

        <form className="w-full" onSubmit={handleLogin}>
          <TextInput
            label="Username"
            placeholder="Username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <TextInput
            label="Password"
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {error && <p className="text-red-500">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 rounded-full focus:outline-none cursor-pointer ${
              loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#8699DA] hover:bg-[#798dce] text-white'
            }`}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>

      <div className='w-7/12 h-[100vh] max-md:hidden flex justify-center items-center'>
        <img
          src={homepage}
          alt="homepage"
          className="w-12/12 h-10/12 object-contain"
        />
      </div>
    </div>
  );
};

export default LoginStaff;
