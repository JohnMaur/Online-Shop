import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { StaffNavBar, Header } from "../layout";

const StaffShipping = () => {
  const [isNavCollapsed, setIsNavCollapsed] = useState(false);
  const [staffUsername, setStaffUsername] = useState("");
  const [shippingData, setShippingData] = useState([]); // Stores enriched shipping data

  const toggleNav = () => {
    setIsNavCollapsed(!isNavCollapsed);
  };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("staff"));
    if (user && user.username) {
      setStaffUsername(user.username);
      fetchShippingDetails(user.username);
    }
  }, []);

  const fetchShippingDetails = async (username) => {
    try {
      // Step 1: Fetch userShipping data
      const response = await axios.get(`http://localhost:3000/api/staff-shipping/${username}`);
      const shippingOrders = response.data;
  
      // Check if the fetched data is an array
      if (!Array.isArray(shippingOrders)) {
        throw new Error('Shipping data is not an array');
      }
  
      console.log("📦 Fetched shipping data:", shippingOrders);
  
      // Step 2: Fetch account info for each unique username in userShipping
      const uniqueUsernames = [...new Set(shippingOrders.map(order => order.username))];
  
      // Fetch user details in parallel
      const userDetails = await Promise.all(
        uniqueUsernames.map(async (username) => {
          try {
            const res = await axios.get(`http://localhost:3000/api/account-info/${username}`);
            return { username, ...res.data };
          } catch (error) {
            console.warn(`⚠️ No account info found for: ${username}`);
            return { username, region: "N/A", houseStreet: "N/A", phoneNumber: "N/A" };
          }
        })
      );
  
      // Step 3: Map user details into an object
      const userMap = userDetails.reduce((acc, user) => {
        acc[user.username] = user;
        return acc;
      }, {});
  
      console.log("👤 Fetched user account info:", userMap);
  
      // Step 4: Merge userShipping with account info
      const enrichedShippingData = shippingOrders.map(order => ({
        ...order,
        recipientName: userMap[order.username]?.recipientName || "N/A",
        region: userMap[order.username]?.region || "N/A",
        houseStreet: userMap[order.username]?.houseStreet || "N/A",
        phoneNumber: userMap[order.username]?.phoneNumber || "N/A"
      }));
  
      setShippingData(enrichedShippingData);
    } catch (error) {
      console.error("❌ Error fetching staff shipping data:", error);
    }
  };
  
  return (
    <div className={`flex flex-row-reverse max-md:flex-row w-full`}>
      <div className='flex flex-col flex-1 h-screen'>
        <Header toggleNav={toggleNav} />

        <div className={`flex-1 overflow-auto mt-14 bg-[#EFEFEF]`}>
          <div className={`flex-1 p-4 space-x-4 overflow-auto bg-[#EFEFEF]`}>
            <div className='flex flex-col w-full space-y-5'>
              {shippingData.length > 0 ? (
                shippingData.map((order) => (
                  <div key={order._id} className='w-full bg-white p-4 rounded-lg border-[1px] h-fit border-gray-300'>
                    <p className='text-2xl font-bold my-3'>Delivery Date: {order.shippingDate}</p>

                    <div className='flex'>
                      {/* Product Details */}
                      <div className='w-2/3 p-3'>
                        <div className='flex w-full space-x-3'>
                          <img
                            src={order.imageUrl}
                            alt="Product"
                            className='w-32 h-32 object-contain'
                          />
                          <div className='flex-1 space-y-1'>
                            <p className='text-base font-bold'>{order.productName}</p>
                            <p className='text-base font-bold'>₱{order.price}</p>
                            <p className='text-base font-bold'>Quantity: {order.quantity}</p>
                            <p className='text-base font-bold'>Payment: {order.paymentMethod}</p>
                            <p className='text-base text-gray-500'>Ordered At: {new Date(order.orderedAt).toLocaleString()}</p>
                          </div>
                        </div>
                      </div>

                      {/* User Shipping Details */}
                      <div className='w-1/3 p-3 bg-gray-100 rounded-lg'>
                        <p className='text-lg font-bold'>Shipping Details</p>

                        {order.region !== "N/A" ? (
                          <>
                            <p className='text-sm'><strong>Recipient:</strong> {order.recipientName}</p>
                            <p className='text-sm'><strong>Region:</strong> {order.region}</p>
                            <p className='text-sm'><strong>Address:</strong> {order.houseStreet}</p>
                            <p className='text-sm'><strong>Phone:</strong> {order.phoneNumber}</p>
                          </>
                        ) : (
                          <p className="text-sm text-red-500 font-bold">⚠️ Recipient details are missing!</p>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p className='text-center text-gray-500'>No shipping records found.</p>
              )}
            </div>
          </div>
        </div>
      </div>

      <nav className={`max-md:hidden ${isNavCollapsed ? "w-20" : "w-56"} transition-width duration-300`}>
        <StaffNavBar isNavCollapsed={isNavCollapsed} setStaffUsername={setStaffUsername} />
      </nav>
    </div>
  );
};

export default StaffShipping;
