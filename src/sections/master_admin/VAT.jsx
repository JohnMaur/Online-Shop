// import React, { useState } from 'react';
// import { NavigationBar, Header } from "../layout"

// const AdminVAT = () => {
//   const [isNavCollapsed, setIsNavCollapsed] = useState(false);

//   const toggleNav = () => {
//     setIsNavCollapsed(!isNavCollapsed);
//   };

//   return (
//     <div className={`flex flex-row-reverse max-md:flex-row w-full`}>
//       <div className='flex flex-col flex-1 h-screen'>
//         <Header
//           toggleNav={toggleNav}
//         />

//         <div className={`flex-1 overflow-auto mt-14 bg-[#EFEFEF]`}>
//           {/* Your content here */}
//           <p>VAT</p>
//         </div>
//       </div>

//       <nav className={`max-md:hidden ${isNavCollapsed ? "w-20" : "w-56"} transition-width duration-300`}>
//         <NavigationBar
//           isNavCollapsed={isNavCollapsed}
//         />

//       </nav>

//     </div>
//   )
// }

// export default AdminVAT

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { NavigationBar, Header, MobileAdminNavbar } from "../layout";
import { Button, Input, Tooltip } from 'antd';
import { PercentageOutlined, InfoCircleOutlined } from '@ant-design/icons';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

const AdminVAT = () => {
  const [isNavCollapsed, setIsNavCollapsed] = useState(false);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [vat, setVat] = useState('');
  const [isExisting, setIsExisting] = useState(false);

  const toggleNav = () => {
    if (window.innerWidth <= 768) {
      setIsMobileNavOpen(!isMobileNavOpen);
    } else {
      setIsNavCollapsed(!isNavCollapsed);
    }
  };

  useEffect(() => {
    fetchVAT();
  }, []);

  const fetchVAT = async () => {
    try {
      const res = await axios.get('http://localhost:3000/api/admin/vat');
      if (res.data?.value !== undefined) {
        setVat(res.data.value);
        setIsExisting(true);
      }
    } catch (err) {
      console.error('Failed to fetch VAT:', err);
    }
  };

  const handleSubmit = async () => {
    try {
      const parsedVat = parseFloat(vat);
      if (isNaN(parsedVat)) {
        return MySwal.fire({
          icon: 'error',
          title: 'Invalid Input',
          text: 'Enter a valid VAT number.',
        });
      }

      if (isExisting) {
        await axios.put('http://localhost:3000/api/admin/vat', { value: parsedVat });
        MySwal.fire({
          icon: 'success',
          title: 'VAT Updated',
          text: `VAT has been successfully updated to ${parsedVat}%`,
          timer: 2000,
          showConfirmButton: false,
        });
      } else {
        await axios.post('http://localhost:3000/api/admin/vat', { value: parsedVat });
        setIsExisting(true);
        MySwal.fire({
          icon: 'success',
          title: 'VAT Added',
          text: `VAT of ${parsedVat}% has been added successfully.`,
          timer: 2000,
          showConfirmButton: false,
        });
      }
    } catch (err) {
      MySwal.fire({
        icon: 'error',
        title: 'Error',
        text: err.response?.data?.message || 'Failed to save VAT.',
      });
    }
  };

  return (
    <div className="flex flex-row-reverse max-md:flex-row w-full">
      <div className="flex flex-col flex-1 h-screen">
        <Header toggleNav={toggleNav} />
        <MobileAdminNavbar isOpen={isMobileNavOpen} onClose={() => setIsMobileNavOpen(false)} />
        <div className="flex-1 overflow-auto mt-14 bg-[#f5f7fa] p-6">
          <div className="bg-white p-6 rounded-2xl shadow-xl w-full max-w-md mx-auto transition-all">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-semibold text-gray-800 flex items-center gap-2">
                <PercentageOutlined className="text-blue-500" />
                VAT Settings
              </h2>
              <Tooltip title="This value applies to all taxable transactions.">
                <InfoCircleOutlined className="text-gray-500" />
              </Tooltip>
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-1">VAT Value (%)</label>
              <Input
                type="number"
                value={vat}
                onChange={(e) => setVat(e.target.value)}
                placeholder="e.g. 12"
                prefix="%"
                size="large"
              />
            </div>

            <Button
              type="primary"
              size="large"
              className="w-full bg-blue-600 hover:bg-blue-700 transition-all"
              onClick={handleSubmit}
            >
              {isExisting ? "Update VAT" : "Add VAT"}
            </Button>
          </div>
        </div>
      </div>

      <nav className={`max-md:hidden ${isNavCollapsed ? "w-20" : "w-56"} transition-width duration-300`}>
        <NavigationBar isNavCollapsed={isNavCollapsed} />
      </nav>
    </div>
  );
};

export default AdminVAT;

// import React, { useState } from 'react';
// import { NavigationBar, Header } from "../layout"

// const AdminVAT = () => {
//   const [isNavCollapsed, setIsNavCollapsed] = useState(false);

//   const toggleNav = () => {
//     setIsNavCollapsed(!isNavCollapsed);
//   };

//   return (
//     <div className={`flex flex-row-reverse max-md:flex-row w-full`}>
//       <div className='flex flex-col flex-1 h-screen'>
//         <Header
//           toggleNav={toggleNav}
//         />

//         <div className={`flex-1 overflow-auto mt-14 bg-[#EFEFEF]`}>
//           {/* Your content here */}
//           <p>VAT</p>
//         </div>
//       </div>

//       <nav className={`max-md:hidden ${isNavCollapsed ? "w-20" : "w-56"} transition-width duration-300`}>
//         <NavigationBar
//           isNavCollapsed={isNavCollapsed}
//         />

//       </nav>

//     </div>
//   )
// }

// export default AdminVAT

