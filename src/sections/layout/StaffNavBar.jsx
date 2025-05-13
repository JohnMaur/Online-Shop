// import { useEffect, useState } from "react";
// import { NavItem } from "../../components";
// import { useNavigate } from "react-router-dom";
// import { icon, searchIcon, dashboard, dashboardLight, logout, logoutLight, product, productLight, receiving, receivingLight, shipping, shippingLight, accountInfo, accountInfoLight, maintenance, lightMaintenance, supplier, supplierLight, stock, stockLight } from "../../assets/icons";
// import { useUser } from "../../(auth)/UserContext";

// const StaffNavBar = ({ isNavCollapsed, setStaffUsername }) => {
//   const { staffLogout } = useUser(); // Get logout function from context
//   const navigate = useNavigate(); // Hook for navigation
//   const [username, setUsername] = useState("");

//   // Load username and fetch account info if available
//   useEffect(() => {
//     const staff = JSON.parse(localStorage.getItem("staff"));
//     if (staff && staff.username) {
//       setUsername(staff.username);
//       setStaffUsername(staff.username);
//     }
//   }, []);

//   const handleLogout = () => {
//     staffLogout(); // Call logout function from context
//     navigate("/login-staff"); // Redirect to login page
//   };
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
//               <p className="text-sm font-bold">Staff</p>
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
//             link="/staff-dashboard"
//           />
//           <NavItem
//             isNavCollapsed={isNavCollapsed}
//             icon={shipping}
//             iconHovered={shippingLight}
//             tooltipText="To ship"
//             link="/staff-shipping"
//           />
//           <NavItem
//             isNavCollapsed={isNavCollapsed}
//             icon={receiving}
//             iconHovered={receivingLight}
//             tooltipText="To receive"
//             link="/staff-receiving"
//           />
//           <NavItem
//             isNavCollapsed={isNavCollapsed}
//             icon={receiving}
//             iconHovered={receivingLight}
//             tooltipText="Order Received"
//             link="/staff-order-received"
//           />
//           <NavItem
//             isNavCollapsed={isNavCollapsed}
//             icon={receiving}
//             iconHovered={receivingLight}
//             tooltipText="Canceled Received"
//             link="/staff-canceled-order"
//           />
//           <NavItem
//             isNavCollapsed={isNavCollapsed}
//             icon={supplier}
//             iconHovered={supplierLight}
//             tooltipText="Order Transaction"
//             link="/order-transaction"
//           />
//           <NavItem
//             isNavCollapsed={isNavCollapsed}
//             icon={maintenance}
//             iconHovered={lightMaintenance}
//             tooltipText="Category Maintenance"
//             link="/product-maintenance"
//             setStaffUsername={username}
//           />
//           <NavItem
//             isNavCollapsed={isNavCollapsed}
//             icon={product}
//             iconHovered={productLight}
//             tooltipText="Product"
//             link="/staff-product"
//           />
//           <NavItem
//             isNavCollapsed={isNavCollapsed}
//             icon={product}
//             iconHovered={productLight}
//             tooltipText="Delivery Maintenance"
//             link="/delevery-maintenance"
//           />

//           <NavItem
//             isNavCollapsed={isNavCollapsed}
//             icon={stock}
//             iconHovered={stockLight}
//             tooltipText="Stock Maintenance"
//             link="/stock-maintenance"
//             setStaffUsername={username}
//           />

//           <NavItem
//             isNavCollapsed={isNavCollapsed}
//             icon={supplier}
//             iconHovered={supplierLight}
//             tooltipText="Supplier Maintenance"
//             link="/supplier-maintenance"
//           />
//           <NavItem
//             isNavCollapsed={isNavCollapsed}
//             icon={accountInfo}
//             iconHovered={accountInfoLight}
//             tooltipText="Staff Info"
//             link="/staff-info"
//           />
//         </div>
//       </div>

//       <div>
//         <NavItem
//           isNavCollapsed={isNavCollapsed}
//           icon={logout}
//           iconHovered={logoutLight}
//           tooltipText="Logout"
//           onClick={handleLogout}
//         />
//       </div>
//     </nav>
//   );
// };

// export default StaffNavBar;

import React, { useEffect, useState } from "react";
import { StaffNavItem } from "../../components";
import { useNavigate } from "react-router-dom";
import { FaTachometerAlt, FaShippingFast, FaBoxOpen, FaUsersCog, FaTools, FaSignOutAlt, FaBox, FaWarehouse, FaCogs, FaPeopleCarry, FaTruck } from "react-icons/fa"; // Importing icons from react-icons/fa
import { icon, searchIcon, dashboard, dashboardLight, logout, logoutLight, product, productLight, receiving, receivingLight, shipping, shippingLight, accountInfo, accountInfoLight, maintenance, lightMaintenance, supplier, supplierLight, stock, stockLight } from "../../assets/icons";
import { useUser } from "../../(auth)/UserContext";
 
