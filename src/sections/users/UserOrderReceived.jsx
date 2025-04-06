import React, { useState } from 'react';
import { UserNavBar, Header } from "../layout"

const UserOrderReceived = () => {
  const [isNavCollapsed, setIsNavCollapsed] = useState(false);

  const toggleNav = () => {
    setIsNavCollapsed(!isNavCollapsed);
  };

  return (
    <div className={`flex flex-row-reverse max-md:flex-row w-full`}>
      <div className='flex flex-col flex-1 h-screen'>
        <Header
          toggleNav={toggleNav}
        />

        <div className={`flex-1 overflow-auto mt-14 bg-[#EFEFEF] flex justify-center`}>
          {/* Simulating an order received message */}
          <p className="text-center mt-5 text-gray-500">No orders received yet</p>
        </div>
      </div>

      <nav className={`max-md:hidden ${isNavCollapsed ? "w-20" : "w-56"} transition-width duration-300`}>
        <UserNavBar
          isNavCollapsed={isNavCollapsed}
        />
      </nav>

    </div>
  );
}

export default UserOrderReceived;
