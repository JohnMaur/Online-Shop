// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { TextInput, Profile } from '../../components';
// import { UserNavBar, Header } from "../layout"
// import { Modal } from 'antd';

// const UserLandingPage = () => {
//   const [isNavCollapsed, setIsNavCollapsed] = useState(false);
//   const [region, setRegion] = useState('');
//   const [houseStreet, setHouseStreet] = useState('');
//   const [recipientName, setRecipientName] = useState('');
//   const [phoneNumber, setPhoneNumber] = useState('');
//   const [username, setUsername] = useState('');

//   const [message, setMessage] = useState('');
//   const [modalVisible, setModalVisible] = useState(false); // Track modal visibility
//   const [modalType, setModalType] = useState(''); // Success or Error type
//   const [editModalVisible, setEditModalVisible] = useState(false);

//   // Load username and fetch account info if available
//   useEffect(() => {
//     const user = JSON.parse(localStorage.getItem("user"));
//     if (user && user.username) {
//       setUsername(user.username);
//       fetchAccountInfo(user.username);
//     }
//   }, []);

//   // Function to fetch account details
//   const fetchAccountInfo = async (username) => {
//     try {
//       const response = await axios.get(`http://localhost:3000/api/account-info/${username}`);
//       if (response.status === 200) {
//         const { region, houseStreet, recipientName, phoneNumber } = response.data;
//         setRegion(region || '');
//         setHouseStreet(houseStreet || '');
//         setRecipientName(recipientName || '');
//         setPhoneNumber(phoneNumber || '');
//       }
//     } catch (error) {
//       console.error("Error fetching account info:", error);
//     }
//   };

//   const handleSave = async (e) => {
//     e.preventDefault();
//     // Validation: Check if required fields are empty
//     if (!region || !houseStreet || !recipientName || !phoneNumber) {
//       openModal("error", "Please fill in all required fields (Region, House Street, Recepient, and Phone Number).");
//       return;
//     }

//     try {
//       if (!username) {
//         openModal("error", "User not logged in");
//         return;
//       }

//       const response = await axios.post("http://localhost:3000/api/update-account", {
//         username,
//         region,
//         houseStreet,
//         recipientName,
//         phoneNumber,
//       });

//       if (response.status === 200) {
//         openModal("success", "Account information updated successfully!");

//         setRegion('');
//         setHouseStreet('');
//         setRecipientName('');
//         setPhoneNumber('');
//       }
//     } catch (error) {
//       openModal("error", "Failed to update account information.");
//     }
//   };

//   const openModal = (type, message) => {
//     setModalType(type); // Set the modal type (success or error)
//     setMessage(message); // Set the message to display
//     setModalVisible(true); // Show the modal
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
//           {region && houseStreet && recipientName && phoneNumber ? (
//             <div className='m-7'>
//               <Profile
//                 region={region}
//                 houseStreet={houseStreet}
//                 recipient={recipientName}
//                 phoneNumber={phoneNumber}
//                 username={username}
//                 getApi="api/get-profile-picture"
//                 updateAPI="api/update-profile-picture"
//               />
//               <div className='flex justify-end mt-5 lg:mr-16'>
//                 <button
//                   onClick={() => setEditModalVisible(true)}
//                   className='px-16 bg-[#8699DA] text-white py-2 rounded-xl hover:bg-[#798dce] cursor-pointer active:opacity-65'
//                 >
//                   Edit Info
//                 </button>
//               </div>
//             </div>
//           ) : null}

//           {/* Your content here */}
//           <div className={`flex flex-col justify-center h-[90vh] content-center w-5/12 mx-20 max-md:w-full max-md:mx-5 max-sm:mx-2 ${region && houseStreet && recipientName && phoneNumber ? "hidden" : ""}`}>
//             <div className='bg-white p-10 rounded-2xl'>
//               <div className="mb-8">
//                 <h1 className="text-2xl font-bold text-[#444B59] mb-2">Account information</h1>
//               </div>

//               <form className="w-full" onSubmit={handleSave}>
//                 {/* Region Input */}
//                 <TextInput
//                   label="Region/City/District"
//                   placeholder="Metro Manila/Taguig City/Central Bicutan"
//                   type="text"
//                   value={region}
//                   onChange={(e) => setRegion(e.target.value)}
//                 />

//                 {/* House No./Street Input */}
//                 <TextInput
//                   label="House No./Street"
//                   placeholder="BLK 144 LoT 19/Arago Street"
//                   type="text"
//                   value={houseStreet}
//                   onChange={(e) => setHouseStreet(e.target.value)}
//                 />

