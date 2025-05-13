// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import {
//   Box,
//   Flex,
//   Text,
//   Image,
//   Stack,
//   Divider,
//   Button,
//   useToast,
//   Skeleton,
//   Icon,
//   useColorModeValue,
//   Spinner,
// } from "@chakra-ui/react";
// import { WarningIcon } from '@chakra-ui/icons';
// import { CustomButton, CancelOrderModal } from '../../components';
// import { StaffNavBar, Header, MobileStaffNavbar } from "../layout";
// import dayjs from 'dayjs';
// import Swal from 'sweetalert2';
// import withReactContent from 'sweetalert2-react-content';

// const MySwal = withReactContent(Swal);

// const StaffReceiving = () => {
//   const [isNavCollapsed, setIsNavCollapsed] = useState(false);
//   const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
//   const [staffUsername, setStaffUsername] = useState("");
//   const [receivingData, setReceivingData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [loadingOrderId, setLoadingOrderId] = useState(null);
//   const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
//   const [selectedOrderId, setSelectedOrderId] = useState(null);

//   const toast = useToast();

//   const toggleNav = () => {
//     if (window.innerWidth <= 768) {
//       setIsMobileNavOpen(!isMobileNavOpen);
//     } else {
//       setIsNavCollapsed(!isNavCollapsed);
//     }
//   };

//   useEffect(() => {
//     fetchReceivingDetails();
//   }, []);

//   const fetchReceivingDetails = async () => {
//     setLoading(true);
//     try {
//       const response = await axios.get('https://online-shop-server-1.onrender.com/api/all-receiving');
//       const toReceiveOrders = response.data;

//       const uniqueUsernames = [...new Set(toReceiveOrders.map(order => order.username))];

//       const userDetails = await Promise.all(
//         uniqueUsernames.map(async (username) => {
//           try {
//             const res = await axios.get(`https://online-shop-server-1.onrender.com/api/account-info/${username}`);
//             return { username, ...res.data };
//           } catch {
//             return { username, region: "N/A", houseStreet: "N/A", phoneNumber: "N/A" };
//           }
//         })
//       );

//       const userMap = userDetails.reduce((acc, user) => {
//         acc[user.username] = user;
//         return acc;
//       }, {});

//       const enrichedReceivingData = toReceiveOrders.map(order => ({
//         ...order,
//         recipientName: userMap[order.username]?.recipientName || "N/A",
//         region: userMap[order.username]?.region || "N/A",
//         houseStreet: userMap[order.username]?.houseStreet || "N/A",
//         phoneNumber: userMap[order.username]?.phoneNumber || "N/A"
//       }));

//       setReceivingData(enrichedReceivingData);
//     } catch (error) {
//       console.error("Error fetching receiving data:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleOrderReceived = async (orderId) => {
//     const result = await MySwal.fire({
//       title: 'Confirm Received',
//       text: 'Are you sure you want to mark this order as received?',
//       icon: 'question',
//       showCancelButton: true,
//       confirmButtonColor: '#3085d6',
//       cancelButtonColor: '#d33',
//       confirmButtonText: 'Yes, mark as received',
//     });

//     if (!result.isConfirmed) return;

//     setLoadingOrderId(orderId);
//     const orderReceivedDate = dayjs().format('YYYY-MM-DD');

//     try {
//       await axios.post(`https://online-shop-server-1.onrender.com/api/mark-received/${orderId}`, {
//         orderReceivedDate,
//         staffUsername,
//       });
//       setReceivingData((prev) => prev.filter(order => order._id !== orderId));
//       await MySwal.fire('Success', 'Order marked as received.', 'success');
//     } catch {
//       await MySwal.fire('Error', 'Failed to mark order as received.', 'error');
//     } finally {
//       setLoadingOrderId(null);
//     }
//   };  

//   const handleOrderCanceled = async (reason) => {
//     console.log("Canceling order with ID:", selectedOrderId); // Log selectedOrderId
//     if (!selectedOrderId) {
//       toast({
//         title: "No order selected.",
//         status: "error",
//         duration: 3000,
//         isClosable: true,
//       });
//       return;
//     }

//     try {
//       console.log("Sending cancel request to API...");
//       await axios.post(`https://online-shop-server-1.onrender.com/api/cancel-order/${selectedOrderId}`, {
//         canceledReason: reason,
//         staffUsername,
//       });

//       setReceivingData(prev => prev.filter(order => order._id !== selectedOrderId));

