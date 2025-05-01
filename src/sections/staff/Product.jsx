// import React, { useState, useEffect } from 'react';
// import { StaffNavBar, Header, MobileStaffNavbar } from "../layout";
// import { CustomButton, Modal, UpdateProduct, ConfirmModal } from '../../components';

// const StaffProduct = () => {
//   const [isNavCollapsed, setIsNavCollapsed] = useState(false);
//   const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [staffUsername, setStaffUsername] = useState("");
//   const [products, setProducts] = useState([]);
//   const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
//   const [selectedProduct, setSelectedProduct] = useState(null);
//   const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
//   const [productToDelete, setProductToDelete] = useState(null);

//   const fetchProducts = async () => {
//     if (!staffUsername) {
//       console.warn("Staff is empty. Skipping fetch.");
//       return; // Stop execution if staffUsername is empty
//     }

//     try {
//       const response = await fetch('http://localhost:3000/api/products'); // Adjust URL as needed
//       const data = await response.json();
//       setProducts(data);
//     } catch (error) {
//       console.error('Error fetching products:', error);
//     }
//   };

//   // Fetch products when component loads or `staffUsername` changes
//   useEffect(() => {
//     if (staffUsername) {
//       fetchProducts();
//     }
//   }, [staffUsername]);


//   // Re-fetch products when the update modal closes
//   useEffect(() => {
//     if (!isUpdateModalOpen) {
//       fetchProducts();
//     }
//   }, [isUpdateModalOpen]);

//   const deleteProduct = async () => {
//     if (!productToDelete) return;

//     try {
//       const response = await fetch(`http://localhost:3000/api/delete-product/${productToDelete._id}`, {
//         method: "DELETE",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ staffUsername })  // Send staffUsername in the request body
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

//   const toggleNav = () => {
//     if (window.innerWidth <= 768) {
//       setIsMobileNavOpen(!isMobileNavOpen);
//     } else {
//       setIsNavCollapsed(!isNavCollapsed);
//     }
//   };

//   const openUpdateModal = (product) => {
//     setSelectedProduct(product);
//     setIsUpdateModalOpen(true);
//   };

//   return (
//     <div className="flex flex-row-reverse max-md:flex-row w-full">
//       <div className="flex flex-col flex-1 h-screen">
//         <Header toggleNav={toggleNav} />
//         <MobileStaffNavbar isOpen={isMobileNavOpen} onClose={() => setIsMobileNavOpen(false)} />
//         <div className="w-full flex-1 overflow-auto mt-14 bg-[#EFEFEF]">
//           <div className="w-11/12 lg:w-5/12 xl:w-1/3 m-4">
//             <CustomButton
//               nameButton="Add Product"
//               rounded="rounded-lg"
//               color="bg-black"
//               hoverButton="hover:bg-[#454545]"
//               onClick={() => setIsModalOpen(true)}
//             />
//           </div>

//           <h1 className='text-2xl font-bold bg-gray-50 py-2 text-center mt-5'>My Products</h1>

//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
//             {products.map((product) => (
//               <div key={product._id} className="bg-white shadow-md p-4 rounded-lg">
//                 <img
//                   src={product.imageUrl}
//                   alt={product.productName}
//                   className="w-full h-48 object-contain rounded-lg"
//                 />
//                 <p className="font-semibold mt-2">Brand: {product.brand}</p>
//                 <p>Product Name: {product.productName}</p>
//                 <p>Color: {product.color}</p>
//                 <div className='flex justify-end space-x-2'>
//                   <div className='w-28'>
//                     <CustomButton
//                       nameButton="Update"
//                       rounded="rounded-lg"
//                       color="bg-black"
//                       hoverButton="hover:bg-[#454545]"
//                       onClick={() => openUpdateModal(product)}
//                     />
//                   </div>
//                   <div className='w-28'>
//                     <CustomButton
//                       nameButton="Remove"
//                       rounded="rounded-lg"
//                       color="bg-[#656565]"
//                       hoverButton="hover:bg-[#767676]"
//                       onClick={() => {
//                         setProductToDelete(product);
//                         setIsConfirmModalOpen(true);
//                       }}

