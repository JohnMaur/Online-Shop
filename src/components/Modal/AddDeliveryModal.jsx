// import React, { useState } from 'react';

// const AddDeliveryModal = ({ 
//   isModalOpen, 
//   setIsModalOpen, 
//   products, 
//   suppliers, 
//   handleAddDelivery, 
//   selectedProduct, 
//   setSelectedProduct, 
//   selectedSupplier, 
//   setSelectedSupplier, 
//   supplierPrice, 
//   setSupplierPrice, 
//   shopPrice, 
//   setShopPrice, 
//   quantity, 
//   setQuantity 
// }) => {
  
//   const resetModal = () => {
//     setSelectedProduct(null);
//     setSelectedSupplier(null);
//     setSupplierPrice('');
//     setShopPrice('');
//     setQuantity('');
//   };

//   if (!isModalOpen) return null;

//   return (
//     <div className="fixed inset-0 flex justify-center items-center z-50">
//       <div className="bg-white p-6 rounded-lg w-full max-w-md">
//         <h2 className="text-xl font-bold mb-4">Add Delivery</h2>  

//         <label className="block mb-1 font-medium">Select Product</label>
//         <select
//           className="w-full p-2 border rounded mb-3"
//           onChange={(e) => {
//             const prod = products.find(p => p._id === e.target.value);
//             setSelectedProduct(prod);
//           }}
//         >
//           <option value="">-- Select Product --</option>
//           {products.map(prod => (
//             <option key={prod._id} value={prod._id}>{prod.productName}</option>
//           ))}
//         </select>

//         {selectedProduct && (
//           <div className="text-sm bg-gray-100 p-3 rounded mb-4">
//             <p><strong>Category:</strong> {selectedProduct.category}</p>
//             <p><strong>Sub Category:</strong> {selectedProduct.subCategory}</p>
//             <p><strong>Brand:</strong> {selectedProduct.brand}</p>
//             <p><strong>Color:</strong> {selectedProduct.color}</p>
//           </div>
//         )}

//         <label className="block mb-1 font-medium">Select Supplier</label>
//         <select
//           className="w-full p-2 border rounded mb-3"
//           onChange={(e) => {
//             const supplier = suppliers.find(s => s._id === e.target.value);
//             setSelectedSupplier(supplier);
//           }}
//         >
//           <option value="">-- Select Supplier --</option>
//           {suppliers.map(sup => (
//             <option key={sup._id} value={sup._id}>{sup.name}</option>
//           ))}
//         </select>

//         <input
//           type="number"
//           placeholder="Supplier Price"
//           value={supplierPrice}
//           onChange={(e) => setSupplierPrice(e.target.value)}
//           className="w-full p-2 border rounded mb-3"
//         />
//         <input
//           type="number"
//           placeholder="Shop Price"
//           value={shopPrice}
//           onChange={(e) => setShopPrice(e.target.value)}
//           className="w-full p-2 border rounded mb-3"
//         />
//         <input
//           type="number"
//           placeholder="Quantity"
//           value={quantity}
//           onChange={(e) => setQuantity(e.target.value)}
//           className="w-full p-2 border rounded mb-4"
//         />

//         <div className="flex justify-end gap-2">
//           <button onClick={() => { resetModal(); setIsModalOpen(false); }} className="px-4 py-2 bg-gray-300 rounded">Close</button>
//           <button onClick={handleAddDelivery} className="px-4 py-2 bg-blue-600 text-white rounded">Add</button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AddDeliveryModal;


import React, { useEffect } from 'react';
import { Modal, Form, Select, InputNumber, Button } from 'antd';

const AddDeliveryModal = ({
  isModalOpen,
  setIsModalOpen,
  products,
  suppliers,
  handleAddDelivery,
  selectedProduct,
  setSelectedProduct,
  selectedSupplier,
  setSelectedSupplier,
  supplierPrice,
  setSupplierPrice,
  shopPrice,
  setShopPrice,
  quantity,
  setQuantity,
}) => {
  const [form] = Form.useForm();

  const resetModal = () => {
    setSelectedProduct(null);
    setSelectedSupplier(null);
    setSupplierPrice('');
    setShopPrice('');
    setQuantity('');
    form.resetFields();
  };

  const handleClose = () => {
    resetModal();
    setIsModalOpen(false);
  };

  const onFinish = () => {
    handleAddDelivery();
    handleClose();
  };

  useEffect(() => {
    if (!isModalOpen) form.resetFields();
  }, [isModalOpen]);

  return (
    <Modal
      title="Add Delivery"
      open={isModalOpen}
      onCancel={handleClose}
      footer={null}
      destroyOnClose
    >
      <Form layout="vertical" form={form} onFinish={onFinish}>
        <Form.Item label="Select Product" name="productId" rules={[{ required: true }]}>
          <Select
            placeholder="Choose product"
            onChange={(value) => {
              const prod = products.find((p) => p._id === value);
              setSelectedProduct(prod);
            }}
          >
            {products.map((prod) => (
              <Select.Option key={prod._id} value={prod._id}>
                {prod.productName}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        {selectedProduct && (
          <div className="text-sm bg-gray-100 p-3 rounded mb-4">
            <p><strong>Category:</strong> {selectedProduct.category}</p>
            <p><strong>Sub Category:</strong> {selectedProduct.subCategory}</p>
            <p><strong>Brand:</strong> {selectedProduct.brand}</p>
            <p><strong>Color:</strong> {selectedProduct.color}</p>
          </div>
        )}

        <Form.Item label="Select Supplier" name="supplierId" rules={[{ required: true }]}>
          <Select
            placeholder="Choose supplier"
            onChange={(value) => {
              const supplier = suppliers.find((s) => s._id === value);
              setSelectedSupplier(supplier);
            }}
          >
            {suppliers.map((sup) => (
              <Select.Option key={sup._id} value={sup._id}>
                {sup.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item label="Supplier Price" name="supplierPrice" rules={[{ required: true }]}>
          <InputNumber
            min={0}
            step={0.01}
            style={{ width: '100%' }}
            prefix="₱"
            value={supplierPrice}
            onChange={setSupplierPrice}
          />
        </Form.Item>

        <Form.Item label="Shop Price" name="shopPrice" rules={[{ required: true }]}>
          <InputNumber
            min={0}
            step={0.01}
            style={{ width: '100%' }}
            prefix="₱"
            value={shopPrice}
            onChange={setShopPrice}
          />
        </Form.Item>

        <Form.Item label="Quantity" name="quantity" rules={[{ required: true }]}>
          <InputNumber
            min={1}
            style={{ width: '100%' }}
            value={quantity}
            onChange={setQuantity}
          />
        </Form.Item>

        <Form.Item>
          <div className="flex justify-end gap-2">
            <Button onClick={handleClose}>Close</Button>
            <Button type="primary" htmlType="submit">
              Add
            </Button>
          </div>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddDeliveryModal;
