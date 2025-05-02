// import React, { useState, useEffect } from 'react';
// import { NavigationBar, Header, MobileAdminNavbar } from "../layout";
// import { CustomButton, UpdateProduct, ConfirmModal, Modal, AdminAddingNewProduct } from '../../components';

// const Product = () => {
//   const [isNavCollapsed, setIsNavCollapsed] = useState(false);
//   const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [products, setProducts] = useState([]);
//   const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
//   const [selectedProduct, setSelectedProduct] = useState(null);
//   const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
//   const [productToDelete, setProductToDelete] = useState(null);

//   const toggleNav = () => {
//     if (window.innerWidth <= 768) {
//       setIsMobileNavOpen(!isMobileNavOpen);
//     } else {
//       setIsNavCollapsed(!isNavCollapsed);
//     }
//   };

//   const fetchProducts = async () => {
//     try {
//       const response = await fetch('https://online-shop-server-1.onrender.com/api/products'); // Adjust URL as needed
//       const data = await response.json();
//       setProducts(data);
//     } catch (error) {
//       console.error('Error fetching products:', error);
//     }
//   };

//   // Re-fetch products when the update modal closes
//   useEffect(() => {
//     if (!isUpdateModalOpen) {
//       fetchProducts();
//     }
//   }, [isUpdateModalOpen]);

//   const deleteProduct = async () => {
//     if (!productToDelete) return;

//     try {
//       const response = await fetch(`https://online-shop-server-1.onrender.com/api/admin-delete-product/${productToDelete._id}`, {
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

//   return (
//     <div className="flex flex-row-reverse max-md:flex-row w-full">
//       <div className="flex flex-col flex-1 h-screen">
//         <Header toggleNav={toggleNav} />
//         <MobileAdminNavbar isOpen={isMobileNavOpen} onClose={() => setIsMobileNavOpen(false)} />
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

//           <h1 className='text-2xl font-bold bg-gray-50 py-2 text-center mt-5'>All Products</h1>

//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
//             {products.map((product) => (
//               <div key={product._id} className="bg-white shadow-md p-4 rounded-lg">
//                 <img
//                   src={product.imageUrl}
//                   alt={product.productName}
//                   className="w-full h-48 object-contain rounded-lg"
//                 />
//                 <p className="font-semibold mt-2">Product Name: {product.productName}</p>
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
//         <NavigationBar
//           isNavCollapsed={isNavCollapsed}
//         />
//       </nav>

//       <AdminAddingNewProduct
//         isOpen={isModalOpen}
//         onClose={() => setIsModalOpen(false)}
//         refreshProducts={fetchProducts}
//       />

//       <UpdateProduct
//         isOpen={isUpdateModalOpen}
//         onClose={() => setIsUpdateModalOpen(false)}
//         product={selectedProduct}
//         refreshProducts={fetchProducts}
//         editableApi="api/admin-update-product"
//       />

//       <ConfirmModal
//         isOpen={isConfirmModalOpen}
//         onClose={() => setIsConfirmModalOpen(false)}
//         onConfirm={deleteProduct}
//         message="Are you sure you want to delete this product?"
//       />
//     </div>
//   );
// };

// export default Product; 

// import React, { useState, useEffect } from 'react';
// import { NavigationBar, Header, MobileAdminNavbar } from "../layout";
// import { CustomButton, UpdateProduct, ConfirmModal, Modal, AdminAddingNewProduct } from '../../components';

// const Product = () => {
//   const [isNavCollapsed, setIsNavCollapsed] = useState(false);
//   const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [products, setProducts] = useState([]);
//   const [stocks, setStocks] = useState([]);
//   const [deliveries, setDeliveries] = useState([]);
//   const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
//   const [selectedProduct, setSelectedProduct] = useState(null);
//   const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
//   const [productToDelete, setProductToDelete] = useState(null);

//   const toggleNav = () => {
//     if (window.innerWidth <= 768) {
//       setIsMobileNavOpen(!isMobileNavOpen);
//     } else {
//       setIsNavCollapsed(!isNavCollapsed);
//     }
//   };

//   const fetchProducts = async () => {
//     try {
//       const response = await fetch('https://online-shop-server-1.onrender.com/api/products');
//       const data = await response.json();
//       setProducts(data);
//     } catch (error) {
//       console.error('Error fetching products:', error);
//     }
//   };

//   const fetchStocks = async () => {
//     try {
//       const response = await fetch('https://online-shop-server-1.onrender.com/api/stocks'); // Adjust this URL
//       const data = await response.json();
//       setStocks(data);
//     } catch (error) {
//       console.error('Error fetching stocks:', error);
//     }
//   };

//   const fetchDeliveries = async () => {
//     try {
//       const response = await fetch('https://online-shop-server-1.onrender.com/api/deliveries'); // Adjust this URL
//       const data = await response.json();
//       setDeliveries(data);
//     } catch (error) {
//       console.error('Error fetching deliveries:', error);
//     }
//   };

//   useEffect(() => {
//     fetchProducts();
//     fetchStocks();
//     fetchDeliveries();
//   }, []);

//   // Re-fetch products after updating
//   useEffect(() => {
//     if (!isUpdateModalOpen) {
//       fetchProducts();
//     }
//   }, [isUpdateModalOpen]);

//   const deleteProduct = async () => {
//     if (!productToDelete) return;

//     try {
//       const response = await fetch(`https://online-shop-server-1.onrender.com/api/admin-delete-product/${productToDelete._id}`, {
//         method: "DELETE",
//       });

