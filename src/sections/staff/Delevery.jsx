// import React, { useState, useEffect } from 'react';
// import { StaffNavBar, Header, MobileStaffNavbar } from "../layout";
// import { CustomButton, AddDeliveryModal, RestockModal } from '../../components';
// import { DeliveryHistory } from '../../data';
// import axios from 'axios';
// import { Table, Button } from 'antd';
// import { FaMoneyBillWave } from "react-icons/fa";
// import CountUp from "react-countup";
// import Swal from 'sweetalert2';
// import withReactContent from 'sweetalert2-react-content';

// const MySwal = withReactContent(Swal);

// const DeleveryMaintenance = () => {
//   const [isNavCollapsed, setIsNavCollapsed] = useState(false);
//   const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
//   const [staffUsername, setStaffUsername] = useState("");
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [isAddNewModalOpen, setIsAddNewModalOpen] = useState(false);  // for Add New / Restock modal
//   const [products, setProducts] = useState([]);
//   const [suppliers, setSuppliers] = useState([]);
//   const [deliveries, setDeliveries] = useState([]);

//   const [selectedProduct, setSelectedProduct] = useState(null);
//   const [selectedSupplier, setSelectedSupplier] = useState(null);
//   const [supplierPrice, setSupplierPrice] = useState('');
//   const [shopPrice, setShopPrice] = useState('');
//   const [quantity, setQuantity] = useState('');

//   const [totalDeliveredCost, setTotalDeliveredCost] = useState(0);
//   const [refreshHistory, setRefreshHistory] = useState(false);

//   const [vatPercentage, setVatPercentage] = useState(null); // Example: 12 means 12%
//   const [isVatApplied, setIsVatApplied] = useState(false);

//   const [showRestockModal, setShowRestockModal] = useState(false);
//   const [loading, setLoading] = useState(false);

//   const fetchVAT = async () => {
//     const res = await axios.get('https://online-shop-server-1.onrender.com/api/admin/vat'); // Adjust your endpoint
//     setVatPercentage(res.data.value); // assuming res.data.value = 12
//   };

//   const fetchData = async () => {
//     const productsRes = await axios.get('https://online-shop-server-1.onrender.com/api/products');
//     setProducts(productsRes.data);

//     const supplierRes = await axios.get('https://online-shop-server-1.onrender.com/api/suppliers');
//     setSuppliers(supplierRes.data);
//   };

//   const fetchDeliveries = async () => {
//     const res = await axios.get('https://online-shop-server-1.onrender.com/api/deliveries');
//     setDeliveries(res.data);
//   };

//   useEffect(() => {
//     fetchData();
//     fetchDeliveries();
//     fetchVAT(); // fetch VAT setting on mount
//   }, []);

//   const handleAddDelivery = async (finalShopPrice) => {
//     try {
//       const payload = {
//         productId: selectedProduct._id,
//         supplierId: selectedSupplier._id,
//         supplierPrice: parseFloat(supplierPrice),
//         shopPrice: parseFloat(finalShopPrice),
//         quantity: parseInt(quantity),
//         staffUsername,
//         totalCost: parseFloat(supplierPrice) * parseInt(quantity),
//         addedAt: new Date()
//       };

//       await axios.post('https://online-shop-server-1.onrender.com/api/admin-add-delivery', payload);
//       // SweetAlert Success
//       MySwal.fire({
//         icon: 'success',
//         title: 'Delivery added!',
//         text: 'The new delivery has been successfully added.',
//       });

//       // Reset modal inputs
//       setSelectedProduct(null);
//       setSelectedSupplier(null);
//       setSupplierPrice('');
//       setShopPrice('');
//       setQuantity('');

//       setIsAddNewModalOpen(false);
//       setIsModalOpen(false);
//       fetchDeliveries(); // refresh table
//     } catch (error) {
//       console.error("Error adding delivery:", error);
//       MySwal.fire({
//         icon: 'error',
//         title: 'Failed to add delivery.',
//         text: 'There was an issue adding the delivery. Please try again.',
//       });
//     }
//   };

