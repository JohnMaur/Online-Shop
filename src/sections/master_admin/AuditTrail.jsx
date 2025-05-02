// import React, { useState } from 'react';
// import { NavigationBar, Header } from "../layout"

// const AuditTrail = () => {
//   const [isNavCollapsed, setIsNavCollapsed] = useState(false);

//   const toggleNav = () => {
//     setIsNavCollapsed(!isNavCollapsed);
//   };

//   return (
//     <div className={`flex flex-row-reverse max-md:flex-row w-full`}>
//       <div className='flex flex-col flex-1 h-screen'>
//         <Header
//           toggleNav={toggleNav}
//         />

//         <div className={`flex-1 overflow-auto mt-14 bg-[#EFEFEF]`}>
//           {/* Your content here */}
//           <p>Sorting - Staff - Customer</p>
//           <p>Table - Timestamps - Action - customer details</p>
//         </div>
//       </div>

//       <nav className={`max-md:hidden ${isNavCollapsed ? "w-20" : "w-56"} transition-width duration-300`}>
//         <NavigationBar
//           isNavCollapsed={isNavCollapsed}
//         />

//       </nav>

//     </div>
//   )
// }

// export default AuditTrail


import React, { useState, useEffect } from 'react';
import { Table, Select, Typography } from 'antd';
import axios from 'axios';
import { NavigationBar, Header, MobileAdminNavbar } from "../layout";

const { Title } = Typography;
const { Option } = Select;

const AuditTrail = () => {
  const [isNavCollapsed, setIsNavCollapsed] = useState(false);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [roleFilter, setRoleFilter] = useState('Staff');
  const [logs, setLogs] = useState([]);

  const toggleNav = () => {
    if (window.innerWidth <= 768) {
      setIsMobileNavOpen(!isMobileNavOpen);
    } else {
      setIsNavCollapsed(!isNavCollapsed);
    }
  };

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const response = await axios.get(`https://online-shop-server-1.onrender.com/api/audit-logs?role=${roleFilter}`);
        setLogs(response.data);
      } catch (error) {
        console.error("Error fetching audit logs:", error);
      }
    };

    fetchLogs();
  }, [roleFilter]);

  const columns = [
    {
      title: 'Timestamp',
      dataIndex: 'timestamp',
      key: 'timestamp',
      render: (text) => new Date(text).toLocaleString(),
    },
    ...(roleFilter === 'Customer'
      ? [{
        title: 'Recipient Name',
        dataIndex: ['accountInfo', 'recipientName'],
        key: 'recipientName',
      }]
      : [{
        title: 'Staff Fullname',
        dataIndex: ['accountInfo', 'staffFullname'],
        key: 'staffFullname',
      }]),
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
    },
    {
      title: 'Affected ID',
      dataIndex: 'affectedId',
      key: 'affectedId',
    },
  ];

  return (
    <div className={`flex flex-row-reverse max-md:flex-row w-full`}>
      <div className='flex flex-col flex-1 h-screen'>
        <Header toggleNav={toggleNav} />
        <MobileAdminNavbar isOpen={isMobileNavOpen} onClose={() => setIsMobileNavOpen(false)} />
        <div className="flex-1 overflow-auto mt-14 bg-[#EFEFEF] p-4">
          <Title level={4}>Audit Trail Logs</Title>

          <Select
            value={roleFilter}
            onChange={(value) => setRoleFilter(value)}
            style={{ width: 200, marginBottom: 20 }}
          >
            <Option value="Staff">Staff</Option>
            <Option value="Customer">Customer</Option>
          </Select>

          <div className='bg-white rounded-xl'>
            <Table
              columns={columns}
              dataSource={logs}
              rowKey="_id"
              bordered
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

export default AuditTrail;
