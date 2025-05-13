// import React, { useState, useEffect } from 'react';
// import { UserNavBar, Header, MobileNavBar } from "../layout";
// import { CustomButton, ShowPaymentMethod, ConfirmModal, UpdateQuantity } from '../../components';
// import axios from "axios";
// import { Spin } from 'antd';

// const Cart = () => {
//   const [isNavCollapsed, setIsNavCollapsed] = useState(false);
//   const [showMobileNav, setShowMobileNav] = useState(false);
//   const [cartItems, setCartItems] = useState([]);
//   const [username, setUsername] = useState('');
//   const [selectedShippingOptions, setSelectedShippingOptions] = useState({});
//   const [showModal, setShowModal] = useState(false);
//   const [selectedProduct, setSelectedProduct] = useState(null);
//   const [newQuantity, setNewQuantity] = useState(1);
//   const [selectedItems, setSelectedItems] = useState({});
//   const [showPaymentModal, setShowPaymentModal] = useState(false);
//   const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
//   const [productToDelete, setProductToDelete] = useState(null);

//   const [loading, setLoading] = useState(true); // new

//   // Predefined shipping options
//   const shippingOptions = {
//     standard: getFutureDate(10, 'Standard Shipping ₱50'),
//     express: getFutureDate(7, 'Shipping ₱99'),
//     priority: getFutureDate(3, 'Shipping ₱149'),
//   };

//   useEffect(() => {
//     const user = JSON.parse(localStorage.getItem("user"));
//     if (user && user.username) {
//       setUsername(user.username);
//       fetchCartProducts(user.username);
//     }
//   }, []);

//   const toggleNav = () => {
//     if (window.innerWidth <= 768) {
//       setShowMobileNav(prev => !prev);
//     } else {
//       setIsNavCollapsed(!isNavCollapsed);
//     }
//   };

//   const fetchCartProducts = async (username) => {
//     setLoading(true); // new
//     try {
//       const response = await axios.get(`https://online-shop-server-1.onrender.com/api/user-cart/${username}`);
//       setCartItems(response.data);

//       // Initialize default shipping for each product
//       const initialShipping = {};
//       const initialSelectedItems = {};
//       response.data.forEach(item => {
//         initialShipping[item._id] = shippingOptions.express; // Default: express
//         initialSelectedItems[item._id] = false;
//       });
//       setSelectedShippingOptions(initialShipping);
//       setSelectedItems(initialSelectedItems);
//     } catch (error) {
//       console.error("Error fetching cart products:", error);
//     } finally {
//       setLoading(false); // new
//     }
//   };

//   function getFutureDate(days, label) {
//     const date = new Date();
//     date.setDate(date.getDate() + days);
//     const stringDate = date.toLocaleDateString("en-US", {
//       weekday: 'long',
//       month: 'long',
//       day: 'numeric'
//     });
//     return {
//       label,
//       stringDate,
//       date: date.toISOString(),
//     };
//   }

//   const handleShippingChange = (productId, option) => {
//     setSelectedShippingOptions(prev => ({
//       ...prev,
//       [productId]: option,
//     }));
//   };

//   const handleCheckboxChange = (productId) => {
//     setSelectedItems(prev => ({
//       ...prev,
//       [productId]: !prev[productId],
//     }));
//   };

//   const getSelectedItems = () => cartItems.filter(item => selectedItems[item._id]);

//   const totalPrice = getSelectedItems().reduce((total, item) => total + item.price * item.quantity, 0);

//   const totalShipping = getSelectedItems().reduce((total, item) => {
//     const label = selectedShippingOptions[item._id]?.label;
//     if (label?.includes("₱50")) return total + 50;
//     if (label?.includes("₱99")) return total + 99;
//     return total + 149;
//   }, 0);

//   const orderTotal = totalPrice + totalShipping;

//   const handleUpdateQuantity = async (productId, newQuantity) => {
//     if (newQuantity < 1) {
//       alert("Quantity must be at least 1.");
//       return;
//     }

//     setLoading(true); // new
//     try {
//       await axios.put(`https://online-shop-server-1.onrender.com/api/update-cart/${productId}`, {
//         username,
//         productId,
//         quantity: newQuantity,
//       });

