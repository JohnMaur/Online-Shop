import { NavItem } from "../../components";
import { icon, searchIcon, dashboard, dashboardLight, logout, logoutLight, staff, staffLight, product, productLight, maintenance, lightMaintenance, accountInfo, accountInfoLight, supplier, supplierLight, stock, stockLight, staffList, staffListLight } from "../../assets/icons";

const NavigationBar = ({ isNavCollapsed }) => {

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
              className={`text-sm py-1.5 w-28 ml-3 `}
              placeholder="Search..."
            />
          )}
        </div>

        <div className="mt-5">
          <NavItem
            isNavCollapsed={isNavCollapsed}
            icon={dashboard}
            iconHovered={dashboardLight}
            tooltipText="Dashboard"
            link="/dashboard"
          />
          <NavItem
            isNavCollapsed={isNavCollapsed}
            icon={staff}
            iconHovered={staffLight}
            tooltipText="Staff"
            link="/staff"
          />
          <NavItem
            isNavCollapsed={isNavCollapsed}
            icon={maintenance}
            iconHovered={lightMaintenance}
            tooltipText="Category Maintenance"
            link="/product_maintenance"
          />
          <NavItem
            isNavCollapsed={isNavCollapsed}
            icon={product}
            iconHovered={productLight}
            tooltipText="Product"
            link="/product"
          />
           <NavItem
            isNavCollapsed={isNavCollapsed}
            icon={product}
            iconHovered={productLight}
            tooltipText="Delivery Maintenance"
            link="/admin-delevery-maintenance"
          />
          <NavItem
            isNavCollapsed={isNavCollapsed}
            icon={stock}
            iconHovered={stockLight}
            tooltipText="Stock Maintenance"
            link="/admin-stock-maintenance"
          />
          <NavItem
            isNavCollapsed={isNavCollapsed}
            icon={supplier}
            iconHovered={supplierLight}
            tooltipText="Supplier Maintenance"
            link="/admin-supplier-maintenance"
          />
          <NavItem
            isNavCollapsed={isNavCollapsed}
            icon={accountInfo}
            iconHovered={accountInfoLight}
            tooltipText="User List"
            link="/user-list"
          />
          <NavItem
            isNavCollapsed={isNavCollapsed}
            icon={staffList}
            iconHovered={staffListLight}
            tooltipText="Staff List"
            link="/staff-list"
          />
          <NavItem
            isNavCollapsed={isNavCollapsed}
            icon={staffList}
            iconHovered={staffListLight}
            tooltipText="Audit Trail"
            link="/audit-trail"
          />
        </div>
      </div>

      <div>
        <NavItem
          isNavCollapsed={isNavCollapsed}
          icon={logout}
          iconHovered={logoutLight}
          tooltipText="Logout"
          link="#"
        />
      </div>
    </nav>
  );
};

export default NavigationBar;
