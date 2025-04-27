// import React, { useState } from "react";
// import { cashOnDelivery, paymaya } from "../../assets/icons";
// import axios from "axios";

// const ShowPaymentMethod = ({ isOpen, onClose, totalPrice, totalShipping, totalItems, selectedItems, username, selectedShippingOptions, deleteProduct }) => {
//   const [selectedPayment, setSelectedPayment] = useState("Cash on Delivery");

//   if (!isOpen) return null;

//   const handlePlaceOrder = async () => {
//     if (!selectedItems || selectedItems.length === 0) {
//       alert("No items selected.");
//       return;
//     }

//     try {
//       const response = await axios.post("http://localhost:3000/api/place-order", {
//         username,
//         selectedItems,
//         paymentMethod: selectedPayment, // Pass selected payment method;
//         shippingOptions: selectedShippingOptions,
//         totalPrice: totalPrice,
//       });

//       if (response.status === 200) {
//         alert(`Order placed successfully with ${selectedPayment}`);
//         // Call the function to delete multiple products
//       deleteProduct(selectedItems.map(item => item._id));

//         onClose(); // Close modal after successful order
//       }
//     } catch (error) {
//       console.error("Error placing order:", error);
//       alert("Failed to place order. Please try again.");
//     }
//   };

//   return (
//     <div className="fixed inset-0 flex items-center justify-center">
//       <div className="bg-white p-6 rounded-lg shadow-lg w-96 xl:w-4/12">
//         <h2 className="text-xl font-bold mb-4">Select Payment Method</h2>

//         <div className="space-y-3">
//           <label className="flex items-center justify-between space-x-3 cursor-pointer">
//             <div className="flex items-center space-x-3">
//               <img
//                 src={cashOnDelivery}
//                 alt="Cash on Delivery"
//                 className="w-6 h-6 object-contain"
//               />
//               <p>Cash on Delivery</p>
//             </div>

//             <input
//               type="radio"
//               name="paymentMethod"
//               value="Cash on Delivery"
//               checked={selectedPayment === "Cash on Delivery"}
//               onChange={() => setSelectedPayment("Cash on Delivery")}
//               className="cursor-pointer"
//             />
//           </label>

//           <label className="flex items-center justify-between space-x-3 cursor-pointer">
//             <div className="flex items-center space-x-3">
//               <img
//                 src={paymaya}
//                 alt="Paymaya"
//                 className="w-7 h-7 object-contain"
//               />
//               <p>Paymaya</p>
//             </div>
//             <input
//               type="radio"
//               name="paymentMethod"
//               value="Paymaya"
//               checked={selectedPayment === "Paymaya"}
//               onChange={() => setSelectedPayment("Paymaya")}
//               className="cursor-pointer"
//             />
//           </label>
//         </div>

//         <div className="space-y-2">
//           <h2 className="text-xl font-bold mt-5 mb-4">Merchandies Subtotal <span className="font-normal text-gray-600">({totalItems} items)</span></h2>
//           <div className="flex justify-between">
//             <p>Shipping Fee Subtotal:</p>
//             <p className="font-bold">₱{totalShipping}.00</p>
//           </div>

//           <div className="flex justify-between">
//             <p className="font-bold">Total</p>
//             <p className="font-bold">₱{totalPrice}.00</p>
//           </div>

//         </div>

//         <div className="flex justify-end mt-6 space-x-3">
//           <button
//             onClick={onClose}
//             className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500 cursor-pointer"
//           >
//             Cancel
//           </button>
//           <button onClick={handlePlaceOrder} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 cursor-pointer">
//             Place Order
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ShowPaymentMethod; 


import React, { useState } from "react";
import { cashOnDelivery, paymaya } from "../../assets/icons";
import { Paypal } from '../../components';
import axios from "axios";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

