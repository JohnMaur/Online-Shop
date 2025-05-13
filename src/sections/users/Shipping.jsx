// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { UserNavBar, Header, MobileNavBar } from "../layout";
// import { CustomButton, ConfirmModal, ShippingCancelModal } from "../../components";
// import { motion } from "framer-motion";
// import { Package, CalendarCheck, CreditCard, ShoppingCart, X } from "lucide-react";
// import { Spin } from 'antd';

// const Shipping = () => {
//   const [isNavCollapsed, setIsNavCollapsed] = useState(false);
//   const [showMobileNav, setShowMobileNav] = useState(false);
//   const [username, setUsername] = useState("");
//   const [orders, setOrders] = useState([]);
//   const [showModal, setShowModal] = useState(false);
//   const [selectedOrderId, setSelectedOrderId] = useState(null);
//   const [cancelModalOpen, setCancelModalOpen] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const [cancelLoading, setCancelLoading] = useState(false);

//   useEffect(() => {
//     const user = JSON.parse(localStorage.getItem("user"));
//     if (user?.username) {
//       setUsername(user.username);
//       fetchUserOrders(user.username);
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

//   const fetchUserOrders = async (username) => {
//     try {
//       setIsLoading(true); // Start loading
//       const response = await axios.get(`https://online-shop-server-1.onrender.com/api/user-orders/${username}`);
//       if (response.status === 200) {
//         setOrders(response.data);
//       }
//     } catch (error) {
//       console.error("Error fetching orders:", error);
//     } finally {
//       setIsLoading(false); // End loading
//     }
//   };

//   const openCancelModal = (orderId) => {
//     setSelectedOrderId(orderId);
//     setCancelModalOpen(true);
//   };

//   const handleCancelSubmit = async (reason) => {
//     setCancelLoading(true); 
//     try {
//       const response = await axios.post(`https://online-shop-server-1.onrender.com/api/user-cancel-order/${selectedOrderId}`, {
//         canceledReason: reason,
//       });

//       if (response.status === 200) {
//         setOrders((prev) => prev.filter((order) => order._id !== selectedOrderId));
//       }
//     } catch (error) {
//       console.error("Error cancelling order:", error);
//     } finally {
//       setCancelModalOpen(false);
//       setSelectedOrderId(null);
//       setCancelLoading(false); 
//     }
//   };

//   const handleCloseModal = () => {
//     setCancelModalOpen(false);
//     setSelectedOrderId(null);
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
//           <Spin spinning={isLoading} size="large">
//             <div className="grid gap-6">
//               {orders.length > 0 ? (
//                 orders.map((order) => {
//                   const cancelDeadline = new Date(order.orderedAt);
//                   cancelDeadline.setDate(cancelDeadline.getDate() + 1);
//                   const canCancel = new Date() <= cancelDeadline;

//                   return (
//                     <motion.div
//                       key={order._id}
//                       initial={{ opacity: 0, y: 20 }}
//                       animate={{ opacity: 1, y: 0 }}
//                       transition={{ duration: 0.4 }}
//                       className="bg-white shadow-md hover:shadow-lg rounded-xl transition-all duration-300 p-6"
//                     >
//                       <p className="text-xl font-semibold text-gray-800 flex items-center gap-2 mb-4">
//                         <CalendarCheck size={20} /> Delivery Date:{" "}
//                         <span className="ml-2">{order.shippingDate.shippingStringDate}</span>
//                       </p>

//                       <div className="flex flex-col md:flex-row gap-5">
//                         <img src={order.imageUrl} alt="Product" className="w-32 h-32 object-contain border rounded-lg" />

//                         <div className="flex-1 space-y-1 text-gray-700">
//                           <p className="text-lg font-bold flex items-center gap-2">
//                             <Package size={18} /> {order.productName}
//                           </p>
//                           <p className="text-base">₱{order.price}</p>
//                           <p className="text-base">Quantity: {order.quantity}</p>
//                           <p className="text-base flex items-center gap-1">
//                             <CreditCard size={16} /> {order.paymentMethod}
//                           </p>
//                           <p className="text-sm text-gray-500 flex items-center gap-1">
//                             <ShoppingCart size={16} /> Ordered At:{" "}
//                             {new Date(order.orderedAt).toLocaleString()}
//                           </p>
//                         </div>

//                         {canCancel && (
//                           <div className="flex items-end justify-end">
//                             <button
//                               className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg text-sm flex items-center gap-2 shadow-md cursor-pointer"
//                               onClick={() => openCancelModal(order._id)}
//                               title="Cancel Order"
//                             >
//                               <X size={16} /> Cancel
//                             </button>
//                           </div>
//                         )}
//                       </div>
//                     </motion.div>
//                   );
//                 })
//               ) : (
//                 !isLoading && (
//                   <div className="text-center text-gray-500 text-lg mt-10">
//                     No orders found.
//                   </div>
//                 )
//               )}
//             </div>
//           </Spin>
//         </div>
//       </div>

