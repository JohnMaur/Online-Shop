import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Tooltip from './Tooltip';

const NavItem = ({ isNavCollapsed, icon, iconHovered, tooltipText, link, onClick }) => {
  const [isHovered, setIsHovered] = useState(false);
  const location = useLocation();
  const isActive = location.pathname === link; // Check if current route matches the link

  return (
    <div>
      <a
        href={link}
        className="flex items-center max-sm:py-2"
        onClick={onClick}
      >
        <div
          className={`relative flex-1 flex flex-wrap items-center px-8 py-3 cursor-pointer 
          ${isActive ? "bg-[#3B82F6] text-white" : "hover:bg-[#6EA5FF] hover:text-white"} 
          active:opacity-45`}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <img
            src={isHovered || isActive ? iconHovered : icon}
            alt={`${tooltipText} Icon`}
            width={18}
            height={18}
          />
          {!isNavCollapsed && <p className="text-sm ml-3 truncate max-w-[120px]">{tooltipText}</p>}
        </div>
      </a>
      {isNavCollapsed && isHovered && (
        <Tooltip text={tooltipText} position="right" showTooltip={true} />
      )}
    </div>
  );
};

export default NavItem;
