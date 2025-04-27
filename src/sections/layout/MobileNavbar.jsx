import React from 'react';
import { NavLink } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { useUser } from '../../(auth)/UserContext';
import {
  accountInfo,
  shop,
  cart,
  shipping,
  receiving,
  received,
  cancelled,
  logout
} from "../../assets/icons";

const navLinks = [
  { to: "/account-info", label: "Account Info", icon: accountInfo },
  { to: "/home", label: "Shop", icon: shop },
  { to: "/cart", label: "Cart", icon: cart },
  { to: "/shipping", label: "To Ship", icon: shipping },
  { to: "/receiving", label: "To Receive", icon: receiving },
  { to: "/order-received", label: "Order Received", icon: received },
  { to: "/order-cancelled", label: "Cancelled", icon: cancelled }
];
 
const MobileNavBar = () => {
  const { userlogout } = useUser();
  const navigate = useNavigate(); // Hook for navigation

  const handleLogout = () => {
    userlogout(); // Call logout function from context
    navigate("/login"); // Redirect to login page
  };

  return (
    <div className="flex flex-col w-full bg-white border-t border-gray-200">
      {navLinks.map(({ to, label, icon }) => (
        <NavLink
          key={to}
          to={to}
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-3 border-b ${
              isActive ? "bg-[#3B82F6] text-white" : "hover:bg-gray-100"
            }`
          }
        >
          <img src={icon} alt={label} className="w-5 h-5" />
          <span>{label}</span>
        </NavLink>
      ))}
      <button
        onClick={handleLogout}
        className="flex items-center gap-3 px-4 py-3 hover:bg-red-100 text-red-600 cursor-pointer"
      >
        <img src={logout} alt="Logout" className="w-5 h-5" />
        Logout
      </button>
    </div>
  );
};

export default MobileNavBar;