//   const handleSetAsDelivered = async (deliveryId) => {
//     try {
//       const response = await axios.post(`https://online-shop-server-1.onrender.com/api/set-as-delivered/${deliveryId}`, {
//         staffUsername, // ✅ Send the staffUsername from local state
//       });

//       // alert(response.data.message);
//       await MySwal.fire({
//         icon: 'success',
//         title: 'Success',
//         text: response.data.message,
//       });
//       fetchDeliveries(); // Refresh the table
//       setRefreshHistory(prev => !prev); // trigger re-fetch in DeliveryHistory
//     } catch (error) {
//       console.error("Failed to set as delivered:", error);
//       MySwal.fire({
//         icon: 'error',
//         title: 'Failed to add delivery.',
//         text: 'There was an issue adding the delivery. Please try again.',
//       });
//     }
//   };

//   const handleRestockSuccess = () => {
//     setShowRestockModal(false);
//   };

//   const deliveryColumns = [
//     {
//       title: 'Product Name',
//       dataIndex: ['product', 'productName'],
//       key: 'productName'
//     },
//     {
//       title: 'Product ID',
//       dataIndex: 'productID',
//       key: 'productID'
//     },
//     {
//       title: 'Category',
//       dataIndex: ['product', 'category'],
//       key: 'category'
//     },
//     {
//       title: 'Sub Category',
//       dataIndex: ['product', 'subCategory'],
//       key: 'subCategory'
//     },
//     {
//       title: 'Supplier',
//       dataIndex: ['supplier', 'name'],
//       key: 'supplier'
//     },
//     {
//       title: 'Supplier Price',
//       dataIndex: 'supplierPrice',
//       key: 'supplierPrice',
//       render: price => `₱${price.toFixed(2)}`
//     },
//     {
//       title: 'Shop Price',
//       dataIndex: 'shopPrice',
//       key: 'shopPrice',
//       render: price => `₱${price.toFixed(2)}`
//     },
//     {
//       title: 'Quantity',
//       dataIndex: 'quantity',
//       key: 'quantity'
//     },
//     {
//       title: 'Total Cost',
//       dataIndex: 'totalCost',
//       key: 'totalCost',
//       render: cost => `₱${cost.toFixed(2)}`
//     },
//     {
//       title: 'Action',
//       key: 'action',
//       render: (text, record) => (
//         <Button
//           type="primary"
//           onClick={() => handleSetAsDelivered(record._id)}
//         >
//           Set as Delivered
//         </Button>
//       )
//     }
//   ];

//   const toggleNav = () => {
//     if (window.innerWidth <= 768) {
//       setIsMobileNavOpen(!isMobileNavOpen);
//     } else {
//       setIsNavCollapsed(!isNavCollapsed);
//     }
//   };


//   return (
//     <div className={`flex flex-row-reverse max-md:flex-row w-full`}>
//       <div className='flex flex-col flex-1 h-screen'>
//         <Header
//           toggleNav={toggleNav}
//         />
//         <MobileStaffNavbar isOpen={isMobileNavOpen} onClose={() => setIsMobileNavOpen(false)} />

//         <div className='flex-1 overflow-auto mt-14 bg-[#EFEFEF] py-2 md:p-6 w-full'>
//           <div className="mb-6 p-4 bg-white rounded-xl shadow-sm border border-gray-200 xl:w-1/3 w-full max-w-md flex items-center gap-4">
//             <div className="p-3 bg-blue-100 rounded-full">
//               <FaMoneyBillWave className="text-blue-600 text-2xl" />
//             </div>
//             <div>
//               <h2 className="text-sm text-gray-500 font-medium mb-1 uppercase tracking-wider">
//                 Total Expenses
//               </h2>
//               <p className="text-3xl font-bold text-green-600">
//                 ₱
//                 <CountUp
//                   end={totalDeliveredCost}
//                   duration={1.5}
//                   decimals={2}
//                   separator=","
//                 />
//               </p>
//             </div>
//           </div>

