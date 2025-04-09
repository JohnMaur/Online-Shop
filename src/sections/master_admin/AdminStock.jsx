// import React, { useState, useEffect } from 'react';
// import { NavigationBar, Header } from "../layout";
// import { CustomButton, UpdateProduct, ConfirmModal } from '../../components'; // Assuming you have these components

// const AdminStock = () => {
//   const [isNavCollapsed, setIsNavCollapsed] = useState(false);
//   const [products, setProducts] = useState([]);
//   const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
//   const [selectedProduct, setSelectedProduct] = useState(null);
//   const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
//   const [productToDelete, setProductToDelete] = useState(null);

//   const toggleNav = () => {
//     setIsNavCollapsed(!isNavCollapsed);
//   };

//   const fetchProducts = async () => {
//     try {
//       const response = await fetch(`http://localhost:3000/api/adminStockProducts`);
//       const data = await response.json();

//       // Filter products with quantity less than 10
//       const lowStockProducts = data.filter(product => product.quantity < 10);
//       setProducts(lowStockProducts);
//     } catch (error) {
//       console.error('Error fetching products:', error);
//     }
//   };

//   const deleteProduct = async () => {
//     if (!productToDelete) return;

//     try {
//       const response = await fetch(`http://localhost:3000/api/delete-product/${productToDelete._id}`, {
//         method: "DELETE",
//       });

//       if (response.ok) {
//         fetchProducts(); // Refresh product list
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

//    // Re-fetch products when the update modal closes
//    useEffect(() => {
//     if (!isUpdateModalOpen) {
//       fetchProducts();
//     }
//   }, [isUpdateModalOpen]);

//   return (
//     <div className="flex flex-row-reverse max-md:flex-row w-full">
//       <div className="flex flex-col flex-1 h-screen">
//         <Header toggleNav={toggleNav} />

//         <div className="w-full flex-1 overflow-auto mt-14 bg-[#EFEFEF]">
//           <h1 className='text-2xl font-bold bg-gray-50 py-2 text-center mt-5'>Low Stock Products</h1>

//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
//             {products.length > 0 ? (
//               products.map((product) => (
//                 <div key={product._id} className="bg-white shadow-md p-4 rounded-lg">
//                   <img
//                     src={product.imageUrl}
//                     alt={product.productName}
//                     className="w-full h-48 object-contain rounded-lg"
//                   />
//                   <p className="font-semibold mt-2">Product Name: {product.productName}</p>
//                   <p className="font-semibold">Supplier: {product.supplierName}</p>
//                   <p>Color: {product.color?.label || product.color?.value || 'No color'}</p>
//                   <p>Quantity: {product.quantity}</p>
//                   <p>Price: ₱ {product.price}.00</p>

//                   <div className="flex justify-end space-x-2 mt-4">
//                     <div className="w-28">
//                       <CustomButton
//                         nameButton="Remove"
//                         rounded="rounded-lg"
//                         color="bg-[#656565]"
//                         hoverButton="hover:bg-[#767676]"
//                         onClick={() => {
//                           setProductToDelete(product);
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
//                         onClick={() => openUpdateModal(product)}
//                       />
//                     </div>
//                   </div>
//                 </div>
//               ))
//             ) : (
//               <p className="text-center w-full">No products with low stock</p>
//             )}
//           </div>
//         </div>
//       </div>

//       <nav className={`max-md:hidden ${isNavCollapsed ? "w-20" : "w-56"} transition-width duration-300`}>
//         <NavigationBar
//           NavigationBar={isNavCollapsed}
//         />
//       </nav>

//       {/* Update Modal */}
//       <UpdateProduct
//         isOpen={isUpdateModalOpen}
//         onClose={() => setIsUpdateModalOpen(false)}
//         product={selectedProduct}
//         refreshProducts={fetchProducts}
//       />

//       {/* Confirm Modal for Deleting Product */}
//       <ConfirmModal
//         isOpen={isConfirmModalOpen}
//         onClose={() => setIsConfirmModalOpen(false)}
//         onConfirm={deleteProduct}
//         message="Are you sure you want to remove this product?"
//       />
//     </div>
//   );
// };

// export default AdminStock;


import React, { useState, useEffect } from 'react';
import { Select } from 'antd';
import { NavigationBar, Header } from "../layout";
import { CustomButton, ConfirmModal, UpdateStock } from '../../components';

const { Option } = Select;

const AdminStock = () => {
  const [isNavCollapsed, setIsNavCollapsed] = useState(false);
  const [stocks, setStocks] = useState([]);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const [filterOption, setFilterOption] = useState("all");

  const toggleNav = () => {
    setIsNavCollapsed(!isNavCollapsed);
  };

  const fetchStocks = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/stocks");
      const data = await response.json();
      setStocks(data);
    } catch (error) {
      console.error("Error fetching stocks:", error);
    }
  };

  const deleteProduct = async () => {
    if (!productToDelete) return;

    try {
      const response = await fetch(`http://localhost:3000/api/delete-stock/${productToDelete._id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        fetchStocks();
      } else {
        alert("Failed to delete product.");
      }
    } catch (error) {
      console.error("Error deleting product:", error);
      alert("An error occurred while deleting the product.");
    }

    setIsConfirmModalOpen(false);
    setProductToDelete(null);
  };

  const openUpdateModal = (product) => {
    setSelectedProduct(product);
    setIsUpdateModalOpen(true);
  };

  useEffect(() => {
    fetchStocks();
  }, []);

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

        <div className="w-full flex-1 overflow-auto mt-14 bg-[#EFEFEF]">

          {/* Dropdown Filter */}
          <div className="flex justify-end px-6 py-2 mt-5">
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

          {/* Stock Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
            {sortedStocks.length > 0 ? (
              sortedStocks.map((stock) => (
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
                    <div className="w-28">
                      <CustomButton
                        nameButton="Remove"
                        rounded="rounded-lg"
                        color="bg-[#656565]"
                        hoverButton="hover:bg-[#767676]"
                        onClick={() => {
                          setProductToDelete(stock);
                          setIsConfirmModalOpen(true);
                        }}
                      />
                    </div>
                    <div className="w-28">
                      <CustomButton
                        nameButton="Update"
                        rounded="rounded-lg"
                        color="bg-black"
                        hoverButton="hover:bg-[#454545]"
                        onClick={() => openUpdateModal(stock)}
                      />
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center w-full">No stocks found.</p>
            )}
          </div>
        </div>
      </div>

      <nav className={`max-md:hidden ${isNavCollapsed ? "w-20" : "w-56"} transition-width duration-300`}>
        <NavigationBar
          isNavCollapsed={isNavCollapsed}
        />
      </nav>

      {/* Update Modal */}
      <UpdateStock
        isOpen={isUpdateModalOpen}
        onClose={() => setIsUpdateModalOpen(false)}
        product={selectedProduct}
        refreshProducts={fetchStocks}
      />

      {/* Confirm Modal */}
      <ConfirmModal
        isOpen={isConfirmModalOpen}
        onClose={() => setIsConfirmModalOpen(false)}
        onConfirm={deleteProduct}
        message="Are you sure you want to remove this stock item?"
      />
    </div>
  );
};

export default AdminStock;
