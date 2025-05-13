import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Flex, Text, Spinner } from "@chakra-ui/react";
import { NotAllowedIcon } from '@chakra-ui/icons';

const CanceledOrders = ({ setOrderData, setLoading }) => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchCanceledOrders = async () => {
      setLoading(true);
      try {
        const response = await axios.get("https://online-shop-server-1.onrender.com/api/all-canceled-orders");
        setOrders(response.data);
        setOrderData(response.data);
      } catch (error) {
        console.error("Error fetching canceled orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCanceledOrders();
  }, [setOrderData, setLoading]);

  if (orders.length === 0) {
    return <Spinner size="xl" color="red.500" />;
  }

  return (
    <Flex direction="column" gap={6}>
      {orders.map(order => (
        <Box key={order._id} p={5} bg="white" borderRadius="md" boxShadow="md">
          <Flex align="center" gap={3}>
            <NotAllowedIcon boxSize={18} color="red.500" />
            <Text fontWeight="bold" fontSize="lg">{order.productName}</Text>
          </Flex>
          {/* Add more details here */}
        </Box>
      ))}
    </Flex>
  );
};

export default CanceledOrders;
