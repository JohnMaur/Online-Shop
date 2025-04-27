import React, { useState, useEffect } from 'react';
import { Table, Spin, Alert, Button, Modal, Input } from 'antd';
import { NavigationBar, Header, MobileAdminNavbar } from "../layout";

const StaffList = () => {
  const [isNavCollapsed, setIsNavCollapsed] = useState(false);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [staffList, setStaffList] = useState([]);
  const [loading, setLoading] = useState(false); // Track loading state
  const [error, setError] = useState(null); // Track error state
  const [editingStaff, setEditingStaff] = useState(null); // Track the staff being edited
  const [formValues, setFormValues] = useState({}); // Form data for editing

  const toggleNav = () => {
    if (window.innerWidth <= 768) {
      setIsMobileNavOpen(!isMobileNavOpen);
    } else {
      setIsNavCollapsed(!isNavCollapsed);
    }
  };

  // Fetch staff list on page load
  const fetchStaffList = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('http://localhost:3000/api/staff-list');
      if (!response.ok) {
        throw new Error('Failed to fetch staff data');
      }

      const data = await response.json();
      setStaffList(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStaffList(); // Fetch data on component mount
  }, []);

  const handleEdit = (staff) => {
    setEditingStaff(staff);
    setFormValues(staff); // Pre-fill form with staff data
  };

  const handleModalClose = () => {
    setEditingStaff(null); // Close modal
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    try {
      const updatedData = {
        staffUsername: formValues.username, // Ensure that 'username' is passed
        ...formValues,
        newPassword: formValues.password && formValues.password !== "*****" ? formValues.password : undefined,
      };

      const response = await fetch(`http://localhost:3000/api/update-staffAccount`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData),
      });

      if (!response.ok) {
        throw new Error('Failed to update staff');
      }

      const updatedStaff = await response.json();

      // Refetch the updated staff list
      await fetchStaffList(); // Refetch the staff data after updating

      handleModalClose(); // Close the modal after saving
    } catch (error) {
      setError(error.message); // Handle error
    }
  };

  const handleDelete = async (username) => {
    try {
      const confirmed = window.confirm(`Are you sure you want to delete staff "${username}"?`);
      if (!confirmed) return;

      const response = await fetch(`http://localhost:3000/api/staff/${username}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete staff');
      }

      // Refresh staff list after deletion
      fetchStaffList();
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
      render: (text) => '*****',
    },
    {
      title: 'Full Name',
      dataIndex: 'staffFullname',
      key: 'staffFullname',
    },
    {
      title: 'Contact Person',
      dataIndex: 'contactPerson',
      key: 'contactPerson',
    },
    {
      title: 'Phone Number',
      dataIndex: 'phoneNumber',
      key: 'phoneNumber',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
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
      title: 'Actions',
      key: 'actions',
      render: (text, staff) => (
        <div className='w-44'>
          <Button type="primary" onClick={() => handleEdit(staff)} style={{ marginRight: 8 }}>
            Edit
          </Button>
          <Button danger onClick={() => handleDelete(staff.username)}>
            Delete
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className={`flex flex-row-reverse max-md:flex-row w-full`}>
      <div className="flex flex-col flex-1 h-screen">
        <Header toggleNav={toggleNav} />
        <MobileAdminNavbar isOpen={isMobileNavOpen} onClose={() => setIsMobileNavOpen(false)} />
        <div className={`flex-1 overflow-auto mt-14 bg-[#EFEFEF] p-6`}>
          <h2 className="text-xl font-bold mb-4">Staff List</h2>

          {/* {loading ? (
            <div className="flex justify-center">
              <Spin size="large" />
            </div>
          ) : error ? (
            <Alert message={`Error: ${error}`} type="error" showIcon />
          ) : staffList.length === 0 ? (
            <p>No staff found.</p>
          ) : (
            <div className='max-md:w-[100vw] bg-white mt-2 rounded-xl max-md:overflow-x-auto max-md:whitespace-nowrap'>
              <Table dataSource={staffList} columns={columns} rowKey="username" pagination={{ pageSize: 5 }} />
            </div>
          )} */}
          {loading ? (
            <div className="flex justify-center">
              <Spin size="large" />
            </div>
          ) : error ? (
            <Alert message={`Error: ${error}`} type="error" showIcon />
          ) : staffList.length === 0 ? (
            <div className="flex justify-center items-center h-40">
              <p className="text-gray-500 text-lg">No staff found.</p>
            </div>
          ) : (
            <div className='max-md:w-[100vw] bg-white mt-2 rounded-xl max-md:overflow-x-auto max-md:whitespace-nowrap'>
              <Table dataSource={staffList} columns={columns} rowKey="username" pagination={{ pageSize: 5 }} />
            </div>
          )}

        </div>
      </div>

      <nav className={`max-md:hidden ${isNavCollapsed ? 'w-20' : 'w-56'} transition-width duration-300`}>
        <NavigationBar isNavCollapsed={isNavCollapsed} />
      </nav>

      {/* Edit Staff Modal */}
      <Modal
        title="Edit Staff"
        visible={!!editingStaff}
        onCancel={handleModalClose}
        onOk={handleSave}
        okText="Save"
        cancelText="Cancel"
      >
        {editingStaff && (
          <>
            <div className="mb-4">
              <label className="block">Full Name</label>
              <Input
                name="staffFullname"
                value={formValues.staffFullname}
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
              <label className="block">Email</label>
              <Input
                name="email"
                value={formValues.email}
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
            <div className="mb-4">
              <label className="block">Password</label>
              <Input
                name="password"
                type="password"
                value={formValues.password}
                onChange={handleFormChange}
                placeholder="Enter new password (leave blank to keep current)"
              />
            </div>
          </>
        )}
      </Modal>
    </div>
  );
};

export default StaffList;
