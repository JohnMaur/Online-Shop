import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  FaTachometerAlt, FaUserTie, FaShippingFast, FaBoxOpen, FaClipboardList,
  FaTools, FaBox, FaWarehouse, FaUsers, FaUserFriends, FaHistory, FaPercentage, FaSignOutAlt
} from "react-icons/fa";
import { useUser } from "../../(auth)/UserContext";
import { useNavigate } from "react-router-dom";

const navItems = [
  { label: 'Dashboard', to: '/dashboard', icon: <FaTachometerAlt /> },
  { label: 'Staff', to: '/staff', icon: <FaUserTie /> },
  // { label: 'To Ship', to: '/admin-to-ship', icon: <FaShippingFast /> },
  // { label: 'To Receive', to: '/admin-to-receive', icon: <FaBoxOpen /> },
  // { label: 'Order Received', to: '/admin-order-received', icon: <FaClipboardList /> },
  // { label: 'Order Canceled', to: '/admin-order-canceled', icon: <FaClipboardList /> },
  { label: 'Order Transaction', to: '/admin-order-transac', icon: <FaShippingFast /> },
  { label: 'Transaction Report', to: '/admin-order-transaction', icon: <FaClipboardList /> },
  { label: 'Category Maintenance', to: '/product_maintenance', icon: <FaTools /> },
  { label: 'Product', to: '/product', icon: <FaBox /> },
  { label: 'Delivery Maintenance', to: '/admin-delevery-maintenance', icon: <FaBox /> },
  { label: 'Stock Maintenance', to: '/admin-stock-maintenance', icon: <FaWarehouse /> },
  { label: 'Supplier Maintenance', to: '/admin-supplier-maintenance', icon: <FaUsers /> },
  { label: 'User List', to: '/user-list', icon: <FaUserFriends /> },
  { label: 'Staff List', to: '/staff-list', icon: <FaUserTie /> },
  { label: 'VAT', to: '/admin-vat', icon: <FaPercentage /> },
  { label: 'Audit Trail', to: '/audit-trail', icon: <FaHistory /> },
];

const MobileAdminNavbar = ({ isOpen, onClose }) => {
  const { adminLogout } = useUser();
  const navigate = useNavigate();
  if (!isOpen) return null;

  const handleLogout = () => {
    adminLogout(); // Call logout function from context
    navigate("/admin"); // Redirect to login page
  };

  return (
    <div className="md:hidden fixed top-14 left-0 right-0 bg-white z-50 border-t border-gray-200 max-h-[calc(100vh-3.5rem)] overflow-auto">
      <div className="flex flex-col divide-y">
        {navItems.map(({ label, to, icon }) => (
          <NavLink
            key={to}
            to={to}
            onClick={onClose}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 ${isActive ? "bg-[#3B82F6] text-white" : "hover:bg-gray-100"
              }`
            }
          >
            {icon}
            <span>{label}</span>
          </NavLink>
        ))}
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-100 cursor-pointer"
        >
          <FaSignOutAlt />
          Logout
        </button>
      </div>
    </div>
  );
};

export default MobileAdminNavbar;
