import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  FaTachometerAlt, FaShippingFast, FaBoxOpen, FaUsersCog, FaTools,
  FaSignOutAlt, FaBox, FaWarehouse, FaCogs, FaPeopleCarry, FaTruck
} from "react-icons/fa";
import { useUser } from "../../(auth)/UserContext";

const navItems = [
  { label: 'Dashboard', to: '/staff-dashboard', icon: <FaTachometerAlt /> },
  { label: 'To Ship', to: '/staff-shipping', icon: <FaShippingFast /> },
  { label: 'To Receive', to: '/staff-receiving', icon: <FaBoxOpen /> },
  { label: 'Order Received', to: '/staff-order-received', icon: <FaBox /> },
  { label: 'Canceled Received', to: '/staff-canceled-order', icon: <FaWarehouse /> },
  { label: 'Order Transaction', to: '/order-transaction', icon: <FaCogs /> },
  { label: 'Category Maintenance', to: '/product-maintenance', icon: <FaTools /> },
  { label: 'Product', to: '/staff-product', icon: <FaPeopleCarry /> },
  { label: 'Delivery Maintenance', to: '/delevery-maintenance', icon: <FaTruck /> },
  { label: 'Stock Maintenance', to: '/stock-maintenance', icon: <FaWarehouse /> },
  { label: 'Supplier Maintenance', to: '/supplier-maintenance', icon: <FaUsersCog /> },
  { label: 'Staff Info', to: '/staff-info', icon: <FaUsersCog /> },
];

const MobileStaffNavbar = ({ isOpen, onClose }) => {
  const { staffLogout } = useUser(); 
  const navigate = useNavigate();

  const handleLogout = () => {
    staffLogout(); // Call logout function from context
    navigate("/login-staff"); // Redirect to login page
  };

  if (!isOpen) return null;

  return (
    <div className="md:hidden fixed top-14 left-0 right-0 bg-white z-50 border-t border-gray-200">
      <div className="flex flex-col divide-y">
        {navItems.map(({ label, to, icon }) => (
          <NavLink
            key={to}
            to={to}
            onClick={onClose}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 ${
                isActive ? "bg-[#3B82F6] text-white" : "hover:bg-gray-100"
              }`
            }
          >
            {icon}
            <span>{label}</span>
          </NavLink>
        ))}
        <button
          onClick={() => {
            handleLogout();
          }}
          className="flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-100"
        >
          <FaSignOutAlt />
          Logout
        </button>
      </div>
    </div>
  );
};

export default MobileStaffNavbar;