//       setCartItems(prevItems =>
//         prevItems.map(item =>
//           item._id === productId ? { ...item, quantity: newQuantity } : item
//         )
//       );
//       setShowModal(false);
//     } catch (error) {
//       console.error("Error updating quantity:", error);
//     } finally {
//       setLoading(false); // new
//     }
//   };

//   const confirmDelete = (productId) => {
//     setProductToDelete(productId);
//     setIsConfirmModalOpen(true);
//   };

//   const handleDeleteConfirmed = async () => {
//     if (!productToDelete) return;
//     setLoading(true); // new
//     try {
//       await axios.delete(`https://online-shop-server-1.onrender.com/api/delete-cart/${productToDelete}`, {
//         data: { username },
//       });

//       setCartItems(prevItems => prevItems.filter(item => item._id !== productToDelete));
//       setIsConfirmModalOpen(false);
//       setProductToDelete(null);
//     } catch (error) {
//       console.error("Error deleting item:", error);
//     } finally {
//       setLoading(false); // new
//     }
//   };

//   const handleDeleteMultipleConfirmed = async (productIds) => {
//     setLoading(true); // new
//     try {
//       await Promise.all(productIds.map(productId =>
//         axios.delete(`https://online-shop-server-1.onrender.com/api/delete-cart/${productId}`, {
//           data: { username },
//         })
//       ));

//       setCartItems(prevItems => prevItems.filter(item => !productIds.includes(item._id)));
//     } catch (error) {
//       console.error("Error deleting items:", error);
//     } finally {
//       setLoading(false); // new
//     }
//   };

//   const openUpdateModal = (product) => {
//     setSelectedProduct(product);
//     setNewQuantity(product.quantity);
//     setShowModal(true);
//   };

//   return (
//     <div className={`flex flex-row-reverse max-md:flex-row w-full`}>
//       <div className='flex flex-col flex-1 h-screen '>
//         <Header toggleNav={toggleNav} />

//         {showMobileNav && (
//           <div className="md:hidden fixed top-14 left-0 w-full z-50 bg-white shadow-md">
//             <MobileNavBar />
//           </div>
//         )}

//         {loading && (
//           <div className="fixed inset-0 z-50 flex items-center justify-center">
//             <Spin size="large" />
//           </div>
//         )}

//         <div className={`flex flex-1 w-full max-md:flex-col md:p-4 md:space-x-4 overflow-auto mt-14 bg-[#EFEFEF]`}>

//           <div className='flex flex-col md:w-2/3 w-full space-y-5'>
//             {cartItems.length > 0 ? (
//               cartItems.map((item) => (
//                 <div key={item._id} className='w-full bg-white p-4 rounded-lg border border-gray-300'>
//                   <p className='text-2xl font-bold my-3'>
//                     Delivery date: {selectedShippingOptions[item._id]?.stringDate}
//                   </p>

//                   <div className='flex'>
//                     <div className='w-2/3 p-3'>
//                       <div className='flex space-x-3'>
//                         <div>
//                           <img
//                             src={item.product.imageUrl}
//                             alt="Product"
//                             className='w-32 h-32 object-contain'
//                           />
//                           <p className='text-sm text-gray-600'>
//                             Available: {item.availableQuantity ?? 'N/A'}
//                           </p>

//                         </div>

//                         <div className='flex-1 space-y-1'>
//                           <p className='text-base font-bold'>{item.product.productName}</p>
//                           <p className='text-base font-bold'>₱{item.price}</p>
//                           <div className='flex space-x-2'>
//                             <p>Quantity: {item.quantity}</p>
//                             <button onClick={() => openUpdateModal(item)} className="text-[#6EA5FF] cursor-pointer hover:text-[#3B82F6] active:opacity-65">
//                               Update
//                             </button>
//                             <button
//                               onClick={() => confirmDelete(item._id)}
//                               className='text-[#6EA5FF] cursor-pointer hover:text-[#3B82F6] active:opacity-65'
//                             >
//                               Delete
//                             </button>
//                           </div>
//                         </div>
//                       </div>

//                       <div className='mt-3'>
//                         <label className='flex items-center space-x-2'>
//                           <input
//                             type="checkbox"
//                             checked={selectedItems[item._id] || false}
//                             onChange={() => handleCheckboxChange(item._id)}
//                           />
//                           <span>Add to Order Summary</span>
//                         </label>
//                       </div>
//                     </div>