//                 {/* Recipient's Name Input */}
//                 <TextInput
//                   label="Recipient's Name"
//                   placeholder="John"
//                   type="text"
//                   value={recipientName}
//                   onChange={(e) => setRecipientName(e.target.value)}
//                 />

//                 {/* Phone Number Input */}
//                 <TextInput
//                   label="Phone Number"
//                   placeholder="09*********"
//                   type="text"
//                   value={phoneNumber}
//                   onChange={(e) => {
//                     const input = e.target.value;
//                     if (/^\d*$/.test(input) && input.length <= 11) {
//                       setPhoneNumber(input);
//                     }
//                   }}
//                 />

//                 {/* Submit Button */}
//                 <button
//                   type="submit"
//                   className="w-full mt-3 bg-[#8699DA] text-white py-2 rounded-full hover:bg-[#798dce] cursor-pointer focus:outline-none"
//                 >
//                   Save
//                 </button>
//               </form>
//             </div>
//           </div>
//         </div>

//         <div>

//         </div>
//       </div>

//       <nav className={`max-md:hidden ${isNavCollapsed ? "w-20" : "w-56"} transition-width duration-300`}>
//         <UserNavBar
//           isNavCollapsed={isNavCollapsed}
//         />
//       </nav>

//       {/* Edit Info Modal */}
//       <Modal title="Edit Account Info" open={editModalVisible} onCancel={() => setEditModalVisible(false)} footer={null} centered>
//         <form onSubmit={handleSave}>
//           <TextInput label="Region/City/District" value={region} onChange={(e) => setRegion(e.target.value)} />
//           <TextInput label="House No./Street" value={houseStreet} onChange={(e) => setHouseStreet(e.target.value)} />
//           <TextInput label="Recipient's Name" value={recipientName} onChange={(e) => setRecipientName(e.target.value)} />
//           <TextInput label="Phone Number" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
//           <button type="submit" className="w-full mt-3 bg-[#8699DA] text-white py-2 rounded-full">Save</button>
//         </form>
//       </Modal>

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

// export default UserLandingPage

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TextInput, Profile, ChangePasswordModal } from '../../components';
import { UserNavBar, Header } from "../layout";
import { Modal } from 'antd';

