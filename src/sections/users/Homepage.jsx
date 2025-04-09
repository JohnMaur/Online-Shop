import React, { useState, useEffect } from 'react';
import { UserNavBar, Header } from "../layout";
import { CustomButton } from '../../components';

const Homepage = () => {
  const [isNavCollapsed, setIsNavCollapsed] = useState(false);
  const [products, setProducts] = useState([]);
  const [username, setUsername] = useState('');
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && user.username) {
      setUsername(user.username);
    }
  }, []);

  const toggleNav = () => {
    setIsNavCollapsed(!isNavCollapsed);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/products');
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchProducts();
  }, []);

  const showNotification = (message) => {
    setNotification(message);
    setTimeout(() => {
      setNotification(null);
    }, 2000);
  };

  const handleBuy = (product) => {
    showNotification(`Buying ${product.productName}`);
  };

  const handleAddToCart = async (product) => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user || !user.username) {
      showNotification('Please log in to add items to your cart.');
      return;
    }
  
    const cartItem = {
      username: user.username,
      staffUsername: product.staffUsername,
      productId: product._id,
      productName: product.productName,
      price: product.price,
      imageUrl: product.imageUrl,
    };
  
    try {
      const response = await fetch('http://localhost:3000/api/add-to-cart', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(cartItem),
      });
  
      const data = await response.json();
      if (response.ok) {
        showNotification(`${product.productName} added to cart successfully!`);
      } else {
        showNotification(`Error: ${data.message}`);
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
      showNotification('Failed to add to cart.');
    }
  };

  return (
    <div className={`flex flex-row-reverse max-md:flex-row w-full`}>
      <div className='flex flex-col flex-1 h-screen'>
        <Header toggleNav={toggleNav} />
        {notification && (
          <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-800 text-white px-4 py-2 rounded shadow-md">
            {notification}
          </div>
        )}
        <div className='flex-1 overflow-auto mt-14 bg-white p-4'>
          <h1 className='text-2xl font-bold bg-gray-50 py-2 text-center'>Shop</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
            {products.map((product) => (
              <div key={product._id} className="bg-white shadow-md p-4">
                <a href='/user-product'>
                  <img
                    src={product.imageUrl}
                    alt={product.productName}
                    className="w-full h-60 max-md:h-48 object-contain rounded-lg"
                  />
                </a>
                <p className="font-semibold mt-2">Product: {product.productName}</p>
                <p>Color: {product.color}</p>
                <p>Price: ₱ {product.price}.00</p>
                <div className='flex justify-end space-x-2 mt-2'>
                  <div className='w-32 max-md:w-full'>
                    <CustomButton
                      nameButton="Buy"
                      rounded="rounded-lg"
                      color="bg-black"
                      hoverButton="hover:bg-[#454545]"
                      responsive="max-md:text-xs"
                      onClick={() => handleBuy(product)}
                    />
                  </div>
                  <div className='w-32 max-md:w-full'>
                    <CustomButton
                      nameButton="Add to Cart"
                      rounded="rounded-lg"
                      color="bg-[#656565]"
                      hoverButton="hover:bg-[#767676]"
                      responsive="max-md:text-xs"
                      onClick={() => handleAddToCart(product)}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <nav className={`max-md:hidden ${isNavCollapsed ? "w-20" : "w-56"} transition-width duration-300`}>
        <UserNavBar isNavCollapsed={isNavCollapsed} />
      </nav>
    </div>
  );
};

export default Homepage;