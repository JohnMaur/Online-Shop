// import React, { useState, useEffect } from 'react';
// import { Select } from 'antd';
// import { NavigationBar, Header, MobileAdminNavbar } from "../layout";
// import { CustomButton, ConfirmModal, UpdateStock } from '../../components';
// import { Link } from 'react-router-dom';

// const { Option } = Select;

// const AdminStock = () => {
//   const [isNavCollapsed, setIsNavCollapsed] = useState(false);
//   const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
//   const [stocks, setStocks] = useState([]);
//   const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
//   const [selectedProduct, setSelectedProduct] = useState(null);
//   const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
//   const [productToDelete, setProductToDelete] = useState(null);
//   const [filterOption, setFilterOption] = useState("all");
//   const [search, setSearch] = useState('');

//   const toggleNav = () => {
//     if (window.innerWidth <= 768) {
//       setIsMobileNavOpen(!isMobileNavOpen);
//     } else {
//       setIsNavCollapsed(!isNavCollapsed);
//     }
//   };

//   const fetchSearchStocks = async (query = '') => {
//     try {
//       const response = await fetch(`https://online-shop-server-1.onrender.com/api/search-userStocks?search=${query}`);
//       const data = await response.json();
//       setStocks(data);
//     } catch (error) {
//       console.error('Error fetching stocks:', error);
//     }
//   };

//   useEffect(() => {
//     fetchSearchStocks(search);
//   }, [search]);


//   const fetchStocks = async () => {
//     try {
//       const response = await fetch("https://online-shop-server-1.onrender.com/api/stocks");
//       const data = await response.json();
//       setStocks(data);
//     } catch (error) {
//       console.error("Error fetching stocks:", error);
//     }
//   };

//   const deleteProduct = async () => {
//     if (!productToDelete) return;

//     try {
//       const response = await fetch(`https://online-shop-server-1.onrender.com/api/delete-stock/${productToDelete._id}`, {
//         method: "DELETE",
//       });

//       if (response.ok) {
//         fetchStocks();
//       } else {
//         alert("Failed to delete product.");
//       }
//     } catch (error) {
//       console.error("Error deleting product:", error);
//       alert("An error occurred while deleting the product.");
//     }

//     setIsConfirmModalOpen(false);
//     setProductToDelete(null);
//   };

//   const openUpdateModal = (product) => {
//     setSelectedProduct(product);
//     setIsUpdateModalOpen(true);
//   };

//   useEffect(() => {
//     fetchStocks();
//   }, []);

//   // Handle filtering
//   const filteredStocks = stocks.filter((stock) => {
//     if (filterOption === "low") return stock.quantity < 10;
//     return true;
//   });

//   // Optional: sort low stock ascending by quantity
//   const sortedStocks = filterOption === "low"
//     ? filteredStocks.sort((a, b) => a.quantity - b.quantity)
//     : filteredStocks;

//   return (
//     <div className="flex flex-row-reverse max-md:flex-row w-full">
//       <div className="flex flex-col flex-1 h-screen">
//         <Header toggleNav={toggleNav} />
//         <MobileAdminNavbar isOpen={isMobileNavOpen} onClose={() => setIsMobileNavOpen(false)} />
//         <div className="w-full flex-1 overflow-auto mt-14 bg-[#EFEFEF]">

//           {/* Dropdown Filter */}
//           <div className="flex justify-end px-6 py-2 mt-5">
//             <Select
//               defaultValue="all"
//               value={filterOption}
//               onChange={(value) => setFilterOption(value)}
//               style={{ width: 200 }}
//             >
//               <Option value="all">All Stocks</Option>
//               <Option value="low">Low Stock (Below 10)</Option>
//             </Select>
//           </div>

