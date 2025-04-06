import React, { useState } from 'react';
import { Modal, Input, Button } from 'antd';

const UpdateSupplier = ({ isOpen, onClose, supplier, onUpdate }) => {
  const [formData, setFormData] = useState({
    name: supplier?.name || '',
    contactPerson: supplier?.contactPerson || '',
    email: supplier?.email || '',
    region: supplier?.region || '',
    address: supplier?.address || '',
    phone: supplier?.phone || '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    onUpdate(formData);
    onClose();
  };

  return (
    <Modal
      title="Update Supplier"
      open={isOpen}
      onCancel={onClose}
      footer={[
        <Button key="cancel" onClick={onClose}>Cancel</Button>,
        <Button key="submit" type="primary" onClick={handleSubmit}>
          Update
        </Button>,
      ]}
    >
      <Input name="name" placeholder="Supplier Name" value={formData.name} onChange={handleChange} className="mb-2"/>
      <Input name="contactPerson" placeholder="Contact Person" value={formData.contactPerson} onChange={handleChange} className="mb-2"/>
      <Input name="email" placeholder="Email" value={formData.email} onChange={handleChange} className="mb-2"/>
      <Input name="region" placeholder="Region" value={formData.region} onChange={handleChange} className="mb-2"/>
      <Input name="address" placeholder="Address" value={formData.address} onChange={handleChange} className="mb-2"/>
      <Input name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleChange} className="mb-2"/>
    </Modal>
  );
};

export default UpdateSupplier;
