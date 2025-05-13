// import { NavItem } from "../../components";
// import { icon, searchIcon, dashboard, dashboardLight, logout, logoutLight, staff, staffLight, product, productLight, maintenance, lightMaintenance, accountInfo, accountInfoLight, supplier, supplierLight, stock, stockLight, staffList, staffListLight } from "../../assets/icons";

// const NavigationBar = ({ isNavCollapsed }) => {

//   return (
//     <nav className={`flex flex-wrap h-screen flex-col shadow-sm justify-between pb-2 max-sm:justify-normal text-black bg-white border-r-[1px] border-gray-200`}>
//       <div>
//         <div className="py-3 flex gap-2 mx-5 items-center">
//           <img
//             src={icon}
//             alt="icon"
//             width={42}
//             height={42}
//             className="object-contain"
//           />

//           {!isNavCollapsed && (
//             <div className="flex flex-col flex-wrap">
//               <p className="text-sm font-bold">Admin</p>
//             </div>
//           )}
//         </div>

//         <div className={`flex gap-1 p-2 mt-5 cursor-pointer rounded-lg w-fit mx-5 group bg-[#F5F5F5] placeholder-gray-900 hover:bg-[#EDEDED] group-hover:button-hover`}>
//           <img
//             src={searchIcon}
//             alt="Search Button"
//             width={18}
//             height={18}
//             className="object-contain ml-1"
//           />

//           {!isNavCollapsed && (
//             <input
//               type="text"
//               className={`text-sm py-1.5 w-28 ml-3 `}
//               placeholder="Search..."
//             />
//           )}
//         </div>

//         <div className="mt-5 h-[65vh] overflow-y-auto custom-scrollbar pr-1">
//           <NavItem
//             isNavCollapsed={isNavCollapsed}
//             icon={dashboard}
//             iconHovered={dashboardLight}
//             tooltipText="Dashboard"
//             link="/dashboard"
//           />
//           <NavItem
//             isNavCollapsed={isNavCollapsed}
//             icon={staff}
//             iconHovered={staffLight}
//             tooltipText="Staff"
//             link="/staff"
//           />
//           <NavItem
//             isNavCollapsed={isNavCollapsed}
//             icon={staff}
//             iconHovered={staffLight}
//             tooltipText="To Ship"
//             link="/admin-to-ship"
//           />
//           <NavItem
//             isNavCollapsed={isNavCollapsed}
//             icon={staff}
//             iconHovered={staffLight}
//             tooltipText="To Receive"
//             link="/admin-to-receive"
//           />
//           <NavItem
//             isNavCollapsed={isNavCollapsed}
//             icon={staff}
//             iconHovered={staffLight}
//             tooltipText="Order Received"
//             link="/admin-order-received"
//           />
//           <NavItem
//             isNavCollapsed={isNavCollapsed}
//             icon={staff}
//             iconHovered={staffLight}
//             tooltipText="Order Canceled"
//             link="/admin-order-canceled"
//           />
//           <NavItem
//             isNavCollapsed={isNavCollapsed}
//             icon={staff}
//             iconHovered={staffLight}
//             tooltipText="Order Transaction"
//             link="/admin-order-transaction"
//           />
//           <NavItem
//             isNavCollapsed={isNavCollapsed}
//             icon={maintenance}
//             iconHovered={lightMaintenance}
//             tooltipText="Category Maintenance"
//             link="/product_maintenance"
//           />
//           <NavItem
//             isNavCollapsed={isNavCollapsed}
//             icon={product}
//             iconHovered={productLight}
//             tooltipText="Product"
//             link="/product"
//           />
//            <NavItem
//             isNavCollapsed={isNavCollapsed}
//             icon={product}
//             iconHovered={productLight}
//             tooltipText="Delivery Maintenance"
//             link="/admin-delevery-maintenance"
//           />
//           <NavItem
//             isNavCollapsed={isNavCollapsed}
//             icon={stock}
//             iconHovered={stockLight}
//             tooltipText="Stock Maintenance"
//             link="/admin-stock-maintenance"
//           />
//           <NavItem
//             isNavCollapsed={isNavCollapsed}
//             icon={supplier}
//             iconHovered={supplierLight}
//             tooltipText="Supplier Maintenance"
//             link="/admin-supplier-maintenance"
//           />
//           <NavItem
//             isNavCollapsed={isNavCollapsed}
//             icon={accountInfo}
//             iconHovered={accountInfoLight}
//             tooltipText="User List"
//             link="/user-list"
//           />
//           <NavItem
//             isNavCollapsed={isNavCollapsed}
//             icon={staffList}
//             iconHovered={staffListLight}
//             tooltipText="Staff List"
//             link="/staff-list"
//           />
//           <NavItem
//             isNavCollapsed={isNavCollapsed}
//             icon={staffList}
//             iconHovered={staffListLight}
//             tooltipText="Audit Trail"
//             link="/audit-trail"
//           />
//         </div>
//       </div>

//       <div>
//         <NavItem
//           isNavCollapsed={isNavCollapsed}
//           icon={logout}
//           iconHovered={logoutLight}
//           tooltipText="Logout"
//           link="#"
//         />
//       </div>
//     </nav>
//   );
// };

// export default NavigationBar;
 