//           {/* Stock Cards */}
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
//             {sortedStocks.length > 0 ? (
//               sortedStocks.map((stock) => (
//                 <div key={stock._id} className="bg-white shadow-md p-4 rounded-lg">
//                   <Link to={`/admin-product-review?productID=${stock.productID}`}>
//                     <img
//                       src={stock.product.imageUrl}
//                       alt={stock.product.productName}
//                       className="w-full h-48 object-contain rounded-lg"
//                     />
//                   </Link>
//                   <p className="font-semibold mt-2">Product Name: {stock.product.productName}</p>
//                   <p className="font-semibold">Supplier: {stock.supplier.name}</p>
//                   <p>Color: {stock.product.color || 'No color'}</p>
//                   <p>Quantity: {stock.quantity}</p>
//                   <p>Price: ₱ {stock.shopPrice}.00</p>

//                   <div className="flex justify-end space-x-2 mt-4">
//                     <div className="w-28">
//                       <CustomButton
//                         nameButton="Remove"
//                         rounded="rounded-lg"
//                         color="bg-[#656565]"
//                         hoverButton="hover:bg-[#767676]"
//                         onClick={() => {
//                           setProductToDelete(stock);
//                           setIsConfirmModalOpen(true);
//                         }}
//                       />
//                     </div>
//                     <div className="w-28">
//                       <CustomButton
//                         nameButton="Update"
//                         rounded="rounded-lg"
//                         color="bg-black"
//                         hoverButton="hover:bg-[#454545]"
//                         onClick={() => openUpdateModal(stock)}
//                       />
//                     </div>
//                   </div>
//                 </div>
//               ))
//             ) : (
//               <p className="text-center w-full">No stocks found.</p>
//             )}
//           </div>
//         </div>
//       </div>

//       <nav className={`max-md:hidden ${isNavCollapsed ? "w-20" : "w-56"} transition-width duration-300`}>
//         <NavigationBar
//           isNavCollapsed={isNavCollapsed}
//           onSearch={setSearch}
//         />
//       </nav>

//       {/* Update Modal */}
//       <UpdateStock
//         isOpen={isUpdateModalOpen}
//         onClose={() => setIsUpdateModalOpen(false)}
//         product={selectedProduct}
//         refreshProducts={fetchStocks}
//       />

//       {/* Confirm Modal */}
//       <ConfirmModal
//         isOpen={isConfirmModalOpen}
//         onClose={() => setIsConfirmModalOpen(false)}
//         onConfirm={deleteProduct}
//         message="Are you sure you want to remove this stock item?"
//       />
//     </div>
//   );
// };

// export default AdminStock;


// import React, { useState, useEffect } from 'react';
// import { Select } from 'antd';
// import { StaffNavBar, Header, MobileStaffNavbar } from "../layout";
// import { CustomButton, ConfirmModal, UpdateStock } from '../../components';
// import { Link } from 'react-router-dom';

// const { Option } = Select;

// const StockMaintenance = () => {
//   const [isNavCollapsed, setIsNavCollapsed] = useState(false);
//   const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
//   const [staffUsername, setStaffUsername] = useState("");
//   const [stocks, setStocks] = useState([]);
//   const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
//   const [selectedProduct, setSelectedProduct] = useState(null);
//   const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
//   const [productToDelete, setProductToDelete] = useState(null);
//   const [filterOption, setFilterOption] = useState("all");
//   const [search, setSearch] = useState('');

//   const toggleNav = () => {
//     if (window.innerWidth <= 768) {
//       setIsMobileNavOpen(!isMobileNavOpen);
//     } else {
//       setIsNavCollapsed(!isNavCollapsed);
//     }
//   };

//   const fetchSearchStocks = async (query = '') => {
//     try {
//       const response = await fetch(`https://online-shop-server-1.onrender.com/api/search-userStocks?search=${query}`);
//       const data = await response.json();
//       setStocks(data);
//     } catch (error) {
//       console.error('Error fetching stocks:', error);
//     }
//   };

//   useEffect(() => {
//     fetchSearchStocks(search);
//   }, [search]);