//       toast({
//         title: "Order canceled.",
//         description: `Reason: ${reason}`,
//         status: "info",
//         duration: 3000,
//         isClosable: true,
//       });
//     } catch (err) {
//       console.error("Error during cancel order request:", err);
//       toast({
//         title: "Failed to cancel order.",
//         status: "error",
//         duration: 3000,
//         isClosable: true,
//       });
//     } finally {
//       setIsCancelModalOpen(false);
//       setSelectedOrderId(null);
//     }
//   };

//   return (
//     <Flex w="full" direction={{ base: 'column', md: 'row' }}>
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

//       <Box className='h-[100vh] overflow-auto' flex="1" h="full" bg={useColorModeValue("gray.50", "gray.900")}>
//         <Header toggleNav={toggleNav} />
//         <MobileStaffNavbar isOpen={isMobileNavOpen} onClose={() => setIsMobileNavOpen(false)} />
//         <Box px={6} pt={65} pb={10}>
//           <Text fontSize="3xl" fontWeight="bold" mb={6}>
//             Receiving Orders
//           </Text>

//           {loading ? (
//             <Stack spacing={6}>
//               {[...Array(3)].map((_, i) => (
//                 <Skeleton height="200px" borderRadius="lg" key={i} />
//               ))}
//             </Stack>
//           ) : receivingData.length > 0 ? (
//             receivingData.map((order) => (
//               <Box
//                 key={order._id}
//                 p={5}
//                 bg="white"
//                 borderRadius="2xl"
//                 shadow="base"
//                 mb={6}

//                 border="1px solid"
//                 borderColor="gray.200"
//                 _hover={{ shadow: "lg", transform: "scale(1.01)", transition: "all 0.2s ease-in-out" }}
//               >
//                 <Text fontSize="lg" fontWeight="medium" color="gray.600" mb={3}>
//                   Receiving Date: <strong>{order.shippingDate.shippingStringDate}</strong>
//                 </Text>

//                 <Flex className='flex max-md:flex-col' direction={{ base: 'column', md: 'row' }} gap={6}>
//                   <Box flex="1" bg="gray.50" p={4} borderRadius="lg">
//                     <Flex gap={4}>
//                       <Image
//                         src={order.imageUrl || 'https://via.placeholder.com/120'}
//                         alt={order.productName}
//                         boxSize="120px"
//                         objectFit="contain"
//                         borderRadius="md"
//                       />
//                       <Stack spacing={1} flex="1">
//                         <Text fontSize="lg" fontWeight="semibold">{order.productName}</Text>
//                         <Text color="gray.700">₱{order.price}</Text>
//                         <Text color="gray.600">Qty: {order.quantity}</Text>
//                         <Text color="gray.600">Payment: {order.paymentMethod}</Text>
//                         <Text fontSize="sm" color="gray.500">
//                           Ordered At: {new Date(order.orderedAt).toLocaleString()}
//                         </Text>
//                       </Stack>
//                     </Flex>
//                   </Box>

//                   <Box className='max-md:ml-[120px]' flex="1" bg="gray.100" p={4} borderRadius="lg">
//                     <Text fontWeight="bold" mb={2}>Recipient Info</Text>
//                     {order.region !== "N/A" ? (
//                       <Stack spacing={1}>
//                         <Text><strong>Name:</strong> {order.recipientName}</Text>
//                         <Text><strong>Region:</strong> {order.region}</Text>
//                         <Text><strong>Address:</strong> {order.houseStreet}</Text>
//                         <Text><strong>Phone:</strong> {order.phoneNumber}</Text>
//                       </Stack>
//                     ) : (
//                       <Flex align="center" color="red.500">
//                         <Icon as={WarningIcon} boxSize={4} mr={2} />
//                         <Text>Recipient details are missing</Text>
//                       </Flex>
//                     )}
//                   </Box>
//                 </Flex>

//                 <Divider my={4} />
//                 <Flex className='mb-2' justify="flex-end" gap={3}>
//                   <div className="w-32">
//                     <CustomButton
//                       nameButton="Cancel Order"
//                       rounded="rounded-lg"
//                       color="bg-[#656565]"
//                       hoverButton="hover:bg-[#767676]"
//                       responsive="max-md:text-xs"
//                       onClick={() => {
//                         setSelectedOrderId(order._id);
//                         setIsCancelModalOpen(true);
//                       }}

//                     />
//                   </div>
//                   <div className="w-44">
//                     <CustomButton
//                       nameButton={
//                         loadingOrderId === order._id
//                           ? <Spinner size="sm" color="white" />
//                           : "Order Received"
//                       }
//                       rounded="rounded-lg"
//                       color="bg-black"
//                       hoverButton="hover:bg-[#454545]"
//                       responsive="max-md:text-xs"
//                       onClick={() => handleOrderReceived(order._id)}
//                       disabled={loadingOrderId === order._id}
//                     />
//                   </div>
//                 </Flex>
//               </Box>
//             ))
//           ) : (
//             <Flex justify="center" align="center" mt={20}>
//               <Text fontSize="lg" color="gray.500">No receiving records found.</Text>
//             </Flex>
//           )}
//         </Box>
//       </Box>

