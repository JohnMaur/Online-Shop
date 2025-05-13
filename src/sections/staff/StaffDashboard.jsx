// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { StaffNavBar, Header, MobileStaffNavbar } from "../layout"
// import { DashboardCard } from '../../components';
// import { shipping, receiving, product, stock } from '../../assets/icons';

// const StaffDashboard = () => {
//   const [isNavCollapsed, setIsNavCollapsed] = useState(false);
//   const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
//   const [totalStaff, setTotalStaff] = useState(0);
//   const [staffUsername, setStaffUsername] = useState("");
//   const [totalShipped, setTotalShipped] = useState(0);
//   const [lowStockCount, setLowStockCount] = useState(0);
//   const [totalProducts, setTotalProducts] = useState(0);
//   const [totalToReceive, setTotalToReceive] = useState(0);

//   useEffect(() => {
//     const fetchTotals = async () => {
//       try {
//         const shippingRes = await axios.get('https://online-shop-server-1.onrender.com/api/total-user-shipping');
//         const toReceiveRes = await axios.get('https://online-shop-server-1.onrender.com/api/total-to-receive');
//         const stocksRes = await axios.get('https://online-shop-server-1.onrender.com/api/total-stocks');

//         setTotalShipped(shippingRes.data.totalShipping);
//         setTotalToReceive(toReceiveRes.data.totalToReceive);
//         setTotalProducts(stocksRes.data.totalStocks);
//         setLowStockCount(stocksRes.data.lowStockCount);
//       } catch (error) {
//         console.error("Error fetching totals:", error);
//       }
//     };

//     fetchTotals();
//   }, []);

//   const toggleNav = () => {
//     if (window.innerWidth <= 768) {
//       setIsMobileNavOpen(!isMobileNavOpen);
//     } else {
//       setIsNavCollapsed(!isNavCollapsed);
//     }
//   };

//   return (
//     <div className={`flex flex-row-reverse max-md:flex-row w-full`}>
//       <div className='flex flex-col flex-1 h-screen'>
//         <Header
//           toggleNav={toggleNav}
//         />
//         <MobileStaffNavbar isOpen={isMobileNavOpen} onClose={() => setIsMobileNavOpen(false)} />

//         <div className={`flex-1 overflow-auto mt-14 bg-[#EFEFEF]`}>
//           {/* Your content here */}
//           <div className='flex space-x-8 m-8 max-md:flex-col max-md:space-y-8'>
//             <DashboardCard
//               icon={shipping}
//               title="To ship"
//               subtext="Total shipping"
//               subtextResult={totalShipped}
//               linkTo="/staff-shipping"
//             />
//             <DashboardCard
//               icon={receiving}
//               title="To receive"
//               subtext="Total receiving"
//               subtextResult={totalToReceive}
//               linkTo="/staff-receiving"
//             />
//             <DashboardCard
//               icon={product}
//               title="Stocks"
//               subtext="Total stocks"
//               subtextResult={totalProducts}
//               subtext1="Sold"
//               linkTo="/stock-maintenance"
//             />
//           </div>

//           <div className='flex space-x-8 m-8 max-md:flex-col max-md:space-y-8'>
//             <div className='w-1/3 md:pr-6 max-md:w-full'>
//               <DashboardCard
//                 icon={stock}
//                 title="Low Stock"
//                 subtext="Total low stock"
//                 subtextResult={lowStockCount}
//                 linkTo="/stock-maintenance"
//               />
//             </div>

//           </div>

//         </div>
//       </div>

//       <nav className={`max-md:hidden ${isNavCollapsed ? "w-20" : "w-56"} transition-width duration-300`}>
//         <StaffNavBar
//           isNavCollapsed={isNavCollapsed}
//           setStaffUsername={setStaffUsername}
//         />
//       </nav>

//     </div>
//   )
// }

// export default StaffDashboard

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { StaffNavBar, Header, MobileStaffNavbar } from "../layout"
import { DashboardCard } from '../../components';
import { shipping, receiving, product, stock } from '../../assets/icons';
import { Spin } from 'antd'; // <-- Import Spin from Ant Design

