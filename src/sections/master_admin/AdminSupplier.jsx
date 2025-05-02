// import React, { useState, useEffect } from 'react';
// import { NavigationBar, Header, MobileAdminNavbar } from "../layout";
// import { CustomButton, ConfirmModal, UpdateSupplier, AdminAddingSupplier } from '../../components';

// const AdminSupplier = () => {
//   const [isNavCollapsed, setIsNavCollapsed] = useState(false);
//   const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [suppliers, setSuppliers] = useState([]);
//   const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
//   const [selectedSupplier, setSelectedSupplier] = useState(null);
//   const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
//   const [supplierToDelete, setSupplierToDelete] = useState(null);

//   const toggleNav = () => {
//     if (window.innerWidth <= 768) {
//       setIsMobileNavOpen(!isMobileNavOpen);
//     } else {
//       setIsNavCollapsed(!isNavCollapsed);
//     }
//   };

//   const fetchSuppliers = async () => {
//     try {
//       const response = await fetch(`https://online-shop-server-1.onrender.com/api/suppliers`);
//       const data = await response.json();
//       setSuppliers(data);
//     } catch (error) {
//       console.error('Error fetching suppliers:', error);
//     }
//   };

//   useEffect(() => {
//     fetchSuppliers();
//   }, []);

//   useEffect(() => {
//     if (!isUpdateModalOpen) {
//       fetchSuppliers();
//     }
//   }, [isUpdateModalOpen]);

//   const deleteSupplier = async () => {
//     if (!supplierToDelete) return;
//     try {
//       const response = await fetch(`https://online-shop-server-1.onrender.com/api/delete-supplier/${supplierToDelete._id}`, {
//         method: "DELETE",
//       });
//       if (response.ok) {
//         fetchSuppliers();
//       } else {
//         alert("Failed to delete supplier.");
//       }
//     } catch (error) {
//       console.error("Error deleting supplier:", error);
//       alert("An error occurred while deleting the supplier.");
//     }
//     setIsConfirmModalOpen(false);
//     setSupplierToDelete(null);
//   };

//   return (
//     <div className="flex flex-row-reverse max-md:flex-row w-full">
//       <div className="flex flex-col flex-1 h-screen">
//         <Header toggleNav={toggleNav} />
//         <MobileAdminNavbar isOpen={isMobileNavOpen} onClose={() => setIsMobileNavOpen(false)} />
//         <div className="w-full flex-1 overflow-auto mt-14 bg-[#EFEFEF]">
//           <div className="w-11/12 lg:w-5/12 xl:w-1/3 m-4">
//             <CustomButton
//               nameButton="Add Supplier"
//               rounded="rounded-lg"
//               color="bg-black"
//               hoverButton="hover:bg-[#454545]"
//               onClick={() => setIsModalOpen(true)}
//             />
//           </div>

//           <h1 className='text-2xl font-bold bg-gray-50 py-2 text-center mt-5'>Supplier</h1>

//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
//             {suppliers.map((supplier) => (
//               <a key={supplier._id} className="bg-white shadow-md p-4 rounded-lg cursor-pointer">
//                 <p className="font-semibold">Supplier Name: {supplier.name}</p>
//                 <p>Contact Person: {supplier.contactPerson}</p>
//                 <p>Email: {supplier.email}</p>
//                 <p>Region/City/District: {supplier.region}</p>
//                 <p>House No./Street: {supplier.houseStreet}</p>
//                 <p>Phone Number: {supplier.phone}</p>
//                 <div className='flex justify-end space-x-2'>
//                   <div className='w-28'>
//                     <CustomButton
//                       nameButton="Update"
//                       rounded="rounded-lg"
//                       color="bg-black"
//                       hoverButton="hover:bg-[#454545]"
//                       onClick={() => {
//                         setSelectedSupplier(supplier);
//                         setIsUpdateModalOpen(true);
//                       }}
//                     />
//                   </div>
//                   <div className='w-28'>
//                     <CustomButton
//                       nameButton="Remove"
//                       rounded="rounded-lg"
//                       color="bg-[#656565]"
//                       hoverButton="hover:bg-[#767676]"
//                       onClick={() => {
//                         setSupplierToDelete(supplier);
//                         setIsConfirmModalOpen(true);
//                       }}
//                     />
//                   </div>
//                 </div>
//               </a>
//             ))}
//           </div>
//         </div>
//       </div>

//       <nav className={`max-md:hidden ${isNavCollapsed ? "w-20" : "w-56"} transition-width duration-300`}>
//         <NavigationBar
//           isNavCollapsed={isNavCollapsed}
//         />
//       </nav>

//       <AdminAddingSupplier
//         isOpen={isModalOpen}
//         onClose={() => setIsModalOpen(false)}
//         refreshSuppliers={fetchSuppliers}
//       />

//       <UpdateSupplier
//         isOpen={isUpdateModalOpen}
//         onClose={() => setIsUpdateModalOpen(false)}
//         supplier={selectedSupplier}
//         refreshSuppliers={fetchSuppliers}
//       />

//       <ConfirmModal
//         isOpen={isConfirmModalOpen}
//         onClose={() => setIsConfirmModalOpen(false)}
//         onConfirm={deleteSupplier}
//         message="Are you sure you want to remove this supplier?"
//       />
//     </div>
//   );
// };

// export default AdminSupplier;
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { NavigationBar, Header, MobileAdminNavbar } from "../layout";
import {
  CustomButton,
  ConfirmModal,
  UpdateSupplier,
  AdminAddingSupplier
} from '../../components';