import React, { useState } from 'react';
import { StaffNavItem } from "../../components";
import { icon, searchIcon, dashboard, dashboardLight, logout, logoutLight, staff, staffLight, product, productLight, maintenance, lightMaintenance, accountInfo, accountInfoLight, supplier, supplierLight, stock, stockLight, staffList, staffListLight } from "../../assets/icons";
import { FaTachometerAlt, FaUserTie, FaShippingFast, FaBoxOpen, FaClipboardList, FaTools, FaBox, FaWarehouse, FaUsers, FaUserFriends, FaHistory, FaSignOutAlt, FaPercentage } from "react-icons/fa";
import { useUser } from "../../(auth)/UserContext";
import { useNavigate } from "react-router-dom";

const NavigationBar = ({ isNavCollapsed, onSearch }) => {
  const { adminLogout } = useUser();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchInput = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch(value); // Propagate search to parent
  };

  const handleLogout = () => {
    adminLogout(); // Call logout function from context
    navigate("/admin"); // Redirect to login page
  };

  return (
    <nav className={`flex flex-wrap h-screen flex-col shadow-sm justify-between pb-2 max-sm:justify-normal text-black bg-white border-r-[1px] border-gray-200`}>
      <div>
        <div className="py-3 flex gap-2 mx-5 items-center">
          <img
            src={icon}
            alt="icon"
            width={42}
            height={42}
            className="object-contain"
          />

          {!isNavCollapsed && (
            <div className="flex flex-col flex-wrap">
              <p className="text-sm font-bold">Admin</p>
            </div>
          )}
        </div>

        <div className={`flex gap-1 p-2 mt-5 cursor-pointer rounded-lg w-fit mx-5 group bg-[#F5F5F5] placeholder-gray-900 hover:bg-[#EDEDED] group-hover:button-hover`}>
          <img
            src={searchIcon}
            alt="Search Button"
            width={18}
            height={18}
            className="object-contain ml-1"
          />

          {!isNavCollapsed && (
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearchInput}
              className={`text-sm py-1.5 w-28 ml-3`}
              placeholder="Search..."
            />
          )}
        </div>

        <div className="mt-5 h-[65vh] overflow-y-auto custom-scrollbar pr-1">
          <StaffNavItem isNavCollapsed={isNavCollapsed} icon={<FaTachometerAlt />} iconHovered={<FaTachometerAlt />} tooltipText="Dashboard" link="/dashboard" />
          <StaffNavItem isNavCollapsed={isNavCollapsed} icon={<FaUserTie />} iconHovered={<FaUserTie />} tooltipText="Staff" link="/staff" />
          <StaffNavItem isNavCollapsed={isNavCollapsed} icon={<FaShippingFast />} iconHovered={<FaShippingFast />} tooltipText="Order Transaction" link="/admin-order-transac" />
          {/* <StaffNavItem isNavCollapsed={isNavCollapsed} icon={<FaShippingFast />} iconHovered={<FaShippingFast />} tooltipText="To Ship" link="/admin-to-ship" />
          <StaffNavItem isNavCollapsed={isNavCollapsed} icon={<FaBoxOpen />} iconHovered={<FaBoxOpen />} tooltipText="To Receive" link="/admin-to-receive" />
          <StaffNavItem isNavCollapsed={isNavCollapsed} icon={<FaClipboardList />} iconHovered={<FaClipboardList />} tooltipText="Order Received" link="/admin-order-received" />
          <StaffNavItem isNavCollapsed={isNavCollapsed} icon={<FaClipboardList />} iconHovered={<FaClipboardList />} tooltipText="Order Canceled" link="/admin-order-canceled" /> */}
          <StaffNavItem isNavCollapsed={isNavCollapsed} icon={<FaClipboardList />} iconHovered={<FaClipboardList />} tooltipText="Order Transaction" link="/admin-order-transaction" />
          <StaffNavItem isNavCollapsed={isNavCollapsed} icon={<FaTools />} iconHovered={<FaTools />} tooltipText="Category Maintenance" link="/product_maintenance" />
          <StaffNavItem isNavCollapsed={isNavCollapsed} icon={<FaBox />} iconHovered={<FaBox />} tooltipText="Product" link="/product" />
          <StaffNavItem isNavCollapsed={isNavCollapsed} icon={<FaBox />} iconHovered={<FaBox />} tooltipText="Delivery Maintenance" link="/admin-delevery-maintenance" />
          <StaffNavItem isNavCollapsed={isNavCollapsed} icon={<FaWarehouse />} iconHovered={<FaWarehouse />} tooltipText="Stock Maintenance" link="/admin-stock-maintenance" />
          <StaffNavItem isNavCollapsed={isNavCollapsed} icon={<FaUsers />} iconHovered={<FaUsers />} tooltipText="Supplier Maintenance" link="/admin-supplier-maintenance" />
          <StaffNavItem isNavCollapsed={isNavCollapsed} icon={<FaUserFriends />} iconHovered={<FaUserFriends />} tooltipText="User List" link="/user-list" />
          <StaffNavItem isNavCollapsed={isNavCollapsed} icon={<FaUserTie />} iconHovered={<FaUserTie />} tooltipText="Staff List" link="/staff-list" />
          <StaffNavItem
            isNavCollapsed={isNavCollapsed}
            icon={<FaPercentage />}
            iconHovered={<FaPercentage />}
            tooltipText="VAT"
            link="/admin-vat"
          />
          <StaffNavItem isNavCollapsed={isNavCollapsed} icon={<FaHistory />} iconHovered={<FaHistory />} tooltipText="Audit Trail" link="/audit-trail" />
        </div>
      </div>

      <div>
        <StaffNavItem isNavCollapsed={isNavCollapsed} icon={<FaSignOutAlt />} iconHovered={<FaSignOutAlt />} tooltipText="Logout" onClick={handleLogout} />
      </div>
    </nav>
  );
};

export default NavigationBar;