const ShowPaymentMethod = ({ isOpen, onClose, totalPrice, totalShipping, totalItems, selectedItems, username, selectedShippingOptions, deleteProduct, orderTotalPrice }) => {
  const [selectedPayment, setSelectedPayment] = useState("Cash on Delivery");
  const [paypalReady, setPaypalReady] = useState(false);

  if (!isOpen) return null;

  // const handlePlaceOrder = async () => {
  //   if (!selectedItems || selectedItems.length === 0) {
  //     alert("No items selected.");
  //     return;
  //   }

  //   const shippingData = {};
  //   Object.keys(selectedShippingOptions).forEach(productId => {
  //     shippingData[productId] = {
  //       shippingStringDate: selectedShippingOptions[productId].stringDate,
  //       shippingDate: selectedShippingOptions[productId].date,
  //     };
  //   });

  //   try {
  //     const response = await axios.post("http://localhost:3000/api/place-order", {
  //       username,
  //       selectedItems,
  //       paymentMethod: selectedPayment, // Pass selected payment method;
  //       shippingOptions: shippingData,
  //       totalPrice: totalPrice,
  //     });

  //     if (response.status === 200) {
  //       alert(`Order placed successfully with ${selectedPayment}`);
  //       // Call the function to delete multiple products
  //       deleteProduct(selectedItems.map(item => item._id));

  //       onClose(); // Close modal after successful order
  //     }
  //   } catch (error) {
  //     console.error("Error placing order:", error);
  //     alert("Failed to place order. Please try again.");
  //   }
  // };

  const handlePlaceOrder = async () => {
    if (!selectedItems || selectedItems.length === 0) {
      MySwal.fire({
        icon: 'warning',
        title: 'No items selected',
        text: 'Please select some items before placing your order.',
      });
      return;
    }

    try {
      // Fetch latest stock data for all selected items
      const stockCheck = await Promise.all(
        selectedItems.map(async (item) => {
          const res = await axios.get(`http://localhost:3000/api/stock/${item.productID}`);
          return {
            cartItem: item,
            stock: res.data,
          };
        })
      );

      // Check if any selected item has insufficient stock
      const outOfStockItem = stockCheck.find(({ cartItem, stock }) => cartItem.quantity > stock.quantity);

      if (outOfStockItem) {
        MySwal.fire({
          icon: 'error',
          title: 'Out of Stock',
          text: `Sorry, not enough stocks for "${outOfStockItem.cartItem.product.productName}".`,
        });
        return;
      }

      // Prepare shipping data
      const shippingData = {};
      Object.keys(selectedShippingOptions).forEach(productId => {
        shippingData[productId] = {
          shippingStringDate: selectedShippingOptions[productId].stringDate,
          shippingDate: selectedShippingOptions[productId].date,
        };
      });

      // Proceed to place order
      const response = await axios.post("http://localhost:3000/api/place-order", {
        username,
        selectedItems,
        paymentMethod: selectedPayment,
        shippingOptions: shippingData,
        totalPrice: totalPrice,
      });

      if (response.status === 200) {
        MySwal.fire({
          icon: 'success',
          title: 'Order Placed!',
          text: `Your order has been placed using ${selectedPayment}.`,
          confirmButtonColor: '#3085d6',
        });
        deleteProduct(selectedItems.map(item => item._id));
        onClose();
      }
    } catch (error) {
      console.error("Error placing order:", error);
      MySwal.fire({
        icon: 'error',
        title: 'Failed',
        text: 'Failed to place order. Please try again.',
      });
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
                src="https://www.paypalobjects.com/webstatic/mktg/logo/pp_cc_mark_111x69.jpg"
                alt="PayPal"
                className="w-7 h-7 object-contain"
              />
              <p>Paypal</p>
            </div>
            <input
              type="radio"
              name="paymentMethod"
              value="Paypal"
              checked={selectedPayment === "Paypal"}
              onChange={() => setSelectedPayment("Paypal")}
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

        {selectedPayment === "Paypal" && !paypalReady ? (
          <div className="mt-6 flex flex-row-reverse justify-start">
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 cursor-pointer ml-3"
              onClick={async () => {
                // Perform stock check BEFORE showing PayPal button
                const stockCheck = await Promise.all(
                  selectedItems.map(async (item) => {
                    const res = await axios.get(`http://localhost:3000/api/stock/${item.productID}`);
                    return { cartItem: item, stock: res.data };
                  })
                );

                const outOfStockItem = stockCheck.find(({ cartItem, stock }) => cartItem.quantity > stock.quantity);

                if (outOfStockItem) {
                  MySwal.fire({
                    icon: 'error',
                    title: 'Out of Stock',
                    text: `Sorry, not enough stocks for "${outOfStockItem.cartItem.product.productName}".`,
                  });
                } else {
                  setPaypalReady(true); // stock ok — show PayPal button
                }
              }}
            >
              Proceed to PayPal
            </button>
            <button
              onClick={onClose}
              className="ml-2 px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500 cursor-pointer"
            >
              Cancel
            </button>
          </div>
        ) : null}

        {selectedPayment === "Paypal" ? (
          paypalReady ? (
            <div className="mt-10">
              <Paypal
                amount={orderTotalPrice}
                onSuccess={handlePlaceOrder}
              />
              <div className="flex justify-end mt-2">
                <button
                  onClick={onClose}
                  className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500 cursor-pointer"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : null
        ) : (
          <div className="flex justify-end mt-6 space-x-3">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500 cursor-pointer"
            >
              Cancel
            </button>
            <button
              onClick={handlePlaceOrder}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 cursor-pointer"
            >
              Place Order
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShowPaymentMethod; 
