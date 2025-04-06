import React, { useState } from "react";
import { cashOnDelivery, paymaya } from "../../assets/icons";
import axios from "axios";

const ShowPaymentMethod = ({ isOpen, onClose, totalPrice, totalShipping, totalItems, selectedItems, username, selectedShippingOptions, deleteProduct }) => {
  const [selectedPayment, setSelectedPayment] = useState("Cash on Delivery");

  if (!isOpen) return null;

  const handlePlaceOrder = async () => {
    if (!selectedItems || selectedItems.length === 0) {
      alert("No items selected.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:3000/api/place-order", {
        username,
        selectedItems,
        paymentMethod: selectedPayment, // Pass selected payment method;
        shippingOptions: selectedShippingOptions,
        totalPrice: totalPrice,
      });

      if (response.status === 200) {
        alert(`Order placed successfully with ${selectedPayment}`);
        // Call the function to delete multiple products
      deleteProduct(selectedItems.map(item => item._id));

        onClose(); // Close modal after successful order
      }
    } catch (error) {
      console.error("Error placing order:", error);
      alert("Failed to place order. Please try again.");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96 xl:w-4/12">
        <h2 className="text-xl font-bold mb-4">Select Payment Method</h2>

        <div className="space-y-3">
          <label className="flex items-center justify-between space-x-3 cursor-pointer">
            <div className="flex items-center space-x-3">
              <img
                src={cashOnDelivery}
                alt="Cash on Delivery"
                className="w-6 h-6 object-contain"
              />
              <p>Cash on Delivery</p>
            </div>

            <input
              type="radio"
              name="paymentMethod"
              value="Cash on Delivery"
              checked={selectedPayment === "Cash on Delivery"}
              onChange={() => setSelectedPayment("Cash on Delivery")}
              className="cursor-pointer"
            />
          </label>

          <label className="flex items-center justify-between space-x-3 cursor-pointer">
            <div className="flex items-center space-x-3">
              <img
                src={paymaya}
                alt="Paymaya"
                className="w-7 h-7 object-contain"
              />
              <p>Paymaya</p>
            </div>
            <input
              type="radio"
              name="paymentMethod"
              value="Paymaya"
              checked={selectedPayment === "Paymaya"}
              onChange={() => setSelectedPayment("Paymaya")}
              className="cursor-pointer"
            />
          </label>
        </div>

        <div className="space-y-2">
          <h2 className="text-xl font-bold mt-5 mb-4">Merchandies Subtotal <span className="font-normal text-gray-600">({totalItems} items)</span></h2>
          <div className="flex justify-between">
            <p>Shipping Fee Subtotal:</p>
            <p className="font-bold">₱{totalShipping}.00</p>
          </div>

          <div className="flex justify-between">
            <p className="font-bold">Total</p>
            <p className="font-bold">₱{totalPrice}.00</p>
          </div>

        </div>

        <div className="flex justify-end mt-6 space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500 cursor-pointer"
          >
            Cancel
          </button>
          <button onClick={handlePlaceOrder} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 cursor-pointer">
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShowPaymentMethod; 
