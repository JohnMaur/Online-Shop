// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { StaffNavBar, Header } from "../layout";

// const StaffShipping = () => {
//   const [isNavCollapsed, setIsNavCollapsed] = useState(false);
//   const [staffUsername, setStaffUsername] = useState("");
//   const [shippingData, setShippingData] = useState([]); // Stores enriched shipping data

//   const toggleNav = () => {
//     setIsNavCollapsed(!isNavCollapsed);
//   };

//   useEffect(() => {
//     const user = JSON.parse(localStorage.getItem("staff"));
//     if (user && user.username) {
//       setStaffUsername(user.username);
//       fetchShippingDetails(user.username);
//     }
//   }, []);

//   const fetchShippingDetails = async (username) => {
//     try {
//       // Step 1: Fetch userShipping data
//       const response = await axios.get(`http://localhost:3000/api/staff-shipping/${username}`);
//       const shippingOrders = response.data;

//       // Check if the fetched data is an array
//       if (!Array.isArray(shippingOrders)) {
//         throw new Error('Shipping data is not an array');
//       }

//       console.log("📦 Fetched shipping data:", shippingOrders);

//       // Step 2: Fetch account info for each unique username in userShipping
//       const uniqueUsernames = [...new Set(shippingOrders.map(order => order.username))];

//       // Fetch user details in parallel
//       const userDetails = await Promise.all(
//         uniqueUsernames.map(async (username) => {
//           try {
//             const res = await axios.get(`http://localhost:3000/api/account-info/${username}`);
//             return { username, ...res.data };
//           } catch (error) {
//             console.warn(`⚠️ No account info found for: ${username}`);
//             return { username, region: "N/A", houseStreet: "N/A", phoneNumber: "N/A" };
//           }
//         })
//       );

//       // Step 3: Map user details into an object
//       const userMap = userDetails.reduce((acc, user) => {
//         acc[user.username] = user;
//         return acc;
//       }, {});

//       console.log("👤 Fetched user account info:", userMap);

//       // Step 4: Merge userShipping with account info
//       const enrichedShippingData = shippingOrders.map(order => ({
//         ...order,
//         recipientName: userMap[order.username]?.recipientName || "N/A",
//         region: userMap[order.username]?.region || "N/A",
//         houseStreet: userMap[order.username]?.houseStreet || "N/A",
//         phoneNumber: userMap[order.username]?.phoneNumber || "N/A"
//       }));

//       setShippingData(enrichedShippingData);
//     } catch (error) {
//       console.error("❌ Error fetching staff shipping data:", error);
//     }
//   };

//   return (
//     <div className={`flex flex-row-reverse max-md:flex-row w-full`}>
//       <div className='flex flex-col flex-1 h-screen'>
//         <Header toggleNav={toggleNav} />

//         <div className={`flex-1 overflow-auto mt-14 bg-[#EFEFEF]`}>
//           <div className={`flex-1 p-4 space-x-4 overflow-auto bg-[#EFEFEF]`}>
//             <div className='flex flex-col w-full space-y-5'>
//               {shippingData.length > 0 ? (
//                 shippingData.map((order) => (
//                   <div key={order._id} className='w-full bg-white p-4 rounded-lg border-[1px] h-fit border-gray-300'>
//                     <p className='text-2xl font-bold my-3'>Delivery Date: {order.shippingDate.shippingStringDate}</p>

//                     <div className='flex'>
//                       {/* Product Details */}
//                       <div className='w-2/3 p-3'>
//                         <div className='flex w-full space-x-3'>
//                           <img
//                             src={order.imageUrl}
//                             alt="Product"
//                             className='w-32 h-32 object-contain'
//                           />
//                           <div className='flex-1 space-y-1'>
//                             <p className='text-base font-bold'>{order.productName}</p>
//                             <p className='text-base font-bold'>₱{order.price}</p>
//                             <p className='text-base font-bold'>Quantity: {order.quantity}</p>
//                             <p className='text-base font-bold'>Payment: {order.paymentMethod}</p>
//                             <p className='text-base text-gray-500'>Ordered At: {new Date(order.orderedAt).toLocaleString()}</p>
//                           </div>
//                         </div>
//                       </div>

