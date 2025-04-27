// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { UserNavBar, Header } from "../layout";
// import { CustomButton, ConfirmModal } from "../../components";

// const Shipping = () => {
//   const [isNavCollapsed, setIsNavCollapsed] = useState(false);
//   const [username, setUsername] = useState("");
//   const [orders, setOrders] = useState([]);
//   const [showModal, setShowModal] = useState(false);
//   const [selectedOrderId, setSelectedOrderId] = useState(null);

//   useEffect(() => {
//     const user = JSON.parse(localStorage.getItem("user"));
//     if (user && user.username) {
//       setUsername(user.username);
//       fetchUserOrders(user.username);
//     }
//   }, []);

//   const fetchUserOrders = async (username) => {
//     try {
//       const response = await axios.get(`http://localhost:3000/api/user-orders/${username}`);
//       if (response.status === 200) {
//         setOrders(response.data);
//       }
//     } catch (error) {
//       console.error("Error fetching orders:", error);
//     }
//   };

//   const toggleNav = () => {
//     setIsNavCollapsed(!isNavCollapsed);
//   };

//   const openCancelModal = (orderId) => {
//     setSelectedOrderId(orderId);
//     setShowModal(true);
//   };

//   const handleConfirmCancel = async () => {
//     try {
//       const response = await axios.delete(`http://localhost:3000/api/user-orders/${selectedOrderId}`);
//       if (response.status === 200) {
//         setOrders(prevOrders => prevOrders.filter(order => order._id !== selectedOrderId));
//       }
//     } catch (error) {
//       console.error("Error cancelling order:", error);
//     } finally {
//       setShowModal(false);
//       setSelectedOrderId(null);
//     }
//   };

//   const handleCloseModal = () => {
//     setShowModal(false);
//     setSelectedOrderId(null);
//   };

//   return (
//     <div className="flex flex-row-reverse max-md:flex-row w-full">
//       <div className="flex flex-col flex-1 h-screen">
//         <Header toggleNav={toggleNav} />

//         <div className="flex-1 overflow-auto mt-14 bg-[#EFEFEF]">
//           <div className="flex-1 p-4 space-x-4 overflow-auto bg-[#EFEFEF]">
//             <div className="flex flex-col w-full space-y-5">
//               {orders.length > 0 ? (
//                 orders.map((order) => {
//                   return (
//                     <div key={order._id} className="w-full bg-white p-4 rounded-lg border border-gray-300 flex justify-between">
//                       <div className="w-3/4">
//                         <p className="text-2xl font-bold my-3">
//                           Delivery date: {order.shippingDate.shippingStringDate}
//                         </p>

//                         <div className="flex">
//                           <div className="flex w-7/12 p-3">
//                             <div className="flex w-full space-x-3">
//                               <img src={order.imageUrl} alt="Product" className="w-32 h-32 object-contain" />
//                               <div className="flex-1 space-y-1">
//                                 <p className="text-base font-bold">{order.productName}</p>
//                                 <p className="text-base font-bold">₱{order.price}</p>
//                                 <p className="text-base font-bold">Quantity: {order.quantity}</p>
//                                 <p className="text-base font-bold">Payment: {order.paymentMethod}</p>
//                                 <p className="text-base text-gray-500">
//                                   Ordered At: {new Date(order.orderedAt).toLocaleString()}
//                                 </p>
//                               </div>
//                             </div>
//                           </div>
//                         </div>
//                       </div>

//                       {(() => {
//                         const orderedDate = new Date(order.orderedAt);
//                         const cancelDeadline = new Date(orderedDate);
//                         cancelDeadline.setDate(cancelDeadline.getDate() + 1);
//                         const now = new Date();

//                         if (now <= cancelDeadline) {
//                           return (
//                             <div className="flex items-end w-32">
//                               <CustomButton
//                                 nameButton="Cancel"
//                                 rounded="rounded-lg"
//                                 color="bg-black"
//                                 hoverButton="hover:bg-[#454545]"
//                                 responsive="max-md:text-xs"
//                                 onClick={() => openCancelModal(order._id)}
//                               />
//                             </div>
//                           );
//                         }
//                         return null;
//                       })()}
//                     </div>
//                   );
//                 })
//               ) : (
//                 <p className="text-center text-gray-500">No orders found.</p>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>

//       <nav className={`max-md:hidden ${isNavCollapsed ? "w-20" : "w-56"} transition-width duration-300`}>
//         <UserNavBar isNavCollapsed={isNavCollapsed} />
//       </nav>

//       {/* Confirmation Modal */}
//       <ConfirmModal
//         isOpen={showModal}
//         onClose={handleCloseModal}
//         onConfirm={handleConfirmCancel}
//         message="Are you sure you want to cancel this order?"
//       />
//     </div>
//   );
// };

// export default Shipping;  

// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { UserNavBar, Header } from "../layout";
// import { CustomButton, ConfirmModal, ShippingCancelModal } from "../../components";
// import { motion } from "framer-motion";
// import { Package, CalendarCheck, CreditCard, ShoppingCart, X } from "lucide-react";

// const Shipping = () => {
//   const [isNavCollapsed, setIsNavCollapsed] = useState(false);
//   const [username, setUsername] = useState("");
//   const [orders, setOrders] = useState([]);
//   const [showModal, setShowModal] = useState(false);
//   const [selectedOrderId, setSelectedOrderId] = useState(null);


