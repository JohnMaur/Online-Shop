// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { StaffNavBar, Header } from "../layout"
// import { DashboardCard } from '../../components';
// import { shipping, receiving, product, stock } from '../../assets/icons';

// const StaffDashboard = () => {
//   const [isNavCollapsed, setIsNavCollapsed] = useState(false);
//   const [totalStaff, setTotalStaff] = useState(0);
//   const [staffUsername, setStaffUsername] = useState("");
//   const [totalShipped, setTotalShipped] = useState(0);
//   const [lowStockCount, setLowStockCount] = useState(0);
//   const [totalProducts, setTotalProducts] = useState(0);

//   useEffect(() => {
//     const fetchTotalShipped = async () => {
//       if (!staffUsername) return; // Don't fetch if username is empty

//       try {
//         const response = await axios.get(`http://localhost:3000/api/totalstaff-shipping/${staffUsername}`);
//         setTotalShipped(response.data.totalShipped);
//       } catch (error) {
//         console.error('Error fetching staff shipping:', error);
//       }
//     };

//     fetchTotalShipped();
//   }, [staffUsername]);

//   useEffect(() => {
//     const fetchTotalProducts = async () => {
//       if (!staffUsername) return;

//       try {
//         const response = await fetch(`http://localhost:3000/api/staffProducts?staffUsername=${staffUsername}`);
//         const data = await response.json();

//         // Set the total number of products
//         setTotalProducts(data.length);
//       } catch (error) {
//         console.error('Error fetching products:', error);
//       }
//     };

//     fetchTotalProducts();
//   }, [staffUsername]);  

//   useEffect(() => {
//     const fetchLowStockProducts = async () => {
//       if (!staffUsername) return;

//       try {
//         const response = await fetch(`http://localhost:3000/api/staffProducts?staffUsername=${staffUsername}`);
//         const data = await response.json();

//         // Filter products with quantity less than 10
//         const lowStockProducts = data.filter(product => product.quantity < 10);

//         // Set the low stock count
//         setLowStockCount(lowStockProducts.length);
//       } catch (error) {
//         console.error('Error fetching products:', error);
//       }
//     };

//     fetchLowStockProducts();
//   }, [staffUsername]);

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
//               subtextResult={totalStaff}
//               linkTo="/staff-receiving"
//             />
//             <DashboardCard
//               icon={product}
//               title="Product"
//               subtext="Total product"
//               subtextResult={totalProducts}
//               subtext1="Sold"
//               linkTo="/staff-product"
//             />
//           </div>

//           <div className='flex space-x-8 m-8 max-md:flex-col max-md:space-y-8'>
//             <div className='w-1/3 pr-6'>
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

const StaffDashboard = () => {
  const [isNavCollapsed, setIsNavCollapsed] = useState(false);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [totalStaff, setTotalStaff] = useState(0);
  const [staffUsername, setStaffUsername] = useState("");
  const [totalShipped, setTotalShipped] = useState(0);
  const [lowStockCount, setLowStockCount] = useState(0);
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalToReceive, setTotalToReceive] = useState(0);

  useEffect(() => {
    const fetchTotals = async () => {
      try {
        const shippingRes = await axios.get('http://localhost:3000/api/total-user-shipping');
        const toReceiveRes = await axios.get('http://localhost:3000/api/total-to-receive');
        const stocksRes = await axios.get('http://localhost:3000/api/total-stocks');
  
        setTotalShipped(shippingRes.data.totalShipping);
        setTotalToReceive(toReceiveRes.data.totalToReceive);
        setTotalProducts(stocksRes.data.totalStocks);
        setLowStockCount(stocksRes.data.lowStockCount);
      } catch (error) {
        console.error("Error fetching totals:", error);
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
          {/* Your content here */}
          <div className='flex space-x-8 m-8 max-md:flex-col max-md:space-y-8'>
            <DashboardCard
              icon={shipping}
              title="To ship"
              subtext="Total shipping"
              subtextResult={totalShipped}
              linkTo="/staff-shipping"
            />
            <DashboardCard
              icon={receiving}
              title="To receive"
              subtext="Total receiving"
              subtextResult={totalToReceive}
              linkTo="/staff-receiving"
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

          <div className='flex space-x-8 m-8 max-md:flex-col max-md:space-y-8'>
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
