import React, { useState, useEffect } from 'react';
import { NavigationBar, Header } from "../layout";
import { CustomButton, ConfirmModal, UpdateSupplier, AdminAddingSupplier } from '../../components';

const AdminSupplier = () => {
  const [isNavCollapsed, setIsNavCollapsed] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [suppliers, setSuppliers] = useState([]);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [selectedSupplier, setSelectedSupplier] = useState(null);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [supplierToDelete, setSupplierToDelete] = useState(null);

  const fetchSuppliers = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/suppliers`);
      const data = await response.json();
      setSuppliers(data);
    } catch (error) {
      console.error('Error fetching suppliers:', error);
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

  return (
    <div className="flex flex-row-reverse max-md:flex-row w-full">
      <div className="flex flex-col flex-1 h-screen">
        <Header toggleNav={() => setIsNavCollapsed(!isNavCollapsed)} />
        <div className="w-full flex-1 overflow-auto mt-14 bg-[#EFEFEF]">
          <div className="w-11/12 lg:w-5/12 xl:w-1/3 m-4">
            <CustomButton
              nameButton="Add Supplier"
              rounded="rounded-lg"
              color="bg-black"
              hoverButton="hover:bg-[#454545]"
              onClick={() => setIsModalOpen(true)}
            />
          </div>

          <h1 className='text-2xl font-bold bg-gray-50 py-2 text-center mt-5'>Supplier</h1>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
            {suppliers.map((supplier) => (
              <a key={supplier._id} className="bg-white shadow-md p-4 rounded-lg cursor-pointer">
                <p className="font-semibold">Supplier Name: {supplier.name}</p>
                <p>Contact Person: {supplier.contactPerson}</p>
                <p>Email: {supplier.email}</p>
                <p>Region/City/District: {supplier.region}</p>
                <p>House No./Street: {supplier.houseStreet}</p>
                <p>Phone Number: {supplier.phone}</p>
                <div className='flex justify-end space-x-2'>
                  <div className='w-28'>
                    <CustomButton
                      nameButton="Update"
                      rounded="rounded-lg"
                      color="bg-black"
                      hoverButton="hover:bg-[#454545]"
                      onClick={() => {
                        setSelectedSupplier(supplier);
                        setIsUpdateModalOpen(true);
                      }}
                    />
                  </div>
                  <div className='w-28'>
                    <CustomButton
                      nameButton="Remove"
                      rounded="rounded-lg"
                      color="bg-[#656565]"
                      hoverButton="hover:bg-[#767676]"
                      onClick={() => {
                        setSupplierToDelete(supplier);
                        setIsConfirmModalOpen(true);
                      }}
                    />
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>

      <nav className={`max-md:hidden ${isNavCollapsed ? "w-20" : "w-56"} transition-width duration-300`}>
        <NavigationBar
          isNavCollapsed={isNavCollapsed}
        />
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
