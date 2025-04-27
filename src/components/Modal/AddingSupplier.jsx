import React, { useState, useEffect } from 'react';
import { Modal, Input, Button, Form, Alert } from 'antd';

const SupplierModal = ({ isOpen, onClose, refreshSuppliers, staffUsername }) => {
  const [formData, setFormData] = useState({
    name: '',
    contactPerson: '',
    email: '',
    region: '',
    houseStreet: '',
    phone: '',
    staffUsername: '',
  });

  const [nameError, setNameError] = useState(null); // To store the name validation error

  useEffect(() => {
    setFormData((prev) => ({ ...prev, staffUsername }));
  }, [staffUsername]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === 'name') {
      checkSupplierName(value); // Check name availability whenever the name changes
    }
  };

  const checkSupplierName = async (name) => {
    if (name.trim()) {
      try {
        const response = await fetch('http://localhost:3000/api/check-supplier-name', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name }),
        });
        if (response.ok) {
          setNameError(null); // No error, name is available
        } else {
          const data = await response.json();
          setNameError(data.message); // Set error message if name is taken
        }
      } catch (error) {
        console.error('Error checking supplier name:', error);
      }
    } else {
      setNameError(null); // Reset error if name is empty
    }
  };

  const handleSubmit = async () => {
    if (nameError) {
      alert('Please fix the errors before submitting.');
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/api/add-supplier', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        refreshSuppliers();
        onClose();
        setFormData({
          name: '',
          contactPerson: '',
          email: '',
          region: '',
          houseStreet: '',
          phone: '',
          staffUsername: staffUsername,
        });
      } else {
        alert('Failed to add supplier.');
      }
    } catch (error) {
      console.error('Error adding supplier:', error);
      alert('An error occurred while adding the supplier.');
    }
  };

  return (
    <Modal
      title={<span className="text-lg font-semibold">Add Supplier</span>}
      open={isOpen}
      onCancel={onClose}
      footer={[
        <Button key="cancel" onClick={onClose} className="bg-gray-400 text-white hover:bg-gray-500">Cancel</Button>,
        <Button key="submit" type="primary" onClick={handleSubmit} className="bg-blue-500 hover:bg-blue-600">Add Supplier</Button>,
      ]}
    >
      <Form layout="vertical">
        <Form.Item label="Supplier Name">
          <Input 
            name="name" 
            value={formData.name} 
            onChange={handleChange} 
            placeholder="Enter supplier name" 
          />
          {nameError && <Alert message={nameError} type="error" showIcon />}
        </Form.Item>

        <Form.Item label="Contact Person">
          <Input name="contactPerson" value={formData.contactPerson} onChange={handleChange} placeholder="Enter contact person" />
        </Form.Item>

        <Form.Item label="Email">
          <Input name="email" type="email" value={formData.email} onChange={handleChange} placeholder="Enter email" />
        </Form.Item>

        <Form.Item label="Region">
          <Input name="region" value={formData.region} onChange={handleChange} placeholder="Enter region" />
        </Form.Item>

        <Form.Item label="House No./Street">
          <Input name="houseStreet" value={formData.houseStreet} onChange={handleChange} placeholder="Enter house/street" />
        </Form.Item>

        <Form.Item label="Phone Number">
          <Input name="phone" value={formData.phone} onChange={handleChange} placeholder="Enter phone number" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default SupplierModal;
