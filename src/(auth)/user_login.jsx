// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { TextInput, ContinueWith } from '../components'
// import { homepage } from "../assets/image"
// import { useUser } from "./UserContext";

// const Login = () => {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const { user, login } = useUser();
//   const navigate = useNavigate(); // Hook for navigation

//   useEffect(() => {
//     if (user) {
//       navigate("/account-info");
//     }
//   }, [user, navigate]);

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     try {
//       // Send login request to backend API
//       // const response = await axios.post("https://online-shop-server-1.onrender.com/api/login", {
//       const response = await axios.post("https://online-shop-server-1.onrender.com/api/login", {
//         username,
//         password,
//       });

//       if (response.status === 200) {
//         const { token } = response.data; // Extract token
//         login(username, token); // Pass token to context
//         navigate("/account-info"); // Redirect to plagiarism checker page
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
//           <p className="text-sm text-[#444B59]">Don't have an account? <a href="/sign-up" className="text-[#8699DA] font-semibold hover:text-[#6172a9]">Sign up</a></p>
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

//         <ContinueWith />
//       </div>

//       <div className='w-7/12 h-[100vh] max-md:hidden flex justify-center items-center'>
//         <img
//           src={homepage}
//           alt=""
//           className="w-12/12 h-10/12 object-contain"
//         />
//       </div>

//     </div>
//   )
// }

// export default Login


import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { TextInput, ContinueWith } from '../components';
import { homepage } from "../assets/image";
import { useUser } from "./UserContext";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
const MySwal = withReactContent(Swal);


const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { user, login } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/account-info");
    }
  }, [user, navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(""); // Clear previous errors

    try {
      const response = await axios.post("https://online-shop-server-1.onrender.com/api/login", {
        username,
        password,
      });

      if (response.status === 200) {
        const { token } = response.data;
        login(username, token);
        navigate("/account-info");
      }

    } catch (error) {
      setError("Invalid username or password");
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    const { value: username } = await MySwal.fire({
      title: 'Enter your username',
      input: 'text',
      inputPlaceholder: 'Username',
      showCancelButton: true,
    });
  
    if (!username) return;
  
    try {
      await axios.post("https://online-shop-server-1.onrender.com/api/forgot-password", { username });
  
      const { value: otp } = await MySwal.fire({
        title: 'Enter the OTP sent to your email',
        input: 'text',
        inputPlaceholder: 'OTP',
      });
  
      const { value: newPassword } = await MySwal.fire({
        title: 'Enter new password',
        input: 'password',
        inputPlaceholder: 'New password',
      });
  
      await axios.post("https://online-shop-server-1.onrender.com/api/reset-password", {
        username,
        otp,
        newPassword,
      });
  
      MySwal.fire('Success', 'Your password has been updated!', 'success');
    } catch (error) {
      MySwal.fire('Error', error.response?.data?.message || 'Something went wrong', 'error');
    }
  };
  

  return (
    <div className='flex flex-row'>
      <div className='flex flex-col justify-center h-[100vh] content-center w-5/12 mx-20 max-md:w-full max-md:mx-5 max-sm:mx-2'>
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-[#444B59] mb-2">MACKY ONLINE SHOP</h1>
          <p className="text-sm text-[#444B59]">Don't have an account? <a href="/sign-up" className="text-[#8699DA] font-semibold hover:text-[#6172a9]">Sign up</a></p>
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
            type="button"
            className="flex justify-end text-sm text-[#8699DA] hover:text-[#6172a9] mb-5 ml-auto"
            onClick={handleForgotPassword}
          >
            Forgot password?
          </button>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 rounded-full focus:outline-none cursor-pointer ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#8699DA] hover:bg-[#798dce] text-white'
              }`}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <ContinueWith />
      </div>

      <div className='w-7/12 h-[100vh] max-md:hidden flex justify-center items-center'>
        <img
          src={homepage}
          alt=""
          className="w-12/12 h-10/12 object-contain"
        />
      </div>
    </div>
  );
};

export default Login;
