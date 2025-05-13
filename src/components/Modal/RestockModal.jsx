import React, { useEffect, useState } from 'react';
import { Modal, Form, Select, InputNumber, Button, message } from 'antd';
import axios from 'axios';

const RestockModal = ({ visible, onCancel, onRestockSuccess, refresh, restockAPI, staffUsername }) => {
  const [form] = Form.useForm();
  const [stocks, setStocks] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [selectedStock, setSelectedStock] = useState(null);
  const [loading, setLoading] = useState(false);
  const [vat, setVat] = useState(0);
  const [isVatEnabled, setIsVatEnabled] = useState(false); // You can control this based on admin settings

  useEffect(() => {
    if (visible) {
      fetchStocks();
      fetchSuppliers();
      fetchVAT();
      form.resetFields();
      setSelectedStock(null);
    }
  }, [visible]);

  const fetchVAT = async () => {
    try {
      const res = await axios.get('https://online-shop-server-1.onrender.com/api/admin/vat');
      if (res.data && res.data.value) {
        setVat(res.data.value);
        setIsVatEnabled(true); // or however your backend indicates it's enabled
      }
    } catch (err) {
      console.error('Failed to fetch VAT:', err);
    }
  };

  const fetchStocks = async () => {
    const response = await axios.get('https://online-shop-server-1.onrender.com/api/stocks');
    setStocks(Array.isArray(response.data) ? response.data : []);
  };

  const fetchSuppliers = async () => {
    const response = await axios.get('https://online-shop-server-1.onrender.com/api/suppliers');
    setSuppliers(Array.isArray(response.data) ? response.data : []);
  };

  const handleRestock = async (values) => {
    try {
      setLoading(true);
      const { stockId, supplierId, supplierPrice, shopPrice, quantity } = values;

      let finalShopPrice = parseFloat(shopPrice);

      if (isVatEnabled) {
        const vatAmount = finalShopPrice * (vat / 100);
        finalShopPrice += vatAmount;
      }

      await axios.post(`https://online-shop-server-1.onrender.com/${restockAPI}`, {
        stockId,
        supplierId,
        supplierPrice: parseFloat(supplierPrice),
        shopPrice: parseFloat(finalShopPrice.toFixed(2)), // now includes VAT
        quantity: parseInt(quantity),
        staffUsername: staffUsername || null,
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
            <p><strong>Size:</strong> {selectedStock.product?.size || 'N/A'}</p>
            <p><strong>Sex:</strong> {selectedStock.product?.gender || 'N/A'}</p>
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
          <InputNumber
            min={0}
            step={0.01}
            style={{ width: '100%' }}
            prefix="₱"
            onKeyPress={(e) => {
              const allowedChars = /[0-9.]/
              if (!allowedChars.test(e.key)) {
                e.preventDefault();
              }
            }}
            parser={(value) => value.replace(/[^\d.]/g, '')}
            formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
          />
        </Form.Item>

        <Form.Item
          name="shopPrice"
          label="Shop Price"
          rules={[
            { required: true, message: 'Please enter shop price' },
            ({ getFieldValue }) => ({
              validator(_, value) {
                const supplierPrice = getFieldValue('supplierPrice');
                if (value >= supplierPrice) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('Shop price must be equal to or greater than supplier price'));
              },
            }),
          ]}
        >
          <InputNumber
            min={0}
            step={0.01}
            style={{ width: '100%' }}
            prefix="₱"
            onKeyPress={(e) => {
              const allowedChars = /[0-9.]/
              if (!allowedChars.test(e.key)) {
                e.preventDefault();
              }
            }}
            parser={(value) => value.replace(/[^\d.]/g, '')}
            formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
          />
        </Form.Item>

        {isVatEnabled && form.getFieldValue('shopPrice') && (
          <div className="text-xs text-gray-500 mb-2">
            Final Price with VAT ({vat}%): ₱
            {(
              parseFloat(form.getFieldValue('shopPrice')) +
              (parseFloat(form.getFieldValue('shopPrice')) * (vat / 100))
            ).toFixed(2)}
          </div>
        )}

        <Form.Item name="quantity" label="Quantity" rules={[{ required: true }]}>
          <InputNumber
            min={1}
            style={{ width: '100%' }}
            onKeyPress={(e) => {
              const allowedChars = /[0-9]/
              if (!allowedChars.test(e.key)) {
                e.preventDefault();
              }
            }}
            parser={(value) => value.replace(/[^\d]/g, '')}
          />
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
