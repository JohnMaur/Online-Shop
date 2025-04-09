import React, { useEffect, useState } from 'react';
import { Modal, Form, Select, InputNumber, Button, message } from 'antd';
import axios from 'axios';

const RestockModal = ({ visible, onCancel, onRestockSuccess, refresh }) => {
  const [form] = Form.useForm();
  const [stocks, setStocks] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [selectedStock, setSelectedStock] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (visible) {
      fetchStocks();
      fetchSuppliers();
      form.resetFields();
      setSelectedStock(null);
    }
  }, [visible]);

  const fetchStocks = async () => {
    const response = await axios.get('http://localhost:3000/api/stocks');
    setStocks(Array.isArray(response.data) ? response.data : []);
  };

  const fetchSuppliers = async () => {
    const response = await axios.get('http://localhost:3000/api/suppliers');
    setSuppliers(Array.isArray(response.data) ? response.data : []);
  };

  const handleRestock = async (values) => {
    try {
      setLoading(true);
      const { stockId, supplierId, supplierPrice, shopPrice, quantity } = values;
  
      // Make the API request to restock
      await axios.post('http://localhost:3000/api/restocks', {
        stockId,
        supplierId,
        supplierPrice: parseFloat(supplierPrice),
        shopPrice: parseFloat(shopPrice),
        quantity: parseInt(quantity),
      });
  
      message.success('Restocked successfully!');
      onRestockSuccess();
      form.resetFields();
      onCancel();
    } catch (error) {
      message.error('Failed to restock');
    } finally {
      setLoading(false);
    }
  };  

  return (
    <Modal
      title="Restock Product"
      open={visible}
      onCancel={onCancel}
      footer={null}
      destroyOnClose
    >
      <Form layout="vertical" form={form} onFinish={handleRestock}>
        <Form.Item name="stockId" label="Select Stock" rules={[{ required: true }]}>
          <Select
            placeholder="Choose stock"
            onChange={(value) => {
              const selected = stocks.find(stock => stock._id === value);
              form.setFieldsValue({ stockId: value });
              setSelectedStock(selected); // You need to add this to useState
            }}
          >
            {stocks.map(stock => (
              <Select.Option key={stock._id} value={stock._id}>
                {stock.product?.productName || 'Unnamed Product'}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        {selectedStock && (
          <div className="text-sm bg-gray-100 p-3 rounded mb-4">
            <p><strong>Product ID:</strong> {selectedStock.productID || 'N/A'}</p>
            <p><strong>Category:</strong> {selectedStock.product?.category?.[0] || 'N/A'}</p>
            <p><strong>Sub Category:</strong> {selectedStock.product?.subCategory || 'N/A'}</p>
            <p><strong>Brand:</strong> {selectedStock.product?.brand || 'N/A'}</p>
            <p><strong>Color:</strong> {selectedStock.product?.color || 'N/A'}</p>
          </div>
        )}

        <Form.Item name="supplierId" label="Select Supplier" rules={[{ required: true }]}>
          <Select placeholder="Choose supplier">
            {suppliers.map((supplier) => (
              <Select.Option key={supplier._id} value={supplier._id}>
                {supplier.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item name="supplierPrice" label="Supplier Price" rules={[{ required: true }]}>
          <InputNumber min={0} step={0.01} style={{ width: '100%' }} prefix="₱" />
        </Form.Item>

        <Form.Item name="shopPrice" label="Shop Price" rules={[{ required: true }]}>
          <InputNumber min={0} step={0.01} style={{ width: '100%' }} prefix="₱" />
        </Form.Item>

        <Form.Item name="quantity" label="Quantity" rules={[{ required: true }]}>
          <InputNumber min={1} style={{ width: '100%' }} />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading} block>
            Restock
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default RestockModal;
