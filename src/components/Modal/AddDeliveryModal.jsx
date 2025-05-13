// import React, { useState, useEffect } from 'react';
// import { Modal, Form, Select, InputNumber, Button } from 'antd';

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
//   setQuantity,
//   vatPercentage,
// }) => {
//   const [form] = Form.useForm();
//   const [originalShopPrice, setOriginalShopPrice] = useState(null);

//   const resetModal = () => {
//     setSelectedProduct(null);
//     setSelectedSupplier(null);
//     setSupplierPrice(null);
//     setShopPrice(null);
//     setQuantity(null);
//     setOriginalShopPrice(null);
//     form.resetFields();
//   };

//   const handleClose = () => {
//     resetModal();
//     setIsModalOpen(false);
//   };

//   const onFinish = () => {
//     handleAddDelivery(shopPrice);
//     handleClose();
//   };

//   // Auto-apply VAT when original shop price or vat percentage changes
//   useEffect(() => {
//     if (originalShopPrice !== null && vatPercentage) {
//       const base = parseFloat(originalShopPrice);
//       const vat = base * (vatPercentage / 100);
//       setShopPrice(parseFloat((base + vat).toFixed(2)));
//     }
//   }, [originalShopPrice, vatPercentage]);

//   useEffect(() => {
//     if (!isModalOpen) form.resetFields();
//   }, [isModalOpen]);

//   return (
//     <Modal
//       title="Add Delivery"
//       open={isModalOpen}
//       onCancel={handleClose}
//       footer={null}
//       destroyOnClose
//     >
//       <Form layout="vertical" form={form} onFinish={onFinish}>
//         <Form.Item label="Select Product" name="productId" rules={[{ required: true }]}>
//           <Select
//             placeholder="Choose product"
//             onChange={(value) => {
//               const prod = products.find((p) => p._id === value);
//               setSelectedProduct(prod);
//             }}
//           >
//             {products.map((prod) => (
//               <Select.Option key={prod._id} value={prod._id}>
//                 {prod.productName}
//               </Select.Option>
//             ))}
//           </Select>
//         </Form.Item>

//         <Form.Item label="Select Supplier" name="supplierId" rules={[{ required: true }]}>
//           <Select
//             placeholder="Choose supplier"
//             onChange={(value) => {
//               const supplier = suppliers.find((s) => s._id === value);
//               setSelectedSupplier(supplier);
//             }}
//           >
//             {suppliers.map((sup) => (
//               <Select.Option key={sup._id} value={sup._id}>
//                 {sup.name}
//               </Select.Option>
//             ))}
//           </Select>
//         </Form.Item>

//         <Form.Item label="Supplier Price" name="supplierPrice" rules={[{ required: true }]}>
//           <InputNumber
//             min={0}
//             step={0.01}
//             style={{ width: '100%' }}
//             prefix="₱"
//             value={supplierPrice}
//             onChange={setSupplierPrice}
//             onKeyPress={(e) => {
//               if (!/[0-9.]/.test(e.key)) e.preventDefault();
//             }}
//             parser={(value) => value.replace(/[^\d.]/g, '')}
//             formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
//           />
//         </Form.Item>

//         <Form.Item
//           label="Shop Price (Before VAT)"
//           name="shopPrice"
//           rules={[
//             { required: true, message: 'Please input the shop price' },
//             {
//               validator: (_, value) => {
//                 if (supplierPrice === null || supplierPrice === undefined) return Promise.resolve();
//                 if (value >= supplierPrice) return Promise.resolve();
//                 return Promise.reject(
//                   new Error('Shop price must be equal to or higher than supplier price')
//                 );
//               },
//             },
//           ]}
//         >
//           <InputNumber
//             min={0}
//             step={0.01}
//             style={{ width: '100%' }}
//             prefix="₱"
//             value={originalShopPrice ?? ''}
//             onChange={(value) => {
//               setOriginalShopPrice(value);
//             }}
//             onKeyPress={(e) => {
//               if (!/[0-9.]/.test(e.key)) e.preventDefault();
//             }}
//             parser={(value) => value.replace(/[^\d.]/g, '')}
//             formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
//           />
//         </Form.Item>

//         {vatPercentage && originalShopPrice !== null && (
//           <Form.Item label={`Price with VAT (${vatPercentage}%)`}>
//             <InputNumber
//               min={0}
//               step={0.01}
//               style={{ width: '100%' }}
//               prefix="₱"
//               value={shopPrice}
//               disabled
//             />
//           </Form.Item>
//         )}