//                       {/* User Shipping Details */}
//                       <div className='w-1/3 p-3 bg-gray-100 rounded-lg'>
//                         <p className='text-lg font-bold'>Shipping Details</p>

//                         {order.region !== "N/A" ? (
//                           <>
//                             <p className='text-sm'><strong>Recipient:</strong> {order.recipientName}</p>
//                             <p className='text-sm'><strong>Region:</strong> {order.region}</p>
//                             <p className='text-sm'><strong>Address:</strong> {order.houseStreet}</p>
//                             <p className='text-sm'><strong>Phone:</strong> {order.phoneNumber}</p>
//                           </>
//                         ) : (
//                           <p className="text-sm text-red-500 font-bold">⚠️ Recipient details are missing!</p>
//                         )}
//                       </div>
//                     </div>
//                   </div>
//                 ))
//               ) : (
//                 <p className='text-center text-gray-500'>No shipping records found.</p>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>

//       <nav className={`max-md:hidden ${isNavCollapsed ? "w-20" : "w-56"} transition-width duration-300`}>
//         <StaffNavBar isNavCollapsed={isNavCollapsed} setStaffUsername={setStaffUsername} />
//       </nav>
//     </div>
//   );
// };

// export default StaffShipping;


// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { StaffNavBar, Header } from "../layout";

// const StaffShipping = () => {
//   const [isNavCollapsed, setIsNavCollapsed] = useState(false);
//   const [staffUsername, setStaffUsername] = useState("");
//   const [shippingData, setShippingData] = useState([]); // Stores enriched shipping data

//   const toggleNav = () => {
//     setIsNavCollapsed(!isNavCollapsed);
//   };

//   useEffect(() => {
//     fetchShippingDetails();
//   }, []);

//   const fetchShippingDetails = async () => {
//     try {
//       // Step 1: Fetch all userShipping data
//       const response = await axios.get('http://localhost:3000/api/all-shipping');
//       const shippingOrders = response.data;

//       // Check if the fetched data is an array
//       if (!Array.isArray(shippingOrders)) {
//         throw new Error('Shipping data is not an array');
//       }

//       console.log("📦 Fetched shipping data:", shippingOrders);

//       // Step 2: Fetch account info for each unique username in userShipping
//       const uniqueUsernames = [...new Set(shippingOrders.map(order => order.username))];

//       // Fetch user details in parallel
//       const userDetails = await Promise.all(
//         uniqueUsernames.map(async (username) => {
//           try {
//             const res = await axios.get(`http://localhost:3000/api/account-info/${username}`);
//             return { username, ...res.data };
//           } catch (error) {
//             console.warn(`⚠️ No account info found for: ${username}`);
//             return { username, region: "N/A", houseStreet: "N/A", phoneNumber: "N/A" };
//           }
//         })
//       );

//       // Step 3: Map user details into an object
//       const userMap = userDetails.reduce((acc, user) => {
//         acc[user.username] = user;
//         return acc;
//       }, {});

//       console.log("👤 Fetched user account info:", userMap);

//       // Step 4: Merge userShipping with account info
//       const enrichedShippingData = shippingOrders.map(order => ({
//         ...order,
//         recipientName: userMap[order.username]?.recipientName || "N/A",
//         region: userMap[order.username]?.region || "N/A",
//         houseStreet: userMap[order.username]?.houseStreet || "N/A",
//         phoneNumber: userMap[order.username]?.phoneNumber || "N/A"
//       }));

//       setShippingData(enrichedShippingData);
//     } catch (error) {
//       console.error("❌ Error fetching all shipping data:", error);
//     }
//   };

