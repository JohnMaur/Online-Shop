// import React, { useState } from 'react';
// import { UserNavBar, Header } from "../layout"

// const Receiving = () => {
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
//           <p className="text-center mt-5 text-gray-500">Waiting for orders to be received</p>
//         </div>
//       </div>

//       <nav className={`max-md:hidden ${isNavCollapsed ? "w-20" : "w-56"} transition-width duration-300`}>
//         <UserNavBar
//           isNavCollapsed={isNavCollapsed}
//         />
//       </nav>

//     </div>
//   )
// }

// export default Receiving


// import React, { useState, useEffect } from 'react';
// import { UserNavBar, Header } from "../layout";
// import axios from 'axios';
// import { Card, Spinner } from 'react-bootstrap';  // React-Bootstrap components
// import { FaMoneyBillWave, FaShippingFast } from 'react-icons/fa';  // Icons from react-icons
// import Skeleton from 'react-loading-skeleton';  // Skeleton loader

// const Receiving = () => {
//   const [isNavCollapsed, setIsNavCollapsed] = useState(false);
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [username, setUsername] = useState("");

//   useEffect(() => {
//     const user = JSON.parse(localStorage.getItem("user"));
//     if (user && user.username) {
//       setUsername(user.username);
//     }
//   }, []);

//   useEffect(() => {
//     if (username) {
//       const fetchOrders = async () => {
//         try {
//           const response = await axios.get(`http://localhost:3000/api/to-receive/${username}`);
//           setOrders(response.data);
//         } catch (error) {
//           console.error("Error fetching to-receive orders:", error);
//         } finally {
//           setLoading(false);
//         }
//       };

//       fetchOrders();
//     }
//   }, [username]);

//   const toggleNav = () => {
//     setIsNavCollapsed(!isNavCollapsed);
//   };

//   return (
//     <div className={`flex flex-row-reverse max-md:flex-row w-full`}>
//       <div className='flex flex-col flex-1 h-screen'>
//         <Header toggleNav={toggleNav} />

//         <div className={`flex-1 overflow-auto mt-14 bg-gradient-to-r from-blue-50 via-blue-100 to-blue-200 px-6 py-8`}>
//           {loading ? (
//             <div className="text-center py-10 text-xl text-gray-600 font-semibold">
//               <Spinner animation="border" variant="primary" /> Loading orders...
//             </div>
//           ) : orders.length === 0 ? (
//             <div className="text-center py-10 text-xl text-gray-600 font-semibold">No orders to receive</div>
//           ) : (
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//               {orders.map((order) => (
//                 <Card key={order._id} className="bg-white shadow-lg rounded-xl p-4 transform transition-all hover:scale-105 hover:shadow-2xl hover:bg-gray-50">
//                   <Card.Img variant="top" src={order.imageUrl} alt={order.productName} className="h-48 object-cover rounded-lg shadow-md" />
//                   <Card.Body>
//                     <Card.Title className="text-xl font-semibold text-gray-800 hover:text-blue-500">{order.productName}</Card.Title>
//                     <Card.Text className="text-gray-700 mt-2">Quantity: <span className="font-bold">{order.quantity}</span></Card.Text>
//                     <Card.Text className="text-gray-700 mt-1">Price: <span className="font-semibold text-blue-500">₱{order.price}</span></Card.Text>
//                     <Card.Text className="text-gray-700 mt-1">Payment: <span className="italic">{order.paymentMethod}</span></Card.Text>
//                     <Card.Text className="text-gray-700 mt-1">Shipping Date: <span className="text-blue-600"><FaShippingFast /> {new Date(order.shippingDate.shippingDate).toLocaleString()}</span></Card.Text>
//                     <Card.Text className="text-sm text-gray-500 mt-2">Ordered at: {new Date(order.orderedAt).toLocaleString()}</Card.Text>
//                     <div className="flex justify-between items-center mt-4">
//                       <FaMoneyBillWave className="text-green-500" />
//                       <span className="text-sm text-gray-500">{order.paymentMethod}</span>
//                     </div>
//                   </Card.Body>
//                 </Card>
//               ))}
//             </div>
//           )}
//         </div>
//       </div>

//       <nav className={`max-md:hidden ${isNavCollapsed ? "w-20" : "w-56"} transition-width duration-300`}>
//         <UserNavBar isNavCollapsed={isNavCollapsed} />
//       </nav>
//     </div>
//   );
// };

// export default Receiving;


import React, { useState, useEffect } from "react";
import axios from "axios";
import { UserNavBar, Header, MobileNavBar } from "../layout";
import { CustomButton } from "../../components";
import { motion } from "framer-motion";
import {
  Package,
  CalendarCheck,
  CreditCard,
  ShoppingCart,
} from "lucide-react";

