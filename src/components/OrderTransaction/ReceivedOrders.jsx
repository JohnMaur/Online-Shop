import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Flex, Text, Spinner } from "@chakra-ui/react";
import { CheckCircleIcon } from '@chakra-ui/icons';

const ReceivedOrders = ({ setOrderData, setLoading }) => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchReceivedOrders = async () => {
      setLoading(true);
      try {
        const response = await axios.get("https://online-shop-server-1.onrender.com/api/all-order-received");
        setOrders(response.data);
        setOrderData(response.data);
      } catch (error) {
        console.error("Error fetching received orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchReceivedOrders();
  }, [setOrderData, setLoading]);

  if (orders.length === 0) {
    return <Spinner size="xl" color="green.500" />;
  }

  return (
    <Flex direction="column" gap={6}>
      {orders.map(order => (
        <Box key={order._id} p={5} bg="white" borderRadius="md" boxShadow="md">
          <Flex align="center" gap={3}>
            <CheckCircleIcon boxSize={18} color="green.500" />
            <Text fontWeight="bold" fontSize="lg">{order.productName}</Text>
          </Flex>
          {/* Add more details here */}
        </Box>
      ))}
    </Flex>
  );
};

export default ReceivedOrders;
