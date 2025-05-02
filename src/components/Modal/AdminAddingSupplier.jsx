// import React, { useState } from 'react';
// import { Modal, Input, Button, Form, Alert } from 'antd';
// import Swal from 'sweetalert2';
// import withReactContent from 'sweetalert2-react-content';

// const MySwal = withReactContent(Swal);

// const AdminAddingSupplier = ({ isOpen, onClose, refreshSuppliers }) => {
//   const [formData, setFormData] = useState({
//     name: '',
//     contactPerson: '',
//     email: '',
//     region: '',
//     houseStreet: '',
//     phone: '',
//   });

//   const [nameError, setNameError] = useState(null);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });

//     if (name === 'name') {
//       checkSupplierName(value);
//     }
//   };

//   const checkSupplierName = async (name) => {
//     if (name.trim()) {
//       try {
//         const response = await fetch('https://online-shop-server-1.onrender.com/api/check-supplier-name', {
//           method: 'POST',
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify({ name }),
//         });
//         if (response.ok) {
//           setNameError(null);
//         } else {
//           const data = await response.json();
//           setNameError(data.message);
//         }
//       } catch (error) {
//         console.error('Error checking supplier name:', error);
//       }
//     } else {
//       setNameError(null);
//     }
//   };

//   const handleSubmit = async () => {
//     // Check if any field is empty
//     const { name, contactPerson, email, region, houseStreet, phone } = formData;
//     if (!name || !contactPerson || !email || !region || !houseStreet || !phone) {
//       MySwal.fire({
//         icon: 'error',
//         title: 'All fields are required!',
//         text: 'Please fill out all fields before submitting.',
//       });
//       return;
//     }

//     if (nameError) {
//       MySwal.fire({
//         icon: 'error',
//         title: 'Supplier name is not available!',
//         text: 'Please choose a different supplier name.',
//       });
//       return;
//     }

//     try {
//       const response = await fetch('https://online-shop-server-1.onrender.com/api/adminAdd-supplier', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(formData),
//       });

//       const data = await response.json();

//       if (response.ok) {
//         refreshSuppliers();
//         onClose();
//         setFormData({
//           name: '',
//           contactPerson: '',
//           email: '',
//           region: '',
//           houseStreet: '',
//           phone: '',
//         });
//         MySwal.fire({
//           icon: 'success',
//           title: 'Supplier Added!',
//           text: data.message,
//         });
//       } else {
//         MySwal.fire({
//           icon: 'error',
//           title: 'Error',
//           text: data.message || 'Failed to add supplier.',
//         });
//       }
//     } catch (error) {
//       console.error('Error adding supplier:', error);
//       MySwal.fire({
//         icon: 'error',
//         title: 'Internal Server Error',
//         text: 'An error occurred while adding the supplier.',
//       });
//     }
//   };

//   return (
//     <Modal
//       title={<span className="text-lg font-semibold">Add Supplier</span>}
//       open={isOpen}
//       onCancel={onClose}
//       footer={[
//         <Button key="cancel" onClick={onClose} className="bg-gray-400 text-white hover:bg-gray-500">Cancel</Button>,
//         <Button key="submit" type="primary" onClick={handleSubmit} className="bg-blue-500 hover:bg-blue-600">Add Supplier</Button>,
//       ]}
//     >
//       <Form layout="vertical">
//         <Form.Item label="Supplier Name" required>
//           <Input
//             name="name"
//             value={formData.name}
//             onChange={handleChange}
//             placeholder="Enter supplier name"
//           />
//           {nameError && <Alert message={nameError} type="error" showIcon />}
//         </Form.Item>

//         <Form.Item label="Contact Person" required>
//           <Input
//             name="contactPerson"
//             value={formData.contactPerson}
//             onChange={handleChange}
//             placeholder="Enter contact person"
//           />
//         </Form.Item>

//         <Form.Item label="Email" required>
//           <Input
//             name="email"
//             type="email"
//             value={formData.email}
//             onChange={handleChange}
//             placeholder="Enter email"
//           />
//         </Form.Item>

//         <Form.Item label="Region" required>
//           <Input
//             name="region"
//             value={formData.region}
//             onChange={handleChange}
//             placeholder="Enter region"
//           />
//         </Form.Item>

//         <Form.Item label="Address" required>
//           <Input
//             name="houseStreet"
//             value={formData.houseStreet}
//             onChange={handleChange}
//             placeholder="Enter your Address"
//           />
//         </Form.Item>

