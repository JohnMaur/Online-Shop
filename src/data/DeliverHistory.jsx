import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import axios from 'axios';

const DeliveryHistory = ({ refresh, setTotalDeliveredCost }) => {
  const [deliveryHistory, setDeliveryHistory] = useState([]);

  const fetchDeliveryHistory = async () => {
    try {
      const res = await axios.get('https://online-shop-server-1.onrender.com/api/delivery-history');
      setDeliveryHistory(res.data);

      const total = res.data.reduce((sum, item) => sum + item.totalCost, 0);
      setTotalDeliveredCost(total);
    } catch (error) {
      console.error("Failed to fetch delivery history", error);
    }
  };

  useEffect(() => {
    fetchDeliveryHistory();
  }, [refresh]);

  const historyColumns = [
    {
      title: 'Product Name',
      dataIndex: ['product', 'productName'],
      key: 'productName'
    },
    {
      title: 'Product ID',
      dataIndex: 'productID',
      key: 'productID'
    },
    {
      title: 'Category',
      dataIndex: ['product', 'category'],
      key: 'category'
    },
    {
      title: 'Sub Category',
      dataIndex: ['product', 'subCategory'],
      key: 'subCategory'
    },
    {
      title: 'Supplier',
      dataIndex: ['supplier', 'name'],
      key: 'supplier'
    },
    {
      title: 'Supplier Price',
      dataIndex: 'supplierPrice',
      key: 'supplierPrice',
      render: price => `₱${price.toFixed(2)}`
    },
    {
      title: 'Shop Price',
      dataIndex: 'shopPrice',
      key: 'shopPrice',
      render: price => `₱${price.toFixed(2)}`
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      key: 'quantity'
    },
    {
      title: 'Total Cost',
      dataIndex: 'totalCost',
      key: 'totalCost',
      render: cost => `₱${cost.toFixed(2)}`
    },
    {
      title: 'Delivered At',
      dataIndex: 'deliveredAt',
      key: 'deliveredAt',
      render: date => new Date(date).toLocaleString()
    }
  ];

  return (
    <div className="mt-10">
      <p className="text-2xl font-semibold mb-4">Delivery History</p>
      <div className='max-md:w-[100vw] bg-white mt-2 rounded-xl max-md:overflow-x-auto whitespace-nowrap'>
        <Table
          dataSource={deliveryHistory}
          rowKey="_id"
          columns={historyColumns}
          pagination={{ pageSize: 5 }}
          className="bg-white rounded-lg shadow"
        />
      </div>

    </div>
  );
};

export default DeliveryHistory;
