import React, { useState, useEffect } from 'react';
import { Modal, Input, Button, Form } from 'antd';

const UpdateSupplier = ({ isOpen, onClose, supplier, onUpdate }) => {
  const [phone, setPhone] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    contactPerson: '',
    email: '',
    region: '',
    address: '',
    phone: '',
  });

  useEffect(() => {
    if (supplier) {
      setFormData({
        name: supplier.name || '',
        contactPerson: supplier.contactPerson || '',
        email: supplier.email || '',
        region: supplier.region || '',
        address: supplier.houseStreet || '',
        phone: supplier.phone || '',
      });
    }
  }, [supplier]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    onUpdate(formData);
    onClose();
  };

  return (
    <Modal
      title={<h2 className="text-xl font-semibold text-gray-800">Update Supplier Information</h2>}
      open={isOpen}
      onCancel={onClose}
      footer={[
        <Button key="cancel" onClick={onClose} className="rounded-md">
          Cancel
        </Button>,
        <Button key="submit" type="primary" onClick={handleSubmit} className="bg-blue-600 hover:bg-blue-700 rounded-md">
          Update
        </Button>,
      ]}
    >
      <Form layout="vertical" className="p-2">
        <Form.Item label="Supplier Name">
          <Input
            name="name"
            placeholder="Enter supplier name"
            value={formData.name}
            onChange={handleChange}
            className="rounded-md"
          />
        </Form.Item>

        <Form.Item label="Contact Person">
          <Input
            name="contactPerson"
            placeholder="Enter contact person"
            value={formData.contactPerson}
            onChange={handleChange}
            className="rounded-md"
          />
        </Form.Item>

        <Form.Item label="Email">
          <Input
            name="email"
            placeholder="Enter email address"
            value={formData.email}
            onChange={handleChange}
            className="rounded-md"
          />
        </Form.Item>

        <Form.Item label="Region">
          <Input
            name="region"
            placeholder="Enter region"
            value={formData.region}
            onChange={handleChange}
            className="rounded-md"
          />
        </Form.Item>

        <Form.Item label="Address">
          <Input
            name="address"
            placeholder="Enter house/street"
            value={formData.address}
            onChange={handleChange}
            className="rounded-md"
          />
        </Form.Item>

        <Form.Item label="Phone Number">
          <Input
            name="phone"
            placeholder="Enter phone number"
            value={formData.phone}
            onChange={(e) => {
              const onlyNums = e.target.value.replace(/\D/g, "");
              if (onlyNums.length <= 12) {
                setFormData({ ...formData, phone: onlyNums });
              }
            }}
            maxLength={12}
            className="rounded-md"
          />  
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default UpdateSupplier;