//   return (
//     <div className={`flex flex-row-reverse max-md:flex-row w-full`}>
//       <div className='flex flex-col flex-1 h-screen'>
//         <Header toggleNav={toggleNav} />

//         <div className={`flex-1 overflow-auto mt-14 bg-[#EFEFEF]`}>
//           <div className={`flex-1 p-4 space-x-4 overflow-auto bg-[#EFEFEF]`}>
//             <div className='flex flex-col w-full space-y-5'>
//               {shippingData.length > 0 ? (
//                 shippingData.map((order) => (
//                   <div key={order._id} className='w-full bg-white p-4 rounded-lg border-[1px] h-fit border-gray-300'>
//                     <p className='text-2xl font-bold my-3'>Delivery Date: {order.shippingDate.shippingStringDate}</p>

//                     <div className='flex'>
//                       {/* Product Details */}
//                       <div className='w-2/3 p-3'>
//                         <div className='flex w-full space-x-3'>
//                           <img
//                             src={order.imageUrl}
//                             alt="Product"
//                             className='w-32 h-32 object-contain'
//                           />
//                           <div className='flex-1 space-y-1'>
//                             <p className='text-base font-bold'>{order.productName}</p>
//                             <p className='text-base font-bold'>₱{order.price}</p>
//                             <p className='text-base font-bold'>Quantity: {order.quantity}</p>
//                             <p className='text-base font-bold'>Payment: {order.paymentMethod}</p>
//                             <p className='text-base text-gray-500'>Ordered At: {new Date(order.orderedAt).toLocaleString()}</p>
//                           </div>
//                         </div>
//                       </div>

//                       {/* User Shipping Details */}
//                       <div className='w-1/3 p-3 bg-gray-100 rounded-lg'>
//                         <p className='text-lg font-bold'>Shipping Details</p>

//                         {order.region !== "N/A" ? (
//                           <>
//                             <p className='text-sm'><strong>Recipient:</strong> {order.recipientName}</p>
//                             <p className='text-sm'><strong>Region:</strong> {order.region}</p>
//                             <p className='text-sm'><strong>Address:</strong> {order.houseStreet}</p>
//                             <p className='text-sm'><strong>Phone:</strong> {order.phoneNumber}</p>
//                           </>
//                         ) : (
//                           <p className="text-sm text-red-500 font-bold">⚠️ Recipient details are missing!</p>
//                         )}
//                       </div>
//                     </div>
//                   </div>
//                 ))
//               ) : (
//                 <p className='text-center text-gray-500'>No shipping records found.</p>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>

//       <nav className={`max-md:hidden ${isNavCollapsed ? "w-20" : "w-56"} transition-width duration-300`}>
//       <StaffNavBar isNavCollapsed={isNavCollapsed} setStaffUsername={setStaffUsername} />
//       </nav>
//     </div>
//   );
// };

// export default StaffShipping;

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { CustomButton } from '../../components';
// import { StaffNavBar, Header, MobileStaffNavbar } from "../layout";
// import { Box, Flex, Text, Image, Stack, Button, Divider } from "@chakra-ui/react";
// import { WarningIcon } from '@chakra-ui/icons';

// const StaffShipping = () => {
//   const [isNavCollapsed, setIsNavCollapsed] = useState(false);
//   const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
//   const [staffUsername, setStaffUsername] = useState("");
//   const [shippingData, setShippingData] = useState([]); // Stores enriched shipping data

//   const toggleNav = () => {
//     if (window.innerWidth <= 768) {
//       setIsMobileNavOpen(!isMobileNavOpen);
//     } else {
//       setIsNavCollapsed(!isNavCollapsed);
//     }
//   };

//   useEffect(() => {
//     fetchShippingDetails();
//   }, []);

//   const fetchShippingDetails = async () => {
//     try {
//       // Fetch all userShipping data
//       const response = await axios.get('http://localhost:3000/api/all-shipping');
//       const shippingOrders = response.data;