const StaffNavBar = ({ isNavCollapsed, setStaffUsername, onSearch, responsiveLink }) => {
  const { staffLogout } = useUser(); // Get logout function from context
  const navigate = useNavigate(); // Hook for navigation
  const [username, setUsername] = useState("");
  const [searchTerm, setSearchTerm] = useState('');

  // Load username and fetch account info if available
  useEffect(() => {
    const staff = JSON.parse(localStorage.getItem("staff"));
    if (staff && staff.username) {
      setUsername(staff.username);
      setStaffUsername(staff.username);
    }
  }, []);

  const handleSearchInput = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch(value); // Propagate search to parent
  };

  const handleLogout = () => {
    staffLogout(); // Call logout function from context
    navigate("/login-staff"); // Redirect to login page
  };

  return (
    <nav className="flex flex-wrap h-screen flex-col shadow-sm justify-between pb-2 max-sm:justify-normal text-black bg-white border-r-[1px] border-gray-200">
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
              <p className="text-sm font-bold">Staff</p>
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

        {/* <div className="mt-5 h-[65vh] overflow-y-auto custom-scrollbar pr-1"> */}
        <div className="mt-5 pr-1">
          <StaffNavItem
            isNavCollapsed={isNavCollapsed}
            icon={<FaTachometerAlt />}
            iconHovered={<FaTachometerAlt />}
            tooltipText="Dashboard"
            link="/staff-dashboard"
          />
          <StaffNavItem
            isNavCollapsed={isNavCollapsed}
            icon={<FaShippingFast />}
            iconHovered={<FaShippingFast />}
            tooltipText="Order Transaction"
            link="/staff-order-transaction"
          />
          {/* <StaffNavItem
            isNavCollapsed={isNavCollapsed}
            icon={<FaShippingFast />}
            iconHovered={<FaShippingFast />}
            tooltipText="To Ship"
            link="/staff-shipping"
          />
          <StaffNavItem
            isNavCollapsed={isNavCollapsed}
            icon={<FaBoxOpen />}
            iconHovered={<FaBoxOpen />}
            tooltipText="To Receive"
            link="/staff-receiving"
          />
          <StaffNavItem
            isNavCollapsed={isNavCollapsed}
            icon={<FaBox />}
            iconHovered={<FaBox />}
            tooltipText="Order Received"
            link="/staff-order-received"
          />
          <StaffNavItem
            isNavCollapsed={isNavCollapsed}
            icon={<FaWarehouse />}
            iconHovered={<FaWarehouse />}
            tooltipText="Canceled Received"
            link="/staff-canceled-order"
          /> */}
          <StaffNavItem
            isNavCollapsed={isNavCollapsed}
            icon={<FaCogs />}
            iconHovered={<FaCogs />}
            tooltipText="Transaction Reports  "
            link="/order-transaction"
          />
          <StaffNavItem
            isNavCollapsed={isNavCollapsed}
            icon={<FaTools />}
            iconHovered={<FaTools />}
            tooltipText="Category Maintenance"
            link="/product-maintenance"
            setStaffUsername={username}
          />
          <StaffNavItem
            isNavCollapsed={isNavCollapsed}
            icon={<FaPeopleCarry />}
            iconHovered={<FaPeopleCarry />}
            tooltipText="Product"
            link="/staff-product"
          />
          <StaffNavItem
            isNavCollapsed={isNavCollapsed}
            icon={<FaTruck />}
            iconHovered={<FaTruck />}
            tooltipText="Delivery Maintenance"
            link="/delevery-maintenance"
          />
          <StaffNavItem
            isNavCollapsed={isNavCollapsed}
            icon={<FaWarehouse />}
            iconHovered={<FaWarehouse />}
            tooltipText="Stock Maintenance"
            link={!responsiveLink ? "/stock-maintenance" : responsiveLink}
            setStaffUsername={username}
          />
          <StaffNavItem
            isNavCollapsed={isNavCollapsed}
            icon={<FaUsersCog />}
            iconHovered={<FaUsersCog />}
            tooltipText="Supplier Maintenance"
            link="/supplier-maintenance"
          />
          <StaffNavItem
            isNavCollapsed={isNavCollapsed}
            icon={<FaUsersCog />}
            iconHovered={<FaUsersCog />}
            tooltipText="Staff Info"
            link="/staff-info"
          />
        </div>
      </div>

      <div>
        <StaffNavItem
          isNavCollapsed={isNavCollapsed}
          icon={<FaSignOutAlt />}
          iconHovered={<FaSignOutAlt />}
          tooltipText="Logout"
          onClick={handleLogout}
        />
      </div>
    </nav>
  ); 
};

export default StaffNavBar;