//       <nav className={`max-md:hidden ${isNavCollapsed ? "w-20" : "w-56"} transition-all duration-300`}>
//         <UserNavBar isNavCollapsed={isNavCollapsed} />
//       </nav>

//       <ShippingCancelModal
//         isOpen={cancelModalOpen}
//         onClose={handleCloseModal}
//         onSubmit={handleCancelSubmit}
//         loading={cancelLoading}
//       />
//     </div>
//   );
// };

// export default Shipping;


import React, { useState, useEffect } from "react";
import axios from "axios";
import { UserNavBar, Header, MobileNavBar } from "../layout";
import { CustomButton, ConfirmModal, ShippingCancelModal } from "../../components";
import { motion } from "framer-motion";
import { Package, CalendarCheck, CreditCard, ShoppingCart, X } from "lucide-react";
import { Spin } from 'antd';

const Shipping = () => {
  const [isNavCollapsed, setIsNavCollapsed] = useState(false);
  const [showMobileNav, setShowMobileNav] = useState(false);
  const [username, setUsername] = useState("");
  const [orders, setOrders] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [cancelModalOpen, setCancelModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [cancelLoading, setCancelLoading] = useState(false);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user?.username) {
      setUsername(user.username);
      fetchUserOrders(user.username);
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

  const fetchUserOrders = async (username) => {
    try {
      setIsLoading(true); // Start loading
      const response = await axios.get(`https://online-shop-server-1.onrender.com/api/user-orders/${username}`);
      if (response.status === 200) {
        setOrders(response.data);
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setIsLoading(false); // End loading
    }
  };

  const openCancelModal = (orderId) => {
    setSelectedOrderId(orderId);
    setCancelModalOpen(true);
  };

  const handleCancelSubmit = async (reason) => {
    setCancelLoading(true); 
    try {
      const response = await axios.post(`https://online-shop-server-1.onrender.com/api/user-cancel-order/${selectedOrderId}`, {
        canceledReason: reason,
      });

      if (response.status === 200) {
        setOrders((prev) => prev.filter((order) => order._id !== selectedOrderId));
      }
    } catch (error) {
      console.error("Error cancelling order:", error);
    } finally {
      setCancelModalOpen(false);
      setSelectedOrderId(null);
      setCancelLoading(false); 
    }
  };

  const handleCloseModal = () => {
    setCancelModalOpen(false);
    setSelectedOrderId(null);
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
          <Spin spinning={isLoading} size="large">
            <div className="grid gap-6">
              {orders.length > 0 ? (
                orders.map((order) => {
                  const cancelDeadline = new Date(order.orderedAt);
                  cancelDeadline.setDate(cancelDeadline.getDate() + 1);
                  const canCancel = new Date() <= cancelDeadline;

                  return (
                    <motion.div
                      key={order._id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4 }}
                      className="bg-white shadow-md hover:shadow-lg rounded-xl transition-all duration-300 p-6"
                    >
                      <p className="text-xl font-semibold text-gray-800 flex items-center gap-2 mb-4">
                        <CalendarCheck size={20} /> Delivery Date:{" "}
                        <span className="ml-2">{order.shippingDate.shippingStringDate}</span>
                      </p>

                      <div className="flex flex-col md:flex-row gap-5">
                        <img src={order.imageUrl} alt="Product" className="w-32 h-32 object-contain border rounded-lg" />

                        <div className="flex-1 space-y-1 text-gray-700">
                          <p className="text-lg font-bold flex items-center gap-2">
                            <Package size={18} /> {order.productName}
                          </p>
                          <p className="text-base">₱{order.price}</p>
                          <p className="text-base">Quantity: {order.quantity}</p>
                          <p className="text-base">Shipping Fee: ₱{order.shippingPrice}</p>
                          <p className="text-base flex items-center gap-1">
                            <CreditCard size={16} /> {order.paymentMethod}
                          </p>
                          <p className="text-sm text-gray-500 flex items-center gap-1">
                            <ShoppingCart size={16} /> Ordered At:{" "}
                            {new Date(order.orderedAt).toLocaleString()}
                          </p>
                        </div>

                        {canCancel && (
                          <div className="flex items-end justify-end">
                            <button
                              className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg text-sm flex items-center gap-2 shadow-md cursor-pointer"
                              onClick={() => openCancelModal(order._id)}
                              title="Cancel Order"
                            >
                              <X size={16} /> Cancel
                            </button>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  );
                })
              ) : (
                !isLoading && (
                  <div className="text-center text-gray-500 text-lg mt-10">
                    No orders found.
                  </div>
                )
              )}
            </div>
          </Spin>
        </div>
      </div>

      <nav className={`max-md:hidden ${isNavCollapsed ? "w-20" : "w-56"} transition-all duration-300`}>
        <UserNavBar isNavCollapsed={isNavCollapsed} />
      </nav>

      <ShippingCancelModal
        isOpen={cancelModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleCancelSubmit}
        loading={cancelLoading}
      />
    </div>
  );
};

export default Shipping;