const StaffDashboard = () => {
  const [isNavCollapsed, setIsNavCollapsed] = useState(false);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [totalStaff, setTotalStaff] = useState(0);
  const [staffUsername, setStaffUsername] = useState("");
  const [totalShipped, setTotalShipped] = useState(0);
  const [lowStockCount, setLowStockCount] = useState(0);
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalToReceive, setTotalToReceive] = useState(0);
  const [isLoading, setIsLoading] = useState(true); // <-- Add loading state

  useEffect(() => {
    const fetchTotals = async () => {
      try {
        const shippingRes = await axios.get('https://online-shop-server-1.onrender.com/api/total-user-shipping');
        const toReceiveRes = await axios.get('https://online-shop-server-1.onrender.com/api/total-to-receive');
        const stocksRes = await axios.get('https://online-shop-server-1.onrender.com/api/total-stocks');

        setTotalShipped(shippingRes.data.totalShipping);
        setTotalToReceive(toReceiveRes.data.totalToReceive);
        setTotalProducts(stocksRes.data.totalStocks);
        setLowStockCount(stocksRes.data.lowStockCount);
      } catch (error) {
        console.error("Error fetching totals:", error);
      } finally {
        setIsLoading(false); // Stop loading after data is fetched
      }
    };

    fetchTotals();
  }, []);

  const toggleNav = () => {
    if (window.innerWidth <= 768) {
      setIsMobileNavOpen(!isMobileNavOpen);
    } else {
      setIsNavCollapsed(!isNavCollapsed);
    }
  };

  return (
    <div className={`flex flex-row-reverse max-md:flex-row w-full`}>
      <div className='flex flex-col flex-1 h-screen'>
        <Header
          toggleNav={toggleNav}
        />
        <MobileStaffNavbar isOpen={isMobileNavOpen} onClose={() => setIsMobileNavOpen(false)} />

        <div className={`flex-1 overflow-auto mt-14 bg-[#EFEFEF]`}>
          {/* Show loading spinner if data is still being fetched */}
          {isLoading ? (
            <div className="flex justify-center items-center w-full h-full">
              <Spin size="large" />
            </div>
          ) : (
            <>
              {/* Your content here */}
              <div className='flex space-x-8 m-8 max-md:flex-col max-md:space-y-8'>
                <DashboardCard
                  icon={shipping}
                  title="To ship"
                  subtext="Total shipping"
                  subtextResult={totalShipped}
                  linkTo="/staff-order-transaction"
                />
                {/* <DashboardCard
                  icon={receiving}
                  title="To receive"
                  subtext="Total receiving" 
                  subtextResult={totalToReceive}
                  linkTo="/staff-order-transaction"
                /> */}
                <DashboardCard
                  icon={receiving}
                  title="To receive"
                  subtext="Total receiving"
                  subtextResult={totalToReceive}
                  linkTo="/staff-order-transaction?status=receiving"
                />
                <DashboardCard
                  icon={product}
                  title="Stocks"
                  subtext="Total stocks"
                  subtextResult={totalProducts}
                  subtext1="Sold"
                  linkTo="/stock-maintenance"
                />
              </div>

              <div className='flex space-x-2 m-8 max-md:flex-col max-md:space-y-8'>
                {/* <div className='w-1/3 md:pr-6 max-md:w-full'>
                  <DashboardCard
                    icon={product}
                    title="Stocks"
                    subtext="Total stocks"
                    subtextResult={totalProducts}
                    subtext1="Sold"
                    linkTo="/stock-maintenance"
                  />
                </div> */}
                <div className='w-1/3 md:pr-6 max-md:w-full'>
                  <DashboardCard
                    icon={stock}
                    title="Low Stock"
                    subtext="Total low stock"
                    subtextResult={lowStockCount}
                    linkTo="/stock-maintenance"
                  />
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      <nav className={`max-md:hidden ${isNavCollapsed ? "w-20" : "w-56"} transition-width duration-300`}>
        <StaffNavBar
          isNavCollapsed={isNavCollapsed}
          setStaffUsername={setStaffUsername}
        />
      </nav>
    </div>
  )
}

export default StaffDashboard