//       if (!Array.isArray(shippingOrders)) {
//         throw new Error('Shipping data is not an array');
//       }

//       // Fetch account info for each unique username in userShipping
//       const uniqueUsernames = [...new Set(shippingOrders.map(order => order.username))];

//       const userDetails = await Promise.all(
//         uniqueUsernames.map(async (username) => {
//           try {
//             const res = await axios.get(`http://localhost:3000/api/account-info/${username}`);
//             return { username, ...res.data };
//           } catch (error) {
//             console.warn(`⚠️ No account info found for: ${username}`);
//             return { username, region: "N/A", houseStreet: "N/A", phoneNumber: "N/A" };
//           }
//         })
//       );

//       const userMap = userDetails.reduce((acc, user) => {
//         acc[user.username] = user;
//         return acc;
//       }, {});

//       const enrichedShippingData = shippingOrders.map(order => ({
//         ...order,
//         recipientName: userMap[order.username]?.recipientName || "N/A",
//         region: userMap[order.username]?.region || "N/A",
//         houseStreet: userMap[order.username]?.houseStreet || "N/A",
//         phoneNumber: userMap[order.username]?.phoneNumber || "N/A"
//       }));

//       setShippingData(enrichedShippingData);
//     } catch (error) {
//       console.error("❌ Error fetching all shipping data:", error);
//     }
//   };

//   return (
//     <Flex w="full" direction={{ base: 'column', md: 'row' }}>
//       {/* Sidebar Navigation - LEFT SIDE */}
//       <Box
//         as="nav"
//         maxW={{ base: '20', md: '56' }}
//         w="full"
//         transition="width 0.3s"
//         display={{ base: 'none', md: 'block' }}
//       >
//         <nav className={`max-md:hidden ${isNavCollapsed ? "w-20" : "w-56"} transition-width duration-300`}>
//           <StaffNavBar isNavCollapsed={isNavCollapsed} setStaffUsername={setStaffUsername} />
//         </nav>
//       </Box>

//       {/* Main Content - RIGHT SIDE */}
//       <Box flex="1" h="full" bg="gray.50">
//         <Header toggleNav={toggleNav} />
//         <MobileStaffNavbar isOpen={isMobileNavOpen} onClose={() => setIsMobileNavOpen(false)} />
//         <Box className='h-[100vh] overflow-auto' p={4}>
//           <Text fontSize="2xl" fontWeight="bold" mb={4} className='mt-14'>Staff Shipping Details</Text>
//           {shippingData.length > 0 ? (
//             shippingData.map((order) => (
//               <Box key={order._id} p={5} bg="white" borderRadius="lg" shadow="md" mb={4} borderWidth="1px">
//                 <Text fontSize="xl" fontWeight="semibold" mb={3}>Delivery Date: {order.shippingDate.shippingStringDate}</Text>

//                 <Flex className='flex max-md:flex-col' direction={{ base: 'column', md: 'row' }} gap={4}>
//                   {/* Product Details */}
//                   <Box flex="1" bg="gray.50" p={4} borderRadius="lg" boxShadow="sm">
//                     <Flex gap={4}>
//                       <Image
//                         src={order.imageUrl}
//                         alt="Product"
//                         boxSize="120px"
//                         objectFit="contain"
//                       />
//                       <Stack spacing={1} flex="1">
//                         <Text fontWeight="bold">{order.productName}</Text>
//                         <Text>₱{order.price}</Text>
//                         <Text>Quantity: {order.quantity}</Text>
//                         <Text>Payment: {order.paymentMethod}</Text>
//                         <Text color="gray.500">Ordered At: {new Date(order.orderedAt).toLocaleString()}</Text>
//                       </Stack>
//                     </Flex>
//                   </Box>

//                   {/* User Shipping Details */}
//                   <Box className='max-md:ml-[120px]' flex="1" bg="gray.100" p={4} borderRadius="lg" boxShadow="sm">
//                     <Text fontWeight="bold" mb={2}>Shipping Details</Text>