//           <div className='max-md:w-full w-1/3 mb-6'>
//             <CustomButton
//               nameButton="Add Delivery"
//               onClick={() => setIsModalOpen(true)}
//               rounded="rounded-lg"
//               color="bg-black"
//               hoverButton="hover:bg-[#454545]"
//             />
//           </div>

//           <div className='max-md:w-[100vw] bg-white mt-2 rounded-xl max-md:overflow-x-auto whitespace-nowrap'>
//             <Table
//               dataSource={deliveries}
//               rowKey="_id"
//               columns={deliveryColumns}
//               pagination={{ pageSize: 5 }}
//             />
//           </div>


//           <div>
//             <DeliveryHistory
//               refresh={refreshHistory}
//               setTotalDeliveredCost={setTotalDeliveredCost}
//             />

//           </div>

//           {/* Modal for Add New / Restock */}
//           {isModalOpen && (
//             <div className="fixed inset-0 flex justify-center items-center z-50">
//               <div className="relative bg-white p-6 rounded-lg w-full max-w-md border border-gray-400">

//                 {/* Close Button */}
//                 <button
//                   onClick={() => setIsModalOpen(false)}
//                   className="absolute top-2 right-3 text-gray-600 hover:text-black text-xl font-bold cursor-pointer"
//                 >
//                   &times;
//                 </button>

//                 <h2 className="text-xl font-bold mb-4">Select Action</h2>
//                 <div className="flex gap-4 justify-center">
//                   <button
//                     onClick={() => {
//                       setIsAddNewModalOpen(true);
//                       setIsModalOpen(false);
//                     }}
//                     className="px-4 py-2 bg-blue-600 text-white rounded cursor-pointer"
//                   >
//                     Add New
//                   </button>
//                   <button
//                     onClick={() => {
//                       setShowRestockModal(true);
//                       setIsModalOpen(false);
//                     }}
//                     className="px-4 py-2 bg-green-600 text-white rounded cursor-pointer"
//                   >
//                     Restock
//                   </button>
//                 </div>
//               </div>
//             </div>
//           )}

//           {/* Use the AddDeliveryModal component */}
//           {isAddNewModalOpen && (
//             <AddDeliveryModal
//               isModalOpen={isAddNewModalOpen}
//               setIsModalOpen={setIsAddNewModalOpen}
//               products={products}
//               suppliers={suppliers}
//               handleAddDelivery={handleAddDelivery}
//               selectedProduct={selectedProduct}
//               setSelectedProduct={setSelectedProduct}
//               selectedSupplier={selectedSupplier}
//               setSelectedSupplier={setSelectedSupplier}
//               supplierPrice={supplierPrice}
//               setSupplierPrice={setSupplierPrice}
//               shopPrice={shopPrice}
//               setShopPrice={setShopPrice}
//               quantity={quantity}
//               setQuantity={setQuantity}
//               vatPercentage={vatPercentage} // <-- pass VAT
//               isVatApplied={isVatApplied} // <-- pass the VAT status
//               setIsVatApplied={setIsVatApplied} // <-- pass setter to update VAT status
//             />
//           )}

//           <RestockModal
//             visible={showRestockModal}
//             onCancel={() => setShowRestockModal(false)}
//             onRestockSuccess={handleRestockSuccess}
//             refresh={fetchDeliveries()}
//             staffUsername={staffUsername}
//             restockAPI="api/restocks"
//           />
//         </div>
//       </div>

//       <nav className={`max-md:hidden ${isNavCollapsed ? "w-20" : "w-56"} transition-width duration-300`}>
//         <StaffNavBar
//           isNavCollapsed={isNavCollapsed}
//           setStaffUsername={setStaffUsername}
//         />
//       </nav>
//     </div>
//   );
// };

// export default DeleveryMaintenance; 