const AdminSupplier = () => {
  const [isNavCollapsed, setIsNavCollapsed] = useState(false);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [suppliers, setSuppliers] = useState([]);
  const [deliveries, setDeliveries] = useState([]);  // Add state for deliveries
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [selectedSupplier, setSelectedSupplier] = useState(null);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [supplierToDelete, setSupplierToDelete] = useState(null);

  const toggleNav = () => {
    if (window.innerWidth <= 768) {
      setIsMobileNavOpen(!isMobileNavOpen);
    } else {
      setIsNavCollapsed(!isNavCollapsed);
    }
  };

  // Fetch suppliers and deliveries
  const fetchSuppliers = async () => {
    try {
      const supplierResponse = await fetch(`https://online-shop-server-1.onrender.com/api/suppliers`);
      const supplierData = await supplierResponse.json();
      setSuppliers(supplierData);

      const deliveryResponse = await fetch(`https://online-shop-server-1.onrender.com/api/deliveries`);
      const deliveryData = await deliveryResponse.json();
      setDeliveries(deliveryData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchSuppliers();
  }, []);

  useEffect(() => {
    if (!isUpdateModalOpen) {
      fetchSuppliers();
    }
  }, [isUpdateModalOpen]);

  const updateSupplier = async (updatedData) => {
    try {
      const response = await fetch(`https://online-shop-server-1.onrender.com/api/update-supplier/${selectedSupplier._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...updatedData,
          houseStreet: updatedData.address, // mapping form's 'address' field back to 'houseStreet'
        }),
      });

      if (response.ok) {
        fetchSuppliers();  // Refresh the list after updating
        setIsUpdateModalOpen(false); // Close modal
      } else {
        alert("Failed to update supplier.");
      }
    } catch (error) {
      console.error("Error updating supplier:", error);
      alert("An error occurred while updating the supplier.");
    }
  };

  const deleteSupplier = async () => {
    if (!supplierToDelete) return;
    try {
      const response = await fetch(`https://online-shop-server-1.onrender.com/api/delete-supplier/${supplierToDelete._id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        fetchSuppliers();
      } else {
        alert("Failed to delete supplier.");
      }
    } catch (error) {
      console.error("Error deleting supplier:", error);
      alert("An error occurred while deleting the supplier.");
    }
    setIsConfirmModalOpen(false);
    setSupplierToDelete(null);
  };

  // Check if the supplier exists in deliveries
  const isSupplierInDeliveries = (supplierID) => {
    return deliveries.some(delivery => delivery.supplier.supplierID === supplierID);
  };

  return (
    <div className="flex flex-row-reverse max-md:flex-row w-full">
      <div className="flex flex-col flex-1 h-screen">
        <Header toggleNav={toggleNav} />
        <MobileAdminNavbar isOpen={isMobileNavOpen} onClose={() => setIsMobileNavOpen(false)} />

        <div className="w-full flex-1 overflow-auto mt-14 bg-gradient-to-br from-gray-100 to-gray-200 p-6">
          <div className="w-11/12 lg:w-5/12 xl:w-1/3 max-md:w-full mb-2">
            <CustomButton
              nameButton="Add Supplier"
              rounded="rounded-lg"
              color="bg-black"
              hoverButton="hover:bg-[#454545]"
              onClick={() => setIsModalOpen(true)}
            />
          </div>
          <div className="max-w-[100%] mx-auto">
            <div className="mb-6 flex justify-between items-center">
              <h1 className='text-3xl font-bold text-gray-800'>Suppliers</h1>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {suppliers.map((supplier, index) => (
                <motion.div
                  key={supplier._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300"
                >
                  <h2 className="text-xl font-semibold text-gray-800 mb-2">{supplier.name}</h2>
                  <p><span className="font-medium">Contact:</span> {supplier.contactPerson}</p>
                  <p><span className="font-medium">Email:</span> {supplier.email}</p>
                  <p><span className="font-medium">Region:</span> {supplier.region}</p>
                  <p><span className="font-medium">Address:</span> {supplier.houseStreet}</p>
                  <p><span className="font-medium">Phone:</span> {supplier.phone}</p>

                  <div className='flex justify-end gap-2 mt-4'>
                    <CustomButton
                      nameButton="Update"
                      rounded="rounded-md"
                      color="bg-blue-600"
                      hoverButton="hover:bg-blue-700"
                      onClick={() => {
                        setSelectedSupplier(supplier);
                        setIsUpdateModalOpen(true);
                      }}
                    />
                    {!isSupplierInDeliveries(supplier.supplierID) && (
                      <CustomButton
                        nameButton="Remove"
                        rounded="rounded-md"
                        color="bg-red-500"
                        hoverButton="hover:bg-red-600"
                        onClick={() => {
                          setSupplierToDelete(supplier);
                          setIsConfirmModalOpen(true);
                        }}
                      />
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <nav className={`max-md:hidden ${isNavCollapsed ? "w-20" : "w-56"} transition-all duration-300`}>
        <NavigationBar isNavCollapsed={isNavCollapsed} />
      </nav>

      <AdminAddingSupplier
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        refreshSuppliers={fetchSuppliers}
      />

      <UpdateSupplier
        isOpen={isUpdateModalOpen}
        onClose={() => setIsUpdateModalOpen(false)}
        supplier={selectedSupplier}
        onUpdate={updateSupplier} 
        refreshSuppliers={fetchSuppliers}
      />

      <ConfirmModal
        isOpen={isConfirmModalOpen}
        onClose={() => setIsConfirmModalOpen(false)}
        onConfirm={deleteSupplier}
        message="Are you sure you want to remove this supplier?"
      />
    </div>
  );
};

export default AdminSupplier;