//                     <div className='w-1/3'>
//                       <p className='font-bold'>Choose a delivery option:</p>
//                       <div className='space-y-2 mt-2'>
//                         {Object.entries(shippingOptions).map(([key, option]) => (
//                           <label key={key} className='flex items-center space-x-2 cursor-pointer'>
//                             <input
//                               type="radio"
//                               name={`shipping-${item._id}`}
//                               checked={selectedShippingOptions[item._id]?.stringDate === option.stringDate}
//                               onChange={() => handleShippingChange(item._id, option)}
//                             />
//                             <span>{option.label} - {option.stringDate}</span>
//                           </label>
//                         ))}
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               ))
//             ) : (
//               <p className='text-center text-gray-500'>Your cart is empty.</p>
//             )}
//           </div>

//           {/* Order Summary */}
//           <div className='md:w-1/3 w-full max-md:mt-5 bg-white p-4 rounded-lg border border-gray-300 h-fit'>
//             <h2 className='font-bold text-2xl mb-4'>Order Summary</h2>
//             <div className='flex justify-between'>
//               <p>Items:</p>
//               <p>₱{totalPrice}</p>
//             </div>
//             <div className='flex justify-between'>
//               <p>Shipping & handling:</p>
//               <p>₱{totalShipping}</p>
//             </div>
//             <div className='flex border-t border-gray-300 justify-between'>
//               <p className='mt-4 font-bold text-red-700'>Order total:</p>
//               <p className='mt-4 font-bold text-red-700'>₱{orderTotal}.00</p>
//             </div>

//             <CustomButton
//               nameButton="Place your order"
//               rounded="rounded-lg"
//               color="bg-black"
//               hoverButton="hover:bg-[#454545]"
//               onClick={() => setShowPaymentModal(true)}
//             />
//           </div>
//         </div>

//       </div>

//       <nav className={`max-md:hidden ${isNavCollapsed ? "w-20" : "w-56"} transition-width duration-300`}>
//         <UserNavBar isNavCollapsed={isNavCollapsed} />
//       </nav>

//       {/* Modals */}
//       <UpdateQuantity
//         isOpen={showModal}
//         onClose={() => setShowModal(false)}
//         product={selectedProduct}
//         newQuantity={newQuantity}
//         setNewQuantity={setNewQuantity}
//         handleUpdateQuantity={handleUpdateQuantity}
//       />

//       <ShowPaymentMethod
//         isOpen={showPaymentModal}
//         onClose={() => setShowPaymentModal(false)}
//         totalShipping={totalShipping}
//         totalPrice={totalPrice}
//         totalItems={getSelectedItems().length}
//         selectedItems={getSelectedItems()}
//         username={username}
//         selectedShippingOptions={selectedShippingOptions}
//         deleteProduct={handleDeleteMultipleConfirmed}
//         orderTotalPrice={orderTotal}
//       />

//       <ConfirmModal
//         isOpen={isConfirmModalOpen}
//         onClose={() => setIsConfirmModalOpen(false)}
//         onConfirm={handleDeleteConfirmed}
//         message="Are you sure you want to remove this product?"
//       />
//     </div>
//   );
// };

// export default Cart;

// Modify the User cart 5/7/25
import React, { useState, useEffect } from 'react';
import { UserNavBar, Header, MobileNavBar } from "../layout";
import { CustomButton, ShowPaymentMethod, ConfirmModal, UpdateQuantity } from '../../components';
import axios from "axios";
import { Spin } from 'antd';

