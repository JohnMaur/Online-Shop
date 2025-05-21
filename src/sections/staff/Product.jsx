// import React, { useState, useEffect } from 'react';
// import Swal from 'sweetalert2';
// import withReactContent from 'sweetalert2-react-content';
// import { StaffNavBar, Header, MobileStaffNavbar } from "../layout";
// import { CustomButton, Modal, UpdateProduct } from '../../components';
// import { Spin } from 'antd'; // Import Spin from Ant Design

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
//   const [loading, setLoading] = useState(false);  // Add loading state

//   const fetchProducts = async () => {
//     if (!staffUsername) {
//       console.warn("Staff is empty. Skipping fetch.");
//       return;
//     }

//     setLoading(true);  // Start loading

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
//     } finally {
//       setLoading(false);  // End loading
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

//           {/* Add the Spinner (loading state) */}
//           {loading ? (
//             <div className="flex justify-center items-center my-10">
//               <Spin size="large" />
//             </div>
//           ) : (
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
//               {products.map((product) => (
//                 <div key={product._id} className="bg-white shadow-md p-4 rounded-lg">
//                   <img
//                     src={product.imageUrl}
//                     alt={product.productName}
//                     className="w-full h-48 object-contain rounded-lg"
//                   />
//                   <p className="font-semibold mt-2">Brand: {product.brand}</p>
//                   <p>Product Name: {product.productName}</p>
//                   <p>Color: {product.color}</p>
//                   <div className='flex justify-end space-x-2'>
//                     <div className='w-28'>
//                       <CustomButton
//                         nameButton="Update"
//                         rounded="rounded-lg"
//                         color="bg-black"
//                         hoverButton="hover:bg-[#454545]"
//                         onClick={() => openUpdateModal(product)}
//                       />
//                     </div>

//                     {!isProductInStockOrDelivery(product.productID) && (
//                       <div className='w-28'>
//                         <CustomButton
//                           nameButton="Remove"
//                           rounded="rounded-lg"
//                           color="bg-[#656565]"
//                           hoverButton="hover:bg-[#767676]"
//                           onClick={() => handleDelete(product)}
//                         />
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}
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

// With multiple images

import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { StaffNavBar, Header, MobileStaffNavbar } from "../layout";
import { CustomButton, Modal, UpdateProduct } from '../../components';
import { Spin } from 'antd'; // Import Spin from Ant Design
import { Card, Button, Tooltip, Empty, Input } from 'antd';
import { EditOutlined, DeleteOutlined, LeftOutlined, RightOutlined, PlusOutlined, SearchOutlined } from '@ant-design/icons';

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
  const [imageIndexes, setImageIndexes] = useState({});
  const [loading, setLoading] = useState(false);  // Add loading state
  const [searchTerm, setSearchTerm] = useState('');

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

  const handleImageChange = (productId, direction) => {
    const currentIndex = imageIndexes[productId] || 0;
    const images = products.find(p => p._id === productId)?.imageUrls || [];

    if (images.length === 0) return;

    let newIndex = currentIndex + direction;
    if (newIndex < 0) newIndex = images.length - 1;
    if (newIndex >= images.length) newIndex = 0;

    setImageIndexes(prev => ({
      ...prev,
      [productId]: newIndex
    }));
  };

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

  // const isProductInStockOrDelivery = (productID) => {
  //   return (
  //     stocks.some(stock => stock.productID === productID) ||
  //     deliveries.some(delivery => delivery.productID === productID)
  //   );
  // };

  const isProductInStockOrDelivery = (productID) => {
    return (
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
          <div className='flex justify-end'>
            <div className="w-11/12 lg:w-5/12 xl:w-1/3 m-4">
              <Input
                placeholder="Search by product name"
                allowClear
                prefix={<SearchOutlined />}
                onChange={(e) => setSearchTerm(e.target.value)}
                value={searchTerm}
                size="large"
              />
            </div>
          </div>

          {/* Add the Spinner (loading state) */}
          {loading ? (
            <div className="flex justify-center items-center my-10">
              <Spin size="large" />
            </div>
          ) : products.length === 0 ? (
            <div className="flex justify-center items-center h-96">
              <Empty description="No Products Found" />
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
              {products
                .filter((product) =>
                  product.productName.toLowerCase().includes(searchTerm.toLowerCase())
                )
                .map((product) => {
                  const images = product.imageUrls || [];
                  const currentIndex = imageIndexes[product._id] || 0;

                  return (
                    <Card
                      key={product._id}
                      hoverable
                      className="shadow-md rounded-lg"
                      cover={
                        <div className="relative">
                          {images.length > 1 && (
                            <button
                              className="absolute top-1/2 left-0 transform -translate-y-1/2 text-white bg-black p-2 rounded-full cursor-pointer ml-2"
                              onClick={() => handleImageChange(product._id, -1)}
                            >
                              &lt;
                            </button>
                          )}

                          <div className='w-full flex justify-center'>
                            <img
                              alt={product.productName}
                              src={images[currentIndex]}
                              className="w-48 h-48 object-contain rounded-t-lg"
                            />
                          </div>

                          {images.length > 1 && (
                            <button
                              className="absolute top-1/2 right-0 transform -translate-y-1/2 text-white bg-black p-2 rounded-full cursor-pointer mr-2"
                              onClick={() => handleImageChange(product._id, 1)}
                            >
                              &gt;
                            </button>
                          )}
                        </div>
                      }
                    >
                      <Card.Meta
                        title={<span className="font-semibold">{product.productName}</span>}
                        description={
                          <>
                            <p className="text-sm text-gray-600">Brand: {product.brand}</p>
                            <p className="text-sm text-gray-600">Category: {product.category[0]}</p>
                            <p className="text-sm text-gray-600">Sub Category: {product.subCategory}</p>
                            <p className="text-sm text-gray-600">Color: {product.color}</p>
                            <p className="text-sm text-gray-600">Size: {product.size}</p>
                            <p className="text-sm text-gray-600">sex: {product.sex}</p>
                          </>
                        }
                      />
                      <div className="flex justify-end gap-2 mt-4">
                        <Tooltip title="Update">
                          <Button
                            type="primary"
                            icon={<EditOutlined />}
                            onClick={() => openUpdateModal(product)}
                          />
                        </Tooltip>

                        {!isProductInStockOrDelivery(product.productID) && (
                          <Tooltip title="Delete">
                            <Button
                              danger
                              icon={<DeleteOutlined />}
                              onClick={() => handleDelete(product)}
                            />
                          </Tooltip>
                        )}

                        {/* <Tooltip title="Delete">
                          <Button
                            danger
                            icon={<DeleteOutlined />}
                            onClick={() => handleDelete(product)}
                          />
                        </Tooltip> */}

                      </div>
                    </Card>
                  );
                })}
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