//   const fetchStocks = async () => {
//     try {
//       const response = await fetch("https://online-shop-server-1.onrender.com/api/stocks");
//       const data = await response.json();
//       setStocks(data);
//     } catch (error) {
//       console.error("Error fetching stocks:", error);
//     }
//   };

//   const deleteProduct = async () => {
//     if (!productToDelete) return;

//     try {
//       const response = await fetch(`https://online-shop-server-1.onrender.com/api/delete-stock/${productToDelete._id}`, {
//         method: "DELETE",
//       });

//       if (response.ok) {
//         fetchStocks();
//       } else {
//         alert("Failed to delete product.");
//       }
//     } catch (error) {
//       console.error("Error deleting product:", error);
//       alert("An error occurred while deleting the product.");
//     }

//     setIsConfirmModalOpen(false);
//     setProductToDelete(null);
//   };

//   const openUpdateModal = (product) => {
//     setSelectedProduct(product);
//     setIsUpdateModalOpen(true);
//   };

//   useEffect(() => {
//     fetchStocks();
//   }, []);

//   // Handle filtering
//   const filteredStocks = stocks.filter((stock) => {
//     if (filterOption === "low") return stock.quantity < 10;
//     return true;
//   });

//   // Optional: sort low stock ascending by quantity
//   const sortedStocks = filterOption === "low"
//     ? filteredStocks.sort((a, b) => a.quantity - b.quantity)
//     : filteredStocks;

//   return (
//     <div className="flex flex-row-reverse max-md:flex-row w-full">
//       <div className="flex flex-col flex-1 h-screen">
//         <Header toggleNav={toggleNav} />
//         <MobileStaffNavbar isOpen={isMobileNavOpen} onClose={() => setIsMobileNavOpen(false)} />

//         <div className="w-full flex-1 overflow-auto mt-14 bg-[#EFEFEF]">

//           {/* Dropdown Filter */}
//           <div className="flex justify-end px-6 py-2 mt-5">
//             <Select
//               defaultValue="all"
//               value={filterOption}
//               onChange={(value) => setFilterOption(value)}
//               style={{ width: 200 }}
//             >
//               <Option value="all">All Stocks</Option>
//               <Option value="low">Low Stock (Below 10)</Option>
//             </Select>
//           </div>

//           {/* Stock Cards */}
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
//             {sortedStocks.length > 0 ? (
//               sortedStocks.map((stock) => (
//                 <div key={stock._id} className="bg-white shadow-md p-4 rounded-lg">
//                   <Link to={`/staff-product-review?productID=${stock.productID}`}>
//                     <img
//                       src={stock.product.imageUrl}
//                       alt={stock.product.productName}
//                       className="w-full h-48 object-contain rounded-lg"
//                     />
//                   </Link>
//                   <p className="font-semibold mt-2">Product Name: {stock.product.productName}</p>
//                   <p className="font-semibold">Supplier: {stock.supplier.name}</p>
//                   <p>Color: {stock.product.color || 'No color'}</p>
//                   <p>Quantity: {stock.quantity}</p>
//                   <p>Price: ₱ {stock.shopPrice}.00</p>

//                   <div className="flex justify-end space-x-2 mt-4">
//                     <div className="w-28">
//                       <CustomButton
//                         nameButton="Remove"
//                         rounded="rounded-lg"
//                         color="bg-[#656565]"
//                         hoverButton="hover:bg-[#767676]"
//                         onClick={() => {
//                           setProductToDelete(stock);
//                           setIsConfirmModalOpen(true);
//                         }}
//                       />
//                     </div>
//                     <div className="w-28">
//                       <CustomButton
//                         nameButton="Update"
//                         rounded="rounded-lg"
//                         color="bg-black"
//                         hoverButton="hover:bg-[#454545]"
//                         onClick={() => openUpdateModal(stock)}
//                       />
//                     </div>
//                   </div>
//                 </div>
//               ))
//             ) : (
//               <p className="text-center w-full">No stocks found.</p>
//             )}
//           </div>
//         </div>
//       </div>

