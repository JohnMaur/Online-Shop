import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Flex, Text, Spinner } from "@chakra-ui/react";
import { DownloadIcon } from '@chakra-ui/icons';

const ReceivingOrders = ({ setOrderData, setLoading }) => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchReceivingOrders = async () => {
      setLoading(true);
      try {
        const response = await axios.get("https://online-shop-server-1.onrender.com/api/all-receiving");
        setOrders(response.data);
        setOrderData(response.data);
      } catch (error) {
        console.error("Error fetching receiving orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchReceivingOrders();
  }, [setOrderData, setLoading]);

  if (orders.length === 0) {
    return <Spinner size="xl" color="purple.500" />;
  }

  return (
    <Flex direction="column" gap={6}>
      {orders.map(order => (
        <Box key={order._id} p={5} bg="white" borderRadius="md" boxShadow="md">
          <Flex align="center" gap={3}>
            <DownloadIcon boxSize={18} color="purple.500" />
            <Text fontWeight="bold" fontSize="lg">{order.productName}</Text>
          </Flex>
          {/* Add more details here */}
        </Box>
      ))}
    </Flex>
  );
};

export default ReceivingOrders;