//       if (response.ok) {
//         fetchProducts();
//         fetchStocks();
//         fetchDeliveries();
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

//   // Helper function: check if productID exists in stocks or deliveries
//   const isProductInStocksOrDeliveries = (productID) => {
//     const inStocks = stocks.some((stock) => stock.productID === productID);
//     const inDeliveries = deliveries.some((delivery) => delivery.productID === productID);
//     return inStocks || inDeliveries;
//   };

//   return (
//     <div className="flex flex-row-reverse max-md:flex-row w-full">
//       <div className="flex flex-col flex-1 h-screen">
//         <Header toggleNav={toggleNav} />
//         <MobileAdminNavbar isOpen={isMobileNavOpen} onClose={() => setIsMobileNavOpen(false)} />
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

//           <h1 className='text-2xl font-bold bg-gray-50 py-2 text-center mt-5'>All Products</h1>

//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
//             {products.map((product) => (
//               <div key={product._id} className="bg-white shadow-md p-4 rounded-lg">
//                 <img
//                   src={product.imageUrl}
//                   alt={product.productName}
//                   className="w-full h-48 object-contain rounded-lg"
//                 />
//                 <p className="font-semibold mt-2">Product Name: {product.productName}</p>
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
//                   {!isProductInStocksOrDeliveries(product.productID) && (
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
//         <NavigationBar isNavCollapsed={isNavCollapsed} />
//       </nav>

//       <AdminAddingNewProduct
//         isOpen={isModalOpen}
//         onClose={() => setIsModalOpen(false)}
//         refreshProducts={fetchProducts}
//       />

//       <UpdateProduct
//         isOpen={isUpdateModalOpen}
//         onClose={() => setIsUpdateModalOpen(false)}
//         product={selectedProduct}
//         refreshProducts={fetchProducts}
//         editableApi="api/admin-update-product"
//       />

//       <ConfirmModal
//         isOpen={isConfirmModalOpen}
//         onClose={() => setIsConfirmModalOpen(false)}
//         onConfirm={deleteProduct}
//         message="Are you sure you want to delete this product?"
//       />
//     </div>
//   );
// };

// export default Product;

import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import React, { useState, useEffect } from 'react';
import { NavigationBar, Header, MobileAdminNavbar } from "../layout";
import { CustomButton, UpdateProduct, AdminAddingNewProduct } from '../../components';

const MySwal = withReactContent(Swal);

const Product = () => {
  const [isNavCollapsed, setIsNavCollapsed] = useState(false);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [stocks, setStocks] = useState([]);
  const [deliveries, setDeliveries] = useState([]);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const toggleNav = () => {
    if (window.innerWidth <= 768) {
      setIsMobileNavOpen(!isMobileNavOpen);
    } else {
      setIsNavCollapsed(!isNavCollapsed);
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await fetch('https://online-shop-server-1.onrender.com/api/products');
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const fetchStocks = async () => {
    try {
      const response = await fetch('https://online-shop-server-1.onrender.com/api/stocks');
      const data = await response.json();
      setStocks(data);
    } catch (error) {
      console.error('Error fetching stocks:', error);
    }
  };

  const fetchDeliveries = async () => {
    try {
      const response = await fetch('https://online-shop-server-1.onrender.com/api/deliveries');
      const data = await response.json();
      setDeliveries(data);
    } catch (error) {
      console.error('Error fetching deliveries:', error);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchStocks();
    fetchDeliveries();
  }, []);

  useEffect(() => {
    if (!isUpdateModalOpen) {
      fetchProducts();
    }
  }, [isUpdateModalOpen]);

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
          const response = await fetch(`https://online-shop-server-1.onrender.com/api/admin-delete-product/${product._id}`, {
            method: "DELETE",
          });

          if (response.ok) {
            await fetchProducts();
            await fetchStocks();
            await fetchDeliveries();

            MySwal.fire(
              'Deleted!',
              `Product "${product.productName}" has been removed.`,
              'success'
            );
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

  const openUpdateModal = (product) => {
    setSelectedProduct(product);
    setIsUpdateModalOpen(true);
  };

  const isProductInStocksOrDeliveries = (productID) => {
    const inStocks = stocks.some((stock) => stock.productID === productID);
    const inDeliveries = deliveries.some((delivery) => delivery.productID === productID);
    return inStocks || inDeliveries;
  };

  return (
    <div className="flex flex-row-reverse max-md:flex-row w-full">
      <div className="flex flex-col flex-1 h-screen">
        <Header toggleNav={toggleNav} />
        <MobileAdminNavbar isOpen={isMobileNavOpen} onClose={() => setIsMobileNavOpen(false)} />
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

          <h1 className='text-2xl font-bold bg-gray-50 py-2 text-center mt-5'>All Products</h1>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
            {products.map((product) => (
              <div key={product._id} className="bg-white shadow-md p-4 rounded-lg">
                <img
                  src={product.imageUrl}
                  alt={product.productName}
                  className="w-full h-48 object-contain rounded-lg"
                />
                <p className="font-semibold mt-2">Product Name: {product.productName}</p>
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
                  {!isProductInStocksOrDeliveries(product.productID) && (
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
        <NavigationBar isNavCollapsed={isNavCollapsed} />
      </nav>

      <AdminAddingNewProduct
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        refreshProducts={fetchProducts}
      />

      <UpdateProduct
        isOpen={isUpdateModalOpen}
        onClose={() => setIsUpdateModalOpen(false)}
        product={selectedProduct}
        refreshProducts={fetchProducts}
        editableApi="api/admin-update-product"
      />
    </div>
  );
};

export default Product;