//       <nav className={`max-md:hidden ${isNavCollapsed ? "w-20" : "w-56"} transition-width duration-300`}>
//         <StaffNavBar
//           isNavCollapsed={isNavCollapsed}
//           setStaffUsername={setStaffUsername}
//           onSearch={setSearch}
//         />
//       </nav>

//       {/* Update Modal */}
//       <UpdateStock
//         isOpen={isUpdateModalOpen}
//         onClose={() => setIsUpdateModalOpen(false)}
//         product={selectedProduct}
//         refreshProducts={fetchStocks}
//       />

//       {/* Confirm Modal */}
//       <ConfirmModal
//         isOpen={isConfirmModalOpen}
//         onClose={() => setIsConfirmModalOpen(false)}
//         onConfirm={deleteProduct}
//         message="Are you sure you want to remove this stock item?"
//       />
//     </div>
//   );
// };

// export default StockMaintenance;


// import React, { useState, useEffect } from 'react';
// import { Select, Spin } from 'antd';
// import { StaffNavBar, Header, MobileStaffNavbar } from "../layout";
// import { CustomButton, ConfirmModal, UpdateStock } from '../../components';
// import { Link } from 'react-router-dom';

// const { Option } = Select;

// const StockMaintenance = () => {
//   const [isNavCollapsed, setIsNavCollapsed] = useState(false);
//   const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
//   const [staffUsername, setStaffUsername] = useState("");
//   const [stocks, setStocks] = useState([]);
//   const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
//   const [selectedProduct, setSelectedProduct] = useState(null);
//   const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
//   const [productToDelete, setProductToDelete] = useState(null);
//   const [filterOption, setFilterOption] = useState("all");
//   const [search, setSearch] = useState('');
//   const [loading, setLoading] = useState(false);  // Loading state

//   const toggleNav = () => {
//     if (window.innerWidth <= 768) {
//       setIsMobileNavOpen(!isMobileNavOpen);
//     } else {
//       setIsNavCollapsed(!isNavCollapsed);
//     }
//   };

//   const fetchSearchStocks = async (query = '') => {
//     setLoading(true);  // Start loading
//     try {
//       const response = await fetch(`https://online-shop-server-1.onrender.com/api/search-userStocks?search=${query}`);
//       const data = await response.json();
//       setStocks(data);
//     } catch (error) {
//       console.error('Error fetching stocks:', error);
//     } finally {
//       setLoading(false);  // Stop loading
//     }
//   };

//   useEffect(() => {
//     fetchSearchStocks(search);
//   }, [search]);

//   const fetchStocks = async () => {
//     setLoading(true);  // Start loading
//     try {
//       const response = await fetch("https://online-shop-server-1.onrender.com/api/stocks");
//       const data = await response.json();
//       setStocks(data);
//     } catch (error) {
//       console.error("Error fetching stocks:", error);
//     } finally {
//       setLoading(false);  // Stop loading
//     }
//   };

//   const deleteProduct = async () => {
//     if (!productToDelete) return;

//     try {
//       const response = await fetch(`https://online-shop-server-1.onrender.com/api/delete-stock/${productToDelete._id}`, {
//         method: "DELETE",
//       });

//       if (response.ok) {
//         fetchStocks();
//       } else {
//         alert("Failed to delete product.");
//       }
//     } catch (error) {
//       console.error("Error deleting product:", error);
//       alert("An error occurred while deleting the product.");
//     }

//     setIsConfirmModalOpen(false);
//     setProductToDelete(null);
//   };

//   const openUpdateModal = (product) => {
//     setSelectedProduct(product);
//     setIsUpdateModalOpen(true);
//   };

//   useEffect(() => {
//     fetchStocks();
//   }, []);

//   // Handle filtering
//   const filteredStocks = stocks.filter((stock) => {
//     if (filterOption === "low") return stock.quantity < 10;
//     return true;
//   });