import React, { useState, useEffect } from 'react';
import { StaffNavBar, Header, MobileStaffNavbar } from "../layout";
import { CustomButton, AddDeliveryModal, RestockModal } from '../../components';
import { DeliveryHistory } from '../../data';
import axios from 'axios';
import { Table, Button, Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { FaMoneyBillWave } from "react-icons/fa";
import CountUp from "react-countup";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

const DeleveryMaintenance = () => {
  const [isNavCollapsed, setIsNavCollapsed] = useState(false);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [staffUsername, setStaffUsername] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddNewModalOpen, setIsAddNewModalOpen] = useState(false);  // for Add New / Restock modal
  const [products, setProducts] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [deliveries, setDeliveries] = useState([]);

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedSupplier, setSelectedSupplier] = useState(null);
  const [supplierPrice, setSupplierPrice] = useState('');
  const [shopPrice, setShopPrice] = useState('');
  const [quantity, setQuantity] = useState('');

  const [totalDeliveredCost, setTotalDeliveredCost] = useState(0);
  const [refreshHistory, setRefreshHistory] = useState(false);

  const [vatPercentage, setVatPercentage] = useState(null); // Example: 12 means 12%
  const [isVatApplied, setIsVatApplied] = useState(false);

  const [showRestockModal, setShowRestockModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState('');

  const fetchVAT = async () => {
    const res = await axios.get('https://online-shop-server-1.onrender.com/api/admin/vat'); // Adjust your endpoint
    setVatPercentage(res.data.value); // assuming res.data.value = 12
  };

  const fetchData = async () => {
    const productsRes = await axios.get('https://online-shop-server-1.onrender.com/api/products');
    setProducts(productsRes.data);

    const supplierRes = await axios.get('https://online-shop-server-1.onrender.com/api/suppliers');
    setSuppliers(supplierRes.data);
  };

  const fetchDeliveries = async () => {
    const res = await axios.get('https://online-shop-server-1.onrender.com/api/deliveries');
    setDeliveries(res.data);
  };

  useEffect(() => {
    fetchData();
    fetchDeliveries();
    fetchVAT(); // fetch VAT setting on mount
  }, []);

  const generateDeliveryID = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < 10; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  };

  const handleAddDelivery = async (finalShopPrice) => {
    try {
      const deliveryID = generateDeliveryID(); // 🔹 Generate ID here

      const payload = {
        deliveryID, // 🔹 Include it in the payload
        productId: selectedProduct._id,
        supplierId: selectedSupplier._id,
        supplierPrice: parseFloat(supplierPrice),
        shopPrice: parseFloat(finalShopPrice),
        quantity: parseInt(quantity),
        staffUsername,
        totalCost: parseFloat(supplierPrice) * parseInt(quantity),
        addedAt: new Date()
      };

      await axios.post('https://online-shop-server-1.onrender.com/api/admin-add-delivery', payload);
      // SweetAlert Success
      MySwal.fire({
        icon: 'success',
        title: 'Delivery added!',
        text: 'The new delivery has been successfully added.',
      });

      // Reset modal inputs
      setSelectedProduct(null);
      setSelectedSupplier(null);
      setSupplierPrice('');
      setShopPrice('');
      setQuantity('');

      setIsAddNewModalOpen(false);
      setIsModalOpen(false);
      fetchDeliveries(); // refresh table
    } catch (error) {
      console.error("Error adding delivery:", error);
      MySwal.fire({
        icon: 'error',
        title: 'Failed to add delivery.',
        text: 'There was an issue adding the delivery. Please try again.',
      });
    }
  };

  const handleSetAsDelivered = async (deliveryId) => {
    try {
      const response = await axios.post(`https://online-shop-server-1.onrender.com/api/set-as-delivered/${deliveryId}`, {
        staffUsername, // ✅ Send the staffUsername from local state
      });

      // alert(response.data.message);
      await MySwal.fire({
        icon: 'success',
        title: 'Success',
        text: response.data.message,
      });
      fetchDeliveries(); // Refresh the table
      setRefreshHistory(prev => !prev); // trigger re-fetch in DeliveryHistory
    } catch (error) {
      console.error("Failed to set as delivered:", error);
      MySwal.fire({
        icon: 'error',
        title: 'Failed to add delivery.',
        text: 'There was an issue adding the delivery. Please try again.',
      });
    }
  };

  const handleSetAllAsDelivered = async () => {
    try {
      const response = await axios.post('https://online-shop-server-1.onrender.com/api/set-all-delivered', {
        staffUsername
      });

      await MySwal.fire({
        icon: 'success',
        title: 'All Deliveries Set as Delivered!',
        text: response.data.message,
      });

      fetchDeliveries(); // Refresh deliveries table
      setRefreshHistory(prev => !prev); // Update delivery history too
    } catch (error) {
      console.error("Error setting all as delivered:", error);
      MySwal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Something went wrong while setting all deliveries as delivered.',
      });
    }
  };

  const handleRestockSuccess = () => {
    setShowRestockModal(false);
  };

  const filteredDeliveries = deliveries.filter(delivery =>
    delivery?.product?.productName?.toLowerCase().includes(searchText.toLowerCase())
  );

  const deliveryColumns = [
    {
      title: 'Product Name',
      dataIndex: ['product', 'productName'],
      key: 'productName'
    },
    // {
    //   title: 'Product ID',
    //   dataIndex: 'productID',
    //   key: 'productID'
    // },
    {
      title: 'Transaction ID',
      dataIndex: 'deliveryID',
      key: 'deliveryID'
    },
    {
      title: 'Category',
      dataIndex: ['product', 'category'],
      key: 'category'
    },
    {
      title: 'Sub Category',
      dataIndex: ['product', 'subCategory'],
      key: 'subCategory'
    },
    {
      title: 'Supplier',
      dataIndex: ['supplier', 'name'],
      key: 'supplier'
    },
    {
      title: 'Supplier Price',
      dataIndex: 'supplierPrice',
      key: 'supplierPrice',
      render: price => `₱${price.toFixed(2)}`
    },
    {
      title: 'Shop Price',
      dataIndex: 'shopPrice',
      key: 'shopPrice',
      render: price => `₱${price.toFixed(2)}`
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      key: 'quantity'
    },
    {
      title: 'Total Cost',
      dataIndex: 'totalCost',
      key: 'totalCost',
      render: cost => `₱${cost.toFixed(2)}`
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <Button
          type="primary"
          onClick={() => handleSetAsDelivered(record._id)}
        >
          Set as Delivered
        </Button>
      )
    }
  ];

  const toggleNav = () => {
    if (window.innerWidth <= 768) {
      setIsMobileNavOpen(!isMobileNavOpen);
    } else {
      setIsNavCollapsed(!isNavCollapsed);
    }
  };


  return (
    <div className={`flex flex-row-reverse max-md:flex-row w-full`}>
      <div className='flex flex-col flex-1 h-screen'>
        <Header
          toggleNav={toggleNav}
        />
        <MobileStaffNavbar isOpen={isMobileNavOpen} onClose={() => setIsMobileNavOpen(false)} />

        <div className='flex-1 overflow-auto mt-14 bg-[#EFEFEF] py-2 md:p-6 w-full'>
          <div className="mb-6 p-4 bg-white rounded-xl shadow-sm border border-gray-200 xl:w-1/3 w-full max-w-md flex items-center gap-4">
            <div className="p-3 bg-blue-100 rounded-full">
              <FaMoneyBillWave className="text-blue-600 text-2xl" />
            </div>
            <div>
              <h2 className="text-sm text-gray-500 font-medium mb-1 uppercase tracking-wider">
                Total Expenses
              </h2>
              <p className="text-3xl font-bold text-green-600">
                ₱
                <CountUp
                  end={totalDeliveredCost}
                  duration={1.5}
                  decimals={2}
                  separator=","
                />
              </p>
            </div>
          </div>

          <div className='max-md:w-full w-1/3 mb-6'>
            <CustomButton
              nameButton="Add Delivery"
              onClick={() => setIsModalOpen(true)}
              rounded="rounded-lg"
              color="bg-black"
              hoverButton="hover:bg-[#454545]"
            />
          </div>

          <div className='w-full flex justify-end'>
            <div className="mb-4 w-64 ">
              <Input
                placeholder="Search by product name"
                value={searchText}  
                onChange={(e) => setSearchText(e.target.value)}
                prefix={<SearchOutlined />}
                allowClear
                size="large"
              />
            </div>
          </div>

          <div className='max-md:w-[100vw] bg-white mt-2 rounded-xl max-md:overflow-x-auto whitespace-nowrap'>
            <Table
              // dataSource={deliveries}
              dataSource={filteredDeliveries}
              rowKey="_id"
              columns={deliveryColumns}
              pagination={{ pageSize: 5 }}
            />
          </div>

          {deliveries.length > 0 && (
            <div className="mt-4 text-right">
              <Button
                type="primary"
                danger
                onClick={handleSetAllAsDelivered}
              >
                Set All as Delivered
              </Button>
            </div>
          )}

          <div>
            <DeliveryHistory
              refresh={refreshHistory}
              setTotalDeliveredCost={setTotalDeliveredCost}
            />

          </div>

          {/* Modal for Add New / Restock */}
          {isModalOpen && (
            <div className="fixed inset-0 flex justify-center items-center z-50">
              <div className="relative bg-white p-6 rounded-lg w-full max-w-md border border-gray-400">

                {/* Close Button */}
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="absolute top-2 right-3 text-gray-600 hover:text-black text-xl font-bold cursor-pointer"
                >
                  &times;
                </button>

                <h2 className="text-xl font-bold mb-4">Select Action</h2>
                <div className="flex gap-4 justify-center">
                  <button
                    onClick={() => {
                      setIsAddNewModalOpen(true);
                      setIsModalOpen(false);
                    }}
                    className="px-4 py-2 bg-blue-600 text-white rounded cursor-pointer"
                  >
                    Add New
                  </button>
                  <button
                    onClick={() => {
                      setShowRestockModal(true);
                      setIsModalOpen(false);
                    }}
                    className="px-4 py-2 bg-green-600 text-white rounded cursor-pointer"
                  >
                    Restock
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Use the AddDeliveryModal component */}
          {isAddNewModalOpen && (
            <AddDeliveryModal
              isModalOpen={isAddNewModalOpen}
              setIsModalOpen={setIsAddNewModalOpen}
              products={products}
              suppliers={suppliers}
              handleAddDelivery={handleAddDelivery}
              selectedProduct={selectedProduct}
              setSelectedProduct={setSelectedProduct}
              selectedSupplier={selectedSupplier}
              setSelectedSupplier={setSelectedSupplier}
              supplierPrice={supplierPrice}
              setSupplierPrice={setSupplierPrice}
              shopPrice={shopPrice}
              setShopPrice={setShopPrice}
              quantity={quantity}
              setQuantity={setQuantity}
              vatPercentage={vatPercentage} // <-- pass VAT
              isVatApplied={isVatApplied} // <-- pass the VAT status
              setIsVatApplied={setIsVatApplied} // <-- pass setter to update VAT status
            />
          )}

          <RestockModal
            visible={showRestockModal}
            onCancel={() => setShowRestockModal(false)}
            onRestockSuccess={handleRestockSuccess}
            refresh={fetchDeliveries()}
            staffUsername={staffUsername}
            restockAPI="api/restocks"
          />
        </div>
      </div>

      <nav className={`max-md:hidden ${isNavCollapsed ? "w-20" : "w-56"} transition-width duration-300`}>
        <StaffNavBar
          isNavCollapsed={isNavCollapsed}
          setStaffUsername={setStaffUsername}
        />
      </nav>
    </div>
  );
};

export default DeleveryMaintenance; 