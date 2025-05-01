// import React, { useState, useEffect } from 'react';
// import { StaffNavBar, Header, MobileStaffNavbar } from "../layout";
// import { motion } from 'framer-motion';
// import { CustomButton, SupplierModal, ConfirmModal, UpdateSupplier } from '../../components';

// const StaffMaintenance = () => {
//   const [isNavCollapsed, setIsNavCollapsed] = useState(false);
//   const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
//   const [staffUsername, setStaffUsername] = useState("");
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [suppliers, setSuppliers] = useState([]);
//   const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
//   const [selectedSupplier, setSelectedSupplier] = useState(null);
//   const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
//   const [supplierToDelete, setSupplierToDelete] = useState(null);

//   const fetchSuppliers = async () => {
//     try {
//       const response = await fetch(`http://localhost:3000/api/suppliers`);
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

//   const updateSupplier = async (updatedData) => {
//     try {
//       const response = await fetch(`http://localhost:3000/api/update-supplier/${selectedSupplier._id}`, {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           ...updatedData,
//           houseStreet: updatedData.address, // mapping form's 'address' field back to 'houseStreet'
//         }),
//       });

//       if (response.ok) {
//         fetchSuppliers();  // Refresh the list after updating
//         setIsUpdateModalOpen(false); // Close modal
//       } else {
//         alert("Failed to update supplier.");
//       }
//     } catch (error) {
//       console.error("Error updating supplier:", error);
//       alert("An error occurred while updating the supplier.");
//     }
//   };


//   const deleteSupplier = async () => {
//     if (!supplierToDelete) return;
//     try {
//       const response = await fetch(`http://localhost:3000/api/delete-supplier/${supplierToDelete._id}`, {
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

//   const toggleNav = () => {
//     if (window.innerWidth <= 768) {
//       setIsMobileNavOpen(!isMobileNavOpen);
//     } else {
//       setIsNavCollapsed(!isNavCollapsed);
//     }
//   };

//   return (
//     <div className="flex flex-row-reverse max-md:flex-row w-full">
//       <div className="flex flex-col flex-1 h-screen">
//         <Header toggleNav={toggleNav} />
//         <MobileStaffNavbar isOpen={isMobileNavOpen} onClose={() => setIsMobileNavOpen(false)} />

//         <div className="w-full flex-1 overflow-auto mt-14 bg-gradient-to-br from-gray-100 to-gray-200 p-6">
//           <div className="w-11/12 lg:w-5/12 xl:w-1/3 max-md:w-full mb-2">
//             <CustomButton
//               nameButton="Add Supplier"
//               rounded="rounded-lg"
//               color="bg-black"
//               hoverButton="hover:bg-[#454545]"
//               onClick={() => setIsModalOpen(true)}
//             />
//           </div>
//           <div className="max-w-[100%] mx-auto">
//             <div className="mb-6 flex justify-between items-center">
//               <h1 className='text-3xl font-bold text-gray-800'>Suppliers</h1>

//             </div>

//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//               {suppliers.map((supplier, index) => (
//                 <motion.div
//                   key={supplier._id}
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ delay: index * 0.1 }}
//                   className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300"
//                 >
//                   <h2 className="text-xl font-semibold text-gray-800 mb-2">{supplier.name}</h2>
//                   <p><span className="font-medium">Contact:</span> {supplier.contactPerson}</p>
//                   <p><span className="font-medium">Email:</span> {supplier.email}</p>
//                   <p><span className="font-medium">Region:</span> {supplier.region}</p>
//                   <p><span className="font-medium">Address:</span> {supplier.houseStreet}</p>
//                   <p><span className="font-medium">Phone:</span> {supplier.phone}</p>

