import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TextInput, Profile, ChangePasswordModal } from '../../components';
import { StaffNavBar, Header, MobileStaffNavbar } from "../layout"
import { Modal } from 'antd';

const StaffProfile = () => {
  const [isNavCollapsed, setIsNavCollapsed] = useState(false);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [staffUsername, setStaffUsername] = useState("");
  const [changePasswordVisible, setChangePasswordVisible] = useState(false);

  // Database values (original)
  const [dbStaffFullname, setDbStaffFullname] = useState("");
  const [dbEmail, setDbEmail] = useState("");
  const [dbRegion, setDbRegion] = useState("");
  const [dbHouseStreet, setDbHouseStreet] = useState("");
  const [dbPhoneNumber, setDbPhoneNumber] = useState("");
  const [dbContactPerson, setDbContactPerson] = useState("");

  // Temporary input values (for editing)
  const [tempStaffFullname, setTempStaffFullname] = useState("");
  const [tempEmail, setTempEmail] = useState("");
  const [tempRegion, setTempRegion] = useState("");
  const [tempHouseStreet, setTempHouseStreet] = useState("");
  const [tempPhoneNumber, setTempPhoneNumber] = useState("");
  const [tempContactPerson, setTempContactPerson] = useState("");

  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [modalType, setModalType] = useState('');
  const [editModalVisible, setEditModalVisible] = useState(false);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("staff"));
    if (user && user.username) {
      setStaffUsername(user.username);
      fetchAccountInfo(user.username);
    } else {
      setLoading(false);
    }
  }, []);

  const fetchAccountInfo = async (username) => {
    try {
      const response = await axios.get(`https://online-shop-server-1.onrender.com/api/staff-info/${username}`);
      if (response.status === 200 && response.data) {
        const { staffFullname, email, region, houseStreet, phoneNumber, contactPerson } = response.data;

        // Store database values separately
        setDbStaffFullname(staffFullname || '');
        setDbEmail(email || '');
        setDbRegion(region || '');
        setDbHouseStreet(houseStreet || '');
        setDbPhoneNumber(phoneNumber || '');
        setDbContactPerson(contactPerson || '');

        // Also initialize the temporary state
        setTempStaffFullname(staffFullname || '');
        setTempEmail(email || '');
        setTempRegion(region || '');
        setTempHouseStreet(houseStreet || '');
        setTempPhoneNumber(phoneNumber || '');
        setTempContactPerson(contactPerson || '');
      }
    } catch (error) {
      console.error("Error fetching account info:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!tempStaffFullname || !tempEmail || !tempRegion || !tempHouseStreet || !tempPhoneNumber || !tempContactPerson) {
      openModal("error", "Please fill in all required fields.");
      return;
    }

    try {
      if (!staffUsername) {
        openModal("error", "User not logged in");
        return;
      }

      const response = await axios.post("https://online-shop-server-1.onrender.com/api/update-staffAccount", {
        staffUsername,
        staffFullname: tempStaffFullname,
        email: tempEmail,
        region: tempRegion,
        houseStreet: tempHouseStreet,
        phoneNumber: tempPhoneNumber,
        contactPerson: tempContactPerson,
      });

      if (response.status === 200) {
        openModal("success", "Account information updated successfully!");

        // Update database values with the new saved data
        setDbStaffFullname(tempStaffFullname);
        setDbEmail(tempEmail);
        setDbRegion(tempRegion);
        setDbHouseStreet(tempHouseStreet);
        setDbPhoneNumber(tempPhoneNumber);
        setDbContactPerson(tempContactPerson);
      }

      setEditModalVisible(false);
    } catch (error) {
      openModal("error", "Failed to update account information.");
    }
  };

  const openModal = (type, message) => {
    setModalType(type);
    setMessage(message);
    setModalVisible(true);
  };

  const toggleNav = () => {
    if (window.innerWidth <= 768) {
      setIsMobileNavOpen(!isMobileNavOpen);
    } else {
      setIsNavCollapsed(!isNavCollapsed);
    }
  };

  const showInvalidInputModal = (message) => {
    Swal.fire({
      icon: 'error',
      title: 'Invalid Input',
      text: message,
    });
  };

  const showLimitReachedModal = (field) => {
    Swal.fire({
      icon: 'warning',
      title: 'Limit Reached',
      text: `${field} must not exceed 50 characters.`,
    });
  };


  return (
    <div className="flex flex-row-reverse max-md:flex-row w-full">
      <div className='flex flex-col flex-1 h-screen'>
        <Header toggleNav={toggleNav} />
        <MobileStaffNavbar isOpen={isMobileNavOpen} onClose={() => setIsMobileNavOpen(false)} />
        <div className="flex-1 overflow-auto mt-14 bg-[#EFEFEF]">
          {loading ? (
            <div className="text-center mt-20 text-lg">Loading...</div>
          ) : (
            !!dbRegion.trim() && !!dbHouseStreet.trim() && !!dbPhoneNumber.trim() ? (
              <div className='m-7'>
                <Profile
                  titleHeader="Staff Information"
                  staffFullname={dbStaffFullname}
                  email={dbEmail}
                  region={dbRegion}
                  houseStreet={dbHouseStreet}
                  phoneNumber={dbPhoneNumber}
                  contactPerson={dbContactPerson}
                  username={staffUsername}
                  getApi="api/get-staffprofile-picture"
                  updateAPI="api/update-staffprofile-picture"
                />
                <div className='flex justify-end mt-5 lg:mr-16'>
                  <div className='space-x-2'>
                    <button
                      onClick={() => setChangePasswordVisible(true)}
                      className="px-16 bg-black text-white py-2 rounded-xl hover:bg-[#454545] cursor-pointer active:opacity-65"
                    >
                      Change Password
                    </button>
                    <button
                      onClick={() => setEditModalVisible(true)}
                      className='px-16 bg-[#656565] text-white py-2 rounded-xl hover:bg-[#767676] cursor-pointer active:opacity-65'
                    >
                      Edit Info
                    </button>
                  </div>

                </div>
              </div>
            ) : (
              <div className="flex flex-col justify-center h-[90vh] content-center w-5/12 mx-20 max-md:w-full max-md:mx-5 max-sm:mx-2">
                <div className='bg-white p-10 rounded-2xl'>
                  <div className="mb-8">
                    <h1 className="text-2xl font-bold text-[#444B59] mb-2">Staff Info</h1>
                  </div>

                  <form className="w-full" onSubmit={handleSave}>
                    {/* <TextInput label="Staff Name" placeholder="Surname/First Name/Middle Name" type="text" value={tempStaffFullname} onChange={(e) => setTempStaffFullname(e.target.value)} />
                    <TextInput label="Contact Person" placeholder="Surname/First Name/Middle Name" value={tempContactPerson} onChange={(e) => setTempContactPerson(e.target.value)} /> */}
                    <TextInput
                      label="Staff Name"
                      placeholder="Surname/First Name/Middle Name"
                      type="text"
                      value={tempStaffFullname}
                      onChange={(e) => {
                        const input = e.target.value;
                        const isValid = /^[a-zA-Z\s/]*$/.test(input); // only letters, spaces, slashes
                        if (isValid && input.length <= 50) {
                          setTempStaffFullname(input);
                        } else if (!isValid) {
                          showInvalidInputModal("Staff Name should only contain letters, spaces, and slashes.");
                        } else {
                          showLimitReachedModal("Staff Name");
                        }
                      }}
                    />

                    <TextInput
                      label="Contact Person"
                      placeholder="Surname/First Name/Middle Name"
                      value={tempContactPerson}
                      onChange={(e) => {
                        const input = e.target.value;
                        const isValid = /^[a-zA-Z\s/]*$/.test(input); // only letters, spaces, slashes
                        if (isValid && input.length <= 50) {
                          setTempContactPerson(input);
                        } else if (!isValid) {
                          showInvalidInputModal("Contact Person should only contain letters, spaces, and slashes.");
                        } else {
                          showLimitReachedModal("Contact Person");
                        }
                      }}
                    />
                    <TextInput label="Email Address" placeholder="example@gmail.com" type="text" value={tempEmail} onChange={(e) => setTempEmail(e.target.value)} />
                    {/* <TextInput label="Phone Number" placeholder="09*********" type="text" value={tempPhoneNumber} onChange={(e) => setTempPhoneNumber(e.target.value)} /> */}
                    <TextInput
                      label="Phone Number"
                      placeholder="9123456789"
                      type="text"
                      value={tempPhoneNumber}
                      onChange={(e) => {
                        const onlyDigits = e.target.value.replace(/\D/g, '');
                        if (onlyDigits.length <= 10) {
                          setTempPhoneNumber(onlyDigits);
                        }
                      }}
                      phoneNumber={1}
                    />
                    {/* <TextInput label="Region/City/District" placeholder="Metro Manila/Taguig City/Central Bicutan" type="text" value={tempRegion} onChange={(e) => setTempRegion(e.target.value)} /> */}
                    <TextInput
                      label="Region/City/District"
                      placeholder="Metro Manila/Taguig City/Central Bicutan"
                      value={tempRegion}
                      onChange={(e) => {
                        const input = e.target.value;
                        if (input.length <= 50) {
                          setTempRegion(input);
                        } else {
                          showLimitReachedModal("Region/City/District");
                        }
                      }}
                    />
                    {/* <TextInput label="House No./Street" placeholder="BLK 144 LoT 19/Arago Street" type="text" value={tempHouseStreet} onChange={(e) => setTempHouseStreet(e.target.value)} /> */}
                    <TextInput
                      label="House No./Street"
                      placeholder="BLK 144 LoT 19/Arago Street"
                      value={tempHouseStreet}
                      onChange={(e) => {
                        const input = e.target.value;
                        if (input.length <= 50) {
                          setTempHouseStreet(input);
                        } else {
                          showLimitReachedModal("House No./Street");
                        }
                      }}
                    />

                    <button type="submit" className="w-full mt-3 bg-[#8699DA] text-white py-2 rounded-full hover:bg-[#798dce] cursor-pointer focus:outline-none">
                      Save
                    </button>
                  </form>
                </div>
              </div>
            )
          )}
        </div>
      </div>

      <nav className={`max-md:hidden ${isNavCollapsed ? "w-20" : "w-56"} transition-width duration-300`}>
        <StaffNavBar isNavCollapsed={isNavCollapsed} setStaffUsername={setStaffUsername} />
      </nav>

      <Modal title="Edit Supplier Info" open={editModalVisible} onCancel={() => setEditModalVisible(false)} footer={null} centered>
        <form onSubmit={handleSave}>
          {/* <TextInput label="Supplier Name" value={tempStaffFullname} onChange={(e) => setTempStaffFullname(e.target.value)} />
          <TextInput label="Contact Person" value={tempContactPerson} onChange={(e) => setTempContactPerson(e.target.value)} />
          <TextInput label="Email" value={tempEmail} onChange={(e) => setTempEmail(e.target.value)} />
          <TextInput label="Region/City/District" value={tempRegion} onChange={(e) => setTempRegion(e.target.value)} />
          <TextInput label="House No./Street" value={tempHouseStreet} onChange={(e) => setTempHouseStreet(e.target.value)} />
          <TextInput label="Phone Number" value={tempPhoneNumber} onChange={(e) => setTempPhoneNumber(e.target.value)} /> */}

          <TextInput
            label="Supplier Name"
            value={tempStaffFullname}
            onChange={(e) => {
              const input = e.target.value;
              const isValid = /^[a-zA-Z\s/]*$/.test(input);
              if (isValid && input.length <= 50) {
                setTempStaffFullname(input);
              } else if (!isValid) {
                showInvalidInputModal("Supplier Name should only contain letters, spaces, and slashes.");
              } else {
                showLimitReachedModal("Supplier Name");
              }
            }}
          />

          <TextInput
            label="Contact Person"
            value={tempContactPerson}
            onChange={(e) => {
              const input = e.target.value;
              const isValid = /^[a-zA-Z\s/]*$/.test(input);
              if (isValid && input.length <= 50) {
                setTempContactPerson(input);
              } else if (!isValid) {
                showInvalidInputModal("Contact Person should only contain letters, spaces, and slashes.");
              } else {
                showLimitReachedModal("Contact Person");
              }
            }}
          />

          <TextInput
            label="Email"
            value={tempEmail}
            onChange={(e) => {
              const input = e.target.value;
              const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input);
              if (input.length <= 50) {
                setTempEmail(input);
              }
              if (!isValid && input !== "") {
                showInvalidInputModal("Please enter a valid email address.");
              }
            }}
          />

          <TextInput
            label="Region/City/District"
            value={tempRegion}
            onChange={(e) => {
              const input = e.target.value;
              if (input.length <= 50) {
                setTempRegion(input);
              } else {
                showLimitReachedModal("Region/City/District");
              }
            }}
          />

          <TextInput
            label="House No./Street"
            value={tempHouseStreet}
            onChange={(e) => {
              const input = e.target.value;
              if (input.length <= 50) {
                setTempHouseStreet(input);
              } else {
                showLimitReachedModal("House No./Street");
              }
            }}
          />

          <TextInput
            label="Phone Number"
            value={tempPhoneNumber}
            onChange={(e) => {
              const input = e.target.value.replace(/\D/g, ""); // remove non-digits
              if (input.length <= 10) {
                setTempPhoneNumber(input);
              } else {
                showLimitReachedModal("Phone Number must be 10 digits");
              }
            }}
          />
          <button type="submit" className="w-full mt-3 bg-black text-white py-2 rounded-full hover:bg-[#454545] cursor-pointer focus:outline-none">Save</button>
        </form>
      </Modal>

      <ChangePasswordModal
        isVisible={changePasswordVisible}
        onClose={() => setChangePasswordVisible(false)}
        username={staffUsername}
        getApi="api/change-password"
      />
    </div>
  );
};

export default StaffProfile;
