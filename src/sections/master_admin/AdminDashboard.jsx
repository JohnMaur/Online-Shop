import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { NavigationBar, Header, MobileAdminNavbar } from "../layout"
import { DashboardCard } from '../../components';
import { account, staff, shipping, receiving, product, stock } from '../../assets/icons';

const AdminDashboard = () => {
  const [isNavCollapsed, setIsNavCollapsed] = useState(false);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalStaff, setTotalStaff] = useState(0);
  const [lowStockCount, setLowStockCount] = useState(0);
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalToReceive, setTotalToReceive] = useState(0);
  const [totalShipped, setTotalShipped] = useState(0);

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

  const toggleNav = () => {
    if (window.innerWidth <= 768) {
      setIsMobileNavOpen(!isMobileNavOpen);
    } else {
      setIsNavCollapsed(!isNavCollapsed);
    }
  };

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

  useEffect(() => {
    const fetchTotals = async () => {
      try {
        const shippingRes = await axios.get('http://localhost:3000/api/total-user-shipping');
        const toReceiveRes = await axios.get('http://localhost:3000/api/total-to-receive');
        const stocksRes = await axios.get('http://localhost:3000/api/total-stocks');
  
        setTotalShipped(shippingRes.data.totalShipping);
        setTotalToReceive(toReceiveRes.data.totalToReceive);
        setTotalProducts(stocksRes.data.totalStocks);
        setLowStockCount(stocksRes.data.lowStockCount);
      } catch (error) {
        console.error("Error fetching totals:", error);
      }
    };
  
    fetchTotals();
  }, []);

  return (
    <div className={`flex flex-row-reverse max-md:flex-row w-full`}>
      <div className='flex flex-col flex-1 h-screen'>
        <Header toggleNav={toggleNav} />
        <MobileAdminNavbar isOpen={isMobileNavOpen} onClose={() => setIsMobileNavOpen(false)} />

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
              icon={shipping}
              title="To ship"
              subtext="Total shipping"
              subtextResult={totalShipped}
              linkTo="/admin-to-ship"
            />
          </div>

          <div className='flex space-x-8 m-8 max-md:flex-col max-md:space-y-8'>
            <DashboardCard
              icon={receiving}
              title="To receive"
              subtext="Total receiving"
              subtextResult={totalToReceive}
              linkTo="/admin-to-receive"
            />
            <DashboardCard
              icon={product}
              title="Stocks"
              subtext="Total stocks"
              subtextResult={totalProducts}
              subtext1="Sold"
              linkTo="/admin-stock-maintenance"
            />
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

      <nav className={`max-md:hidden ${isNavCollapsed ? "w-20" : "w-56"} transition-width duration-300`}>
        <NavigationBar isNavCollapsed={isNavCollapsed} />
      </nav>
    </div>
  );
};

export default AdminDashboard;
