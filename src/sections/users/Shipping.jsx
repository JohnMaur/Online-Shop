import React, { useState, useEffect } from "react";
import axios from "axios";
import { UserNavBar, Header } from "../layout";

const Shipping = () => {
  const [isNavCollapsed, setIsNavCollapsed] = useState(false);
  const [username, setUsername] = useState("");
  const [orders, setOrders] = useState([]);
  const [staffInfo, setStaffInfo] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && user.username) {
      setUsername(user.username);
      fetchUserOrders(user.username);
    }
  }, []);

  const fetchUserOrders = async (username) => {
    try {
      const response = await axios.get(`http://localhost:3000/api/user-orders/${username}`);
      if (response.status === 200) {
        setOrders(response.data);
        fetchStaffInfo(response.data);
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  const fetchStaffInfo = async (orders) => {
    if (orders.length === 0) return;
    const staffUsernames = [...new Set(orders.map((order) => order.staffUsername))];
    try {
      const staffData = await Promise.all(
        staffUsernames.map(async (staffUsername) => {
          const response = await axios.get(`http://localhost:3000/api/staff-info/${staffUsername}`);
          return { staffUsername, ...response.data };
        })
      );
      setStaffInfo(staffData);
    } catch (error) {
      console.error("Error fetching staff info:", error);
    }
  };

  const toggleNav = () => {
    setIsNavCollapsed(!isNavCollapsed);
  };

  return (
    <div className="flex flex-row-reverse max-md:flex-row w-full">
      <div className="flex flex-col flex-1 h-screen">
        <Header toggleNav={toggleNav} />

        <div className="flex-1 overflow-auto mt-14 bg-[#EFEFEF]">
          <div className="flex-1 p-4 space-x-4 overflow-auto bg-[#EFEFEF]">
            <div className="flex flex-col w-full space-y-5">
              {orders.length > 0 ? (
                orders.map((order) => {
                  const staff = staffInfo?.find((s) => s.staffUsername === order.staffUsername);
                  return (
                    <div key={order._id} className="w-full bg-white p-4 rounded-lg border border-gray-300">
                      <p className="text-2xl font-bold my-3">Delivery date: {order.shippingDate}</p>
                      <div className="flex">
                        <div className="flex w-7/12 p-3">
                          <div className="flex w-full space-x-3">
                            <img src={order.imageUrl} alt="Product" className="w-32 h-32 object-contain" />
                            <div className="flex-1 space-y-1">
                              <p className="text-base font-bold">{order.productName}</p>
                              <p className="text-base font-bold">₱{order.price}</p>
                              <p className="text-base font-bold">Quantity: {order.quantity}</p>
                              <p className="text-base font-bold">Payment: {order.paymentMethod}</p>
                              <p className="text-base text-gray-500">
                                Ordered At: {new Date(order.orderedAt).toLocaleString()}
                              </p>
                            </div>
                          </div>
                        </div>
                        {/* {staff && (
                          <div className="p-3 bg-gray-100 rounded-lg">
                            <h3 className="text-lg font-bold">Supplier Info</h3>
                            <p><strong>Supplier Name:</strong> {staff.staffFullname}</p>
                            <p><strong>Contact Person:</strong> {staff.contactPerson}</p>
                            <p><strong>Email:</strong> {staff.email}</p>
                            <p><strong>Addresst:</strong> {staff.houseStreet} {staff.region}</p>
                            <p><strong>Phone:</strong> {staff.phoneNumber}</p>
                          </div>
                        )} */}
                      </div>
                    </div>
                  );
                })
              ) : (
                <p className="text-center text-gray-500">No orders found.</p>
              )}
            </div>
          </div>
        </div>
      </div>

      <nav className={`max-md:hidden ${isNavCollapsed ? "w-20" : "w-56"} transition-width duration-300`}>
        <UserNavBar isNavCollapsed={isNavCollapsed} />
      </nav>
    </div>
  );
};

export default Shipping;


// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { UserNavBar, Header } from "../layout";

// const Shipping = () => {
//   const [isNavCollapsed, setIsNavCollapsed] = useState(false);
//   const [username, setUsername] = useState('');
//   const [shippingInfo, setShippingInfo] = useState(null);

//   useEffect(() => {
//     const user = JSON.parse(localStorage.getItem("user"));
//     if (user && user.username) {
//       setUsername(user.username);
//       fetchUserShippingInfo(user.username);
//     }
//   }, []);

//   const fetchUserShippingInfo = async (username) => {
//     try {
//       const response = await axios.get(`http://localhost:3000/api/user-shipping-info/${username}`);
//       if (response.status === 200) {
//         setShippingInfo(response.data);
//       }
//     } catch (error) {
//       console.error("Error fetching shipping info:", error);
//     }
//   };

//   const toggleNav = () => {
//     setIsNavCollapsed(!isNavCollapsed);
//   };

//   return (
//     <div className={`flex flex-row-reverse max-md:flex-row w-full`}>
//       <div className='flex flex-col flex-1 h-screen'>
//         <Header toggleNav={toggleNav} />

//         <div className={`flex-1 overflow-auto mt-14 bg-[#EFEFEF]`}>
//           <div className={`flex flex-1 p-4 space-x-4 overflow-auto bg-[#EFEFEF]`}>
//             <div className='flex flex-col w-full space-y-5'>
//               {shippingInfo ? (
//                 <div className='w-full bg-white p-4 px-10 rounded-lg border-[1px] h-fit border-gray-300'>
//                   <p className='text-2xl font-bold my-3'>Delivery date: {shippingInfo.shippingDate}</p>
//                   <div className='flex space-x-20'>
//                     <div className='flex mt-4'>
//                       <img
//                         src={shippingInfo.imageUrl}
//                         alt="Product"
//                         className='w-32 h-32 object-cover'
//                       />
//                       <div className='flex-1 space-y-1 ml-4'>
//                         <p className='text-base font-bold'>{shippingInfo.productName}</p>
//                         <p className='text-base font-bold'>₱{shippingInfo.price}</p>
//                         <p className='text-base font-bold'>Quantity: {shippingInfo.quantity}</p>
//                         <p className='text-base font-bold'>Payment: {shippingInfo.paymentMethod}</p>
//                         <p className='text-base text-gray-500'>Ordered At: {new Date(shippingInfo.orderedAt).toLocaleString()}</p>
//                       </div>
//                     </div>

//                     <div className='mt-4'>
//                       <p className='text-lg font-semibold'>Recipient: {shippingInfo.recipient}</p>
//                       <p className='text-lg font-semibold'>Phone: {shippingInfo.phoneNumber}</p>
//                       <p className='text-lg font-semibold'>Region: {shippingInfo.region}</p>
//                       <p className='text-lg font-semibold'>Address: {shippingInfo.houseStreet}</p>
//                     </div>
//                   </div>

//                 </div>
//               ) : (
//                 <p className='text-center text-gray-500'>No shipping details found.</p>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>

//       <nav className={`max-md:hidden ${isNavCollapsed ? "w-20" : "w-56"} transition-width duration-300`}>
//         <UserNavBar isNavCollapsed={isNavCollapsed} />
//       </nav>
//     </div>
//   );
// };

// export default Shipping;