//       <CancelOrderModal
//         isOpen={isCancelModalOpen}
//         onClose={() => setIsCancelModalOpen(false)}
//         onConfirm={handleOrderCanceled}
//         selectedOrderId={selectedOrderId}  // Pass selectedOrderId here
//       />
//     </Flex>
//   );
// };

// export default StaffReceiving;


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Flex, Text, Image, Stack, Divider, Button, useToast, Skeleton, Icon, useColorModeValue, Spinner } from "@chakra-ui/react";
import { WarningIcon } from '@chakra-ui/icons';
import { CustomButton, CancelOrderModal } from '../../components';
import { StaffNavBar, Header, MobileStaffNavbar } from "../layout";
import dayjs from 'dayjs';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

const StaffReceiving = () => {
  const [isNavCollapsed, setIsNavCollapsed] = useState(false);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [staffUsername, setStaffUsername] = useState("");
  const [receivingData, setReceivingData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingOrderId, setLoadingOrderId] = useState(null);
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState(null);

  const toast = useToast();

  const toggleNav = () => {
    if (window.innerWidth <= 768) {
      setIsMobileNavOpen(!isMobileNavOpen);
    } else {
      setIsNavCollapsed(!isNavCollapsed);
    }
  };

  useEffect(() => {
    fetchReceivingDetails();
  }, []);

  const fetchReceivingDetails = async () => {
    setLoading(true);
    try {
      const response = await axios.get('https://online-shop-server-1.onrender.com/api/all-receiving');
      const toReceiveOrders = response.data;

      const uniqueUsernames = [...new Set(toReceiveOrders.map(order => order.username))];

      const userDetails = await Promise.all(
        uniqueUsernames.map(async (username) => {
          try {
            const res = await axios.get(`https://online-shop-server-1.onrender.com/api/account-info/${username}`);
            return { username, ...res.data };
          } catch {
            return { username, region: "N/A", houseStreet: "N/A", phoneNumber: "N/A" };
          }
        })
      );

      const userMap = userDetails.reduce((acc, user) => {
        acc[user.username] = user;
        return acc;
      }, {});

      const enrichedReceivingData = toReceiveOrders.map(order => ({
        ...order,
        recipientName: userMap[order.username]?.recipientName || "N/A",
        region: userMap[order.username]?.region || "N/A",
        houseStreet: userMap[order.username]?.houseStreet || "N/A",
        phoneNumber: userMap[order.username]?.phoneNumber || "N/A"
      }));

      setReceivingData(enrichedReceivingData);
    } catch (error) {
      console.error("Error fetching receiving data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleOrderReceived = async (orderId) => {
    const result = await MySwal.fire({
      title: 'Confirm Received',
      text: 'Are you sure you want to mark this order as received?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, mark as received',
    });

    if (!result.isConfirmed) return;

    setLoadingOrderId(orderId);
    const orderReceivedDate = dayjs().format('YYYY-MM-DD');

    try {
      await axios.post(`https://online-shop-server-1.onrender.com/api/mark-received/${orderId}`, {
        orderReceivedDate,
        staffUsername,
      });
      setReceivingData((prev) => prev.filter(order => order._id !== orderId));
      await MySwal.fire('Success', 'Order marked as received.', 'success');
    } catch {
      await MySwal.fire('Error', 'Failed to mark order as received.', 'error');
    } finally {
      setLoadingOrderId(null);
    }
  };

  const handleOrderCanceled = async (reason) => {
    console.log("Canceling order with ID:", selectedOrderId); // Log selectedOrderId
    if (!selectedOrderId) {
      toast({
        title: "No order selected.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    try {
      console.log("Sending cancel request to API...");
      await axios.post(`https://online-shop-server-1.onrender.com/api/cancel-order/${selectedOrderId}`, {
        canceledReason: reason,
        staffUsername,
      });

      setReceivingData(prev => prev.filter(order => order._id !== selectedOrderId));

      toast({
        title: "Order canceled.",
        description: `Reason: ${reason}`,
        status: "info",
        duration: 3000,
        isClosable: true,
      });
    } catch (err) {
      console.error("Error during cancel order request:", err);
      toast({
        title: "Failed to cancel order.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsCancelModalOpen(false);
      setSelectedOrderId(null);
    }
  };

  return (
    <Flex w="full" direction={{ base: 'column', md: 'row' }}>
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

      <Box className='h-[100vh] overflow-auto' flex="1" h="full" bg={useColorModeValue("gray.50", "gray.900")}>
        <Header toggleNav={toggleNav} />
        <MobileStaffNavbar isOpen={isMobileNavOpen} onClose={() => setIsMobileNavOpen(false)} />
        <Box px={6} pt={65} pb={10}>
          <Text fontSize="3xl" fontWeight="bold" mb={6}>
            Receiving Orders
          </Text>

          {loading ? (
            // Show Spinner while loading
            <Flex justify="center" align="center" mt={20}>
              <Spinner
                size="xl"
                thickness="4px"
                speed="0.65s"
                color="blue.500"
                style={{ width: '25px', height: '25px' }} // Custom size here
              />
            </Flex>
          ) : receivingData.length > 0 ? (
            receivingData.map((order) => (
              <Box
                key={order._id}
                p={5}
                bg="white"
                borderRadius="2xl"
                shadow="base"
                mb={6}

                border="1px solid"
                borderColor="gray.200"
                _hover={{ shadow: "lg", transform: "scale(1.01)", transition: "all 0.2s ease-in-out" }}
              >
                <Text fontSize="lg" fontWeight="medium" color="gray.600" mb={3}>
                  Receiving Date: <strong>{order.shippingDate.shippingStringDate}</strong>
                </Text>

                <Flex className='flex max-md:flex-col' direction={{ base: 'column', md: 'row' }} gap={6}>
                  <Box flex="1" bg="gray.50" p={4} borderRadius="lg">
                    <Flex gap={4}>
                      <Image
                        src={order.imageUrl || 'https://via.placeholder.com/120'}
                        alt={order.productName}
                        boxSize="120px"
                        objectFit="contain"
                        borderRadius="md"
                      />
                      <Stack spacing={1} flex="1">
                        <Text fontSize="lg" fontWeight="semibold">{order.productName}</Text>
                        <Text color="gray.700">₱{order.price}</Text>
                        <Text color="gray.600">Qty: {order.quantity}</Text>
                        <Text color="gray.600">Payment: {order.paymentMethod}</Text>
                        <Text fontSize="sm" color="gray.500">
                          Ordered At: {new Date(order.orderedAt).toLocaleString()}
                        </Text>
                      </Stack>
                    </Flex>
                  </Box>

                  <Box className='max-md:ml-[120px]' flex="1" bg="gray.100" p={4} borderRadius="lg">
                    <Text fontWeight="bold" mb={2}>Recipient Info</Text>
                    {order.region !== "N/A" ? (
                      <Stack spacing={1}>
                        <Text><strong>Name:</strong> {order.recipientName}</Text>
                        <Text><strong>Region:</strong> {order.region}</Text>
                        <Text><strong>Address:</strong> {order.houseStreet}</Text>
                        <Text><strong>Phone:</strong> {order.phoneNumber}</Text>
                      </Stack>
                    ) : (
                      <Flex align="center" color="red.500">
                        <Icon as={WarningIcon} boxSize={4} mr={2} />
                        <Text>Recipient details are missing</Text>
                      </Flex>
                    )}
                  </Box>
                </Flex>

                <Divider my={4} />
                <Flex className='mb-2' justify="flex-end" gap={3}>
                  <div className="w-32">
                    <CustomButton
                      nameButton="Cancel Order"
                      rounded="rounded-lg"
                      color="bg-red-600"
                      hoverButton="hover:bg-red-700"
                      onClick={() => {
                        setIsCancelModalOpen(true);
                        setSelectedOrderId(order._id);
                      }}
                    />
                  </div>
                  <div className="w-44">
                    <CustomButton
                      nameButton={
                        loadingOrderId === order._id
                          ? <Spinner size="sm" color="white" />
                          : "Order Received"
                      }
                      rounded="rounded-lg"
                      color="bg-black"
                      hoverButton="hover:bg-[#454545]"
                      responsive="max-md:text-xs"
                      onClick={() => handleOrderReceived(order._id)}
                      disabled={loadingOrderId === order._id}
                    />
                  </div>
                </Flex>
              </Box>
            ))
          ) : (
            <Flex justify="center" align="center" mt={20}>
              <Text fontSize="lg" color="gray.500">No receiving records found.</Text>
            </Flex>
          )}
        </Box>
      </Box>

      <CancelOrderModal
        isOpen={isCancelModalOpen}
        onClose={() => setIsCancelModalOpen(false)}
        onConfirm={handleOrderCanceled}
        selectedOrderId={selectedOrderId}  // Pass selectedOrderId here
      />
    </Flex>
  );
};

export default StaffReceiving;
