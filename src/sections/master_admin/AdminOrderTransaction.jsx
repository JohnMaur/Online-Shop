import React, { useEffect, useState } from 'react';
import { Table, Select, message } from 'antd';
import axios from 'axios';
import { NavigationBar, Header, MobileAdminNavbar } from "../layout"

const AdminOrderTransaction = () => {
  const [isNavCollapsed, setIsNavCollapsed] = useState(false);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sortType, setSortType] = useState('received'); // Default to order received

  const toggleNav = () => {
    if (window.innerWidth <= 768) {
      setIsMobileNavOpen(!isMobileNavOpen);
    } else {
      setIsNavCollapsed(!isNavCollapsed);
    }
  };

  const fetchData = async (type) => {
    setLoading(true);
    try {
      const url = type === 'canceled'
        ? 'http://localhost:3000/api/all-canceled-orders'
        : 'http://localhost:3000/api/all-order-received';

      const res = await axios.get(url);
      setData(res.data);
    } catch (err) {
      console.error("Fetch error:", err);
      message.error("Failed to load data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(sortType);
  }, [sortType]);

  const canceledColumns = [
    { title: 'Product Name', dataIndex: 'productName' },
    { title: 'Price', dataIndex: 'price' },
    { title: 'Quantity', dataIndex: 'quantity' },
    { title: 'Payment Method', dataIndex: 'paymentMethod' },
    { title: 'Canceled Reason', dataIndex: 'canceledReason' },
    { title: 'Canceled Date', dataIndex: 'canceledDate' },
  ];

  const receivedColumns = [
    { title: 'Product Name', dataIndex: 'productName' },
    { title: 'Price', dataIndex: 'price' },
    { title: 'Quantity', dataIndex: 'quantity' },
    { title: 'Payment Method', dataIndex: 'paymentMethod' },
    { title: 'Order Received Date', dataIndex: 'orderReceivedDate' },
  ];

  return (
    <div className={`flex flex-row-reverse max-md:flex-row w-full`}>
      <div className='flex flex-col flex-1 h-screen'>
        <Header toggleNav={toggleNav} />
        <MobileAdminNavbar isOpen={isMobileNavOpen} onClose={() => setIsMobileNavOpen(false)} />
        <div className={`flex-1 overflow-auto mt-14 bg-[#EFEFEF] p-5`}>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold">Order Transactions</h2>
            <Select
              defaultValue="received"
              style={{ width: 200 }}
              onChange={value => setSortType(value)}
            >
              <Option value="received">Order Received</Option>
              <Option value="canceled">Canceled Order</Option>
            </Select>
          </div>

           <div className='max-md:w-[100vw] bg-white mt-2 rounded-xl max-md:overflow-x-auto max-md:whitespace-nowrap'>
            <Table
              dataSource={data}
              columns={sortType === 'canceled' ? canceledColumns : receivedColumns}
              loading={loading}
              rowKey="_id"
              pagination={{ pageSize: 5 }}
            />
          </div>
        </div>
      </div>

      <nav className={`max-md:hidden ${isNavCollapsed ? "w-20" : "w-56"} transition-width duration-300`}>
        <NavigationBar isNavCollapsed={isNavCollapsed} />
      </nav>
    </div>
  );
};

export default AdminOrderTransaction