const Cart = () => {
  const [isNavCollapsed, setIsNavCollapsed] = useState(false);
  const [showMobileNav, setShowMobileNav] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [username, setUsername] = useState('');
  const [selectedShippingOptions, setSelectedShippingOptions] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [newQuantity, setNewQuantity] = useState(1);
  const [selectedItems, setSelectedItems] = useState({});
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);

  const [loading, setLoading] = useState(true); // new

  // Predefined shipping options
  const shippingOptions = {
    standard: getFutureDate(10, 'Standard Shipping ₱50'),
    express: getFutureDate(7, 'Shipping ₱99'),
    priority: getFutureDate(3, 'Shipping ₱149'),
  };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && user.username) {
      setUsername(user.username);
      fetchCartProducts(user.username);
    }
  }, []);

  const toggleNav = () => {
    if (window.innerWidth <= 768) {
      setShowMobileNav(prev => !prev);
    } else {
      setIsNavCollapsed(!isNavCollapsed);
    }
  };

  const fetchCartProducts = async (username) => {
    setLoading(true); // new
    try {
      const response = await axios.get(`https://online-shop-server-1.onrender.com/api/user-cart/${username}`);
      setCartItems(response.data);

      // Initialize default shipping for each product
      const initialShipping = {};
      const initialSelectedItems = {};
      response.data.forEach(item => {
        initialShipping[item._id] = shippingOptions.express; // Default: express
        initialSelectedItems[item._id] = false;
      });
      setSelectedShippingOptions(initialShipping);
      setSelectedItems(initialSelectedItems);
    } catch (error) {
      console.error("Error fetching cart products:", error);
    } finally {
      setLoading(false); // new
    }
  };

  function getFutureDate(days, label) {
    const date = new Date();
    date.setDate(date.getDate() + days);
    const stringDate = date.toLocaleDateString("en-US", {
      weekday: 'long',
      month: 'long',
      day: 'numeric'
    });
    return {
      label,
      stringDate,
      date: date.toISOString(),
    };
  }

  const handleShippingChange = (productId, option) => {
    // Find how many items are selected
    const selectedCount = Object.values(selectedItems).filter(Boolean).length;

    // If more than one product is selected, sync the shipping option for all
    if (selectedCount > 1 && selectedItems[productId]) {
      const updatedOptions = { ...selectedShippingOptions };
      for (const id in selectedItems) {
        if (selectedItems[id]) {
          updatedOptions[id] = option;
        }
      }
      setSelectedShippingOptions(updatedOptions);
    } else {
      // Otherwise just update the one product
      setSelectedShippingOptions(prev => ({
        ...prev,
        [productId]: option,
      }));
    }
  };


  const handleCheckboxChange = (productId) => {
    setSelectedItems(prev => ({
      ...prev,
      [productId]: !prev[productId],
    }));
  };

  const getSelectedItems = () => cartItems.filter(item => selectedItems[item._id]);

  const totalPrice = getSelectedItems().reduce((total, item) => total + item.price * item.quantity, 0);
  const productPrice = getSelectedItems().map(item => item.price);


  const getUniqueShippingLabels = () => {
    const labels = new Set();
    for (const item of getSelectedItems()) {
      const label = selectedShippingOptions[item._id]?.label;
      if (label) labels.add(label);
    }
    return [...labels];
  };

  const totalShipping = (() => {
    const selected = getSelectedItems();
    if (selected.length <= 1) {
      const item = selected[0];
      const label = item && selectedShippingOptions[item._id]?.label;
      if (label?.includes("₱50")) return 50;
      if (label?.includes("₱99")) return 99;
      if (label?.includes("₱149")) return 149;
      return 0;
    } else {
      // If multiple selected, just take the shipping price from the first selected item
      const firstItem = selected[0];
      const label = selectedShippingOptions[firstItem._id]?.label;
      if (label?.includes("₱50")) return 50;
      if (label?.includes("₱99")) return 99;
      if (label?.includes("₱149")) return 149;
      return 0;
    }
  })();

  const orderTotal = totalPrice + totalShipping;

  const handleUpdateQuantity = async (productId, newQuantity) => {
    if (newQuantity < 1) {
      alert("Quantity must be at least 1.");
      return;
    }

    setLoading(true); // new
    try {
      await axios.put(`https://online-shop-server-1.onrender.com/api/update-cart/${productId}`, {
        username,
        productId,
        quantity: newQuantity,
      });

      setCartItems(prevItems =>
        prevItems.map(item =>
          item._id === productId ? { ...item, quantity: newQuantity } : item
        )
      );
      setShowModal(false);
    } catch (error) {
      console.error("Error updating quantity:", error);
    } finally {
      setLoading(false); // new
    }
  };

  const confirmDelete = (productId) => {
    setProductToDelete(productId);
    setIsConfirmModalOpen(true);
  };

  const handleDeleteConfirmed = async () => {
    if (!productToDelete) return;
    setLoading(true); // new
    try {
      await axios.delete(`https://online-shop-server-1.onrender.com/api/delete-cart/${productToDelete}`, {
        data: { username },
      });

      setCartItems(prevItems => prevItems.filter(item => item._id !== productToDelete));
      setIsConfirmModalOpen(false);
      setProductToDelete(null);
    } catch (error) {
      console.error("Error deleting item:", error);
    } finally {
      setLoading(false); // new
    }
  };

  const handleDeleteMultipleConfirmed = async (productIds) => {
    setLoading(true); // new
    try {
      await Promise.all(productIds.map(productId =>
        axios.delete(`https://online-shop-server-1.onrender.com/api/delete-cart/${productId}`, {
          data: { username },
        })
      ));

      setCartItems(prevItems => prevItems.filter(item => !productIds.includes(item._id)));
    } catch (error) {
      console.error("Error deleting items:", error);
    } finally {
      setLoading(false); // new
    }
  };

  const openUpdateModal = (product) => {
    setSelectedProduct(product);
    setNewQuantity(product.quantity);
    setShowModal(true);
  };

  return (
    <div className={`flex flex-row-reverse max-md:flex-row w-full`}>
      <div className='flex flex-col flex-1 h-screen '>
        <Header toggleNav={toggleNav} />

        {showMobileNav && (
          <div className="md:hidden fixed top-14 left-0 w-full z-50 bg-white shadow-md">
            <MobileNavBar />
          </div>
        )}

        {loading && (
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <Spin size="large" />
          </div>
        )}

        <div className={`flex flex-1 w-full max-md:flex-col md:p-4 md:space-x-4 overflow-auto mt-14 bg-[#EFEFEF]`}>

          <div className='flex flex-col md:w-2/3 w-full space-y-5'>
            {cartItems.length > 0 ? (
              cartItems.map((item) => (
                <div key={item._id} className='w-full bg-white p-4 rounded-lg border border-gray-300'>
                  <p className='text-2xl font-bold my-3'>
                    Delivery date: {selectedShippingOptions[item._id]?.stringDate}
                  </p>

                  <div className='flex'>
                    <div className='w-2/3 p-3'>
                      <div className='flex space-x-3'>
                        <div>
                          <img
                            src={item.product.imageUrl}
                            alt="Product"
                            className='w-32 h-32 object-contain'
                          />
                          <p className='text-sm text-gray-600'>
                            Available: {item.availableQuantity ?? 'N/A'}
                          </p>

                        </div>

                        <div className='flex-1 space-y-1'>
                          <p className='text-base font-bold'>{item.product.productName}</p>
                          <p className='text-base font-bold'>₱{item.price}</p>
                          <div className='flex space-x-2'>
                            <p>Quantity: {item.quantity}</p>
                            <button onClick={() => openUpdateModal(item)} className="text-[#6EA5FF] cursor-pointer hover:text-[#3B82F6] active:opacity-65">
                              Update
                            </button>
                            <button
                              onClick={() => confirmDelete(item._id)}
                              className='text-[#6EA5FF] cursor-pointer hover:text-[#3B82F6] active:opacity-65'
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      </div>

                      <div className='mt-3'>
                        <label className='flex items-center space-x-2'>
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
                      <p className='font-bold'>Choose a delivery option:</p>
                      <div className='space-y-2 mt-2'>
                        {Object.entries(shippingOptions).map(([key, option]) => (
                          <label key={key} className='flex items-center space-x-2 cursor-pointer'>
                            <input
                              type="radio"
                              name={`shipping-${item._id}`}
                              checked={selectedShippingOptions[item._id]?.stringDate === option.stringDate}
                              onChange={() => handleShippingChange(item._id, option)}
                            />
                            <span>{option.label} - {option.stringDate}</span>
                          </label>
                        ))}
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
          <div className='md:w-1/3 w-full p-4 bg-white rounded-lg border border-gray-300 h-fit sticky top-0'>
            <h2 className='text-xl font-bold mb-4'>Order Summary</h2>
            <ul className='space-y-2'>
              {getSelectedItems().map(item => (
                <li key={item._id} className='flex justify-between'>
                  <span>{item.product.productName} × {item.quantity}</span>
                  <span>₱{item.price * item.quantity}</span>
                </li>
              ))}
            </ul>
            <hr className='my-4' />
            {getUniqueShippingLabels().map((label, index) => (
              <p key={index} className='text-sm text-gray-600'>Shipping: {label}</p>
            ))}
            <div className='flex justify-between mt-2'>
            <span className="font-bold text-red-700 text-base">Order Total</span>
              <span className="font-bold text-red-700 text-base">₱{orderTotal}</span>
            </div>
            <CustomButton
              nameButton="Place your order"
              rounded="rounded-lg"
              color="bg-black"
              hoverButton="hover:bg-[#454545]"
              onClick={() => setShowPaymentModal(true)}
            />
          </div>


        </div>

      </div>

      <nav className={`max-md:hidden ${isNavCollapsed ? "w-20" : "w-56"} transition-width duration-300`}>
        <UserNavBar isNavCollapsed={isNavCollapsed} />
      </nav>

      {/* Modals */}
      <UpdateQuantity
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        product={selectedProduct}
        newQuantity={newQuantity}
        setNewQuantity={setNewQuantity}
        handleUpdateQuantity={handleUpdateQuantity}
      />

      <ShowPaymentMethod
        isOpen={showPaymentModal} 
        onClose={() => setShowPaymentModal(false)}
        totalShipping={totalShipping}
        totalPrice={totalPrice}
        productPrice={productPrice}
        totalItems={getSelectedItems().length}
        selectedItems={getSelectedItems()}
        username={username}
        selectedShippingOptions={selectedShippingOptions}
        deleteProduct={handleDeleteMultipleConfirmed}
        orderTotalPrice={orderTotal}
      />

      <ConfirmModal
        isOpen={isConfirmModalOpen}
        onClose={() => setIsConfirmModalOpen(false)}
        onConfirm={handleDeleteConfirmed}
        message="Are you sure you want to remove this product?"
      />
    </div>
  );
};

export default Cart;


// import React, { useState, useEffect } from 'react';
// import { UserNavBar, Header, MobileNavBar } from "../layout";
// import { CustomButton, ShowPaymentMethod, ConfirmModal, UpdateQuantity } from '../../components';
// import axios from "axios";
// import { Spin } from 'antd';

// const Cart = () => {
//   const [isNavCollapsed, setIsNavCollapsed] = useState(false);
//   const [showMobileNav, setShowMobileNav] = useState(false);
//   const [cartItems, setCartItems] = useState([]);
//   const [username, setUsername] = useState('');
//   const [showModal, setShowModal] = useState(false);
//   const [selectedProduct, setSelectedProduct] = useState(null);
//   const [newQuantity, setNewQuantity] = useState(1);
//   const [selectedItems, setSelectedItems] = useState({});
//   const [showPaymentModal, setShowPaymentModal] = useState(false);
//   const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
//   const [productToDelete, setProductToDelete] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [selectedShipping, setSelectedShipping] = useState(null);

//   const shippingOptions = {
//     standard: getFutureDate(10, 'Standard Shipping ₱50'),
//     express: getFutureDate(7, 'Shipping ₱99'),
//     priority: getFutureDate(3, 'Shipping ₱149'),
//   };

//   useEffect(() => {
//     const user = JSON.parse(localStorage.getItem("user"));
//     if (user && user.username) {
//       setUsername(user.username);
//       fetchCartProducts(user.username);
//     }
//   }, []);

//   const toggleNav = () => {
//     if (window.innerWidth <= 768) {
//       setShowMobileNav(prev => !prev);
//     } else {
//       setIsNavCollapsed(!isNavCollapsed);
//     }
//   };

//   const fetchCartProducts = async (username) => {
//     setLoading(true);
//     try {
//       const response = await axios.get(`https://online-shop-server-1.onrender.com/api/user-cart/${username}`);
//       setCartItems(response.data);

//       const initialSelectedItems = {};
//       response.data.forEach(item => {
//         initialSelectedItems[item._id] = false;
//       });
//       setSelectedItems(initialSelectedItems);
//       setSelectedShipping(shippingOptions.express); // default shipping
//     } catch (error) {
//       console.error("Error fetching cart products:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   function getFutureDate(days, label) {
//     const date = new Date();
//     date.setDate(date.getDate() + days);
//     const stringDate = date.toLocaleDateString("en-US", {
//       weekday: 'long',
//       month: 'long',
//       day: 'numeric'
//     });
//     return {
//       label,
//       stringDate,
//       date: date.toISOString(),
//     };
//   }

//   const handleCheckboxChange = (productId) => {
//     setSelectedItems(prev => ({
//       ...prev,
//       [productId]: !prev[productId],
//     }));
//   };

//   const getSelectedItems = () => cartItems.filter(item => selectedItems[item._id]);

//   const totalPrice = getSelectedItems().reduce((total, item) => total + item.price * item.quantity, 0);
//   const totalShipping = selectedShipping
//     ? parseInt(selectedShipping.label.match(/\₱(\d+)/)?.[1] || 0)
//     : 0;

//   const orderTotal = totalPrice + totalShipping;

//   const handleUpdateQuantity = async (productId, newQuantity) => {
//     if (newQuantity < 1) {
//       alert("Quantity must be at least 1.");
//       return;
//     }
//     setLoading(true);
//     try {
//       await axios.put(`https://online-shop-server-1.onrender.com/api/update-cart/${productId}`, {
//         username,
//         productId,
//         quantity: newQuantity,
//       });

//       setCartItems(prevItems =>
//         prevItems.map(item =>
//           item._id === productId ? { ...item, quantity: newQuantity } : item
//         )
//       );
//       setShowModal(false);
//     } catch (error) {
//       console.error("Error updating quantity:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const confirmDelete = (productId) => {
//     setProductToDelete(productId);
//     setIsConfirmModalOpen(true);
//   };

//   const handleDeleteConfirmed = async () => {
//     if (!productToDelete) return;
//     setLoading(true);
//     try {
//       await axios.delete(`https://online-shop-server-1.onrender.com/api/delete-cart/${productToDelete}`, {
//         data: { username },
//       });

//       setCartItems(prevItems => prevItems.filter(item => item._id !== productToDelete));
//       setIsConfirmModalOpen(false);
//       setProductToDelete(null);
//     } catch (error) {
//       console.error("Error deleting item:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDeleteMultipleConfirmed = async (productIds) => {
//     setLoading(true);
//     try {
//       await Promise.all(productIds.map(productId =>
//         axios.delete(`https://online-shop-server-1.onrender.com/api/delete-cart/${productId}`, {
//           data: { username },
//         })
//       ));

//       setCartItems(prevItems => prevItems.filter(item => !productIds.includes(item._id)));
//     } catch (error) {
//       console.error("Error deleting items:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const openUpdateModal = (product) => {
//     setSelectedProduct(product);
//     setNewQuantity(product.quantity);
//     setShowModal(true);
//   };

//   return (
//     <div className={`flex flex-row-reverse max-md:flex-row w-full`}>
//       <div className='flex flex-col flex-1 h-screen '>
//         <Header toggleNav={toggleNav} />

//         {showMobileNav && (
//           <div className="md:hidden fixed top-14 left-0 w-full z-50 bg-white shadow-md">
//             <MobileNavBar />
//           </div>
//         )}

//         {loading && (
//           <div className="fixed inset-0 z-50 flex items-center justify-center">
//             <Spin size="large" />
//           </div>
//         )}

//         <div className={`flex flex-1 w-full max-md:flex-col md:p-4 md:space-x-4 overflow-auto mt-14 bg-[#EFEFEF]`}>
//           {/* Cart Items */}
//           <div className='flex flex-col md:w-2/3 w-full space-y-5'>
//             {cartItems.length > 0 ? (
//               cartItems.map((item) => (
//                 <div key={item._id} className='w-full bg-white p-4 rounded-lg border border-gray-300'>
//                   <div className='flex'>
//                     <div className='w-full p-3'>
//                       <div className='flex space-x-3'>
//                         <div>
//                           <img
//                             src={item.product.imageUrl}
//                             alt="Product"
//                             className='w-32 h-32 object-contain'
//                           />
//                           <p className='text-sm text-gray-600'>
//                             Available: {item.availableQuantity ?? 'N/A'}
//                           </p>
//                         </div>

//                         <div className='flex-1 space-y-1'>
//                           <p className='text-base font-bold'>{item.product.productName}</p>
//                           <p className='text-base font-bold'>₱{item.price}</p>
//                           <div className='flex space-x-2'>
//                             <p>Quantity: {item.quantity}</p>
//                             <button onClick={() => openUpdateModal(item)} className="text-[#6EA5FF] cursor-pointer hover:text-[#3B82F6] active:opacity-65">
//                               Update
//                             </button>
//                             <button
//                               onClick={() => confirmDelete(item._id)}
//                               className='text-[#6EA5FF] cursor-pointer hover:text-[#3B82F6] active:opacity-65'
//                             >
//                               Delete
//                             </button>
//                           </div>
//                         </div>
//                       </div>

//                       <div className='mt-3'>
//                         <label className='flex items-center space-x-2'>
//                           <input
//                             type="checkbox"
//                             checked={selectedItems[item._id] || false}
//                             onChange={() => handleCheckboxChange(item._id)}
//                           />
//                           <span>Add to Order Summary</span>
//                         </label>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               ))
//             ) : (
//               <p className='text-center text-gray-500'>Your cart is empty.</p>
//             )}
//           </div>

//           {/* Order Summary */}
//           <div className='md:w-1/3 w-full max-md:mt-5 bg-white p-4 rounded-lg border border-gray-300 h-fit'>
//             <h2 className='font-bold text-2xl mb-4'>Order Summary</h2>

//             <p className='font-bold mb-2'>Choose a delivery option:</p>
//             <div className='space-y-2 mb-4'>
//               {Object.entries(shippingOptions).map(([key, option]) => (
//                 <label key={key} className='flex items-center space-x-2 cursor-pointer'>
//                   <input
//                     type="radio"
//                     name="global-shipping"
//                     checked={selectedShipping?.stringDate === option.stringDate}
//                     onChange={() => setSelectedShipping(option)}
//                   />
//                   <span>{option.label} - {option.stringDate}</span>
//                 </label>
//               ))}
//             </div>

//             <div className='flex justify-between'>
//               <p>Items:</p>
//               <p>₱{totalPrice}</p>
//             </div>
//             <div className='flex justify-between'>
//               <p>Shipping & handling:</p>
//               <p>₱{totalShipping}</p>
//             </div>
//             <div className='flex border-t border-gray-300 justify-between'>
//               <p className='mt-4 font-bold text-red-700'>Order total:</p>
//               <p className='mt-4 font-bold text-red-700'>₱{orderTotal}.00</p>
//             </div>

//             <CustomButton
//               nameButton="Place your order"
//               rounded="rounded-lg"
//               color="bg-black"
//               hoverButton="hover:bg-[#454545]"
//               onClick={() => setShowPaymentModal(true)}
//             />
//           </div>
//         </div>
//       </div>

//       <nav className={`max-md:hidden ${isNavCollapsed ? "w-20" : "w-56"} transition-width duration-300`}>
//         <UserNavBar isNavCollapsed={isNavCollapsed} />
//       </nav>

//       {/* Modals */}
//       <UpdateQuantity
//         isOpen={showModal}
//         onClose={() => setShowModal(false)}
//         product={selectedProduct}
//         newQuantity={newQuantity}
//         setNewQuantity={setNewQuantity}
//         handleUpdateQuantity={handleUpdateQuantity}
//       />

//       <ShowPaymentMethod
//         isOpen={showPaymentModal}
//         onClose={() => setShowPaymentModal(false)}
//         totalShipping={totalShipping}
//         totalPrice={totalPrice}
//         totalItems={getSelectedItems().length}
//         selectedItems={getSelectedItems()}
//         username={username}
//         selectedShippingOptions={Object.fromEntries(getSelectedItems().map(item => [item._id, selectedShipping]))}
//         deleteProduct={handleDeleteMultipleConfirmed}
//         orderTotalPrice={orderTotal}
//       />

//       <ConfirmModal
//         isOpen={isConfirmModalOpen}
//         onClose={() => setIsConfirmModalOpen(false)}
//         onConfirm={handleDeleteConfirmed}
//         message="Are you sure you want to remove this product?"
//       />
//     </div>
//   );
// };

// export default Cart;
