// // import React, { useEffect, useState } from 'react';
// // import { Table, Select, message } from 'antd';
// // import axios from 'axios';
// // import { NavigationBar, Header, MobileAdminNavbar } from "../layout"

// // const AdminOrderTransaction = () => {
// //   const [isNavCollapsed, setIsNavCollapsed] = useState(false);
// //   const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
// //   const [data, setData] = useState([]);
// //   const [loading, setLoading] = useState(false);
// //   const [sortType, setSortType] = useState('received'); // Default to order received

// //   const toggleNav = () => {
// //     if (window.innerWidth <= 768) {
// //       setIsMobileNavOpen(!isMobileNavOpen);
// //     } else {
// //       setIsNavCollapsed(!isNavCollapsed);
// //     }
// //   };

// //   const fetchData = async (type) => {
// //     setLoading(true);
// //     try {
// //       const url = type === 'canceled'
// //         ? 'https://online-shop-server-1.onrender.com/api/all-canceled-orders'
// //         : 'https://online-shop-server-1.onrender.com/api/all-order-received';

// //       const res = await axios.get(url);
// //       setData(res.data);
// //     } catch (err) {
// //       console.error("Fetch error:", err);
// //       message.error("Failed to load data.");
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   useEffect(() => {
// //     fetchData(sortType);
// //   }, [sortType]);

// //   const canceledColumns = [
// //     { title: 'Product Name', dataIndex: 'productName' },
// //     { title: 'Price', dataIndex: 'price' },
// //     { title: 'Quantity', dataIndex: 'quantity' },
// //     { title: 'Payment Method', dataIndex: 'paymentMethod' },
// //     { title: 'Canceled Reason', dataIndex: 'canceledReason' },
// //     { title: 'Canceled Date', dataIndex: 'canceledDate' },
// //   ];

// //   const receivedColumns = [
// //     { title: 'Product Name', dataIndex: 'productName' },
// //     { title: 'Price', dataIndex: 'price' },
// //     { title: 'Quantity', dataIndex: 'quantity' },
// //     { title: 'Payment Method', dataIndex: 'paymentMethod' },
// //     { title: 'Order Received Date', dataIndex: 'orderReceivedDate' },
// //   ];

// //   return (
// //     <div className={`flex flex-row-reverse max-md:flex-row w-full`}>
// //       <div className='flex flex-col flex-1 h-screen'>
// //         <Header toggleNav={toggleNav} />
// //         <MobileAdminNavbar isOpen={isMobileNavOpen} onClose={() => setIsMobileNavOpen(false)} />
// //         <div className={`flex-1 overflow-auto mt-14 bg-[#EFEFEF] p-5`}>
// //           <div className="flex items-center justify-between mb-4">
// //             <h2 className="text-lg font-bold">Order Transactions</h2>
// //             <Select
// //               defaultValue="received"
// //               style={{ width: 200 }}
// //               onChange={value => setSortType(value)}
// //             >
// //               <Option value="received">Order Received</Option>
// //               <Option value="canceled">Canceled Order</Option>
// //             </Select>
// //           </div>

// //            <div className='max-md:w-[100vw] bg-white mt-2 rounded-xl max-md:overflow-x-auto max-md:whitespace-nowrap'>
// //             <Table
// //               dataSource={data}
// //               columns={sortType === 'canceled' ? canceledColumns : receivedColumns}
// //               loading={loading}
// //               rowKey="_id"
// //               pagination={{ pageSize: 5 }}
// //             />
// //           </div>
// //         </div>
// //       </div>

// //       <nav className={`max-md:hidden ${isNavCollapsed ? "w-20" : "w-56"} transition-width duration-300`}>
// //         <NavigationBar isNavCollapsed={isNavCollapsed} />
// //       </nav>
// //     </div>
// //   );
// // };

// // export default AdminOrderTransaction


// import React, { useEffect, useState } from 'react';
// import { Table, Select, message } from 'antd';
// import axios from 'axios';
// import { NavigationBar, Header, MobileAdminNavbar } from "../layout"
// import { FaMoneyBillWave } from "react-icons/fa";
// import CountUp from "react-countup";

// const AdminOrderTransaction = () => {
//   const [isNavCollapsed, setIsNavCollapsed] = useState(false);
//   const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
//   const [data, setData] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [sortType, setSortType] = useState('received'); // Default to order received
//   const [totalSold, setTotalSold] = useState(0);

//   const toggleNav = () => {
//     if (window.innerWidth <= 768) {
//       setIsMobileNavOpen(!isMobileNavOpen);
//     } else {
//       setIsNavCollapsed(!isNavCollapsed);
//     }
//   };

//   const fetchData = async (type) => {
//     setLoading(true);
//     try {
//       const url = type === 'canceled'
//         ? 'https://online-shop-server-1.onrender.com/api/all-canceled-orders'
//         : 'https://online-shop-server-1.onrender.com/api/all-order-received';

//       const res = await axios.get(url);
//       setData(res.data);

//       // Calculate total sold only for received orders
//       if (type === 'received') {
//         const total = res.data.reduce((acc, item) => {
//           const itemTotal = parseFloat(item.price) * parseInt(item.quantity);
//           return acc + itemTotal;
//         }, 0);
//         setTotalSold(total);
//       } else {
//         setTotalSold(0); // Reset if not viewing received
//       }
//     } catch (err) {
//       console.error("Fetch error:", err);
//       message.error("Failed to load data.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchData(sortType);
//   }, [sortType]);

//   const canceledColumns = [
//     { title: 'Product Name', dataIndex: 'productName' },
//     { title: 'Price', dataIndex: 'price' },
//     { title: 'Quantity', dataIndex: 'quantity' },
//     { title: 'Payment Method', dataIndex: 'paymentMethod' },
//     { title: 'Canceled Reason', dataIndex: 'canceledReason' },
//     { title: 'Canceled Date', dataIndex: 'canceledDate' },
//   ];

//   const receivedColumns = [
//     { title: 'Product Name', dataIndex: 'productName' },
//     { title: 'Price', dataIndex: 'price' },
//     { title: 'Quantity', dataIndex: 'quantity' },
//     { title: 'Payment Method', dataIndex: 'paymentMethod' },
//     { title: 'Order Received Date', dataIndex: 'orderReceivedDate' },
//   ];

//   return (
//     <div className={`flex flex-row-reverse max-md:flex-row w-full`}>
//       <div className='flex flex-col flex-1 h-screen'>
//         <Header toggleNav={toggleNav} />
//         <MobileAdminNavbar isOpen={isMobileNavOpen} onClose={() => setIsMobileNavOpen(false)} />
//         <div className={`flex-1 overflow-auto mt-14 bg-[#EFEFEF] p-5`}>
//           <div className="flex items-center justify-between mb-4">
//             <h2 className="text-lg font-bold">Order Transactions</h2>
//             <Select
//               defaultValue="received"
//               style={{ width: 200 }}
//               onChange={value => setSortType(value)}
//             >
//               <Option value="received">Order Received</Option>
//               <Option value="canceled">Canceled Order</Option>
//             </Select>
//           </div>

//           <div className='max-md:w-[100vw] bg-white mt-2 rounded-xl max-md:overflow-x-auto max-md:whitespace-nowrap'>
//             <Table
//               dataSource={data}
//               columns={sortType === 'canceled' ? canceledColumns : receivedColumns}
//               loading={loading}
//               rowKey="_id"
//               pagination={{ pageSize: 5 }}
//             />
//           </div>
//           {sortType === 'received' && (
//             <div className='flex justify-end mt-5'>
//               <div className="mb-6 p-4 bg-white rounded-xl shadow-sm border border-gray-200 xl:w-1/3 w-full max-w-md flex items-center gap-4">
//                 <div className="p-3 bg-blue-100 rounded-full">
//                   <FaMoneyBillWave className="text-blue-600 text-2xl" />
//                 </div>
//                 <div>
//                   <h2 className="text-sm text-gray-500 font-medium mb-1 uppercase tracking-wider">
//                     Total Sold
//                   </h2>
//                   <p className="text-3xl font-bold text-green-600">
//                     ₱
//                     <CountUp
//                       end={totalSold}
//                       duration={1.5}
//                       decimals={2}
//                       separator=","
//                     />
//                   </p>
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>

//       <nav className={`max-md:hidden ${isNavCollapsed ? "w-20" : "w-56"} transition-width duration-300`}>
//         <NavigationBar isNavCollapsed={isNavCollapsed} />
//       </nav>
//     </div>
//   );
// };

// export default AdminOrderTransaction


// import React, { useEffect, useState } from 'react';
// import { Table, Select, message } from 'antd';
// import axios from 'axios';
// import { NavigationBar, Header, MobileAdminNavbar } from "../layout"

// const AdminOrderTransaction = () => {
//   const [isNavCollapsed, setIsNavCollapsed] = useState(false);
//   const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
//   const [data, setData] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [sortType, setSortType] = useState('received'); // Default to order received

//   const toggleNav = () => {
//     if (window.innerWidth <= 768) {
//       setIsMobileNavOpen(!isMobileNavOpen);
//     } else {
//       setIsNavCollapsed(!isNavCollapsed);
//     }
//   };

//   const fetchData = async (type) => {
//     setLoading(true);
//     try {
//       const url = type === 'canceled'
//         ? 'https://online-shop-server-1.onrender.com/api/all-canceled-orders'
//         : 'https://online-shop-server-1.onrender.com/api/all-order-received';

//       const res = await axios.get(url);
//       setData(res.data);
//     } catch (err) {
//       console.error("Fetch error:", err);
//       message.error("Failed to load data.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchData(sortType);
//   }, [sortType]);

//   const canceledColumns = [
//     { title: 'Product Name', dataIndex: 'productName' },
//     { title: 'Price', dataIndex: 'price' },
//     { title: 'Quantity', dataIndex: 'quantity' },
//     { title: 'Payment Method', dataIndex: 'paymentMethod' },
//     { title: 'Canceled Reason', dataIndex: 'canceledReason' },
//     { title: 'Canceled Date', dataIndex: 'canceledDate' },
//   ];

//   const receivedColumns = [
//     { title: 'Product Name', dataIndex: 'productName' },
//     { title: 'Price', dataIndex: 'price' },
//     { title: 'Quantity', dataIndex: 'quantity' },
//     { title: 'Payment Method', dataIndex: 'paymentMethod' },
//     { title: 'Order Received Date', dataIndex: 'orderReceivedDate' },
//   ];

//   return (
//     <div className={`flex flex-row-reverse max-md:flex-row w-full`}>
//       <div className='flex flex-col flex-1 h-screen'>
//         <Header toggleNav={toggleNav} />
//         <MobileAdminNavbar isOpen={isMobileNavOpen} onClose={() => setIsMobileNavOpen(false)} />
//         <div className={`flex-1 overflow-auto mt-14 bg-[#EFEFEF] p-5`}>
//           <div className="flex items-center justify-between mb-4">
//             <h2 className="text-lg font-bold">Order Transactions</h2>
//             <Select
//               defaultValue="received"
//               style={{ width: 200 }}
//               onChange={value => setSortType(value)}
//             >
//               <Option value="received">Order Received</Option>
//               <Option value="canceled">Canceled Order</Option>
//             </Select>
//           </div>

//            <div className='max-md:w-[100vw] bg-white mt-2 rounded-xl max-md:overflow-x-auto max-md:whitespace-nowrap'>
//             <Table
//               dataSource={data}
//               columns={sortType === 'canceled' ? canceledColumns : receivedColumns}
//               loading={loading}
//               rowKey="_id"
//               pagination={{ pageSize: 5 }}
//             />
//           </div>
//         </div>
//       </div>

//       <nav className={`max-md:hidden ${isNavCollapsed ? "w-20" : "w-56"} transition-width duration-300`}>
//         <NavigationBar isNavCollapsed={isNavCollapsed} />
//       </nav>
//     </div>
//   );
// };

// export default AdminOrderTransaction


import React, { useEffect, useState } from 'react';
import { Table, Select, message } from 'antd';
import axios from 'axios';
import { NavigationBar, Header, MobileAdminNavbar, MobileNavBar } from "../layout"
import { FaMoneyBillWave } from "react-icons/fa";
import CountUp from "react-countup";

const AdminOrderTransaction = () => {
  const [isNavCollapsed, setIsNavCollapsed] = useState(false);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sortType, setSortType] = useState('received'); // Default to order received
  const [totalSold, setTotalSold] = useState(0);
  const [totalCost, setTotalCost] = useState(0);
  const [vat, setVat] = useState(0);
  const [totalTax, setTotalTax] = useState(0);

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
        ? 'https://online-shop-server-1.onrender.com/api/all-canceled-orders'
        : 'https://online-shop-server-1.onrender.com/api/all-order-received';

      const res = await axios.get(url);
      setData(res.data);

      // Calculate total sold only for received orders
      if (type === 'received') {
        const total = res.data.reduce((acc, item) => {
          const itemTotal = parseFloat(item.price) * parseInt(item.quantity);
          return acc + itemTotal;
        }, 0);
        setTotalSold(total);
      } else {
        setTotalSold(0); // Reset if not viewing received
      }
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

  const fetchTotalCost = async () => {
    try {
      const res = await axios.get('https://online-shop-server-1.onrender.com/api/delivery-history');
      const total = res.data.reduce((acc, item) => acc + parseFloat(item.totalCost || 0), 0);
      setTotalCost(total);
    } catch (err) {
      console.error("Failed to fetch delivery history:", err);
    }
  };

  useEffect(() => {
    fetchData(sortType);
    fetchTotalCost(); // Also fetch total cost on mount
  }, [sortType]);

  const fetchVAT = async () => {
    try {
      const res = await axios.get('https://online-shop-server-1.onrender.com/api/admin/vat');
      const vatValue = parseFloat(res.data.value || 0); // Assuming response is like { vat: 12 }
      setVat(vatValue);
      console.log(vatValue)

      // Compute VAT tax based on current totalSold
      const taxAmount = totalSold * (vatValue / 100);
      setTotalTax(taxAmount);
    } catch (err) {
      console.error("Failed to fetch VAT:", err);
      message.error("Failed to fetch VAT data.");
    }
  };

  useEffect(() => {
    fetchVAT();
  }, [totalSold]);


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
        <div className='flex-1 overflow-auto mt-14 bg-[#EFEFEF] py-2 md:p-6 w-full'>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold">Transaction Report</h2>
            <Select
              defaultValue="received"
              style={{ width: 200 }}
              onChange={value => setSortType(value)}
            >
              <Option value="received">Order Received</Option>
              <Option value="canceled">Canceled Order</Option>
            </Select>
          </div>

          <div className='max-md:w-[100vw] bg-white mt-2 rounded-xl max-md:overflow-x-auto whitespace-nowrap'>
            <Table
              dataSource={data}
              columns={sortType === 'canceled' ? canceledColumns : receivedColumns}
              loading={loading}
              rowKey="_id"
              pagination={{ pageSize: 5 }}
            />
          </div>

          {sortType === 'received' && (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 mt-5">
              {/* Card 1: Total Expenses */}
              <div className="p-4 bg-white rounded-xl shadow-sm border border-gray-200 flex items-center gap-4">
                <div className="p-3 bg-red-100 rounded-full">
                  <FaMoneyBillWave className="text-red-600 text-3xl" />
                </div>
                <div>
                  <h2 className="text-sm text-gray-500 font-medium mb-1 uppercase tracking-wider">
                    Total Expenses
                  </h2>
                  <p className="text-3xl font-bold text-red-600">
                    ₱
                    <CountUp
                      end={totalCost}
                      duration={1.5}
                      decimals={2}
                      separator=","
                    />
                  </p>
                </div>
              </div>

              {/* Card 2: Total Sold */}
              <div className="p-4 bg-white rounded-xl shadow-sm border border-gray-200 flex items-center gap-4">
                <div className="p-3 bg-green-100 rounded-full">
                  <FaMoneyBillWave className="text-green-600 text-3xl" />
                </div>
                <div>
                  <h2 className="text-sm text-gray-500 font-medium mb-1 uppercase tracking-wider">
                    Total Sold
                  </h2>
                  <p className="text-3xl font-bold text-green-600">
                    ₱
                    <CountUp
                      end={totalSold}
                      duration={1.5}
                      decimals={2}
                      separator=","
                    />
                  </p>
                </div>
              </div>

              {/* Card 3: Total Tax */}
              <div className="p-4 bg-white rounded-xl shadow-sm border border-gray-200 flex items-center gap-4">
                <div className="p-3 bg-yellow-100 rounded-full">
                  <FaMoneyBillWave className="text-yellow-600 text-3xl" />
                </div>
                <div>
                  <h2 className="text-sm text-gray-500 font-medium mb-1 uppercase tracking-wider">
                    Total Tax
                  </h2>
                  <p className="text-3xl font-bold text-yellow-600">
                    ₱
                    <CountUp
                      end={totalTax}
                      duration={1.5}
                      decimals={2}
                      separator=","
                    />
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <nav className={`max-md:hidden ${isNavCollapsed ? "w-20" : "w-56"} transition-width duration-300`}>
        <NavigationBar isNavCollapsed={isNavCollapsed} />
      </nav>
    </div>
  );
};

export default AdminOrderTransaction
