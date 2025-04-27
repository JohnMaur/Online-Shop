
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Tooltip from './Tooltip';

const StaffNavItem = ({ isNavCollapsed, icon, iconHovered, tooltipText, link, onClick }) => {
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
          <div className="text-xl">
            {isHovered || isActive ? iconHovered : icon}
          </div>
          {!isNavCollapsed && <p className="text-sm ml-3 truncate max-w-[110px]">{tooltipText}</p>}
        </div>
      </a>
      {isNavCollapsed && isHovered && (
        <Tooltip text={tooltipText} position="right" showTooltip={true} />
      )}
    </div>
  );
};

export default StaffNavItem;