//                     {order.region !== "N/A" ? (
//                       <>
//                         <Text><strong>Recipient:</strong> {order.recipientName}</Text>
//                         <Text><strong>Region:</strong> {order.region}</Text>
//                         <Text><strong>Address:</strong> {order.houseStreet}</Text>
//                         <Text><strong>Phone:</strong> {order.phoneNumber}</Text>
//                       </>
//                     ) : (
//                       <Flex align="center" color="red.500">
//                         <WarningIcon boxSize={4} mr={2} />
//                         <Text>⚠️ Recipient details are missing!</Text>
//                       </Flex>
//                     )}
//                   </Box>
//                 </Flex>
//                 <div className='flex justify-end p-2'>
//                   <div className='w-44'>
//                     <CustomButton
//                       nameButton="Move to receive"
//                       rounded="rounded-lg"
//                       color="bg-black"
//                       hoverButton="hover:bg-[#454545]"
//                     />
//                   </div>

//                 </div>

//               </Box>
//             ))
//           ) : (
//             <Text color="gray.500" textAlign="center">No shipping records found.</Text>
//           )}
//         </Box>
//       </Box>
//     </Flex>
//   );

// };

// export default StaffShipping;




import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { CustomButton } from '../../components';
import { StaffNavBar, Header, MobileStaffNavbar } from "../layout";
import { Box, Flex, Text, Image, Stack, Button, Divider } from "@chakra-ui/react";
import { WarningIcon } from '@chakra-ui/icons';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

