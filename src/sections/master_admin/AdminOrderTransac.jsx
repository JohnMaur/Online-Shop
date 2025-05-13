
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import {
//   Box, Flex, Text, Image, Stack, Spinner, useToast, Divider,
// } from "@chakra-ui/react";
// import { WarningIcon } from '@chakra-ui/icons';
// import { NavigationBar, Header, MobileAdminNavbar } from "../layout";
// import { CustomButton, CancelOrderModal } from '../../components';
// import Swal from 'sweetalert2';
// import withReactContent from 'sweetalert2-react-content';
// import dayjs from 'dayjs';
// import Select from 'react-select';
// import { RepeatClockIcon, DownloadIcon, CheckCircleIcon, NotAllowedIcon } from '@chakra-ui/icons';

// const MySwal = withReactContent(Swal);

// import { useLocation } from 'react-router-dom';
// import queryString from 'query-string';


// const AdminOrderTransac = () => {
//   const [isNavCollapsed, setIsNavCollapsed] = useState(false);
//   const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
//   const [orderData, setOrderData] = useState([]);
//   const [canceledOrders, setCanceledOrders] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [refresh, setRefresh] = useState(false);
//   const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
//   const [selectedOrderId, setSelectedOrderId] = useState(null);
//   const [totals, setTotals] = useState({
//     shipping: 0,
//     receiving: 0,
//     received: 0,
//     canceled: 0,
//   });
//   const toast = useToast();

//   const location = useLocation();
//   const queryParams = queryString.parse(location.search);

//   const [statusFilter, setStatusFilter] = useState(queryParams.status || "shipping");


//   const fetchOrders = async () => {
//     setLoading(true);
//     try {
//       let response;
//       if (statusFilter === "shipping") {
//         response = await axios.get("https://online-shop-server-1.onrender.com/api/all-shipping");
//       } else if (statusFilter === "receiving") {
//         response = await axios.get("https://online-shop-server-1.onrender.com/api/all-receiving");
//       } else if (statusFilter === "received") {
//         response = await axios.get("https://online-shop-server-1.onrender.com/api/all-order-received");
//         setOrderData(response.data);
//         return;
//       } else if (statusFilter === "canceled") {
//         fetchCanceledOrders();  // Fetch canceled orders if the filter is "canceled"
//         return;
//       }

//       const orders = response.data;
//       const uniqueUsernames = [...new Set(orders.map(order => order.username))];

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

//       const enrichedData = orders.map(order => ({
//         ...order,
//         recipientName: userMap[order.username]?.recipientName || "N/A",
//         region: userMap[order.username]?.region || "N/A",
//         houseStreet: userMap[order.username]?.houseStreet || "N/A",
//         phoneNumber: userMap[order.username]?.phoneNumber || "N/A"
//       }));

//       setOrderData(enrichedData);
//     } catch (error) {
//       console.error("Error fetching orders:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchCanceledOrders = async () => {
//     setLoading(true);
//     try {
//       const res = await axios.get("https://online-shop-server-1.onrender.com/api/all-canceled-orders");
//       setCanceledOrders(res.data);
//     } catch (err) {
//       toast({
//         title: "Failed to fetch canceled orders.",
//         status: "error",
//         duration: 3000,
//         isClosable: true,
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchOrders();
//   }, [statusFilter, refresh]);

//   const toggleNav = () => {
//     if (window.innerWidth <= 768) {
//       setIsMobileNavOpen(!isMobileNavOpen);
//     } else {
//       setIsNavCollapsed(!isNavCollapsed);
//     }
//   };

//   const handleMoveToReceive = async (orderId) => {
//     try {
//       await axios.post('https://online-shop-server-1.onrender.com/api/move-to-receive', { orderId });
//       setOrderData(prev => prev.filter(order => order._id !== orderId));
//       MySwal.fire("Success", "Moved to receiving.", "success");
//     } catch (error) {
//       MySwal.fire("Error", "Failed to move order.", "error");
//     }
//   };

//   const handleOrderReceived = async (orderId) => {
//     const result = await MySwal.fire({
//       title: 'Confirm Received',
//       text: 'Mark this order as received?',
//       icon: 'question',
//       showCancelButton: true,
//       confirmButtonText: 'Yes',
//     });

//     if (!result.isConfirmed) return;

//     try {
//       await axios.post(`https://online-shop-server-1.onrender.com/api/admin-mark-received/${orderId}`, {
//         orderReceivedDate: dayjs().format('YYYY-MM-DD'),
//       });
//       setOrderData(prev => prev.filter(order => order._id !== orderId));
//       MySwal.fire('Success', 'Order marked as received.', 'success');
//     } catch {
//       MySwal.fire('Error', 'Failed to mark order.', 'error');
//     }
//   };

//   const handleCancel = async (reason) => {
//     if (!selectedOrderId) return;
//     try {
//       await axios.post(`https://online-shop-server-1.onrender.com/api/admin-cancel-order/${selectedOrderId}`, {
//         canceledReason: reason,
//       });
//       setOrderData(prev => prev.filter(order => order._id !== selectedOrderId));
//       toast({
//         title: "Order canceled",
//         description: `Reason: ${reason}`,
//         status: "info",
//         duration: 3000,
//         isClosable: true,
//       });
//     } catch (err) {
//       toast({ title: "Cancel failed", status: "error", duration: 3000, isClosable: true });
//     } finally {
//       setIsCancelModalOpen(false);
//       setSelectedOrderId(null);
//     }
//   };

//   const fetchAllOrderTotals = async () => {
//     try {
//       const [shippingRes, receivingRes, receivedRes, canceledRes] = await Promise.all([
//         axios.get("https://online-shop-server-1.onrender.com/api/all-shipping"),
//         axios.get("https://online-shop-server-1.onrender.com/api/all-receiving"),
//         axios.get("https://online-shop-server-1.onrender.com/api/all-order-received"),
//         axios.get("https://online-shop-server-1.onrender.com/api/all-canceled-orders"),
//       ]);

//       setTotals({
//         shipping: shippingRes.data.length,
//         receiving: receivingRes.data.length,
//         received: receivedRes.data.length,
//         canceled: canceledRes.data.length,
//       });
//     } catch (error) {
//       console.error("Error fetching order totals:", error);
//     }
//   };

//   useEffect(() => {
//     fetchAllOrderTotals();
//   }, []);

//   const groupedOrders = orderData.reduce((acc, order) => {
//     if (!acc[order.userOrderID]) {
//       acc[order.userOrderID] = [];
//     }
//     acc[order.userOrderID].push(order);
//     return acc;
//   }, {});

//   const statusOptions = [
//     { value: 'shipping', label: 'Shipping' },
//     { value: 'receiving', label: 'Receiving' },
//     { value: 'received', label: 'Order Received' },
//     { value: 'canceled', label: 'Canceled Orders' },
//   ];

//   return (
//     <Flex w="full" direction={{ base: 'column', md: 'row' }}>
//       <Box as="nav" maxW={{ base: '20', md: '56' }} display={{ base: 'none', md: 'block' }}>
//         <nav className={`max-md:hidden ${isNavCollapsed ? "w-20" : "w-56"} transition-width duration-300`}>
//           <NavigationBar isNavCollapsed={isNavCollapsed} />
//         </nav>
//       </Box>
//       <Box flex="1" bg="gray.50">
//         <Header toggleNav={toggleNav} />
//         <MobileAdminNavbar isOpen={isMobileNavOpen} onClose={() => setIsMobileNavOpen(false)} />
//         <Box p={4} className='h-[100vh] overflow-auto'>
//           <Text fontWeight="bold" mb={4} className='mt-14 p-2 text-xl'>
//             Staff {statusFilter === 'shipping' ? "Shipping" : statusFilter === 'receiving' ? "Receiving" : "Order Received"} Details
//           </Text>

//           <div className='flex justify-end'>
//             <Box mb={4} w="250px">
//               <Select
//                 options={statusOptions}
//                 value={statusOptions.find(option => option.value === statusFilter)}
//                 onChange={(selectedOption) => setStatusFilter(selectedOption.value)}
//               />
//             </Box>
//           </div>

//           <Flex mb={6} gap={4} wrap="wrap">
//             <Box
//               bg="white"
//               p={5}
//               borderRadius="xl"
//               boxShadow="md"
//               borderColor="gray.200"
//               minW="220px"
//               flex="1"
//             >
//               <Flex align="center" gap={3}>
//                 <RepeatClockIcon boxSize={18} color="blue.500" />
//                 <Text fontWeight="bold" fontSize="lg">Shipping: {totals.shipping}</Text>
//               </Flex>
//             </Box>

//             <Box
//               bg="white"
//               p={5}
//               borderRadius="xl"
//               boxShadow="md"
//               borderColor="gray.200"
//               minW="220px"
//               flex="1"
//             >
//               <Flex align="center" gap={3}>
//                 <DownloadIcon boxSize={18} color="purple.500" />
//                 <Text fontWeight="bold" fontSize="lg">Receiving: {totals.receiving}</Text>
//               </Flex>
//             </Box>

//             <Box
//               bg="white"
//               p={5}
//               borderRadius="xl"
//               boxShadow="md"
//               borderColor="gray.200"
//               minW="220px"
//               flex="1"
//             >
//               <Flex align="center" gap={3}>
//                 <CheckCircleIcon boxSize={18} color="green.500" />
//                 <Text fontWeight="bold" fontSize="lg">Order Received: {totals.received}</Text>
//               </Flex>
//             </Box>

//             <Box
//               bg="white"
//               p={5}
//               borderRadius="xl"
//               boxShadow="md"
//               borderColor="gray.200"
//               minW="220px"
//               flex="1"
//             >
//               <Flex align="center" gap={3}>
//                 <NotAllowedIcon boxSize={18} color="red.500" />
//                 <Text fontWeight="bold" fontSize="lg">Canceled Orders: {totals.canceled}</Text>
//               </Flex>
//             </Box>
//           </Flex>

//           {loading ? (
//             <Flex justify="center" align="center" mt={20}>
//               <Spinner
//                 size="xl"
//                 thickness="4px"
//                 speed="0.65s"
//                 color="blue.500"
//                 style={{ width: '25px', height: '25px' }}
//               />
//             </Flex>
//           ) : statusFilter === "canceled" ? (
//             canceledOrders.length > 0 ? (
//               canceledOrders.map((order) => (
//                 <Box
//                   key={order._id}
//                   p={5}
//                   bg="white"
//                   borderRadius="2xl"
//                   shadow="base"
//                   mb={6}
//                   border="1px solid"
//                   borderColor="gray.200"
//                 >
//                   <Text fontSize="lg" fontWeight="medium" color="gray.600" mb={3}>
//                     Canceled Date: <strong>{order.canceledDate}</strong>
//                   </Text>

//                   <Flex className='flex max-md:flex-col' direction={{ base: 'column', md: 'row' }} gap={6}>
//                     <Box flex="1" bg="gray.50" p={4} borderRadius="lg">
//                       <Flex gap={4}>
//                         <Image
//                           src={order.imageUrl || 'https://via.placeholder.com/120'}
//                           alt={order.productName}
//                           boxSize="120px"
//                           objectFit="contain"
//                           borderRadius="md"
//                         />
//                         <Stack spacing={1} flex="1">
//                           <Text className='font-bold' fontSize="lg" fontWeight="semibold">{order.productName}</Text>
//                           <Text color="gray.700">₱{order.price}</Text>
//                           <Text color="gray.600">Qty: {order.quantity}</Text>
//                           <Text color="gray.600">Payment: {order.paymentMethod}</Text>
//                           <Text fontSize="sm" color="gray.500">
//                             Ordered At: {new Date(order.orderedAt).toLocaleString()}
//                           </Text>

//                           <Text fontSize="lg" fontWeight="medium" color="gray.600" mb={3}>Reason: <strong>{order.canceledReason}</strong></Text>
//                         </Stack>
//                       </Flex>
//                     </Box>
//                   </Flex>

//                   <Divider my={4} />
//                 </Box>
//               ))
//             ) : (
//               <Flex justify="center" align="center" mt={20}>
//                 <Text fontSize="lg" color="gray.500">No canceled orders found.</Text>
//               </Flex>
//             )
//           ) : statusFilter === "received" ? (
//             orderData.length > 0 ? (
//               orderData.map((order) => (
//                 <Box
//                   key={order._id}
//                   p={5}
//                   bg="white"
//                   borderRadius="2xl"
//                   shadow="base"
//                   mb={6}
//                   border="1px solid"
//                   borderColor="gray.200"
//                 >
//                   <Text fontSize="lg" fontWeight="medium" color="gray.600" mb={3}>
//                     Received Date: <strong>{dayjs(order.orderReceivedDate).format("YYYY-MM-DD")}</strong>
//                   </Text>

//                   <Flex className='flex max-md:flex-col' direction={{ base: 'column', md: 'row' }} gap={6}>
//                     <Box flex="1" bg="gray.50" p={4} borderRadius="lg">
//                       <Flex gap={4}>
//                         <Image
//                           src={order.imageUrl || 'https://via.placeholder.com/120'}
//                           alt={order.productName}
//                           boxSize="120px"
//                           objectFit="contain"
//                           borderRadius="md"
//                         />
//                         <Stack spacing={1} flex="1">
//                           <Text className='font-bold' fontSize="lg" fontWeight="semibold">{order.productName}</Text>
//                           <Text color="gray.700">₱{order.price}</Text>
//                           <Text color="gray.600">Qty: {order.quantity}</Text>
//                           <Text color="gray.600">Payment: {order.paymentMethod}</Text>
//                           <Text color="gray.600">Received Date: {order.orderReceivedDate}</Text>
//                           <Text fontSize="sm" color="gray.500">
//                             Ordered At: {new Date(order.orderedAt).toLocaleString()}
//                           </Text>
//                         </Stack>
//                       </Flex>
//                     </Box>
//                   </Flex>
//                 </Box>
//               ))
//             ) : (
//               <Flex justify="center" mt={10}>
//                 <Text color="gray.500">No received orders found.</Text>
//               </Flex>
//             )
//           ) : orderData.length > 0 ? (
//             Object.entries(groupedOrders).map(([userOrderID, orders]) => (
//               <Box key={userOrderID} p={5} bg="white" borderRadius="lg" shadow="md" mb={4} borderWidth="1px">
//                 <Text fontSize="xl" fontWeight="semibold" mb={3}>
//                   Delivery Date: {orders[0].shippingDate.shippingStringDate}
//                 </Text>

//                 {orders.map(order => (
//                   <Flex key={order._id} direction={{ base: 'column', md: 'row' }} gap={4} mb={4}>
//                     <Box flex="1" bg="gray.50" p={4} borderRadius="lg" boxShadow="sm">
//                       <Flex gap={4}>
//                         <Image
//                           src={order.imageUrl}
//                           alt="Product"
//                           boxSize="120px"
//                           objectFit="contain"
//                         />
//                         <Stack spacing={1} flex="1">
//                           <Text fontWeight="bold">{order.productName}</Text>
//                           <Text>₱{order.price}</Text>
//                           <Text>Quantity: {order.quantity}</Text>
//                           <Text>Payment: {order.paymentMethod}</Text>
//                           <Text color="gray.500">Ordered At: {new Date(order.orderedAt).toLocaleString()}</Text>
//                         </Stack>
//                       </Flex>
//                     </Box>

//                     <Box className='max-md:ml-[120px]' flex="1" bg="gray.100" p={4} borderRadius="lg" boxShadow="sm">
//                       <Text fontWeight="bold" mb={2}>Shipping Details</Text>
//                       {order.region !== "N/A" ? (
//                         <>
//                           <Text><strong>Recipient:</strong> {order.recipientName}</Text>
//                           <Text><strong>Region:</strong> {order.region}</Text>
//                           <Text><strong>Address:</strong> {order.houseStreet}</Text>
//                           <Text><strong>Phone:</strong> {order.phoneNumber}</Text>
//                         </>
//                       ) : (
//                         <Flex align="center" color="red.500">
//                           <WarningIcon boxSize={4} mr={2} />
//                           <Text>⚠️ Recipient details are missing!</Text>
//                         </Flex>
//                       )}
//                     </Box>
//                   </Flex>
//                 ))}

//                 <div className='ml-[130px] max-md:ml-[125px]'>
//                   <Text fontWeight="bold">
//                     Shipping Fee: ₱{orders[0].shippingPrice}
//                   </Text>

//                   {/* Calculate Total */}
//                   <Text fontWeight="bold">
//                     Total: ₱{orders.reduce((total, order) => total + (order.price * order.quantity), 0) + orders[0].shippingPrice}
//                   </Text>
//                 </div>

//                 <Flex justify="end" mt={4} gap={2}>
//                   {statusFilter === "shipping" ? (
//                     <div className='w-44 mr-4'>
//                       <CustomButton
//                         nameButton="Move to receive"
//                         rounded="rounded-lg"
//                         color="bg-black"
//                         hoverButton="hover:bg-[#454545]"
//                         onClick={() => orders.forEach(order => handleMoveToReceive(order._id))}
//                       />
//                     </div>
//                   ) : (
//                     <Flex justify="flex-end" gap={3}>
//                       <div className="w-32">
//                         <CustomButton
//                           nameButton="Cancel Order"
//                           rounded="rounded-lg"
//                           color="bg-[#656565]"
//                           hoverButton="hover:bg-[#767676]"
//                           responsive="max-md:text-xs"
//                           onClick={() => {
//                             setIsCancelModalOpen(true);
//                             setSelectedOrderId(orders[0]._id); // you might want to handle group canceling too
//                           }}
//                         />
//                       </div>
//                       <div className="w-44">
//                         <CustomButton
//                           nameButton="Mark as Received"
//                           rounded="rounded-lg"
//                           color="bg-black"
//                           hoverButton="hover:bg-[#454545]"
//                           responsive="max-md:text-xs"
//                           onClick={() => orders.forEach(order => handleOrderReceived(order._id))}
//                         />
//                       </div>
//                     </Flex>
//                   )}
//                 </Flex>
//               </Box>
//             ))
//           ) : (
//             <Text textAlign="center" color="gray.500">No {statusFilter} records found.</Text>
//           )}
//         </Box>
//         <CancelOrderModal
//           isOpen={isCancelModalOpen}
//           onClose={() => setIsCancelModalOpen(false)}
//           onConfirm={handleCancel}
//           selectedOrderId={selectedOrderId}
//         />
//       </Box>
//     </Flex>
//   );
// };

// export default AdminOrderTransac;



import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Box, Flex, Text, Image, Stack, Spinner, useToast, Divider,
} from "@chakra-ui/react";
import { WarningIcon } from '@chakra-ui/icons';
import { NavigationBar, Header, MobileAdminNavbar } from "../layout";
import { CustomButton, CancelOrderModal } from '../../components';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import dayjs from 'dayjs';
import Select from 'react-select';
import { Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { RepeatClockIcon, DownloadIcon, CheckCircleIcon, NotAllowedIcon } from '@chakra-ui/icons';

const MySwal = withReactContent(Swal);

import { useLocation } from 'react-router-dom';
import queryString from 'query-string';


const AdminOrderTransac = () => {
  const [isNavCollapsed, setIsNavCollapsed] = useState(false);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [orderData, setOrderData] = useState([]);
  const [canceledOrders, setCanceledOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState(false);
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [shippingTotal, setShippingTotal] = useState(0);
  const [receivingTotal, setReceivingTotal] = useState(0);
  const [receivedTotal, setReceivedTotal] = useState(0);
  const [canceledTotal, setCanceledTotal] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const toast = useToast();

  const location = useLocation();
  const queryParams = queryString.parse(location.search);

  const [statusFilter, setStatusFilter] = useState(queryParams.status || "shipping");


  const fetchOrders = async () => {
    setLoading(true);
    try {
      let response;
      if (statusFilter === "shipping") {
        response = await axios.get("https://online-shop-server-1.onrender.com/api/all-shipping");
      } else if (statusFilter === "receiving") {
        response = await axios.get("https://online-shop-server-1.onrender.com/api/all-receiving");
      } else if (statusFilter === "received") {
        response = await axios.get("https://online-shop-server-1.onrender.com/api/all-order-received");
        setOrderData(response.data);
        return;
      } else if (statusFilter === "canceled") {
        fetchCanceledOrders();  // Fetch canceled orders if the filter is "canceled"
        return;
      }

      const orders = response.data;
      const uniqueUsernames = [...new Set(orders.map(order => order.username))];

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

      const enrichedData = orders.map(order => ({
        ...order,
        recipientName: userMap[order.username]?.recipientName || "N/A",
        region: userMap[order.username]?.region || "N/A",
        houseStreet: userMap[order.username]?.houseStreet || "N/A",
        phoneNumber: userMap[order.username]?.phoneNumber || "N/A"
      }));

      setOrderData(enrichedData);
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCanceledOrders = async () => {
    setLoading(true);
    try {
      const res = await axios.get("https://online-shop-server-1.onrender.com/api/all-canceled-orders");
      setCanceledOrders(res.data);
    } catch (err) {
      toast({
        title: "Failed to fetch canceled orders.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [statusFilter, refresh]);

  const toggleNav = () => {
    if (window.innerWidth <= 768) {
      setIsMobileNavOpen(!isMobileNavOpen);
    } else {
      setIsNavCollapsed(!isNavCollapsed);
    }
  };

  const handleMoveToReceive = async (orderId) => {
    try {
      await axios.post('https://online-shop-server-1.onrender.com/api/move-to-receive', { orderId });
      setOrderData(prev => prev.filter(order => order._id !== orderId));
      MySwal.fire("Success", "Moved to receiving.", "success");
    } catch (error) {
      MySwal.fire("Error", "Failed to move order.", "error");
    }
  };

  const handleOrderReceived = async (orderId) => {
    const result = await MySwal.fire({
      title: 'Confirm Received',
      text: 'Mark this order as received?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes',
    });

    if (!result.isConfirmed) return;

    try {
      await axios.post(`https://online-shop-server-1.onrender.com/api/admin-mark-received`, {
        orderId,
        orderReceivedDate: dayjs().format('YYYY-MM-DD'),
      });
      setOrderData(prev => prev.filter(order => order._id !== orderId));
      MySwal.fire('Success', 'Order marked as received.', 'success');
    } catch {
      MySwal.fire('Error', 'Failed to mark order.', 'error');
    }
  };


  const handleCancel = async (reason) => {
    if (!selectedOrderId) return;
    try {
      await axios.post(`https://online-shop-server-1.onrender.com/api/admin-cancel-order/${selectedOrderId}`, {
        canceledReason: reason,
      });
      setOrderData(prev => prev.filter(order => order._id !== selectedOrderId));
      toast({
        title: "Order canceled",
        description: `Reason: ${reason}`,
        status: "info",
        duration: 3000,
        isClosable: true,
      });
    } catch (err) {
      toast({ title: "Cancel failed", status: "error", duration: 3000, isClosable: true });
    } finally {
      setIsCancelModalOpen(false);
      setSelectedOrderId(null);
    }
  };

  const fetchShippingTotal = async () => {
    setLoading(true);
    try {
      const res = await axios.get("https://online-shop-server-1.onrender.com/api/all-shipping");
      setShippingTotal(res.data.length);
    } catch (error) {
      console.error("Error fetching shipping total:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchReceivingTotal = async () => {
    setLoading(true);
    try {
      const res = await axios.get("https://online-shop-server-1.onrender.com/api/all-receiving");
      setReceivingTotal(res.data.length);
    } catch (error) {
      console.error("Error fetching receiving total:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchReceivedTotal = async () => {
    setLoading(true);
    try {
      const res = await axios.get("https://online-shop-server-1.onrender.com/api/all-order-received");
      setReceivedTotal(res.data.length);
    } catch (error) {
      console.error("Error fetching received total:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCanceledTotal = async () => {
    setLoading(true);
    try {
      const res = await axios.get("https://online-shop-server-1.onrender.com/api/all-canceled-orders");
      setCanceledTotal(res.data.length);
    } catch (error) {
      console.error("Error fetching canceled total:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchAllOrderTotals = async () => {
    await fetchShippingTotal();
    await fetchReceivingTotal();
    await fetchReceivedTotal();
    await fetchCanceledTotal();
  };

  useEffect(() => {
    fetchAllOrderTotals();
  }, [statusFilter, refresh]);

  const filteredOrders = orderData.filter(order =>
    order.productName?.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const groupedOrders = filteredOrders.reduce((acc, order) => {
    if (!acc[order.userOrderID]) {
      acc[order.userOrderID] = [];
    }
    acc[order.userOrderID].push(order);
    return acc;
  }, {});

  const statusOptions = [
    { value: 'shipping', label: 'Shipping' },
    { value: 'receiving', label: 'Receiving' },
    { value: 'received', label: 'Order Received' },
    { value: 'canceled', label: 'Canceled Orders' },
  ];

  return (
    <Flex w="full" direction={{ base: 'column', md: 'row' }}>
      <Box as="nav" maxW={{ base: '20', md: '56' }} display={{ base: 'none', md: 'block' }}>
        <nav className={`max-md:hidden ${isNavCollapsed ? "w-20" : "w-56"} transition-width duration-300`}>
          <NavigationBar isNavCollapsed={isNavCollapsed} />
        </nav>
      </Box>
      <Box flex="1" bg="gray.50">
        <Header toggleNav={toggleNav} />
        <MobileAdminNavbar isOpen={isMobileNavOpen} onClose={() => setIsMobileNavOpen(false)} />
        <Box p={4} className='h-[100vh] overflow-auto'>
          <Text fontWeight="bold" mb={4} className='mt-14 p-2 text-xl'>
            Staff {statusFilter === 'shipping' ? "Shipping" : statusFilter === 'receiving' ? "Receiving" : "Order Received"} Details
          </Text>

          <div className='flex justify-end flex-wrap gap-2 mb-4'>
            <Box w="300px">
              <Input
                placeholder="Search by product name"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                prefix={<SearchOutlined />}
                allowClear
                size="large"
              />
            </Box>
            <Box w="250px">
              <Select
                options={statusOptions}
                value={statusOptions.find(option => option.value === statusFilter)}
                onChange={(selectedOption) => setStatusFilter(selectedOption.value)}
              />
            </Box>
          </div>

          <Flex mb={6} gap={4} wrap="wrap">
            <Box
              bg="white"
              p={5}
              borderRadius="xl"
              boxShadow="md"
              borderColor="gray.200"
              minW="220px"
              flex="1"
            >
              <Flex align="center" gap={3}>
                <RepeatClockIcon boxSize={18} color="blue.500" />
                <Text fontWeight="bold" fontSize="lg">Shipping: {shippingTotal}</Text>
              </Flex>
            </Box>

            <Box
              bg="white"
              p={5}
              borderRadius="xl"
              boxShadow="md"
              borderColor="gray.200"
              minW="220px"
              flex="1"
            >
              <Flex align="center" gap={3}>
                <DownloadIcon boxSize={18} color="purple.500" />
                <Text fontWeight="bold" fontSize="lg">Receiving: {receivingTotal}</Text>
              </Flex>
            </Box>

            <Box
              bg="white"
              p={5}
              borderRadius="xl"
              boxShadow="md"
              borderColor="gray.200"
              minW="220px"
              flex="1"
            >
              <Flex align="center" gap={3}>
                <CheckCircleIcon boxSize={18} color="green.500" />
                <Text fontWeight="bold" fontSize="lg">Order Received: {receivedTotal}</Text>
              </Flex>
            </Box>

            <Box
              bg="white"
              p={5}
              borderRadius="xl"
              boxShadow="md"
              borderColor="gray.200"
              minW="220px"
              flex="1"
            >
              <Flex align="center" gap={3}>
                <NotAllowedIcon boxSize={18} color="red.500" />
                <Text fontWeight="bold" fontSize="lg">Canceled Orders: {canceledTotal}</Text>
              </Flex>
            </Box>
          </Flex>

          {loading ? (
            <Flex justify="center" align="center" mt={20}>
              <Spinner
                size="xl"
                thickness="4px"
                speed="0.65s"
                color="blue.500"
                style={{ width: '25px', height: '25px' }}
              />
            </Flex>
          ) : statusFilter === "canceled" ? (
            canceledOrders.length > 0 ? (
              canceledOrders.map((order) => (
                <Box
                  key={order._id}
                  p={5}
                  bg="white"
                  borderRadius="2xl"
                  shadow="base"
                  mb={6}
                  border="1px solid"
                  borderColor="gray.200"
                >
                  <Text fontSize="lg" fontWeight="medium" color="gray.600" mb={3}>
                    Canceled Date: <strong>{order.canceledDate}</strong>
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
                          <Text className='font-bold' fontSize="lg" fontWeight="semibold">{order.productName}</Text>
                          <Text color="gray.700">₱{order.price}</Text>
                          <Text color="gray.600">Qty: {order.quantity}</Text>
                          <Text color="gray.600">Payment: {order.paymentMethod}</Text>
                          <Text fontSize="sm" color="gray.500">
                            Ordered At: {new Date(order.orderedAt).toLocaleString()}
                          </Text>

                          <Text fontSize="lg" fontWeight="medium" color="gray.600" mb={3}>Reason: <strong>{order.canceledReason}</strong></Text>
                        </Stack>
                      </Flex>
                    </Box>
                  </Flex>

                  <Divider my={4} />
                </Box>
              ))
            ) : (
              <Flex justify="center" align="center" mt={20}>
                <Text fontSize="lg" color="gray.500">No canceled orders found.</Text>
              </Flex>
            )
          ) : statusFilter === "received" ? (
            orderData.length > 0 ? (
              Object.entries(groupedOrders).map(([userOrderID, orders]) => (
                <Box
                  key={userOrderID}
                  p={5}
                  bg="white"
                  borderRadius="2xl"
                  shadow="base"
                  mb={6}
                  border="1px solid"
                  borderColor="gray.200"
                >
                  <Text fontSize="lg" fontWeight="medium" color="gray.600" mb={3}>
                    Received Date: <strong>{dayjs(orders[0].orderReceivedDate).format("YYYY-MM-DD")}</strong>
                  </Text>

                  {orders.map((order) => (
                    <Flex
                      key={order._id}
                      className="flex max-md:flex-col"
                      direction={{ base: 'column', md: 'row' }}
                      gap={6}
                      mb={4}
                    >
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
                            <Text className="font-bold" fontSize="lg" fontWeight="semibold">
                              {order.productName}
                            </Text>
                            <Text color="gray.700">₱{order.price}</Text>
                            <Text color="gray.600">Qty: {order.quantity}</Text>
                            <Text color="gray.600">Payment: {order.paymentMethod}</Text>
                            <Text color="gray.600">Received Date: {order.orderReceivedDate}</Text>
                            <Text fontSize="sm" color="gray.500">
                              Ordered At: {new Date(order.orderedAt).toLocaleString()}
                            </Text>
                          </Stack>
                        </Flex>
                      </Box>
                    </Flex>
                  ))}
                  <div className='ml-[130px] max-md:ml-[125px]'>
                    <Text fontWeight="bold">
                      Shipping Fee: ₱{orders[0].shippingPrice}
                    </Text>

                    {/* Calculate Total */}
                    <Text fontWeight="bold">
                      Total: ₱{orders.reduce((total, order) => total + (order.price * order.quantity), 0) + orders[0].shippingPrice}
                    </Text>
                  </div>
                </Box>

              ))
            ) : (
              <Flex justify="center" mt={10}>
                <Text color="gray.500">No received orders found.</Text>
              </Flex>
            )
          ) : orderData.length > 0 ? (
            Object.entries(groupedOrders).map(([userOrderID, orders]) => (
              <Box key={userOrderID} p={5} bg="white" borderRadius="lg" shadow="md" mb={4} borderWidth="1px">
                <Text fontSize="xl" fontWeight="semibold" mb={3}>
                  Delivery Date: {orders[0].shippingDate.shippingStringDate}
                </Text>

                {orders.map(order => (
                  <Flex key={order._id} direction={{ base: 'column', md: 'row' }} gap={4} mb={4}>
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
                ))}

                <div className='ml-[130px] max-md:ml-[125px]'>
                  <Text fontWeight="bold">
                    Shipping Fee: ₱{orders[0].shippingPrice}
                  </Text>

                  {/* Calculate Total */}
                  <Text fontWeight="bold">
                    Total: ₱{orders.reduce((total, order) => total + (order.price * order.quantity), 0) + orders[0].shippingPrice}
                  </Text>
                </div>

                <Flex justify="end" mt={4} gap={2}>
                  {statusFilter === "shipping" ? (
                    <div className='w-44 mr-4'>
                      <CustomButton
                        nameButton="Move to receive"
                        rounded="rounded-lg"
                        color="bg-black"
                        hoverButton="hover:bg-[#454545]"
                        onClick={() => orders.forEach(order => handleMoveToReceive(order._id))}
                      />
                    </div>
                  ) : (
                    <Flex justify="flex-end" gap={3}>
                      <div className="w-32">
                        <CustomButton
                          nameButton="Cancel Order"
                          rounded="rounded-lg"
                          color="bg-[#656565]"
                          hoverButton="hover:bg-[#767676]"
                          responsive="max-md:text-xs"
                          onClick={() => {
                            setIsCancelModalOpen(true);
                            setSelectedOrderId(orders[0]._id); // you might want to handle group canceling too
                          }}
                        />
                      </div>
                      <div className="w-44">
                        <CustomButton
                          nameButton="Mark as Received"
                          rounded="rounded-lg"
                          color="bg-black"
                          hoverButton="hover:bg-[#454545]"
                          responsive="max-md:text-xs"
                          onClick={() => orders.forEach(order => handleOrderReceived(order._id))}
                        />
                      </div>
                    </Flex>
                  )}
                </Flex>
              </Box>
            ))
          ) : (
            <Text textAlign="center" color="gray.500">No {statusFilter} records found.</Text>
          )}
        </Box>
        <CancelOrderModal
          isOpen={isCancelModalOpen}
          onClose={() => setIsCancelModalOpen(false)}
          onConfirm={handleCancel}
          selectedOrderId={selectedOrderId}
        />
      </Box>
    </Flex>
  );
};

export default AdminOrderTransac;
