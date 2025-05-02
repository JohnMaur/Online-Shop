import React, { useState, useEffect } from 'react';
import { Modal, Input, Button, Form, Alert } from 'antd';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

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

  const [errors, setErrors] = useState({ name: null, phone: null, houseStreet: null });

  useEffect(() => {
    setFormData((prev) => ({ ...prev, staffUsername }));
  }, [staffUsername]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (['name', 'phone', 'houseStreet'].includes(name)) {
      checkUniqueField(name, value);
    }
  };

  const checkUniqueField = async (field, value) => {
    if (value.trim()) {
      try {
        const response = await fetch('https://online-shop-server-1.onrender.com/api/check-supplier-field', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ field, value }),
        });
        const data = await response.json();

        if (response.ok) {
          setErrors((prev) => ({ ...prev, [field]: null }));
        } else {
          setErrors((prev) => ({ ...prev, [field]: data.message }));
        }
      } catch (error) {
        console.error('Error checking field:', error);
      }
    } else {
      setErrors((prev) => ({ ...prev, [field]: null }));
    }
  };

  const handleSubmit = async () => {
    const { name, contactPerson, email, region, houseStreet, phone } = formData;
  
    if (!name || !contactPerson || !email || !region || !houseStreet || !phone) {
      MySwal.fire({
        icon: 'error',
        title: 'All fields are required!',
        text: 'Please fill out all fields before submitting.',
      });
      return;
    }
  
    if (errors.name || errors.phone || errors.houseStreet) {
      MySwal.fire({
        icon: 'error',
        title: 'Validation Error!',
        text: 'Please fix the errors before submitting.',
      });
      return;
    }
  
    // ✨ Generate a random supplier ID
    const supplierID = 'SUP-' + Math.random().toString(36).substr(2, 9).toUpperCase();
  
    try {
      const response = await fetch('https://online-shop-server-1.onrender.com/api/add-supplier', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, supplierID }), // 👈 Add supplierID here
      });
  
      const data = await response.json();
  
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
        setErrors({ name: null, phone: null, houseStreet: null });
        MySwal.fire({
          icon: 'success',
          title: 'Supplier Added!',
          text: data.message,
        });
      } else {
        MySwal.fire({
          icon: 'error',
          title: 'Error',
          text: data.message || 'Failed to add supplier.',
        });
      }
    } catch (error) {
      console.error('Error adding supplier:', error);
      MySwal.fire({
        icon: 'error',
        title: 'Internal Server Error',
        text: 'An error occurred while adding the supplier.',
      });
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
          {errors.name && <Alert message={errors.name} type="error" showIcon />}
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
          {errors.houseStreet && <Alert message={errors.houseStreet} type="error" showIcon />}
        </Form.Item>

        <Form.Item label="Phone Number">
          <Input
            name="phone"
            value={formData.phone}
            placeholder="Enter phone number"
            onChange={(e) => {
              const onlyNums = e.target.value.replace(/\D/g, "");
              if (onlyNums.length <= 11) {
                handleChange({ target: { name: 'phone', value: onlyNums } });
              }
            }}
            maxLength={11}
          />
          {errors.phone && <Alert message={errors.phone} type="error" showIcon />}
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default SupplierModal;