const StaffShipping = () => {
  const [isNavCollapsed, setIsNavCollapsed] = useState(false);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [staffUsername, setStaffUsername] = useState("");
  const [shippingData, setShippingData] = useState([]); // Stores enriched shipping data
  const [refresh, setRefresh] = useState(false);

  const triggerRefresh = () => setRefresh(prev => !prev);


  const toggleNav = () => {
    if (window.innerWidth <= 768) {
      setIsMobileNavOpen(!isMobileNavOpen);
    } else {
      setIsNavCollapsed(!isNavCollapsed);
    }
  };

  useEffect(() => {
    fetchShippingDetails();
  }, [refresh]);

  const fetchShippingDetails = async () => {
    try {
      // Fetch all userShipping data
      const response = await axios.get('http://localhost:3000/api/all-shipping');
      const shippingOrders = response.data;

      if (!Array.isArray(shippingOrders)) {
        throw new Error('Shipping data is not an array');
      }

      // Fetch account info for each unique username in userShipping
      const uniqueUsernames = [...new Set(shippingOrders.map(order => order.username))];

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

      const userMap = userDetails.reduce((acc, user) => {
        acc[user.username] = user;
        return acc;
      }, {});

      const enrichedShippingData = shippingOrders.map(order => ({
        ...order,
        recipientName: userMap[order.username]?.recipientName || "N/A",
        region: userMap[order.username]?.region || "N/A",
        houseStreet: userMap[order.username]?.houseStreet || "N/A",
        phoneNumber: userMap[order.username]?.phoneNumber || "N/A"
      }));

      setShippingData(enrichedShippingData);
    } catch (error) {
      console.error("❌ Error fetching all shipping data:", error);
    }
  };

  const handleMoveToReceive = async (orderId) => {
    try {
      const response = await axios.post('http://localhost:3000/api/move-to-receive', { orderId });
      if (response.status === 200) {
        // Optimistically update UI
        setShippingData(prev => prev.filter(order => order._id !== orderId));

        // Still refetch to stay in sync
        setRefresh(prev => !prev);

        MySwal.fire({
          icon: 'success',
          title: 'Product Moved',
          text: 'The product has been successfully moved to receive!',
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'OK'
        });
      }
    } catch (error) {
      console.error("❌ Error moving to receive:", error);
      MySwal.fire({
        icon: 'error',
        title: 'Move Failed',
        text: 'There was a problem moving the product. Please try again.',
        confirmButtonColor: '#d33',
        confirmButtonText: 'OK'
      });
    }
  };


  return (
    <Flex w="full" direction={{ base: 'column', md: 'row' }}>
      {/* Sidebar Navigation - LEFT SIDE */}
      <Box
        as="nav"
        maxW={{ base: '20', md: '56' }}
        w="full"
        transition="width 0.3s"
        display={{ base: 'none', md: 'block' }}
      >
        <nav className={`max-md:hidden ${isNavCollapsed ? "w-20" : "w-56"} transition-width duration-300`}>
          <StaffNavBar isNavCollapsed={isNavCollapsed} setStaffUsername={setStaffUsername} />
        </nav>
      </Box>

      {/* Main Content - RIGHT SIDE */}
      <Box flex="1" h="full" bg="gray.50">
        <Header toggleNav={toggleNav} />
        <MobileStaffNavbar isOpen={isMobileNavOpen} onClose={() => setIsMobileNavOpen(false)} />
        <Box className='h-[100vh] overflow-auto' p={4}>
          <Text fontSize="2xl" fontWeight="bold" mb={4} className='mt-14'>Staff Shipping Details</Text>
          {shippingData.length > 0 ? (
            shippingData.map((order) => (
              <Box key={order._id} p={5} bg="white" borderRadius="lg" shadow="md" mb={4} borderWidth="1px">
                <Text fontSize="xl" fontWeight="semibold" mb={3}>Delivery Date: {order.shippingDate.shippingStringDate}</Text>

                <Flex className='flex max-md:flex-col' direction={{ base: 'column', md: 'row' }} gap={4}>
                  {/* Product Details */}
                  <Box flex="1" bg="gray.50" p={4} borderRadius="lg" boxShadow="sm">
                    <Flex gap={4}>
                      <Image
                        src={order.imageUrl}
                        alt="Product"
                        boxSize="120px"
                        objectFit="contain"
                      />
                      <Stack spacing={1} flex="1">
                        <Text fontWeight="bold">{order.productName}</Text>
                        <Text>₱{order.price}</Text>
                        <Text>Quantity: {order.quantity}</Text>
                        <Text>Payment: {order.paymentMethod}</Text>
                        <Text color="gray.500">Ordered At: {new Date(order.orderedAt).toLocaleString()}</Text>
                      </Stack>
                    </Flex>
                  </Box>

                  {/* User Shipping Details */}
                  <Box className='max-md:ml-[120px]' flex="1" bg="gray.100" p={4} borderRadius="lg" boxShadow="sm">
                    <Text fontWeight="bold" mb={2}>Shipping Details</Text>

                    {order.region !== "N/A" ? (
                      <>
                        <Text><strong>Recipient:</strong> {order.recipientName}</Text>
                        <Text><strong>Region:</strong> {order.region}</Text>
                        <Text><strong>Address:</strong> {order.houseStreet}</Text>
                        <Text><strong>Phone:</strong> {order.phoneNumber}</Text>
                      </>
                    ) : (
                      <Flex align="center" color="red.500">
                        <WarningIcon boxSize={4} mr={2} />
                        <Text>⚠️ Recipient details are missing!</Text>
                      </Flex>
                    )}
                  </Box>
                </Flex>
                <div className='flex justify-end p-2'>
                  <div className='w-44'>
                    <CustomButton
                      nameButton="Move to receive"
                      rounded="rounded-lg"
                      color="bg-black"
                      hoverButton="hover:bg-[#454545]"
                      onClick={() => handleMoveToReceive(order._id)}
                    />
                  </div>

                </div>

              </Box>
            ))
          ) : (
            <Text color="gray.500" textAlign="center">No shipping records found.</Text>
          )}
        </Box>
      </Box>
    </Flex>
  );

};

export default StaffShipping;