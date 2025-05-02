// import React, { useState } from "react";
// import axios from "axios";
// import { TextInput, ContinueWith } from '../components'
// import { Modal } from 'antd';
// import { useNavigate } from 'react-router-dom';
// import { homepage } from "../assets/image"
// import { useUser } from "./UserContext";

// const SignUp = () => {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const [message, setMessage] = useState('');
//   const [modalVisible, setModalVisible] = useState(false); // Track modal visibility
//   const [modalType, setModalType] = useState(''); // Success or Error type
//   const { user, login } = useUser();
//   const navigate = useNavigate(); // Initialize the navigate function

//   const openModal = (type, message) => {
//     setModalType(type); // Set the modal type (success or error)
//     setMessage(message); // Set the message to display
//     setModalVisible(true); // Show the modal
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!username.trim() || !password.trim() || !confirmPassword.trim()) {
//       openModal('error', 'All fields are required.');
//       return;
//     }

//     if (password !== confirmPassword) {
//       const errorMessage = 'Passwords do not match.';
//       openModal('error', errorMessage); // Show error modal
//       return;
//     }

//     try {
//       const response = await axios.post('https://online-shop-server-1.onrender.com/api/signup', {
//         username,
//         password,
//       });
//       const successMessage = response.data.message;
//       openModal('success', successMessage); // Show success modal

//       // Clear input fields after success
//       setUsername('');
//       setPassword('');
//       setConfirmPassword('');

//       const { token } = response.data; // Extract token
//       login(username, token); // Pass token to context
//       setTimeout(() => {
//         navigate('/account-info'); // Navigate to plagiarism checker
//       }, 1500); // Optional delay to allow user to see the success message
//     } catch (error) {
//       const errorMessage =
//         error.response?.data?.message || 'An error occurred. Please try again.';
//       openModal('error', errorMessage); // Show error modal
//     }
//   };

//   // Close the modal
//   const handleCloseModal = () => {
//     setModalVisible(false);
//   };


//   return (
//     <div className='flex flex-row'>
//       <div className='flex flex-col justify-center h-[100vh] content-center w-5/12 mx-20 max-md:w-full max-md:mx-5 max-sm:mx-2'>
//         <div className="mb-8">
//           <h1 className="text-2xl font-bold text-[#444B59] mb-2">MACKY ONLINE SHOP</h1>
//           <p className="text-sm text-[#444B59]">Already have an account? <a href="/login" className="text-[#8699DA] font-semibold hover:text-[#6172a9]">Login</a></p>
//         </div>

//         <form className="w-full" onSubmit={handleSubmit}>
//           {/* Name Input */}
//           <TextInput
//             label="Username"
//             placeholder="Username"
//             type="text"
//             value={username}
//             maxLength={25}
//             onChange={(e) => {
//               if (e.target.value.length <= 25) {
//                 setUsername(e.target.value);
//               }
//             }}
//           />
//           {username.length >= 25 && (
//             <p className="text-red-500 text-sm mt-1">Maximum of 25 characters reached</p>
//           )}

//           {/* Password Input */}
//           <TextInput
//             label="Password"
//             placeholder="Password"
//             type="password"
//             value={password}
//             maxLength={25}
//             onChange={(e) => {
//               if (e.target.value.length <= 25) {
//                 setPassword(e.target.value);
//               }
//             }}
//           />
//           {password.length >= 25 && (
//             <p className="text-red-500 text-sm mt-1">Maximum of 25 characters reached</p>
//           )}

//           {/* Confirm Password Input */}
//           <TextInput
//             label="Confirm Password"
//             placeholder="Confirm Password"
//             type="password"
//             value={confirmPassword}
//             maxLength={25}
//             onChange={(e) => {
//               if (e.target.value.length <= 25) {
//                 setConfirmPassword(e.target.value);
//               }
//             }}
//           />
//           {confirmPassword.length >= 25 && (
//             <p className="text-red-500 text-sm mt-1">Maximum of 25 characters reached</p>
//           )}

//           {/* Submit Button */}
//           <button
//             type="submit"
//             className="w-full mt-3 bg-[#8699DA] text-white py-2 rounded-full hover:bg-[#798dce] cursor-pointer focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
//             disabled={!username || !password || !confirmPassword}
//           >
//             Sign Up
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

//       <Modal
//         title={modalType === 'success' ? 'Success' : 'Error'}
//         open={modalVisible}
//         onOk={handleCloseModal} // Clicking "OK" will also close it
//         onCancel={handleCloseModal}
//         footer={null}
//         centered
//       >
//         <p>{message}</p>
//       </Modal>
//     </div>
//   )
// }

// export default SignUp

import React, { useState } from "react";
import axios from "axios";
import { TextInput, ContinueWith } from '../components'
import { Modal } from 'antd';
import { useNavigate } from 'react-router-dom';
import { homepage } from "../assets/image"
import { useUser } from "./UserContext";

const SignUp = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [modalVisible, setModalVisible] = useState(false); // Track modal visibility
  const [modalType, setModalType] = useState(''); // Success or Error type
  const [loading, setLoading] = useState(false); // Add this line at the top
  const { user, login } = useUser();
  const navigate = useNavigate(); // Initialize the navigate function

  const openModal = (type, message) => {
    setModalType(type); // Set the modal type (success or error)
    setMessage(message); // Set the message to display
    setModalVisible(true); // Show the modal
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username.trim() || !password.trim() || !confirmPassword.trim()) {
      openModal('error', 'All fields are required.');
      return;
    }

    if (password !== confirmPassword) {
      openModal('error', 'Passwords do not match.');
      return;
    }

    setLoading(true); // Start loading

    try {
      const response = await axios.post('https://online-shop-server-1.onrender.com/api/signup', {
        username,
        password,
      });

      const successMessage = response.data.message;
      openModal('success', successMessage);

      setUsername('');
      setPassword('');
      setConfirmPassword('');

      const { token } = response.data;
      login(username, token);

      setTimeout(() => {
        navigate('/account-info');
      }, 1500);
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || 'An error occurred. Please try again.';
      openModal('error', errorMessage);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  // Close the modal
  const handleCloseModal = () => {
    setModalVisible(false);
  };


  return (
    <div className='flex flex-row'>
      <div className='flex flex-col justify-center h-[100vh] content-center w-5/12 mx-20 max-md:w-full max-md:mx-5 max-sm:mx-2'>
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-[#444B59] mb-2">MACKY ONLINE SHOP</h1>
          <p className="text-sm text-[#444B59]">Already have an account? <a href="/login" className="text-[#8699DA] font-semibold hover:text-[#6172a9]">Login</a></p>
        </div>

        <form className="w-full" onSubmit={handleSubmit}>
          {/* Name Input */}
          <TextInput
            label="Username"
            placeholder="Username"
            type="text"
            value={username}
            maxLength={25}
            onChange={(e) => {
              if (e.target.value.length <= 25) {
                setUsername(e.target.value);
              }
            }}
          />
          {username.length >= 25 && (
            <p className="text-red-500 text-sm mt-1">Maximum of 25 characters reached</p>
          )}

          {/* Password Input */}
          <TextInput
            label="Password"
            placeholder="Password"
            type="password"
            value={password}
            maxLength={25}
            onChange={(e) => {
              if (e.target.value.length <= 25) {
                setPassword(e.target.value);
              }
            }}
          />
          {password.length >= 25 && (
            <p className="text-red-500 text-sm mt-1">Maximum of 25 characters reached</p>
          )}

          {/* Confirm Password Input */}
          <TextInput
            label="Confirm Password"
            placeholder="Confirm Password"
            type="password"
            value={confirmPassword}
            maxLength={25}
            onChange={(e) => {
              if (e.target.value.length <= 25) {
                setConfirmPassword(e.target.value);
              }
            }}
          />
          {confirmPassword.length >= 25 && (
            <p className="text-red-500 text-sm mt-1">Maximum of 25 characters reached</p>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full mt-3 bg-[#8699DA] text-white py-2 rounded-full hover:bg-[#798dce] cursor-pointer focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={!username || !password || !confirmPassword || loading}
          >
            {loading ? 'Signing Up...' : 'Sign Up'}
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

      <Modal
        title={modalType === 'success' ? 'Success' : 'Error'}
        open={modalVisible}
        onOk={handleCloseModal} // Clicking "OK" will also close it
        onCancel={handleCloseModal}
        footer={null}
        centered
      >
        <p>{message}</p>
      </Modal>
    </div>
  )
}

export default SignUp