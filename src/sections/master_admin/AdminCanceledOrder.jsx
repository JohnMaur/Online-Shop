import React, { useEffect, useState } from 'react';
import {
  Box,
  Flex,
  Text,
  Image,
  Stack,
  Divider,
  Skeleton,
  useToast,
} from "@chakra-ui/react";
import axios from 'axios';
import dayjs from 'dayjs';
import { NavigationBar, Header, MobileAdminNavbar } from "../layout"

const AdminCanceledOrder = () => {
  const [isNavCollapsed, setIsNavCollapsed] = useState(false);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [canceledOrders, setCanceledOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const toast = useToast();

  const toggleNav = () => {
    if (window.innerWidth <= 768) {
      setIsMobileNavOpen(!isMobileNavOpen);
    } else {
      setIsNavCollapsed(!isNavCollapsed);
    }
  };

  useEffect(() => {
    fetchCanceledOrders();
  }, []);

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

  return (
    <div className="flex flex-row-reverse max-md:flex-row w-full">
      <div className="flex flex-col flex-1 h-screen">
        <Header toggleNav={toggleNav} />
        <MobileAdminNavbar isOpen={isMobileNavOpen} onClose={() => setIsMobileNavOpen(false)} />
        <div className="flex-1 overflow-auto mt-14 bg-[#EFEFEF] p-2">
          <Text fontSize="3xl" fontWeight="bold" mb={6}>Canceled Orders</Text>

          {loading ? (
            <Stack spacing={4}>
              {[...Array(3)].map((_, i) => (
                <Skeleton height="200px" borderRadius="lg" key={i} />
              ))}
            </Stack>
          ) : canceledOrders.length > 0 ? (
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
          )}
        </div>
      </div>

      <nav className={`max-md:hidden ${isNavCollapsed ? "w-20" : "w-56"} transition-width duration-300`}>
        <NavigationBar
          isNavCollapsed={isNavCollapsed}
        />
      </nav>
    </div>
  );
};

export default AdminCanceledOrder
