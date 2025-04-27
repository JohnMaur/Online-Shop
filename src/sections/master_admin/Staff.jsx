// import React, { useState } from 'react';
// import axios from "axios";
// import { TextInput, ContinueWith } from '../../components'
// import { Modal } from 'antd';
// import { NavigationBar, Header } from "../layout"

// const Staff = () => {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const [message, setMessage] = useState('');
//   const [modalVisible, setModalVisible] = useState(false); // Track modal visibility
//   const [modalType, setModalType] = useState(''); // Success or Error type
//   const [isNavCollapsed, setIsNavCollapsed] = useState(false);

//   const openModal = (type, message) => {
//     setModalType(type); // Set the modal type (success or error)
//     setMessage(message); // Set the message to display
//     setModalVisible(true); // Show the modal
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (password !== confirmPassword) {
//       const errorMessage = 'Passwords do not match.';
//       openModal('error', errorMessage); // Show error modal
//       return;
//     }

//     try {
//       const response = await axios.post('http://localhost:3000/api/staffSignup', {
//         username,
//         password,
//       });
//       const successMessage = response.data.message;
//       openModal('success', successMessage); // Show success modal

//       // Clear input fields after success
//       setUsername('');
//       setPassword('');
//       setConfirmPassword('');

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

//   const toggleNav = () => {
//     setIsNavCollapsed(!isNavCollapsed);
//   };
//   return (
//     <div className={`flex flex-row-reverse max-md:flex-row w-full`}>
//       <div className='flex flex-col flex-1 h-screen'>
//         <Header
//           toggleNav={toggleNav}
//         />

//         <div className={`flex-1 overflow-auto mt-14 bg-[#EFEFEF]`}>
//           {/* Your content here */}
//           <div className='flex flex-col justify-center h-[90vh] content-center w-5/12 mx-20 max-md:w-full max-md:mx-5 max-sm:mx-2'>
//             <div className='bg-white p-10 rounded-2xl'>
//               <div className="mb-8">
//                 <h1 className="text-2xl font-bold text-[#444B59] mb-2">Staff Account Registration</h1>
//               </div>

//               <form className="w-full" onSubmit={handleSubmit}>
//                 Name Input
//                 <TextInput
//                   label="Username"
//                   placeholder="Username"
//                   type="text"
//                   value={username}
//                   onChange={(e) => setUsername(e.target.value)}
//                 />

//                 {/* Password Input */}
//                 <TextInput
//                   label="Password"
//                   placeholder="Password"
//                   type="password"
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                 />

//                 {/* Confirm Password Input */}
//                 <TextInput
//                   label="Confirm Password"
//                   placeholder="Confirm Password"
//                   type="password"
//                   value={confirmPassword}
//                   onChange={(e) => setConfirmPassword(e.target.value)}
//                 />

//                 {/* Submit Button */}
//                 <button
//                   type="submit"
//                   className="w-full mt-3 bg-[#8699DA] text-white py-2 rounded-full hover:bg-[#798dce] cursor-pointer focus:outline-none"
//                 >
//                   Sign Up
//                 </button>
//               </form>

//               <ContinueWith />
//             </div>

//           </div>
//         </div>
//       </div>

//       <nav className={`max-md:hidden ${isNavCollapsed ? "w-20" : "w-56"} transition-width duration-300`}>
//         <NavigationBar
//           isNavCollapsed={isNavCollapsed}
//         />
//       </nav>

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

// export default Staff

import React, { useState } from 'react';
import axios from "axios";
import { TextInput, ContinueWith } from '../../components'
import { Modal } from 'antd';
import { NavigationBar, Header, MobileAdminNavbar } from "../layout"

const Staff = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [modalVisible, setModalVisible] = useState(false); // Track modal visibility
  const [modalType, setModalType] = useState(''); // Success or Error type
  const [isNavCollapsed, setIsNavCollapsed] = useState(false);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  const toggleNav = () => {
    if (window.innerWidth <= 768) {
      setIsMobileNavOpen(!isMobileNavOpen);
    } else {
      setIsNavCollapsed(!isNavCollapsed);
    }
  };

  const openModal = (type, message) => {
    setModalType(type); // Set the modal type (success or error)
    setMessage(message); // Set the message to display
    setModalVisible(true); // Show the modal
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      const errorMessage = 'Passwords do not match.';
      openModal('error', errorMessage); // Show error modal
      return;
    }

    try {
      const response = await axios.post('http://localhost:3000/api/staffSignup', {
        username,
        password,
      });
      const successMessage = response.data.message;
      openModal('success', successMessage); // Show success modal

      // Clear input fields after success
      setUsername('');
      setPassword('');
      setConfirmPassword('');

    } catch (error) {
      const errorMessage =
        error.response?.data?.message || 'An error occurred. Please try again.';
      openModal('error', errorMessage); // Show error modal
    }
  };

  // Close the modal
  const handleCloseModal = () => {
    setModalVisible(false);
  };

  return (
    <div className={`flex flex-row-reverse max-md:flex-row w-full`}>
      <div className='flex flex-col flex-1 h-screen'>
        <Header
          toggleNav={toggleNav}
        />
        <MobileAdminNavbar isOpen={isMobileNavOpen} onClose={() => setIsMobileNavOpen(false)} />
        <div className={`flex-1 overflow-auto mt-14 bg-[#EFEFEF]`}>
          {/* Your content here */}
          <div className='flex flex-col justify-center h-[90vh] content-center w-5/12 max-md:w-full md:ml-10'>
            <div className='bg-white p-10 rounded-2xl'>
              <div className="mb-8">
                <h1 className="text-2xl font-bold text-[#444B59] mb-2">Staff Account Registration</h1>
              </div>

              <form className="w-full" onSubmit={handleSubmit}>
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
                  className="w-full mt-3 bg-[#8699DA] text-white py-2 rounded-full hover:bg-[#798dce] cursor-pointer focus:outline-none"
                >
                  Sign Up
                </button>
              </form>

              <ContinueWith />
            </div>

          </div>
        </div>
      </div>

      <nav className={`max-md:hidden ${isNavCollapsed ? "w-20" : "w-56"} transition-width duration-300`}>
        <NavigationBar
          isNavCollapsed={isNavCollapsed}
        />
      </nav>

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

export default Staff