//         <Form.Item label="Phone Number" required>
//           <Input
//             name="phone"
//             value={formData.phone}
//             placeholder="Enter phone number"
//             onChange={(e) => {
//               const onlyNums = e.target.value.replace(/\D/g, "");
//               if (onlyNums.length <= 12) {
//                 setFormData({ ...formData, phone: onlyNums });
//               }
//             }}
//             maxLength={12}
//           />
//         </Form.Item>
//       </Form>
//     </Modal>
//   );
// };

// export default AdminAddingSupplier;

import React, { useState } from 'react';
import { Modal, Input, Button, Form, Alert } from 'antd';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

const initialFormData = {
  name: '',
  contactPerson: '',
  email: '',
  region: '',
  houseStreet: '',
  phone: '',
};

const AdminAddingSupplier = ({ isOpen, onClose, refreshSuppliers }) => {
  const [formData, setFormData] = useState(initialFormData);
  const [fieldErrors, setFieldErrors] = useState({
    name: null,
    phone: null,
    houseStreet: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (['name', 'houseStreet'].includes(name)) {
      validateSupplierField(name, value);
    }
  };

  const handlePhoneChange = (e) => {
    const onlyNums = e.target.value.replace(/\D/g, '');
    if (onlyNums.length <= 11) {
      setFormData((prev) => ({ ...prev, phone: onlyNums }));
      validateSupplierField('phone', onlyNums);
    }
  };

  const validateSupplierField = async (field, value) => {
    if (!value.trim()) {
      setFieldErrors((prev) => ({ ...prev, [field]: null }));
      return;
    }

    try {
      const res = await fetch('https://online-shop-server-1.onrender.com/api/check-supplier-field', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ field, value }),
      });

      if (res.ok) {
        setFieldErrors((prev) => ({ ...prev, [field]: null }));
      } else {
        const data = await res.json();
        setFieldErrors((prev) => ({ ...prev, [field]: data.message }));
      }
    } catch (error) {
      console.error(`Error validating ${field}:`, error);
    }
  };

  const handleSubmit = async () => {
    const { name, contactPerson, email, region, houseStreet, phone } = formData;
  
    if (!name || !contactPerson || !email || !region || !houseStreet || !phone) {
      return MySwal.fire({
        icon: 'error',
        title: 'All fields are required!',
        text: 'Please fill out all fields before submitting.',
      });
    }
  
    if (fieldErrors.name || fieldErrors.phone || fieldErrors.houseStreet) {
      return MySwal.fire({
        icon: 'error',
        title: 'Validation Error',
        text: 'Please fix the errors before submitting.',
      });
    }
  
    try {
      const res = await fetch('https://online-shop-server-1.onrender.com/api/adminAdd-supplier', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
  
      const data = await res.json();
  
      if (res.ok) {
        // Refresh the list of suppliers
        refreshSuppliers();
  
        // Close the modal and reset the form
        onClose();
        setFormData(initialFormData);
        setFieldErrors({ name: null, phone: null, houseStreet: null });
  
        // Display success message with supplierID
        MySwal.fire({
          icon: 'success',
          title: 'Supplier Added!',
          text: `Supplier ID: ${data.supplierID}, ${data.message}`,
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
        <Button key="cancel" onClick={onClose} className="bg-gray-400 text-white hover:bg-gray-500">
          Cancel
        </Button>,
        <Button key="submit" type="primary" onClick={handleSubmit} className="bg-blue-500 hover:bg-blue-600">
          Add Supplier
        </Button>,
      ]}
    >
      <Form layout="vertical">
        <Form.Item label="Supplier Name" required>
          <Input
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter supplier name"
          />
          {fieldErrors.name && <Alert message={fieldErrors.name} type="error" showIcon />}
        </Form.Item>

        <Form.Item label="Contact Person" required>
          <Input
            name="contactPerson"
            value={formData.contactPerson}
            onChange={handleChange}
            placeholder="Enter contact person"
          />
        </Form.Item>

        <Form.Item label="Email" required>
          <Input
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter email"
          />
        </Form.Item>

        <Form.Item label="Region" required>
          <Input
            name="region"
            value={formData.region}
            onChange={handleChange}
            placeholder="Enter region"
          />
        </Form.Item>

        <Form.Item label="Address" required>
          <Input
            name="houseStreet"
            value={formData.houseStreet}
            onChange={handleChange}
            placeholder="Enter address"
          />
          {fieldErrors.houseStreet && <Alert message={fieldErrors.houseStreet} type="error" showIcon />}
        </Form.Item>

        <Form.Item label="Phone Number" required>
          <Input
            name="phone"
            value={formData.phone}
            onChange={handlePhoneChange}
            placeholder="Enter phone number"
            maxLength={11}
          />
          {fieldErrors.phone && <Alert message={fieldErrors.phone} type="error" showIcon />}
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AdminAddingSupplier;
