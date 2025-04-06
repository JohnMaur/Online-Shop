import React, { useState, useEffect } from 'react';
import { UserNavBar, Header } from "../layout";
import { CustomButton } from '../../components';
import axios from "axios";

const Cart = () => {
  const [isNavCollapsed, setIsNavCollapsed] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [username, setUsername] = useState('');
  const [selectedShippingOptions, setSelectedShippingOptions] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [newQuantity, setNewQuantity] = useState(1);
  const [selectedItems, setSelectedItems] = useState({}); // Track checked items

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && user.username) {
      setUsername(user.username);
      fetchCartProducts(user.username);
    }
  }, []);

  const fetchCartProducts = async (username) => {
    try {
      const response = await axios.get(`http://localhost:3000/api/user-cart/${username}`);
      setCartItems(response.data);

      const initialShipping = {};
      const initialSelectedItems = {};
      response.data.forEach(item => {
        initialShipping[item._id] = getFutureDate(7); // Default shipping
        initialSelectedItems[item._id] = false; // Default unchecked
      });
      setSelectedShippingOptions(initialShipping);
      setSelectedItems(initialSelectedItems);
    } catch (error) {
      console.error("Error fetching cart products:", error);
    }
  };

  function getFutureDate(days) {
    const today = new Date();
    today.setDate(today.getDate() + days);
    return today.toLocaleDateString("en-US", { weekday: 'long', month: 'long', day: 'numeric' });
  }

  const handleShippingChange = (productId, shippingDate) => {
    setSelectedShippingOptions(prev => ({
      ...prev,
      [productId]: shippingDate,
    }));
  };

  const handleCheckboxChange = (productId) => {
    setSelectedItems(prev => ({
      ...prev,
      [productId]: !prev[productId],
    }));
  };

  const toggleNav = () => {
    setIsNavCollapsed(!isNavCollapsed);
  };

  const getSelectedItems = () => {
    return cartItems.filter(item => selectedItems[item._id]);
  };

  const totalPrice = getSelectedItems().reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);

  const totalShipping = getSelectedItems().reduce((total, item) => {
    const shippingCost = selectedShippingOptions[item._id] === getFutureDate(10) ? 50
      : selectedShippingOptions[item._id] === getFutureDate(7) ? 99
        : 149;
    return total + shippingCost;
  }, 0);

  const orderTotal = totalPrice + totalShipping;

  return (
    <div className={`flex flex-row-reverse max-md:flex-row w-full`}>
      <div className='flex flex-col flex-1 h-screen'>
        <Header toggleNav={toggleNav} />

        <div className={`flex flex-1 p-4 space-x-4 overflow-auto mt-14 bg-[#EFEFEF]`}>
          <div className='flex flex-col w-2/3 space-y-5'>
            {/* All Cart Products */}
            {cartItems.length > 0 ? (
              cartItems.map((item) => (
                <div key={item._id} className='w-full bg-white p-4 rounded-lg border-[1px] h-fit border-gray-300'>
                  <p className='text-2xl font-bold my-3'>Delivery date: {selectedShippingOptions[item._id]}</p>
                  <div className='flex'>
                    <div className='w-2/3 p-3 space-x-3'>
                      <div className='flex w-full'>
                        <img
                          src={item.imageUrl}
                          alt="Product"
                          className='w-32 h-32 object-cover'
                        />
                        <div className='flex-1 space-y-1'>
                          <p className='text-base font-bold'>{item.productName}</p>
                          <p className='text-base font-bold'>₱{item.price}</p>
                          <div className='flex flex-1 space-x-2'>
                            <p>Quantity: {item.quantity}</p>
                            <button className="text-[#6EA5FF] cursor-pointer hover:text-[#3B82F6] active:opacity-65">
                              Update
                            </button>
                            <button className='text-[#6EA5FF] cursor-pointer hover:text-[#3B82F6] active:opacity-65'>
                              Delete
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Checkbox */}
                      <div className='mt-3'>
                        <label className='flex items-center space-x-2 cursor-pointer'>
                          <input
                            type="checkbox"
                            checked={selectedItems[item._id] || false}
                            onChange={() => handleCheckboxChange(item._id)}
                          />
                          <span>Add to Order Summary</span>
                        </label>
                      </div>
                    </div>

                    <div className='w-1/3'>
                      <p className='text-base font-bold'>Choose a delivery option:</p>
                      <div className='space-y-2 mt-2'>
                        <label className='flex items-center space-x-2 cursor-pointer'>
                          <input
                            type='radio'
                            name={`shipping-${item._id}`}
                            value={getFutureDate(10)}
                            checked={selectedShippingOptions[item._id] === getFutureDate(10)}
                            onChange={(e) => handleShippingChange(item._id, e.target.value)}
                          />
                          <span>Standard Shipping ₱50 - {getFutureDate(10)}</span>
                        </label>
                        <label className='flex items-center space-x-2 cursor-pointer'>
                          <input
                            type='radio'
                            name={`shipping-${item._id}`}
                            value={getFutureDate(7)}
                            checked={selectedShippingOptions[item._id] === getFutureDate(7)}
                            onChange={(e) => handleShippingChange(item._id, e.target.value)}
                          />
                          <span>Shipping ₱99 - {getFutureDate(7)}</span>
                        </label>
                        <label className='flex items-center space-x-2 cursor-pointer'>
                          <input
                            type='radio'
                            name={`shipping-${item._id}`}
                            value={getFutureDate(3)}
                            checked={selectedShippingOptions[item._id] === getFutureDate(3)}
                            onChange={(e) => handleShippingChange(item._id, e.target.value)}
                          />
                          <span>Shipping ₱149 - {getFutureDate(3)}</span>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className='text-center text-gray-500'>Your cart is empty.</p>
            )}
          </div>

          {/* Order Summary */}
          <div className='w-1/3 bg-white p-4 rounded-lg border-[1px] h-fit border-gray-300'>
            <h2 className='font-bold text-2xl mb-4'>Order Summary</h2>
            <div className='flex justify-between'>
              <p>Items:</p>
              <p>₱{totalPrice}</p>
            </div>
            <div className='flex justify-between'>
              <p>Shipping & handling:</p>
              <p>₱{totalShipping}</p>
            </div>
            <div className='flex border-t-[1px] border-gray-300 justify-between'>
              <p className='mt-4 font-bold text-red-700'>Order total:</p>
              <p className='mt-4 font-bold text-red-700'>₱{orderTotal}.00</p>
            </div>

            <CustomButton
              nameButton="Place your order"
              rounded="rounded-lg"
              color="bg-black"
              hoverButton="hover:bg-[#454545]"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