//   useEffect(() => {
//     const user = JSON.parse(localStorage.getItem("user"));
//     if (user?.username) {
//       setUsername(user.username);
//       fetchUserOrders(user.username);
//     }
//   }, []);

//   const fetchUserOrders = async (username) => {
//     try {
//       const response = await axios.get(`http://localhost:3000/api/user-orders/${username}`);
//       if (response.status === 200) {
//         setOrders(response.data);
//       }
//     } catch (error) {
//       console.error("Error fetching orders:", error);
//     }
//   };

//   const toggleNav = () => setIsNavCollapsed(!isNavCollapsed);

//   const openCancelModal = (orderId) => {
//     setSelectedOrderId(orderId);
//     setShowModal(true);
//   };

//   const handleConfirmCancel = async () => {
//     try {
//       const response = await axios.delete(`http://localhost:3000/api/user-orders/${selectedOrderId}`);
//       if (response.status === 200) {
//         setOrders(prev => prev.filter(order => order._id !== selectedOrderId));
//       }
//     } catch (error) {
//       console.error("Error cancelling order:", error);
//     } finally { 
//       setShowModal(false);
//       setSelectedOrderId(null);
//     }
//   };

//   const handleCloseModal = () => {
//     setShowModal(false);
//     setSelectedOrderId(null);
//   };

//   return (
//     <div className="flex flex-row-reverse max-md:flex-row w-full">
//       <div className="flex flex-col flex-1 h-screen">
//         <Header toggleNav={toggleNav} />

//         <div className="flex-1 overflow-auto mt-14 bg-gradient-to-b from-[#f4f4f4] to-[#e6e6e6] p-4">
//           <div className="grid gap-6">
//             {orders.length > 0 ? (
//               orders.map((order) => {
//                 const cancelDeadline = new Date(order.orderedAt);
//                 cancelDeadline.setDate(cancelDeadline.getDate() + 1);
//                 const canCancel = new Date() <= cancelDeadline;

//                 return (
//                   <motion.div
//                     key={order._id}
//                     initial={{ opacity: 0, y: 20 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ duration: 0.4 }}
//                     className="bg-white shadow-md hover:shadow-lg rounded-xl transition-all duration-300 p-6"
//                   >
//                     <p className="text-xl font-semibold text-gray-800 flex items-center gap-2 mb-4">
//                       <CalendarCheck size={20} /> Delivery Date:{" "}
//                       <span className="ml-2">{order.shippingDate.shippingStringDate}</span>
//                     </p>

//                     <div className="flex flex-col md:flex-row gap-5">
//                       <img src={order.imageUrl} alt="Product" className="w-32 h-32 object-contain border rounded-lg" />

//                       <div className="flex-1 space-y-1 text-gray-700">
//                         <p className="text-lg font-bold flex items-center gap-2">
//                           <Package size={18} /> {order.productName}
//                         </p>
//                         <p className="text-base">₱{order.price}</p>
//                         <p className="text-base">Quantity: {order.quantity}</p>
//                         <p className="text-base flex items-center gap-1">
//                           <CreditCard size={16} /> {order.paymentMethod}
//                         </p>
//                         <p className="text-sm text-gray-500 flex items-center gap-1">
//                           <ShoppingCart size={16} /> Ordered At:{" "}
//                           {new Date(order.orderedAt).toLocaleString()}
//                         </p>
//                       </div>

//                       {canCancel && (
//                         <div className="flex items-end justify-end">
//                           <button
//                             className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg text-sm flex items-center gap-2 shadow-md"
//                             onClick={() => openCancelModal(order._id)}
//                             title="Cancel Order"
//                           >
//                             <X size={16} /> Cancel
//                           </button>
//                         </div>
//                       )}
//                     </div>
//                   </motion.div>
//                 );
//               })
//             ) : (
//               <div className="text-center text-gray-500 text-lg mt-10">
//                 No orders found.
//               </div>
//             )}
//           </div>
//         </div>
//       </div>

//       <nav className={`max-md:hidden ${isNavCollapsed ? "w-20" : "w-56"} transition-all duration-300`}>
//         <UserNavBar isNavCollapsed={isNavCollapsed} />
//       </nav>

//       <ConfirmModal
//         isOpen={showModal}
//         onClose={handleCloseModal}
//         onConfirm={handleConfirmCancel}
//         message="Are you sure you want to cancel this order?"
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

const Shipping = () => {
  const [isNavCollapsed, setIsNavCollapsed] = useState(false);
  const [showMobileNav, setShowMobileNav] = useState(false);
  const [username, setUsername] = useState("");
  const [orders, setOrders] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [cancelModalOpen, setCancelModalOpen] = useState(false);

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
      const response = await axios.get(`http://localhost:3000/api/user-orders/${username}`);
      if (response.status === 200) {
        setOrders(response.data);
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  const openCancelModal = (orderId) => {
    setSelectedOrderId(orderId);
    setCancelModalOpen(true);
  };

  const handleCancelSubmit = async (reason) => {
    try {
      const response = await axios.post(`http://localhost:3000/api/user-cancel-order/${selectedOrderId}`, {
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
              <div className="text-center text-gray-500 text-lg mt-10">
                No orders found.
              </div>
            )}
          </div>
        </div>
      </div>

      <nav className={`max-md:hidden ${isNavCollapsed ? "w-20" : "w-56"} transition-all duration-300`}>
        <UserNavBar isNavCollapsed={isNavCollapsed} />
      </nav>

      <ShippingCancelModal
        isOpen={cancelModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleCancelSubmit}
      />
    </div>
  );
};

export default Shipping;