//   // Optional: sort low stock ascending by quantity
//   const sortedStocks = filterOption === "low"
//     ? filteredStocks.sort((a, b) => a.quantity - b.quantity)
//     : filteredStocks;

//   return (
//     <div className="flex flex-row-reverse max-md:flex-row w-full">
//       <div className="flex flex-col flex-1 h-screen">
//         <Header toggleNav={toggleNav} />
//         <MobileStaffNavbar isOpen={isMobileNavOpen} onClose={() => setIsMobileNavOpen(false)} />

//         <div className="w-full flex-1 overflow-auto mt-14 bg-[#EFEFEF]">
//           {/* Dropdown Filter */}
//           <div className="flex justify-end px-6 py-2 mt-5">
//             <Select
//               defaultValue="all"
//               value={filterOption}
//               onChange={(value) => setFilterOption(value)}
//               style={{ width: 200 }}
//             >
//               <Option value="all">All Stocks</Option>
//               <Option value="low">Low Stock (Below 10)</Option>
//             </Select>
//           </div>

//           {/* Loading Spinner or Stock Cards */}
//           {loading ? (
//             <div className="flex justify-center items-center w-full h-[100vh]">
//               <Spin size="large" />
//             </div>
//           ) : sortedStocks.length > 0 ? (
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
//               {sortedStocks.map((stock) => (
//                 <div key={stock._id} className="bg-white shadow-md p-4 rounded-lg">
//                   <Link to={`/staff-product-review?productID=${stock.productID}`}>
//                     <img
//                       src={stock.product.imageUrl}
//                       alt={stock.product.productName}
//                       className="w-full h-48 object-contain rounded-lg"
//                     />
//                   </Link>
//                   <p className="font-semibold mt-2">Product Name: {stock.product.productName}</p>
//                   <p className="font-semibold">Supplier: {stock.supplier.name}</p>
//                   <p>Color: {stock.product.color || 'No color'}</p>
//                   <p>Quantity: {stock.quantity}</p>
//                   <p>Price: ₱ {stock.shopPrice}.00</p>

