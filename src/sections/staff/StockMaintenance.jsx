// import React, { useState } from 'react';
// import { StaffNavBar, Header } from "../layout"

// const StockMaintenance = () => {
//   const [isNavCollapsed, setIsNavCollapsed] = useState(false);
//   const [staffUsername, setStaffUsername] = useState("");

//   const toggleNav = () => {
//     setIsNavCollapsed(!isNavCollapsed);
//   };

//   return (
//     <div className={`flex flex-row-reverse max-md:flex-row w-full`}>
//       <div className='flex flex-col flex-1 h-screen'>
//         <Header
//           toggleNav={toggleNav}
//         />

//         <div className={`flex-1 overflow-auto mt-14 bg-[#EFEFEF]`}>
//           {/* Your content here */}
//           <p>Stock Maintenance</p>
//         </div>
//       </div>

//       <nav className={`max-md:hidden ${isNavCollapsed ? "w-20" : "w-56"} transition-width duration-300`}>
//         <StaffNavBar
//           isNavCollapsed={isNavCollapsed}
//           setStaffUsername={setStaffUsername}
//         />
//       </nav>

//     </div>
//   )
// }

// export default StockMaintenance

import React, { useState, useEffect } from 'react';
import { StaffNavBar, Header } from "../layout";
import { CustomButton, Modal, UpdateProduct, ConfirmModal } from '../../components'; // Assuming you have these components

const StockMaintenance = () => {
  const [isNavCollapsed, setIsNavCollapsed] = useState(false);
  const [staffUsername, setStaffUsername] = useState("");
  const [products, setProducts] = useState([]);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);

  const toggleNav = () => {
    setIsNavCollapsed(!isNavCollapsed);
  };

  const fetchProducts = async () => {
    if (!staffUsername) {
      console.warn("Staff username is empty. Skipping fetch.");
      return; // Stop execution if staffUsername is empty
    }

    try {
      const response = await fetch(`http://localhost:3000/api/staffProducts?staffUsername=${staffUsername}`);
      const data = await response.json();

      // Filter products with quantity less than 10
      const lowStockProducts = data.filter(product => product.quantity < 10);
      setProducts(lowStockProducts);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const deleteProduct = async () => {
    if (!productToDelete) return;

    try {
      const response = await fetch(`http://localhost:3000/api/delete-product/${productToDelete._id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        fetchProducts(); // Refresh product list
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

  // Fetch products when the staffUsername changes
  useEffect(() => {
    if (staffUsername) {
      fetchProducts();
    }
  }, [staffUsername]);

  return (
    <div className="flex flex-row-reverse max-md:flex-row w-full">
      <div className="flex flex-col flex-1 h-screen">
        <Header toggleNav={toggleNav} />

        <div className="w-full flex-1 overflow-auto mt-14 bg-[#EFEFEF]">
          <h1 className='text-2xl font-bold bg-gray-50 py-2 text-center mt-5'>Low Stock Products</h1>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
            {products.length > 0 ? (
              products.map((product) => (
                <div key={product._id} className="bg-white shadow-md p-4 rounded-lg">
                  <img
                    src={product.imageUrl}
                    alt={product.productName}
                    className="w-full h-48 object-contain rounded-lg"
                  />
                  <p className="font-semibold mt-2">Product Name: {product.productName}</p>
                  <p className="font-semibold">Supplier: {product.supplierName}</p>
                  <p>Color: {product.color?.label || product.color?.value || 'No color'}</p>
                  <p>Quantity: {product.quantity}</p>
                  <p>Price: ₱ {product.price}.00</p>

                  <div className="flex justify-end space-x-2 mt-4">
                    <div className="w-28">
                      <CustomButton
                        nameButton="Remove"
                        rounded="rounded-lg"
                        color="bg-[#656565]"
                        hoverButton="hover:bg-[#767676]"
                        onClick={() => {
                          setProductToDelete(product);
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
                        onClick={() => openUpdateModal(product)}
                      />
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center w-full">No products with low stock</p>
            )}
          </div>
        </div>
      </div>

      <nav className={`max-md:hidden ${isNavCollapsed ? "w-20" : "w-56"} transition-width duration-300`}>
        <StaffNavBar
          isNavCollapsed={isNavCollapsed}
          setStaffUsername={setStaffUsername}
        />
      </nav>

      {/* Update Modal */}
      <UpdateProduct
        isOpen={isUpdateModalOpen}
        onClose={() => setIsUpdateModalOpen(false)}
        product={selectedProduct}
        refreshProducts={fetchProducts}
      />

      {/* Confirm Modal for Deleting Product */}
      <ConfirmModal
        isOpen={isConfirmModalOpen}
        onClose={() => setIsConfirmModalOpen(false)}
        onConfirm={deleteProduct}
        message="Are you sure you want to remove this product?"
      />
    </div>
  );
};

export default StockMaintenance;