const Receiving = () => {
  const [isNavCollapsed, setIsNavCollapsed] = useState(false);
  const [showMobileNav, setShowMobileNav] = useState(false);
  const [username, setUsername] = useState("");
  const [orders, setOrders] = useState([]);
  const [selectedOrderId, setSelectedOrderId] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user?.username) {
      setUsername(user.username);
      fetchOrders(user.username);
    }
  }, []);

  const toggleNav = () => {
    if (window.innerWidth <= 768) {
      setShowMobileNav(prev => !prev);
    } else {
      setIsNavCollapsed(!isNavCollapsed);
    }
  };

  // Close mobile nav on window resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setShowMobileNav(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const fetchOrders = async (username) => {
    try {
      const response = await axios.get(`http://localhost:3000/api/to-receive/${username}`);
      setOrders(response.data);
    } catch (error) {
      console.error("Error fetching to-receive orders:", error);
    }
  };

  return (
    <div className="flex flex-row-reverse max-md:flex-row w-full">
      <div className="flex flex-col flex-1 h-screen">
        <Header toggleNav={toggleNav} />

        {showMobileNav && (
          <div className="md:hidden fixed top-14 left-0 w-full z-50 bg-white shadow-md">
            <MobileNavBar />
          </div>
        )}

        <div className="flex-1 overflow-auto mt-14 bg-gradient-to-b from-[#f4f4f4] to-[#e6e6e6] p-4">
          <div className="grid gap-6">
            {orders.length > 0 ? (
              orders.map((order) => (
                <motion.div
                  key={order._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className="bg-white shadow-md hover:shadow-lg rounded-xl transition-all duration-300 p-6"
                >
                  <p className="text-xl font-semibold text-gray-800 flex items-center gap-2 mb-4">
                    <CalendarCheck size={20} /> Shipping Date:{" "}
                    <span className="ml-2">
                      {order.shippingDate.shippingStringDate}
                    </span>
                  </p>

                  <div className="flex flex-col md:flex-row gap-5">
                    <img
                      src={order.imageUrl}
                      alt="Product"
                      className="w-32 h-32 object-contain border rounded-lg"
                    />

                    <div className="flex-1 space-y-1 text-gray-700">
                      <p className="text-lg font-bold flex items-center gap-2">
                        <Package size={18} /> {order.productName}
                      </p>
                      <p className="text-base">₱{order.price}</p>
                      <p className="text-base">Quantity: {order.quantity}</p>
                      <p className="text-base flex items-center gap-1">
                        <CreditCard size={16} /> {order.paymentMethod}
                      </p>
                      <p className="text-sm text-gray-500 flex items-center gap-1">
                        <ShoppingCart size={16} /> Ordered At:{" "}
                        {new Date(order.orderedAt).toLocaleString()}
                      </p>
                    </div>

                  </div>
                </motion.div>
              ))
            ) : (
              <div className="text-center text-gray-500 text-lg mt-10">
                No orders to receive.
              </div>
            )}
          </div>
        </div>
      </div>

      <nav className={`max-md:hidden ${isNavCollapsed ? "w-20" : "w-56"} transition-all duration-300`}>
        <UserNavBar isNavCollapsed={isNavCollapsed} />
      </nav>
    </div>
  );
};

export default Receiving;

 
// import React, { useState, useEffect } from 'react';
// import { UserNavBar, Header, MobileNavBar } from "../layout"

// const Receiving = () => {
//   const [isNavCollapsed, setIsNavCollapsed] = useState(false);
//   const [showMobileNav, setShowMobileNav] = useState(false);

//   const toggleNav = () => {
//     if (window.innerWidth <= 768) {
//       setShowMobileNav(prev => !prev);
//     } else {
//       setIsNavCollapsed(!isNavCollapsed);
//     }
//   };

//   // Close mobile nav on window resize
//   useEffect(() => {
//     const handleResize = () => {
//       if (window.innerWidth > 768) {
//         setShowMobileNav(false);
//       }
//     };
//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   return (
//     <div className={`flex flex-row-reverse max-md:flex-row w-full`}>
//       <div className='flex flex-col flex-1 h-screen'>
//         <Header toggleNav={toggleNav} />

//         {showMobileNav && (
//           <div className="md:hidden fixed top-14 left-0 w-full z-50 bg-white shadow-md">
//             <MobileNavBar />
//           </div>
//         )}

//         <div className={`flex-1 overflow-auto mt-14 bg-[#EFEFEF]`}>
//           <p className="text-center mt-5 text-gray-500">Waiting for orders to be received</p>
//         </div>
//       </div>

//       <nav className={`max-md:hidden ${isNavCollapsed ? "w-20" : "w-56"} transition-width duration-300`}>
//         <UserNavBar isNavCollapsed={isNavCollapsed} />
//       </nav>
//     </div>
//   )
// }

// export default Receiving;