//                     />
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//       <nav className={`max-md:hidden ${isNavCollapsed ? "w-20" : "w-56"} transition-width duration-300`}>
//         <StaffNavBar
//           isNavCollapsed={isNavCollapsed}
//           setStaffUsername={setStaffUsername}
//         />
//       </nav>

//       <Modal
//         staffUsername={staffUsername}
//         isOpen={isModalOpen}
//         onClose={() => setIsModalOpen(false)}
//         refreshProducts={fetchProducts}
//       />

//       <UpdateProduct
//         isOpen={isUpdateModalOpen}
//         onClose={() => setIsUpdateModalOpen(false)}
//         product={selectedProduct}
//         refreshProducts={fetchProducts}
//         staffUsername={staffUsername}
//         editableApi="api/update-product"
//       />

//       <ConfirmModal
//         isOpen={isConfirmModalOpen}
//         onClose={() => setIsConfirmModalOpen(false)}
//         onConfirm={deleteProduct}
//         message="Are you sure you want to remove this product?"
//       />
//     </div>
//   );
// };

// export default StaffProduct; 

// import React, { useState, useEffect } from 'react';
// import { StaffNavBar, Header, MobileStaffNavbar } from "../layout";
// import { CustomButton, Modal, UpdateProduct, ConfirmModal } from '../../components';

// const StaffProduct = () => {
//   const [isNavCollapsed, setIsNavCollapsed] = useState(false);
//   const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [staffUsername, setStaffUsername] = useState("");
//   const [products, setProducts] = useState([]);
//   const [stocks, setStocks] = useState([]);
//   const [deliveries, setDeliveries] = useState([]);
//   const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
//   const [selectedProduct, setSelectedProduct] = useState(null);
//   const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
//   const [productToDelete, setProductToDelete] = useState(null);

//   const fetchProducts = async () => {
//     if (!staffUsername) {
//       console.warn("Staff is empty. Skipping fetch.");
//       return;
//     }

//     try {
//       const [productRes, stockRes, deliveryRes] = await Promise.all([
//         fetch('http://localhost:3000/api/products'),
//         fetch('http://localhost:3000/api/stocks'),
//         fetch('http://localhost:3000/api/deliveries'),
//       ]);

//       const [productData, stockData, deliveryData] = await Promise.all([
//         productRes.json(),
//         stockRes.json(),
//         deliveryRes.json(),
//       ]);

//       setProducts(productData);
//       setStocks(stockData);
//       setDeliveries(deliveryData);
//     } catch (error) {
//       console.error('Error fetching data:', error);
//     }
//   };

//   useEffect(() => {
//     if (staffUsername) {
//       fetchProducts();
//     }
//   }, [staffUsername]);

//   useEffect(() => {
//     if (!isUpdateModalOpen) {
//       fetchProducts();
//     }
//   }, [isUpdateModalOpen]);

//   const deleteProduct = async () => {
//     if (!productToDelete) return;

//     try {
//       const response = await fetch(`http://localhost:3000/api/delete-product/${productToDelete._id}`, {
//         method: "DELETE",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ staffUsername })
//       });

//       if (response.ok) {
//         fetchProducts();
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

//   const toggleNav = () => {
//     if (window.innerWidth <= 768) {
//       setIsMobileNavOpen(!isMobileNavOpen);
//     } else {
//       setIsNavCollapsed(!isNavCollapsed);
//     }
//   };

//   const openUpdateModal = (product) => {
//     setSelectedProduct(product);
//     setIsUpdateModalOpen(true);
//   };

//   // Check if productID exists in stocks or deliveries
//   const isProductInStockOrDelivery = (productID) => {
//     return (
//       stocks.some(stock => stock.productID === productID) ||
//       deliveries.some(delivery => delivery.productID === productID)
//     );
//   };

