import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Flex, Text, Spinner } from "@chakra-ui/react";
import { RepeatClockIcon } from '@chakra-ui/icons';

const ShippingOrders = ({ setOrderData, setLoading }) => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchShippingOrders = async () => {
      setLoading(true);
      try {
        const response = await axios.get("https://online-shop-server-1.onrender.com/api/all-shipping");
        setOrders(response.data);
        setOrderData(response.data);  // Update the parent order data
      } catch (error) {
        console.error("Error fetching shipping orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchShippingOrders();
  }, [setOrderData, setLoading]);

  if (orders.length === 0) {
    return <Spinner size="xl" color="blue.500" />;
  }

  return (
    <Flex direction="column" gap={6}>
      {orders.map(order => (
        <Box key={order._id} p={5} bg="white" borderRadius="md" boxShadow="md">
          <Flex align="center" gap={3}>
            <RepeatClockIcon boxSize={18} color="blue.500" />
            <Text fontWeight="bold" fontSize="lg">{order.productName}</Text>
          </Flex>
          {/* Add more details here */}
        </Box>
      ))}
    </Flex>
  );
};

export default ShippingOrders;
