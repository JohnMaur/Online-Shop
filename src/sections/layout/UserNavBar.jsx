import { NavItem } from "../../components";
import { useNavigate } from "react-router-dom"; 
import { icon, searchIcon, logout, logoutLight, receiving, receivingLight, shipping, shippingLight, cart, cartLight, accountInfo, accountInfoLight, shop, shopLight, received, receivedLight, cancelled, cancelledLight } from "../../assets/icons";
import { useUser } from "../../(auth)/UserContext";

const UserNavBar = ({ isNavCollapsed, responsiveLink }) => {
  const { userlogout } = useUser(); // Get logout function from context
  const navigate = useNavigate(); // Hook for navigation

  const handleLogout = () => {
    userlogout(); // Call logout function from context
    navigate("/login"); // Redirect to login page
  };

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
              <p className="text-sm font-bold">User</p>
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
            icon={accountInfo}
            iconHovered={accountInfoLight}
            tooltipText="Account info"
            link="/account-info"
          />
          <NavItem
            isNavCollapsed={isNavCollapsed}
            icon={shop}
            iconHovered={shopLight}
            tooltipText="Shop"
            link={!responsiveLink ? "/home" : responsiveLink }
          />
          <NavItem
            isNavCollapsed={isNavCollapsed}
            icon={cart}
            iconHovered={cartLight}
            tooltipText="Cart"
            link="/cart"
          />
          <NavItem
            isNavCollapsed={isNavCollapsed}
            icon={shipping}
            iconHovered={shippingLight}
            tooltipText="To ship"
            link="/shipping"
          />
          <NavItem
            isNavCollapsed={isNavCollapsed}
            icon={receiving}
            iconHovered={receivingLight}
            tooltipText="To receive"
            link="/receiving"
          />
          <NavItem
            isNavCollapsed={isNavCollapsed}
            icon={received}
            iconHovered={receivedLight}
            tooltipText="Order Received"
            link="/order-received"
          />
          <NavItem
            isNavCollapsed={isNavCollapsed}
            icon={cancelled}
            iconHovered={cancelledLight}
            tooltipText="Cancelled"
            link="/order-cancelled"
          />
        </div>
      </div>

      <div>
        <NavItem
          isNavCollapsed={isNavCollapsed}
          icon={logout}
          iconHovered={logoutLight}
          tooltipText="Logout"
          onClick={handleLogout}
        />
      </div>
    </nav>
  );
}; 

export default UserNavBar;