const UserLandingPage = () => {
  const [isNavCollapsed, setIsNavCollapsed] = useState(false);
  const [region, setRegion] = useState('');
  const [houseStreet, setHouseStreet] = useState('');
  const [recipientName, setRecipientName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [username, setUsername] = useState('');
  const [changePasswordVisible, setChangePasswordVisible] = useState(false);

  const [tempRegion, setTempRegion] = useState('');
  const [tempHouseStreet, setTempHouseStreet] = useState('');
  const [tempRecipientName, setTempRecipientName] = useState('');
  const [tempPhoneNumber, setTempPhoneNumber] = useState('');

  const [message, setMessage] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [modalType, setModalType] = useState('');
  const [editModalVisible, setEditModalVisible] = useState(false);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && user.username) {
      setUsername(user.username);
      fetchAccountInfo(user.username);
    }
  }, []);

  const fetchAccountInfo = async (username) => {
    try {
      const response = await axios.get(`http://localhost:3000/api/account-info/${username}`);
      if (response.status === 200) {
        const { region, houseStreet, recipientName, phoneNumber } = response.data;
        setRegion(region || '');
        setHouseStreet(houseStreet || '');
        setRecipientName(recipientName || '');
        setPhoneNumber(phoneNumber || '');
      }
    } catch (error) {
      console.error("Error fetching account info:", error);
    }
  };

  const handleOpenEditModal = () => {
    // Set temp values when opening the modal
    setTempRegion(region);
    setTempHouseStreet(houseStreet);
    setTempRecipientName(recipientName);
    setTempPhoneNumber(phoneNumber);
    setEditModalVisible(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!tempRegion || !tempHouseStreet || !tempRecipientName || !tempPhoneNumber) {
      openModal("error", "Please fill in all required fields.");
      return;
    }

    try {
      if (!username) {
        openModal("error", "User not logged in");
        return;
      }

      const response = await axios.post("http://localhost:3000/api/update-account", {
        username,
        region: tempRegion,
        houseStreet: tempHouseStreet,
        recipientName: tempRecipientName,
        phoneNumber: tempPhoneNumber,
      });

      if (response.status === 200) {
        openModal("success", "Account information updated successfully!");

        // Only update the main state after successful save
        setRegion(tempRegion);
        setHouseStreet(tempHouseStreet);
        setRecipientName(tempRecipientName);
        setPhoneNumber(tempPhoneNumber);
        setEditModalVisible(false);
      }
    } catch (error) {
      openModal("error", "Failed to update account information.");
    }
  };

  const openModal = (type, message) => {
    setModalType(type);
    setMessage(message);
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  return (
    <div className="flex flex-row-reverse max-md:flex-row w-full">
      <div className="flex flex-col flex-1 h-screen">
        <Header toggleNav={() => setIsNavCollapsed(!isNavCollapsed)} />

        <div className="flex-1 overflow-auto mt-14 bg-[#EFEFEF]">
          {region && houseStreet && recipientName && phoneNumber ? (
            <div className="m-7">
              <Profile
                titleHeader="User Information"
                region={region}
                houseStreet={houseStreet}
                recipient={recipientName}
                phoneNumber={phoneNumber}
                username={username}
                getApi="api/get-profile-picture"
                updateAPI="api/update-profile-picture"
              />
              <div className="flex justify-end mt-5 lg:mr-16">
                <div className='space-x-2'>
                  <button
                    onClick={() => setChangePasswordVisible(true)}
                    className="px-16 bg-black text-white py-2 rounded-xl hover:bg-[#454545] cursor-pointer active:opacity-65"
                  >
                    Change Password
                  </button>
                  <button
                    onClick={handleOpenEditModal}
                    className="px-16 bg-[#656565] text-white py-2 rounded-xl hover:bg-[#767676] cursor-pointer active:opacity-65"
                  >
                    Edit Info
                  </button>
                </div>
              </div>
            </div>
          ) : null}

          <div
            className={`flex flex-col justify-center h-[90vh] content-center w-5/12 mx-20 max-md:w-full max-md:mx-5 max-sm:mx-2 ${region && houseStreet && recipientName && phoneNumber ? "hidden" : ""
              }`}
          >
            <div className="bg-white p-10 rounded-2xl">
              <div className="mb-8">
                <h1 className="text-2xl font-bold text-[#444B59] mb-2">Account information</h1>
              </div>

              <form className="w-full" onSubmit={handleSave}>
                <TextInput label="Region/City/District" placeholder="Metro Manila/Taguig City/Central Bicutan" value={tempRegion} onChange={(e) => setTempRegion(e.target.value)} />
                <TextInput label="House No./Street" placeholder="BLK 144 LoT 19/Arago Street" type="text" value={tempHouseStreet} onChange={(e) => setTempHouseStreet(e.target.value)} />
                <TextInput label="Recipient's Name" placeholder="John" value={tempRecipientName} onChange={(e) => setTempRecipientName(e.target.value)} />
                <TextInput label="Phone Number" placeholder="09*********" type="text" value={tempPhoneNumber} onChange={(e) => setTempPhoneNumber(e.target.value)} />

                <button
                  type="submit"
                  className="w-full mt-3 bg-[#8699DA] text-white py-2 rounded-full hover:bg-[#798dce] cursor-pointer focus:outline-none"
                >
                  Save
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      <nav className={`max-md:hidden ${isNavCollapsed ? "w-20" : "w-56"} transition-width duration-300`}>
        <UserNavBar isNavCollapsed={isNavCollapsed} />
      </nav>

      {/* Edit Modal */}
      <Modal title="Edit Account Info" open={editModalVisible} onCancel={() => setEditModalVisible(false)} footer={null} centered>
        <form onSubmit={handleSave}>
          <TextInput label="Region/City/District" value={tempRegion} onChange={(e) => setTempRegion(e.target.value)} />
          <TextInput label="House No./Street" value={tempHouseStreet} onChange={(e) => setTempHouseStreet(e.target.value)} />
          <TextInput label="Recipient's Name" value={tempRecipientName} onChange={(e) => setTempRecipientName(e.target.value)} />
          <TextInput label="Phone Number" value={tempPhoneNumber} onChange={(e) => setTempPhoneNumber(e.target.value)} />
          <button type="submit" className="w-full mt-3 bg-black hover:bg-[#454545] text-white py-2 rounded-full cursor-pointer">Save</button>
        </form>
      </Modal>

      <Modal
        title={modalType === 'success' ? 'Success' : 'Error'}
        open={modalVisible}
        onOk={handleCloseModal}
        onCancel={handleCloseModal}
        footer={null}
        centered
      >
        <p>{message}</p>
      </Modal>

      <ChangePasswordModal
        isVisible={changePasswordVisible}
        onClose={() => setChangePasswordVisible(false)}
        username={username}
        getApi="api/userChange-password"
      />
    </div>
  );
};

export default UserLandingPage;