//         <Form.Item label="Quantity" name="quantity" rules={[{ required: true }]}>
//           <InputNumber
//             min={1}
//             style={{ width: '100%' }}
//             value={quantity}
//             onChange={setQuantity}
//             onKeyPress={(e) => {
//               if (!/[0-9]/.test(e.key)) e.preventDefault();
//             }}
//             parser={(value) => value.replace(/[^\d]/g, '')}
//           />
//         </Form.Item>

//         <Form.Item>
//           <div className="flex justify-end gap-2">
//             <Button onClick={handleClose}>Close</Button>
//             <Button type="primary" htmlType="submit">
//               Add
//             </Button>
//           </div>
//         </Form.Item>
//       </Form>
//     </Modal>
//   );
// };

// export default AddDeliveryModal;


import React, { useState, useEffect } from 'react';
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
  vatPercentage,
}) => {
  const [form] = Form.useForm();
  const [originalShopPrice, setOriginalShopPrice] = useState(null);

  const resetModal = () => {
    setSelectedProduct(null);
    setSelectedSupplier(null);
    setSupplierPrice(null);
    setShopPrice(null);
    setQuantity(null);
    setOriginalShopPrice(null);
    form.resetFields();
  };

  const handleClose = () => {
    resetModal();
    setIsModalOpen(false);
  };

  const onFinish = () => {
    handleAddDelivery(shopPrice);
    handleClose();
  };

  // Auto-apply VAT when original shop price or vat percentage changes
  useEffect(() => {
    if (originalShopPrice !== null && vatPercentage) {
      const base = parseFloat(originalShopPrice);
      const vat = base * (vatPercentage / 100);
      setShopPrice(parseFloat((base + vat).toFixed(2)));
    }
  }, [originalShopPrice, vatPercentage]);

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
            <p><strong>Product ID:</strong> {selectedProduct.productID || 'N/A'}</p>
            <p><strong>Category:</strong> {selectedProduct.category?.[0] || 'N/A'}</p>
            <p><strong>Sub Category:</strong> {selectedProduct.subCategory || 'N/A'}</p>
            <p><strong>Brand:</strong> {selectedProduct.brand || 'N/A'}</p>
            <p><strong>Color:</strong> {selectedProduct.color || 'N/A'}</p>
            <p><strong>Size:</strong> {selectedProduct.size || 'N/A'}</p>
            <p><strong>Sex:</strong> {selectedProduct.sex || 'N/A'}</p>
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
            onKeyPress={(e) => {
              if (!/[0-9.]/.test(e.key)) e.preventDefault();
            }}
            parser={(value) => value.replace(/[^\d.]/g, '')}
            formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
          />
        </Form.Item>

        <Form.Item
          label="Shop Price (Before VAT)"
          name="shopPrice"
          rules={[
            { required: true, message: 'Please input the shop price' },
            {
              validator: (_, value) => {
                if (supplierPrice === null || supplierPrice === undefined) return Promise.resolve();
                if (value >= supplierPrice) return Promise.resolve();
                return Promise.reject(
                  new Error('Shop price must be equal to or higher than supplier price')
                );
              },
            },
          ]}
        >
          <InputNumber
            min={0}
            step={0.01}
            style={{ width: '100%' }}
            prefix="₱"
            value={originalShopPrice ?? ''}
            onChange={(value) => {
              setOriginalShopPrice(value);
            }}
            onKeyPress={(e) => {
              if (!/[0-9.]/.test(e.key)) e.preventDefault();
            }}
            parser={(value) => value.replace(/[^\d.]/g, '')}
            formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
          />
        </Form.Item>

        {vatPercentage && originalShopPrice !== null && (
          <Form.Item label={`Price with VAT (${vatPercentage}%)`}>
            <InputNumber
              min={0}
              step={0.01}
              style={{ width: '100%' }}
              prefix="₱"
              value={shopPrice}
              disabled
            />
          </Form.Item>
        )}

        <Form.Item label="Quantity" name="quantity" rules={[{ required: true }]}>
          <InputNumber
            min={1}
            style={{ width: '100%' }}
            value={quantity}
            onChange={setQuantity}
            onKeyPress={(e) => {
              if (!/[0-9]/.test(e.key)) e.preventDefault();
            }}
            parser={(value) => value.replace(/[^\d]/g, '')}
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