//   return (
//     <div className="flex flex-row-reverse max-md:flex-row w-full">
//       <div className="flex flex-col flex-1 h-screen">
//         <Header toggleNav={toggleNav} />
//         <MobileStaffNavbar isOpen={isMobileNavOpen} onClose={() => setIsMobileNavOpen(false)} />
//         <div className="w-full flex-1 overflow-auto mt-14 bg-[#EFEFEF]">
//           <div className="w-11/12 lg:w-5/12 xl:w-1/3 m-4">
//             <CustomButton
//               nameButton="Add Product"
//               rounded="rounded-lg"
//               color="bg-black"
//               hoverButton="hover:bg-[#454545]"
//               onClick={() => setIsModalOpen(true)}
//             />
//           </div>

//           <h1 className='text-2xl font-bold bg-gray-50 py-2 text-center mt-5'>My Products</h1>

//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
//             {products.map((product) => (
//               <div key={product._id} className="bg-white shadow-md p-4 rounded-lg">
//                 <img
//                   src={product.imageUrl}
//                   alt={product.productName}
//                   className="w-full h-48 object-contain rounded-lg"
//                 />
//                 <p className="font-semibold mt-2">Brand: {product.brand}</p>
//                 <p>Product Name: {product.productName}</p>
//                 <p>Color: {product.color}</p>
//                 <div className='flex justify-end space-x-2'>
//                   <div className='w-28'>
//                     <CustomButton
//                       nameButton="Update"
//                       rounded="rounded-lg"
//                       color="bg-black"
//                       hoverButton="hover:bg-[#454545]"
//                       onClick={() => openUpdateModal(product)}
//                     />
//                   </div>

//                   {/* Only show Remove button if not in stocks or deliveries */}
//                   {!isProductInStockOrDelivery(product.productID) && (
//                     <div className='w-28'>
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
//                   )}
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       <nav className={`max-md:hidden ${isNavCollapsed ? "w-20" : "w-56"} transition-width duration-300`}>
//         <StaffNavBar
//           isNavCollapsed={isNavCollapsed}
//           setStaffUsername={setStaffUsername}
//         />
//       </nav>

//       <Modal
//         staffUsername={staffUsername}
//         isOpen={isModalOpen}
//         onClose={() => setIsModalOpen(false)}
//         refreshProducts={fetchProducts}
//       />

//       <UpdateProduct
//         isOpen={isUpdateModalOpen}
//         onClose={() => setIsUpdateModalOpen(false)}
//         product={selectedProduct}
//         refreshProducts={fetchProducts}
//         staffUsername={staffUsername}
//         editableApi="api/update-product"
//       />

//       <ConfirmModal
//         isOpen={isConfirmModalOpen}
//         onClose={() => setIsConfirmModalOpen(false)}
//         onConfirm={deleteProduct}
//         message="Are you sure you want to remove this product?"
//       />
//     </div>
//   );
// };

// export default StaffProduct;

import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { StaffNavBar, Header, MobileStaffNavbar } from "../layout";
import { CustomButton, Modal, UpdateProduct } from '../../components';

const MySwal = withReactContent(Swal);

