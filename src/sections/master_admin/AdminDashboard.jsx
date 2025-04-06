import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { NavigationBar, Header } from "../layout"
import { DashboardCard } from '../../components';
import { account, staff, product, stock } from '../../assets/icons';

const AdminDashboard = () => {
  const [isNavCollapsed, setIsNavCollapsed] = useState(false);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalStaff, setTotalStaff] = useState(0);
  const [lowStockCount, setLowStockCount] = useState(0);
  const [totalProducts, setTotalProducts] = useState(0);

  // Fetch total users when component mounts
  useEffect(() => {
    const fetchTotalUsers = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/total-users');
        setTotalUsers(response.data.totalUsers);
      } catch (error) {
        console.error('Error fetching total users:', error);
      }
    };

    fetchTotalUsers();
  }, []);

  // Fetch total staff when component mounts
  useEffect(() => {
    const fetchTotalStaff = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/total-staff');
        setTotalStaff(response.data.totalUsers); // ✅ Correct: Updates totalStaff
      } catch (error) {
        console.error('Error fetching total staff:', error);
      }
    };

    fetchTotalStaff();
  }, []);

   // Fetch total products
   useEffect(() => {
    const fetchTotalProducts = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/products');
        setTotalProducts(response.data.length);  // Set the total number of products
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchTotalProducts();
  }, []);

  // Fetch all products and calculate low stock count
  useEffect(() => {
    const fetchLowStockCount = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/adminStockProducts');
        const products = response.data;

        // Filter products with quantity less than 10 (you can adjust the threshold)
        const lowStockProducts = products.filter(product => product.quantity < 10);
        
        // Set the low stock count
        setLowStockCount(lowStockProducts.length);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchLowStockCount();
  }, []);

  const toggleNav = () => {
    setIsNavCollapsed(!isNavCollapsed);
  };

  return (
    <div className={`flex flex-row-reverse max-md:flex-row w-full`}>
      <div className='flex flex-col flex-1 h-screen'>
        <Header toggleNav={toggleNav} />

        <div className={`flex-1 overflow-auto mt-14 bg-[#EFEFEF]`}>
          {/* Dashboard Cards */}
          <div className='flex space-x-8 m-8 max-md:flex-col max-md:space-y-8'>
            <DashboardCard
              icon={account}
              title="User"
              subtext="Total user"
              subtextResult={totalUsers}
              subtext1="Active user"
              linkTo="/user-list"
            />
            <DashboardCard
              icon={staff}
              title="Staff"
              subtext="Total staff"
              subtextResult={totalStaff}
              subtext1="Active staff"
              linkTo="/staff-list"
            />
            <DashboardCard
              icon={product}
              title="Product"
              subtext="Total product"
              subtextResult={totalProducts}
              subtext1="Sold"
              linkTo="/product"
            />
          </div>

          <div className='flex space-x-8 m-8 max-md:flex-col max-md:space-y-8'>
            <div className='w-1/3 pr-6'>
              <DashboardCard
                icon={stock}
                title="Low Stock"
                subtext="Total low stock"
                subtextResult={lowStockCount}
                linkTo="/admin-stock-maintenance"
              />
            </div>
          </div>
        </div>
      </div>

      <nav className={`max-md:hidden ${isNavCollapsed ? "w-20" : "w-56"} transition-width duration-300`}>
        <NavigationBar isNavCollapsed={isNavCollapsed} />
      </nav>
    </div>
  );
};

export default AdminDashboard;
