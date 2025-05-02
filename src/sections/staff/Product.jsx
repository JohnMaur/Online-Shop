// import React, { useState, useEffect } from 'react';
// import Swal from 'sweetalert2';
// import withReactContent from 'sweetalert2-react-content';
// import { StaffNavBar, Header, MobileStaffNavbar } from "../layout";
// import { CustomButton, Modal, UpdateProduct } from '../../components';

// const MySwal = withReactContent(Swal);

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

//   const fetchProducts = async () => {
//     if (!staffUsername) {
//       console.warn("Staff is empty. Skipping fetch.");
//       return;
//     }

//     try {
//       const [productRes, stockRes, deliveryRes] = await Promise.all([
//         fetch('https://online-shop-server-1.onrender.com/api/products'),
//         fetch('https://online-shop-server-1.onrender.com/api/stocks'),
//         fetch('https://online-shop-server-1.onrender.com/api/deliveries'),
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

//   const isProductInStockOrDelivery = (productID) => {
//     return (
//       stocks.some(stock => stock.productID === productID) ||
//       deliveries.some(delivery => delivery.productID === productID)
//     );
//   };

//   const handleDelete = (product) => {
//     MySwal.fire({
//       title: 'Are you sure?',
//       text: 'This product will be permanently removed!',
//       icon: 'warning',
//       showCancelButton: true,
//       confirmButtonColor: '#d33',
//       cancelButtonColor: '#3085d6',
//       confirmButtonText: 'Yes, remove it!',
//       cancelButtonText: 'Cancel',
//     }).then(async (result) => {
//       if (result.isConfirmed) {
//         try {
//           const response = await fetch(`https://online-shop-server-1.onrender.com/api/delete-product/${product._id}`, {
//             method: "DELETE",
//             headers: {
//               "Content-Type": "application/json",
//             },
//             body: JSON.stringify({ staffUsername })
//           });

//           if (response.ok) {
//             fetchProducts();
//             MySwal.fire('Deleted!', 'Your product has been removed.', 'success');
//           } else {
//             MySwal.fire('Error', 'Failed to remove product.', 'error');
//           }
//         } catch (error) {
//           console.error("Error deleting product:", error);
//           MySwal.fire('Error', 'An error occurred while removing the product.', 'error');
//         }
//       }
//     });
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

//                   {!isProductInStockOrDelivery(product.productID) && (
//                     <div className='w-28'>
//                       <CustomButton
//                         nameButton="Remove"
//                         rounded="rounded-lg"
//                         color="bg-[#656565]"
//                         hoverButton="hover:bg-[#767676]"
//                         onClick={() => handleDelete(product)}
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
//     </div>
//   );
// };

// export default StaffProduct;


import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { StaffNavBar, Header, MobileStaffNavbar } from "../layout";
import { CustomButton, Modal, UpdateProduct } from '../../components';
import { Spin } from 'antd'; // Import Spin from Ant Design

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
  const [loading, setLoading] = useState(false);  // Add loading state

  const fetchProducts = async () => {
    if (!staffUsername) {
      console.warn("Staff is empty. Skipping fetch.");
      return;
    }

    setLoading(true);  // Start loading

    try {
      const [productRes, stockRes, deliveryRes] = await Promise.all([
        fetch('https://online-shop-server-1.onrender.com/api/products'),
        fetch('https://online-shop-server-1.onrender.com/api/stocks'),
        fetch('https://online-shop-server-1.onrender.com/api/deliveries'),
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
    } finally {
      setLoading(false);  // End loading
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
          const response = await fetch(`https://online-shop-server-1.onrender.com/api/delete-product/${product._id}`, {
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

          {/* Add the Spinner (loading state) */}
          {loading ? (
            <div className="flex justify-center items-center my-10">
              <Spin size="large" />
            </div>
          ) : (
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
          )}
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