//                   <div className='flex justify-end gap-2 mt-4'>
//                     <CustomButton
//                       nameButton="Update"
//                       rounded="rounded-md"
//                       color="bg-blue-600"
//                       hoverButton="hover:bg-blue-700"
//                       onClick={() => {
//                         setSelectedSupplier(supplier);
//                         setIsUpdateModalOpen(true);
//                       }}
//                     />
//                     <CustomButton
//                       nameButton="Remove"
//                       rounded="rounded-md"
//                       color="bg-red-500"
//                       hoverButton="hover:bg-red-600"
//                       onClick={() => {
//                         setSupplierToDelete(supplier);
//                         setIsConfirmModalOpen(true);
//                       }}
//                     />
//                   </div>
//                 </motion.div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>

//       <nav className={`max-md:hidden ${isNavCollapsed ? "w-20" : "w-56"} transition-width duration-300`}>
//         <StaffNavBar
//           isNavCollapsed={isNavCollapsed}
//           setStaffUsername={setStaffUsername}
//         />
//       </nav>

//       <SupplierModal
//         isOpen={isModalOpen}
//         onClose={() => setIsModalOpen(false)}
//         refreshSuppliers={fetchSuppliers}
//         staffUsername={staffUsername}
//       />

//       <UpdateSupplier
//         isOpen={isUpdateModalOpen}
//         onClose={() => setIsUpdateModalOpen(false)}
//         supplier={selectedSupplier}
//         onUpdate={updateSupplier} 
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

// export default StaffMaintenance;

import React, { useState, useEffect } from 'react';
import { StaffNavBar, Header, MobileStaffNavbar } from "../layout";
import { motion } from 'framer-motion';
import { CustomButton, SupplierModal, ConfirmModal, UpdateSupplier } from '../../components';

const StaffMaintenance = () => {
  const [isNavCollapsed, setIsNavCollapsed] = useState(false);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [staffUsername, setStaffUsername] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [suppliers, setSuppliers] = useState([]);
  const [deliveries, setDeliveries] = useState([]);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [selectedSupplier, setSelectedSupplier] = useState(null);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [supplierToDelete, setSupplierToDelete] = useState(null);

  // Fetch suppliers and deliveries
  const fetchSuppliers = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/suppliers`);
      const data = await response.json();
      setSuppliers(data);
    } catch (error) {
      console.error('Error fetching suppliers:', error);
    }
  };

  const fetchDeliveries = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/deliveries`);
      const data = await response.json();
      setDeliveries(data);
    } catch (error) {
      console.error('Error fetching deliveries:', error);
    }
  };

  useEffect(() => {
    fetchSuppliers();
    fetchDeliveries();
  }, []);

  useEffect(() => {
    if (!isUpdateModalOpen) {
      fetchSuppliers();
    }
  }, [isUpdateModalOpen]);

  const updateSupplier = async (updatedData) => {
    try {
      const response = await fetch(`http://localhost:3000/api/update-supplier/${selectedSupplier._id}`, {
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
      const response = await fetch(`http://localhost:3000/api/delete-supplier/${supplierToDelete._id}`, {
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

  const toggleNav = () => {
    if (window.innerWidth <= 768) {
      setIsMobileNavOpen(!isMobileNavOpen);
    } else {
      setIsNavCollapsed(!isNavCollapsed);
    }
  };

  // Function to check if a supplierID exists in deliveries
  const isSupplierInDeliveries = (supplierID) => {
    return deliveries.some(delivery => delivery.supplier.supplierID === supplierID);
  };

  return (
    <div className="flex flex-row-reverse max-md:flex-row w-full">
      <div className="flex flex-col flex-1 h-screen">
        <Header toggleNav={toggleNav} />
        <MobileStaffNavbar isOpen={isMobileNavOpen} onClose={() => setIsMobileNavOpen(false)} />

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

      <nav className={`max-md:hidden ${isNavCollapsed ? "w-20" : "w-56"} transition-width duration-300`}>
        <StaffNavBar
          isNavCollapsed={isNavCollapsed}
          setStaffUsername={setStaffUsername}
        />
      </nav>

      <SupplierModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        refreshSuppliers={fetchSuppliers}
        staffUsername={staffUsername}
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

export default StaffMaintenance;
