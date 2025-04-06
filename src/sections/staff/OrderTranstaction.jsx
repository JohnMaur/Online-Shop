import React, { useState } from 'react';
import { StaffNavBar, Header } from "../layout"

const OrderTranstaction = () => {
  const [isNavCollapsed, setIsNavCollapsed] = useState(false);
  const [staffUsername, setStaffUsername] = useState("");

  const toggleNav = () => {
    setIsNavCollapsed(!isNavCollapsed);
  };

  return (
    <div className={`flex flex-row-reverse max-md:flex-row w-full`}>
      <div className='flex flex-col flex-1 h-screen'>
        <Header
          toggleNav={toggleNav}
        />

        <div className={`flex-1 overflow-auto mt-14 bg-[#EFEFEF]`}>
          {/* Your content here */}
          <p>Sorting button</p>
          <p>Successful order, Failed order, Refunded order, cancelled order</p>
          <p>Table for fetching data - with status</p>
        </div>
      </div>

      <nav className={`max-md:hidden ${isNavCollapsed ? "w-20" : "w-56"} transition-width duration-300`}>
        <StaffNavBar
          isNavCollapsed={isNavCollapsed}
          setStaffUsername={setStaffUsername}
        />
      </nav>

    </div>
  )
}

export default OrderTranstaction
