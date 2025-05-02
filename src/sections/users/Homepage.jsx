import React, { useState, useEffect } from 'react';
import { UserNavBar, Header, MobileNavBar } from "../layout";
import { CustomButton } from '../../components';
import { Select, Spin } from 'antd';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

const { Option } = Select;

const Homepage = () => {
  const [isNavCollapsed, setIsNavCollapsed] = useState(false);
  const [showMobileNav, setShowMobileNav] = useState(false);
  const [stocks, setStocks] = useState([]);
  const [username, setUsername] = useState('');
  const [hasAccountInfo, setHasAccountInfo] = useState(true);
  const [notification, setNotification] = useState(null);
  const [sortOption, setSortOption] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState('');

  const [loading, setLoading] = useState(true); // new

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && user.username) {
      setUsername(user.username);
      checkAccountInfo(user.username);
    }
  }, []);

  const toggleNav = () => {
    if (window.innerWidth <= 768) {
      setShowMobileNav(prev => !prev);
    } else {
      setIsNavCollapsed(!isNavCollapsed);
    }
  };

  // Close mobile nav on window resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setShowMobileNav(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const checkAccountInfo = async (username) => {
    setLoading(true); // new
    try {
      const res = await fetch(`https://online-shop-server-1.onrender.com/api/account-info/${username}`);
      if (!res.ok) {
        setHasAccountInfo(false);
      } else {
        setHasAccountInfo(true);
      }
    } catch (err) {
      console.error("Error checking account info:", err);
      setHasAccountInfo(false);
    } finally {
      setLoading(false); // new
    }
  };

  const fetchStocks = async (query = '') => {
    setLoading(true); // new
    try {
      const response = await fetch(`https://online-shop-server-1.onrender.com/api/search-userStocks?search=${query}`);
      const data = await response.json();
      setStocks(data);
    } catch (error) {
      console.error('Error fetching stocks:', error);
    } finally {
      setLoading(false); // new
    }
  };

  useEffect(() => {
    fetchStocks(search);
  }, [search]);


  useEffect(() => {
    const fetchStocks = async () => {
      setLoading(true); // new
      try {
        const response = await fetch('https://online-shop-server-1.onrender.com/api/userStocks');
        const data = await response.json();
        console.log('Fetched Stocks:', data);
        setStocks(data);
      } catch (error) {
        console.error('Error fetching stocks:', error);
      } finally {
        setLoading(false); // new
      }
    };

    const fetchCategories = async () => {
      setLoading(true); // new
      try {
        const response = await fetch('https://online-shop-server-1.onrender.com/api/product-maintenance');
        const data = await response.json();

        const allCategories = data.flatMap(item => {
          if (Array.isArray(item.category)) return item.category;
          if (typeof item.category === 'string') return [item.category];
          return [];
        });

        const uniqueCategories = [...new Set(
          allCategories
            .filter(cat => typeof cat === 'string')
            .map(cat => cat.trim().toLowerCase())
        )];

        console.log('Fetched Categories:', uniqueCategories);
        setCategories(uniqueCategories);
      } catch (error) {
        console.error('Error fetching categories:', error);
      } finally {
        setLoading(false); // new
      }
    };

    fetchStocks();
    fetchCategories();
  }, []);

  const showNotification = (message) => {
    setNotification(message);
    setTimeout(() => {
      setNotification(null);
    }, 2000);
  };

  const handleAddToCart = async (product) => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user || !user.username) {
      showNotification('Please log in to add items to your cart.');
      return;
    }

    if (!hasAccountInfo) {
      MySwal.fire({
        icon: "warning",
        title: "Missing Info",
        text: "Please register your account info first.",
        timer: 2000,
        showConfirmButton: false,
        timerProgressBar: true,
      });
      return;
    }


    const cartItem = {
      username: user.username,
      staffUsername: product.staffUsername || "unknown",
      price: product.shopPrice,
      productID: product.productID,
      product: {
        productName: product.product.productName,
        category: product.product.category,
        subCategory: product.product.subCategory,
        brand: product.product.brand,
        size: product.product.size || null,
        color: product.product.color,
        imageUrl: product.product.imageUrl,
      },
    };
    setLoading(true); // new
    try {
      const response = await fetch('https://online-shop-server-1.onrender.com/api/add-to-cart', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(cartItem),
      });

      const data = await response.json();
      if (response.ok) {
        // showNotification(`${cartItem.product.productName} added to cart successfully!`);
        MySwal.fire({
          icon: "success",
          title: "Added to Cart",
          text: `${cartItem.product.productName} added to cart successfully!`,
          confirmButtonColor: "#3B82F6",
          timer: 2000,
          toast: true,
          showConfirmButton: false,
          timerProgressBar: true,
        });

      } else {
        showNotification(`Error: ${data.message}`);
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
      showNotification('Failed to add to cart.');
    } finally {
      setLoading(false); // new
    }
  };

  // 🧠 Category filter with safe and flexible logic
  const filteredStocks = categoryFilter === 'all'
    ? stocks
    : stocks.filter(stock => {
      const cat = stock?.product?.category;

      if (typeof cat === 'string') {
        return cat.trim().toLowerCase() === categoryFilter.trim().toLowerCase();
      }

      if (Array.isArray(cat)) {
        return cat.some(c =>
          typeof c === 'string' &&
          c.trim().toLowerCase() === categoryFilter.trim().toLowerCase()
        );
      }

      return false;
    });

  // 🎯 Sorting logic
  const sortedStocks = [...filteredStocks].sort((a, b) => {
    if (sortOption === 'high-low') return b.shopPrice - a.shopPrice;
    if (sortOption === 'low-high') return a.shopPrice - b.shopPrice;
    return 0;
  });

  return (
    <div className={`flex flex-row-reverse max-md:flex-row w-full`}>
      <div className='flex flex-col flex-1 h-screen'>
        <Header toggleNav={toggleNav} />

        {showMobileNav && (
          <div className="md:hidden fixed top-14 left-0 w-full z-50 bg-white shadow-md">
            <MobileNavBar />
          </div>
        )}

        {notification && (
          <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-800 text-white px-4 py-2 rounded shadow-md z-50">
            {notification}
          </div>
        )}

        <div className='flex-1 overflow-auto mt-14 bg-white p-4'>
          <Spin spinning={loading}>
            {!hasAccountInfo && (
              <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-4 rounded">
                <p><strong>Heads up!</strong> Please <a href="/account-info" className="underline">register your account info</a> to start shopping.</p>
              </div>
            )}

            {/* Filters */}
            <div className="flex justify-end items-center gap-4 px-4 my-2 flex-wrap">
              <div className="flex items-center">
                <label className="mr-2 font-semibold">Sort by:</label>
                <Select
                  value={sortOption}
                  onChange={(value) => setSortOption(value)}
                  className="w-52"
                >
                  <Option value="all">All Products</Option>
                  <Option value="high-low">Price: High to Low</Option>
                  <Option value="low-high">Price: Low to High</Option>
                </Select>
              </div>

              <div className="flex items-center">
                <label className="mr-2 font-semibold">Category:</label>
                <Select
                  value={categoryFilter}
                  onChange={(value) => setCategoryFilter(value)}
                  className="w-52"
                >
                  <Option value="all">All Categories</Option>
                  {categories.map((category) => (
                    <Option key={category} value={category}>
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </Option>
                  ))}
                </Select>
              </div>
            </div>

            {/* Product Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
              {sortedStocks.length === 0 ? (
                <div className="col-span-full text-center text-gray-500">No products found in this category.</div>
              ) : (
                sortedStocks.map((stock) => (
                  <div key={stock._id} className="bg-white shadow-md p-4">
                    <Link to={`/user-product?productID=${stock.productID}`}>
                      <img
                        src={stock.product.imageUrl}
                        alt={stock.product.productName}
                        className="w-full h-60 max-md:h-48 object-contain rounded-lg"
                      />
                    </Link>
                    <p className="font-semibold mt-2">Brand: {stock.product.brand}</p>
                    <p>{stock.product.productName}</p>
                    <p>Color: {stock.product.color}</p>
                    <p>Price: ₱ {stock.shopPrice}.00</p>
                    <div className='flex justify-end space-x-2 mt-2'>
                      <div className='w-32 max-md:w-full'>
                        <CustomButton
                          nameButton="Add to Cart"
                          rounded="rounded-lg"
                          color="bg-black"
                          hoverButton="hover:bg-[#454545]"
                          responsive="max-md:text-xs"
                          onClick={() => handleAddToCart(stock)}
                        />
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </Spin>
        </div>
      </div>

      <nav className={`max-md:hidden ${isNavCollapsed ? "w-20" : "w-56"} transition-width duration-300`}>
        <UserNavBar isNavCollapsed={isNavCollapsed} onSearch={setSearch} />
      </nav>
    </div>
  );
};

export default Homepage;

