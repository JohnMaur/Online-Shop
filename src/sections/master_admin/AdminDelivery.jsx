// import React, { useState } from 'react';
// import { NavigationBar, Header } from "../layout"

// const AdminDelivery = () => {
//   const [isNavCollapsed, setIsNavCollapsed] = useState(false);

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
//           <p>Sorting - Staff - Customer</p>
//           <p>Table - Timestamps - Action - customer details</p>
//         </div>
//       </div>

//       <nav className={`max-md:hidden ${isNavCollapsed ? "w-20" : "w-56"} transition-width duration-300`}>
//         <NavigationBar
//           isNavCollapsed={isNavCollapsed}
//         />

//       </nav>

//     </div>
//   )
// }

// export default AdminDelivery


import React, { useState, useEffect } from 'react';
import { NavigationBar, Header } from "../layout";
import { CustomButton, AddDeliveryModal, RestockModal } from '../../components';
import { DeliveryHistory } from '../../data';
import axios from 'axios';
import { Table, Button } from 'antd';
import { FaMoneyBillWave } from "react-icons/fa";
import CountUp from "react-countup";

const AdminDelivery = () => {
  const [isNavCollapsed, setIsNavCollapsed] = useState(false);
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

  const [showRestockModal, setShowRestockModal] = useState(false);

  const toggleNav = () => setIsNavCollapsed(!isNavCollapsed);

  const fetchData = async () => {
    const productsRes = await axios.get('http://localhost:3000/api/products');
    setProducts(productsRes.data);

    const supplierRes = await axios.get('http://localhost:3000/api/suppliers');
    setSuppliers(supplierRes.data);
  };

  const fetchDeliveries = async () => {
    const res = await axios.get('http://localhost:3000/api/deliveries');
    setDeliveries(res.data);
  };

  useEffect(() => {
    fetchData();
    fetchDeliveries();
  }, []);

  const handleAddDelivery = async () => {
    try {
      const payload = {
        productId: selectedProduct._id,
        supplierId: selectedSupplier._id,
        supplierPrice: parseFloat(supplierPrice),
        shopPrice: parseFloat(shopPrice),
        quantity: parseInt(quantity),
        totalCost: parseFloat(supplierPrice) * parseInt(quantity),
        addedAt: new Date()
      };
      await axios.post('http://localhost:3000/api/add-delivery', payload);
      alert("Delivery added!");

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
      alert("Failed to add delivery.");
    }
  };

  // const handleSetAsDelivered = async (deliveryId) => {
  //   try {
  //     await axios.post(`http://localhost:3000/api/set-as-delivered/${deliveryId}`);
  //     alert("Product moved to stock!");
  //     fetchDeliveries(); // Refresh the table
  //     setRefreshHistory(prev => !prev); // trigger re-fetch in DeliveryHistory
  //   } catch (error) {
  //     console.error("Failed to set as delivered:", error);
  //     alert("Failed to move product to stock.");
  //   }
  // };
  const handleSetAsDelivered = async (deliveryId) => {
    try {
      const response = await axios.post(`http://localhost:3000/api/set-as-delivered/${deliveryId}`);
      alert(response.data.message);
      fetchDeliveries(); // Refresh the table
      setRefreshHistory(prev => !prev); // trigger re-fetch in DeliveryHistory
    } catch (error) {
      console.error("Failed to set as delivered:", error);
      alert("Failed to move product to stock.");
    }
  };
  

  const handleRestockSuccess = () => {
    setShowRestockModal(false);
  };

  const deliveryColumns = [
    {
      title: 'Product Name',
      dataIndex: ['product', 'productName'],
      key: 'productName'
    },
    {
      title: 'Product ID',
      dataIndex: 'productID',
      key: 'productID'
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

  return (
    <div className={`flex flex-row-reverse max-md:flex-row w-full`}>
      <div className='flex flex-col flex-1 h-screen'>
        <Header toggleNav={toggleNav} />

        <div className='flex-1 overflow-auto mt-14 bg-[#EFEFEF] p-6 w-full'>
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

          <div className="">
            <Table
              dataSource={deliveries}
              rowKey="_id"
              columns={deliveryColumns}
              pagination={{ pageSize: 5 }}
              className="bg-white rounded-lg shadow"
            />
          </div>


          <div className='my-5'>
            <DeliveryHistory
              refresh={refreshHistory}
              setTotalDeliveredCost={setTotalDeliveredCost}
            />

          </div>

          {/* Modal for Add New / Restock */}
          {isModalOpen && (
            <div className="fixed inset-0 flex justify-center items-center z-50">
              <div className="bg-white p-6 rounded-lg w-full max-w-md border-[1px] border-gray-400">
                <h2 className="text-xl font-bold mb-4">Select Action</h2>
                <div className="flex gap-4 justify-center">
                  <button
                    onClick={() => {
                      setIsAddNewModalOpen(true);
                      setIsModalOpen(false);
                    }}
                    className="px-4 py-2 bg-blue-600 text-white rounded cursor-pointer">
                    Add New
                  </button>
                  <button
                    type="primary"
                    onClick={() => {
                      setShowRestockModal(true)
                      setIsModalOpen(false);
                    }}
                    className="px-4 py-2 bg-green-600 text-white rounded cursor-pointer">
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
            />
          )}

          <RestockModal
            visible={showRestockModal}
            onCancel={() => setShowRestockModal(false)}
            onRestockSuccess={handleRestockSuccess}
            refresh={fetchDeliveries()}
          />
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

export default AdminDelivery;