//                   <div className="flex justify-end space-x-2 mt-4">
//                     <div className="w-28">
//                       <CustomButton
//                         nameButton="Update"
//                         rounded="rounded-lg"
//                         color="bg-black"
//                         hoverButton="hover:bg-[#454545]"
//                         onClick={() => openUpdateModal(stock)}
//                       />
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           ) : (
//             <p className="text-center w-full">No stocks found.</p>
//           )}
//         </div>
//       </div>

//       <nav className={`max-md:hidden ${isNavCollapsed ? "w-20" : "w-56"} transition-width duration-300`}>
//         <StaffNavBar
//           isNavCollapsed={isNavCollapsed}
//           setStaffUsername={setStaffUsername}
//           onSearch={setSearch}
//         />
//       </nav>

//       {/* Update Modal */}
//       <UpdateStock
//         isOpen={isUpdateModalOpen}
//         onClose={() => setIsUpdateModalOpen(false)}
//         product={selectedProduct}
//         refreshProducts={fetchStocks}
//       />

//       {/* Confirm Modal */}
//       <ConfirmModal
//         isOpen={isConfirmModalOpen}
//         onClose={() => setIsConfirmModalOpen(false)}
//         onConfirm={deleteProduct}
//         message="Are you sure you want to remove this stock item?"
//       />
//     </div>
//   );

// };

// export default StockMaintenance;


// With full product details
import React, { useState, useEffect } from 'react';
import { Select, Spin, Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { NavigationBar, Header, MobileAdminNavbar } from "../layout";
import { CustomButton } from '../../components';
import { Link } from 'react-router-dom';

const { Option } = Select;

const StockMaintenance = () => {
  const [isNavCollapsed, setIsNavCollapsed] = useState(false);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [stocks, setStocks] = useState([]);
  const [filterOption, setFilterOption] = useState("all");
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);  // Loading state

  const toggleNav = () => {
    if (window.innerWidth <= 768) {
      setIsMobileNavOpen(!isMobileNavOpen);
    } else {
      setIsNavCollapsed(!isNavCollapsed);
    }
  };

  const fetchSearchStocks = async (query = '') => {
    setLoading(true);  // Start loading
    try {
      const response = await fetch(`https://online-shop-server-1.onrender.com/api/search-userStocks?search=${query}`);
      const data = await response.json();
      setStocks(data);
    } catch (error) {
      console.error('Error fetching stocks:', error);
    } finally {
      setLoading(false);  // Stop loading
    }
  };

  useEffect(() => {
    fetchSearchStocks(search);
  }, [search]); 

  const fetchStocks = async () => {
    setLoading(true);  // Start loading
    try {
      const response = await fetch("https://online-shop-server-1.onrender.com/api/stocks");
      const data = await response.json();
      setStocks(data);
    } catch (error) {
      console.error("Error fetching stocks:", error);
    } finally {
      setLoading(false);  // Stop loading
    }
  };

  // Handle filtering
  const filteredStocks = stocks.filter((stock) => {
    if (filterOption === "low") return stock.quantity < 10;
    return true;
  });

  // Optional: sort low stock ascending by quantity
  const sortedStocks = filterOption === "low"
    ? filteredStocks.sort((a, b) => a.quantity - b.quantity)
    : filteredStocks;

  return (
    <div className="flex flex-row-reverse max-md:flex-row w-full">
      <div className="flex flex-col flex-1 h-screen">
        <Header toggleNav={toggleNav} />
        <MobileAdminNavbar isOpen={isMobileNavOpen} onClose={() => setIsMobileNavOpen(false)} />

        <div className="w-full flex-1 overflow-auto mt-14 bg-[#EFEFEF]">
          {/* Dropdown Filter */}
          <div className="sticky top-5 z-10 flex justify-end items-center px-6 mb-3">
            <div className='flex px-6 py-3 rounded-xl'>
              <Input
                placeholder="Search stocks..."
                prefix={<SearchOutlined />}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                size="medium"
                className="w-64 mr-5"
              />

              <Select
                defaultValue="all"
                value={filterOption}
                onChange={(value) => setFilterOption(value)}
                style={{ width: 200 }}
              >
                <Option value="all">All Stocks</Option>
                <Option value="low">Low Stock (Below 10)</Option>
              </Select>
            </div>
          </div>

          {/* Loading Spinner or Stock Cards */}
          {loading ? (
            <div className="flex justify-center items-center w-full h-[100vh]">
              <Spin size="large" />
            </div>
          ) : sortedStocks.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
              {sortedStocks.map((stock) => (
                <div key={stock._id} className="bg-white shadow-md p-4 rounded-lg">
                  <img
                    src={stock.product.imageUrl}
                    alt={stock.product.productName}
                    className="w-full h-48 object-contain rounded-lg"
                  />
                  <p className="font-semibold mt-2">Product Name: {stock.product.productName}</p>
                  <p className="font-semibold">Supplier: {stock.supplier.name}</p>
                  <p>Color: {stock.product.color || 'No color'}</p>
                  <p>Quantity: {stock.quantity}</p>
                  <p>Price: ₱ {stock.shopPrice}.00</p>

                  <div className="flex justify-end space-x-2 mt-4">
                    <div className="w-36">
                      <Link to={`/admin-product-review?productID=${stock.productID}`}>
                        <CustomButton
                          nameButton="View Details"
                          rounded="rounded-lg"
                          color="bg-black"
                          hoverButton="hover:bg-[#454545]" 
                        />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center w-full">No stocks found.</p>
          )}
        </div>
      </div>

      <nav className={`max-md:hidden ${isNavCollapsed ? "w-20" : "w-56"} transition-width duration-300`}>
        <NavigationBar
          isNavCollapsed={isNavCollapsed}
        />
      </nav>
    </div>
  );

};

export default StockMaintenance;
