import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { NavigationBar, Header, MobileAdminNavbar } from "../layout"
import { Box, Flex, Text, Image, Stack, Button, Divider } from "@chakra-ui/react";
import { WarningIcon } from '@chakra-ui/icons';

const AdminToShip = () => {
  const [isNavCollapsed, setIsNavCollapsed] = useState(false);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [shippingData, setShippingData] = useState([]); // Stores enriched shipping data

  const toggleNav = () => {
    if (window.innerWidth <= 768) {
      setIsMobileNavOpen(!isMobileNavOpen);
    } else {
      setIsNavCollapsed(!isNavCollapsed);
    }
  };

  useEffect(() => {
    fetchShippingDetails();
  }, []);

  const fetchShippingDetails = async () => {
    try {
      // Fetch all userShipping data
      const response = await axios.get('https://online-shop-server-1.onrender.com/api/all-shipping');
      const shippingOrders = response.data;

      if (!Array.isArray(shippingOrders)) {
        throw new Error('Shipping data is not an array');
      }

      // Fetch account info for each unique username in userShipping
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
          <NavigationBar isNavCollapsed={isNavCollapsed} />
        </nav>  
      </Box>
  
      {/* Main Content - RIGHT SIDE */}
      <Box flex="1" h="full" bg="gray.50"> 
        <Header toggleNav={toggleNav} />
        <MobileAdminNavbar isOpen={isMobileNavOpen} onClose={() => setIsMobileNavOpen(false)} />
  
        <Box className='h-[100vh] overflow-auto' p={4}>
          <Text fontSize="2xl" fontWeight="bold" mb={4} className='mt-14'>Shipping Details</Text>
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

export default AdminToShip