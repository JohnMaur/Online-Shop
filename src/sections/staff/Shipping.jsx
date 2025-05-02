// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { CustomButton } from '../../components';
// import { StaffNavBar, Header, MobileStaffNavbar } from "../layout";
// import { Box, Flex, Text, Image, Stack, Button, Divider } from "@chakra-ui/react";
// import { WarningIcon } from '@chakra-ui/icons';
// import Swal from 'sweetalert2';
// import withReactContent from 'sweetalert2-react-content';

// const MySwal = withReactContent(Swal);

// const StaffShipping = () => {
//   const [isNavCollapsed, setIsNavCollapsed] = useState(false);
//   const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
//   const [staffUsername, setStaffUsername] = useState("");
//   const [shippingData, setShippingData] = useState([]); // Stores enriched shipping data
//   const [refresh, setRefresh] = useState(false);

//   const triggerRefresh = () => setRefresh(prev => !prev);


//   const toggleNav = () => {
//     if (window.innerWidth <= 768) {
//       setIsMobileNavOpen(!isMobileNavOpen);
//     } else {
//       setIsNavCollapsed(!isNavCollapsed);
//     }
//   };

//   useEffect(() => {
//     fetchShippingDetails();
//   }, [refresh]);

//   const fetchShippingDetails = async () => {
//     try {
//       // Fetch all userShipping data
//       const response = await axios.get('https://online-shop-server-1.onrender.com/api/all-shipping');
//       const shippingOrders = response.data;

//       if (!Array.isArray(shippingOrders)) {
//         throw new Error('Shipping data is not an array');
//       }

//       // Fetch account info for each unique username in userShipping
//       const uniqueUsernames = [...new Set(shippingOrders.map(order => order.username))];

//       const userDetails = await Promise.all(
//         uniqueUsernames.map(async (username) => {
//           try {
//             const res = await axios.get(`https://online-shop-server-1.onrender.com/api/account-info/${username}`);
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

//   const handleMoveToReceive = async (orderId) => {
//     try {
//       const response = await axios.post('https://online-shop-server-1.onrender.com/api/move-to-receive', { orderId });
//       if (response.status === 200) {
//         // Optimistically update UI
//         setShippingData(prev => prev.filter(order => order._id !== orderId));

//         // Still refetch to stay in sync
//         setRefresh(prev => !prev);

//         MySwal.fire({
//           icon: 'success',
//           title: 'Product Moved',
//           text: 'The product has been successfully moved to receive!',
//           confirmButtonColor: '#3085d6',
//           confirmButtonText: 'OK'
//         });
//       }
//     } catch (error) {
//       console.error("❌ Error moving to receive:", error);
//       MySwal.fire({
//         icon: 'error',
//         title: 'Move Failed',
//         text: 'There was a problem moving the product. Please try again.',
//         confirmButtonColor: '#d33',
//         confirmButtonText: 'OK'
//       });
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
//                       onClick={() => handleMoveToReceive(order._id)}
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
import { Spin } from 'antd';  // <-- Import Spin from Ant Design

const MySwal = withReactContent(Swal);

const StaffShipping = () => {
  const [isNavCollapsed, setIsNavCollapsed] = useState(false);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [staffUsername, setStaffUsername] = useState("");
  const [shippingData, setShippingData] = useState([]); // Stores enriched shipping data
  const [refresh, setRefresh] = useState(false);
  const [isLoading, setIsLoading] = useState(true);  // <-- Add loading state

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
    setIsLoading(true);  // Start loading
    try {
      const response = await axios.get('https://online-shop-server-1.onrender.com/api/all-shipping');
      const shippingOrders = response.data;

      if (!Array.isArray(shippingOrders)) {
        throw new Error('Shipping data is not an array');
      }

      const uniqueUsernames = [...new Set(shippingOrders.map(order => order.username))];

      const userDetails = await Promise.all(
        uniqueUsernames.map(async (username) => {
          try {
            const res = await axios.get(`https://online-shop-server-1.onrender.com/api/account-info/${username}`);
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
    } finally {
      setIsLoading(false);  // Stop loading once data is fetched
    }
  };

  const handleMoveToReceive = async (orderId) => {
    try {
      const response = await axios.post('https://online-shop-server-1.onrender.com/api/move-to-receive', { orderId });
      if (response.status === 200) {
        setShippingData(prev => prev.filter(order => order._id !== orderId));
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

          {/* Show loading spinner while fetching data */}
          {isLoading ? (
            <div className="flex justify-center items-center w-full h-full">
              <Spin size="large" />
            </div>
          ) : shippingData.length > 0 ? (
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
