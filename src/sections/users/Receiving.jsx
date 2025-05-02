// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { UserNavBar, Header, MobileNavBar } from "../layout";
// import { CustomButton } from "../../components";
// import { motion } from "framer-motion";
// import {
//   Package,
//   CalendarCheck,
//   CreditCard,
//   ShoppingCart,
// } from "lucide-react";

// const Receiving = () => {
//   const [isNavCollapsed, setIsNavCollapsed] = useState(false);
//   const [showMobileNav, setShowMobileNav] = useState(false);
//   const [username, setUsername] = useState("");
//   const [orders, setOrders] = useState([]);
//   const [selectedOrderId, setSelectedOrderId] = useState(null);

//   useEffect(() => {
//     const user = JSON.parse(localStorage.getItem("user"));
//     if (user?.username) {
//       setUsername(user.username);
//       fetchOrders(user.username);
//     }
//   }, []);

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

//   const fetchOrders = async (username) => {
//     try {
//       const response = await axios.get(`http://localhost:3000/api/to-receive/${username}`);
//       setOrders(response.data);
//     } catch (error) {
//       console.error("Error fetching to-receive orders:", error);
//     }
//   };

//   return (
//     <div className="flex flex-row-reverse max-md:flex-row w-full">
//       <div className="flex flex-col flex-1 h-screen">
//         <Header toggleNav={toggleNav} />

//         {showMobileNav && (
//           <div className="md:hidden fixed top-14 left-0 w-full z-50 bg-white shadow-md">
//             <MobileNavBar />
//           </div>
//         )}

//         <div className="flex-1 overflow-auto mt-14 bg-gradient-to-b from-[#f4f4f4] to-[#e6e6e6] p-4">
//           <div className="grid gap-6">
//             {orders.length > 0 ? (
//               orders.map((order) => (
//                 <motion.div
//                   key={order._id}
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ duration: 0.4 }}
//                   className="bg-white shadow-md hover:shadow-lg rounded-xl transition-all duration-300 p-6"
//                 >
//                   <p className="text-xl font-semibold text-gray-800 flex items-center gap-2 mb-4">
//                     <CalendarCheck size={20} /> Shipping Date:{" "}
//                     <span className="ml-2">
//                       {order.shippingDate.shippingStringDate}
//                     </span>
//                   </p>

//                   <div className="flex flex-col md:flex-row gap-5">
//                     <img
//                       src={order.imageUrl}
//                       alt="Product"
//                       className="w-32 h-32 object-contain border rounded-lg"
//                     />

//                     <div className="flex-1 space-y-1 text-gray-700">
//                       <p className="text-lg font-bold flex items-center gap-2">
//                         <Package size={18} /> {order.productName}
//                       </p>
//                       <p className="text-base">₱{order.price}</p>
//                       <p className="text-base">Quantity: {order.quantity}</p>
//                       <p className="text-base flex items-center gap-1">
//                         <CreditCard size={16} /> {order.paymentMethod}
//                       </p>
//                       <p className="text-sm text-gray-500 flex items-center gap-1">
//                         <ShoppingCart size={16} /> Ordered At:{" "}
//                         {new Date(order.orderedAt).toLocaleString()}
//                       </p>
//                     </div>

//                   </div>
//                 </motion.div>
//               ))
//             ) : (
//               <div className="text-center text-gray-500 text-lg mt-10">
//                 No orders to receive.
//               </div>
//             )}
//           </div>
//         </div>
//       </div>

//       <nav className={`max-md:hidden ${isNavCollapsed ? "w-20" : "w-56"} transition-all duration-300`}>
//         <UserNavBar isNavCollapsed={isNavCollapsed} />
//       </nav>
//     </div>
//   );
// };

// export default Receiving;

import React, { useState, useEffect } from "react";
import axios from "axios";
import { UserNavBar, Header, MobileNavBar } from "../layout";
import { motion } from "framer-motion";
import { Package, CalendarCheck, CreditCard, ShoppingCart } from "lucide-react";
import { Spin } from "antd"; // Import Ant Design Spin component

const Receiving = () => {
  const [isNavCollapsed, setIsNavCollapsed] = useState(false);
  const [showMobileNav, setShowMobileNav] = useState(false);
  const [username, setUsername] = useState("");
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user?.username) {
      setUsername(user.username);
      fetchOrders(user.username);
    }
  }, []);

  const toggleNav = () => {
    if (window.innerWidth <= 768) {
      setShowMobileNav((prev) => !prev);
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
      const response = await axios.get(`https://online-shop-server-1.onrender.com/api/to-receive/${username}`);
      setOrders(response.data);
    } catch (error) {
      console.error("Error fetching to-receive orders:", error);
    } finally {
      setLoading(false); // Stop loading once orders are fetched
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
            {loading ? (
              // Display the loading spinner while orders are being fetched
              <div className="flex justify-center items-center h-96">
                <Spin size="large" />
              </div>
            ) : orders.length > 0 ? (
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
