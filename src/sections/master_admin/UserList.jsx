import React, { useState, useEffect } from 'react';
import { Table, Spin, Alert, Button, Modal, Input } from 'antd'; // Added Modal, Input components
import { NavigationBar, Header, MobileAdminNavbar } from "../layout";

const UserList = () => {
  const [isNavCollapsed, setIsNavCollapsed] = useState(false);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [userList, setUserList] = useState([]);
  const [loading, setLoading] = useState(false); // Track loading state
  const [error, setError] = useState(null); // Track error state
  const [editingUser, setEditingUser] = useState(null); // Track the user being edited
  const [formValues, setFormValues] = useState({}); // Form data for editing

  const toggleNav = () => {
    if (window.innerWidth <= 768) {
      setIsMobileNavOpen(!isMobileNavOpen);
    } else {
      setIsNavCollapsed(!isNavCollapsed);
    }
  };

  const fetchUserList = async () => {
    setLoading(true); // Set loading state
    setError(null); // Clear previous errors

    try {
      const response = await fetch('https://online-shop-server-1.onrender.com/api/user-list');

      // Check if response is successful
      if (!response.ok) {
        throw new Error('Failed to fetch user data');
      }

      const data = await response.json();
      setUserList(data);
    } catch (error) {
      setError(error.message); // Set error state
    } finally {
      setLoading(false); // Set loading to false after fetching
    }
  };

  useEffect(() => {
    // Fetch the user list when the component mounts
    fetchUserList();
  }, []);

  const handleEdit = (user) => {
    setEditingUser(user);
    setFormValues(user); // Pre-fill form with user data
  };

  const handleModalClose = () => {
    setEditingUser(null); // Close modal
  };

  // const handleFormChange = (e) => {
  //   const { name, value } = e.target;
  //   setFormValues((prevState) => ({
  //     ...prevState,
  //     [name]: value,
  //   }));
  // };
  const handleFormChange = (e) => {
    const { name, value } = e.target;

    // Validate Recipient Name
    if (name === "recipientName") {
      const isValid = /^[a-zA-Z\s/]*$/.test(value);
      if (!isValid) {
        showInvalidInputModal("Recipient Name should only contain letters, spaces, and slashes.");
        return;
      }
      if (value.length > 50) {
        showLimitReachedModal("Recipient Name");
        return;
      }
    }

    // Validate Phone Number
    if (name === "phoneNumber") {
      const digitsOnly = value.replace(/\D/g, "");
      if (digitsOnly.length > 10) {
        showLimitReachedModal("Phone Number must be 10 digits");
        return;
      }
      setFormValues((prev) => ({
        ...prev,
        [name]: digitsOnly
      }));
      return;
    }

    // Validate Region and House & Street
    if (name === "region" || name === "houseStreet") {
      if (value.length > 50) {
        showLimitReachedModal(name === "region" ? "Region" : "House & Street");
        return;
      }
    }

    // Validate Password (optional)
    if (name === "password" && value.length > 0 && value.length < 6) {
      showInvalidInputModal("Password must be at least 6 characters long.");
      return;
    }

    setFormValues((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = async () => {
    try {
      const response = await fetch(`https://online-shop-server-1.onrender.com/api/user/${editingUser.username}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formValues),
      });

      if (!response.ok) {
        throw new Error('Failed to update user');
      }

      const updatedUser = await response.json();

      // Update user list with the updated user data
      setUserList((prevList) =>
        prevList.map((user) => (user.username === updatedUser.username ? updatedUser : user))
      );

      handleModalClose(); // Close the modal after saving
      fetchUserList(); // Refresh the user list after updating
    } catch (error) {
      setError(error.message); // Handle error
    }
  };

  const handleDelete = async (username) => {
    try {
      const confirmed = window.confirm(`Are you sure you want to delete user "${username}"?`);
      if (!confirmed) return;

      const response = await fetch(`https://online-shop-server-1.onrender.com/api/user/${username}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete user');
      }

      // Refresh user list after deletion
      fetchUserList();
    } catch (error) {
      setError(error.message);
    }
  };

  const columns = [
    {
      title: 'Username',
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: 'Password',
      dataIndex: 'password',
      key: 'password',
      render: (text) => '*****', // Mask passwords
    },
    {
      title: 'Recipient Name',
      dataIndex: 'recipientName',
      key: 'recipientName',
    },
    {
      title: 'Phone Number',
      dataIndex: 'phoneNumber',
      key: 'phoneNumber',
    },
    {
      title: 'Region',
      dataIndex: 'region',
      key: 'region',
    },
    {
      title: 'House & Street',
      dataIndex: 'houseStreet',
      key: 'houseStreet',
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, user) => (
        <div className='w-44 flex flex-row justify-end'>
          <Button type="primary" onClick={() => handleEdit(user)} style={{ marginRight: 8 }}>
            Edit
          </Button>
          <Button danger onClick={() => handleDelete(user.username)}>
            Delete
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className={`flex flex-row-reverse max-md:flex-row w-full`}>
      <div className='flex flex-col flex-1 h-screen'>
        <Header toggleNav={toggleNav} />
        <MobileAdminNavbar isOpen={isMobileNavOpen} onClose={() => setIsMobileNavOpen(false)} />
        <div className={`flex-1 overflow-auto mt-14 bg-[#EFEFEF] p-6`}>
          <h2 className="text-xl font-bold mb-4">User List</h2>

          {loading ? (
            // Display a loading spinner while fetching
            <div className="flex justify-center">
              <Spin size="large" />
            </div>
          ) : error ? (
            // Display an error message if there is an error
            <Alert message={`Error: ${error}`} type="error" showIcon />
          ) : userList.length === 0 ? (
            // Display a message if no users are available
            <p>No users found.</p>
          ) : (
            <div className='max-md:w-[100vw] bg-white mt-2 rounded-xl max-md:overflow-x-auto max-md:whitespace-nowrap'>
              <Table dataSource={userList} columns={columns} rowKey="username" pagination={{ pageSize: 5 }} />
            </div>
          )}
        </div>
      </div>

      <nav className={`max-md:hidden ${isNavCollapsed ? "w-20" : "w-56"} transition-width duration-300`}>
        <NavigationBar isNavCollapsed={isNavCollapsed} />
      </nav>

      {/* Edit Modal */}
      <Modal
        title="Edit User"
        visible={!!editingUser}
        onCancel={handleModalClose}
        onOk={handleSave}
        okText="Save"
        cancelText="Cancel"
      >
        {editingUser && (
          <>
            <div className="mb-4">
              <label className="block">Recipient Name</label>
              <Input
                name="recipientName"
                value={formValues.recipientName}
                onChange={handleFormChange}
              />
            </div>
            <div className="mb-4">
              <label className="block">Password</label>
              <Input.Password
                name="password"
                value={formValues.password}
                onChange={handleFormChange}
              />
            </div>
            <div className="mb-4">
              <label className="block">Phone Number</label>
              <Input
                name="phoneNumber"
                value={formValues.phoneNumber}
                onChange={handleFormChange}
              />
            </div>
            <div className="mb-4">
              <label className="block">Region</label>
              <Input
                name="region"
                value={formValues.region}
                onChange={handleFormChange}
              />
            </div>
            <div className="mb-4">
              <label className="block">House & Street</label>
              <Input
                name="houseStreet"
                value={formValues.houseStreet}
                onChange={handleFormChange}
              />
            </div>
          </>
        )}
      </Modal>
    </div>
  );
};

export default UserList;