const StaffProduct = () => {
  const [isNavCollapsed, setIsNavCollapsed] = useState(false);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [staffUsername, setStaffUsername] = useState("");
  const [products, setProducts] = useState([]);
  const [stocks, setStocks] = useState([]);
  const [deliveries, setDeliveries] = useState([]);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const fetchProducts = async () => {
    if (!staffUsername) {
      console.warn("Staff is empty. Skipping fetch.");
      return;
    }

    try {
      const [productRes, stockRes, deliveryRes] = await Promise.all([
        fetch('http://localhost:3000/api/products'),
        fetch('http://localhost:3000/api/stocks'),
        fetch('http://localhost:3000/api/deliveries'),
      ]);

      const [productData, stockData, deliveryData] = await Promise.all([
        productRes.json(),
        stockRes.json(),
        deliveryRes.json(),
      ]);

      setProducts(productData);
      setStocks(stockData);
      setDeliveries(deliveryData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    if (staffUsername) {
      fetchProducts();
    }
  }, [staffUsername]);

  useEffect(() => {
    if (!isUpdateModalOpen) {
      fetchProducts();
    }
  }, [isUpdateModalOpen]);

  const toggleNav = () => {
    if (window.innerWidth <= 768) {
      setIsMobileNavOpen(!isMobileNavOpen);
    } else {
      setIsNavCollapsed(!isNavCollapsed);
    }
  };

  const openUpdateModal = (product) => {
    setSelectedProduct(product);
    setIsUpdateModalOpen(true);
  };

  const isProductInStockOrDelivery = (productID) => {
    return (
      stocks.some(stock => stock.productID === productID) ||
      deliveries.some(delivery => delivery.productID === productID)
    );
  };

  const handleDelete = (product) => {
    MySwal.fire({
      title: 'Are you sure?',
      text: 'This product will be permanently removed!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, remove it!',
      cancelButtonText: 'Cancel',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await fetch(`http://localhost:3000/api/delete-product/${product._id}`, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ staffUsername })
          });

          if (response.ok) {
            fetchProducts();
            MySwal.fire('Deleted!', 'Your product has been removed.', 'success');
          } else {
            MySwal.fire('Error', 'Failed to remove product.', 'error');
          }
        } catch (error) {
          console.error("Error deleting product:", error);
          MySwal.fire('Error', 'An error occurred while removing the product.', 'error');
        }
      }
    });
  };

  return (
    <div className="flex flex-row-reverse max-md:flex-row w-full">
      <div className="flex flex-col flex-1 h-screen">
        <Header toggleNav={toggleNav} />
        <MobileStaffNavbar isOpen={isMobileNavOpen} onClose={() => setIsMobileNavOpen(false)} />
        <div className="w-full flex-1 overflow-auto mt-14 bg-[#EFEFEF]">
          <div className="w-11/12 lg:w-5/12 xl:w-1/3 m-4">
            <CustomButton
              nameButton="Add Product"
              rounded="rounded-lg"
              color="bg-black"
              hoverButton="hover:bg-[#454545]"
              onClick={() => setIsModalOpen(true)}
            />
          </div>

          <h1 className='text-2xl font-bold bg-gray-50 py-2 text-center mt-5'>My Products</h1>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
            {products.map((product) => (
              <div key={product._id} className="bg-white shadow-md p-4 rounded-lg">
                <img
                  src={product.imageUrl}
                  alt={product.productName}
                  className="w-full h-48 object-contain rounded-lg"
                />
                <p className="font-semibold mt-2">Brand: {product.brand}</p>
                <p>Product Name: {product.productName}</p>
                <p>Color: {product.color}</p>
                <div className='flex justify-end space-x-2'>
                  <div className='w-28'>
                    <CustomButton
                      nameButton="Update"
                      rounded="rounded-lg"
                      color="bg-black"
                      hoverButton="hover:bg-[#454545]"
                      onClick={() => openUpdateModal(product)}
                    />
                  </div>

                  {!isProductInStockOrDelivery(product.productID) && (
                    <div className='w-28'>
                      <CustomButton
                        nameButton="Remove"
                        rounded="rounded-lg"
                        color="bg-[#656565]"
                        hoverButton="hover:bg-[#767676]"
                        onClick={() => handleDelete(product)}
                      />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <nav className={`max-md:hidden ${isNavCollapsed ? "w-20" : "w-56"} transition-width duration-300`}>
        <StaffNavBar
          isNavCollapsed={isNavCollapsed}
          setStaffUsername={setStaffUsername}
        />
      </nav>

      <Modal
        staffUsername={staffUsername}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        refreshProducts={fetchProducts}
      />

      <UpdateProduct
        isOpen={isUpdateModalOpen}
        onClose={() => setIsUpdateModalOpen(false)}
        product={selectedProduct}
        refreshProducts={fetchProducts}
        staffUsername={staffUsername}
        editableApi="api/update-product"
      />
    </div>
  );
};

export default StaffProduct;
