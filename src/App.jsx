import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Login, SignUp, Admin, LoginStaff } from "./(auth)";
import { AdminDashboard, Staff, Product, AdminItemSettings, UserList, StaffList, AdminStock, AdminSupplier, AuditTrail, AdminDelivery } from "./sections/master_admin";
import { StaffDashboard, StaffProduct, StaffReceiving, StaffShipping, StaffProfile, ItemSettings, StaffMaintenance, StockMaintenance, DeleveryMaintenance, OrderTranstaction } from "./sections/staff";
import { UserLandingPage, Receiving, Shipping, Cart, Homepage, UsersProduct, UserOrderReceived, UserCancelled } from "./sections/users";

import { UserProvider } from "./(auth)/UserContext";

const App = () => {
  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/login-staff" element={<LoginStaff />} />

          {/* User routes */}
          <Route path="/account-info" element={<UserLandingPage />} />
          <Route path="/home" element={<Homepage />} />
          <Route path="/user-product" element={<UsersProduct />} />
          <Route path="/shipping" element={<Shipping/>} />
          <Route path="/receiving" element={<Receiving />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/order-received" element={<UserOrderReceived />} />
          <Route path="/order-cancelled" element={<UserCancelled />} />

          {/* Staff routes */}
          <Route path="/staff-dashboard" element={<StaffDashboard />} />
          <Route path="/staff-product" element={<StaffProduct />} />
          <Route path="/staff-shipping" element={<StaffShipping />} />
          <Route path="/staff-receiving" element={<StaffReceiving/>} />
          <Route path="/product-maintenance" element={<ItemSettings/>} />
          <Route path="/staff-info" element={<StaffProfile/>} />
          <Route path="/supplier-maintenance" element={<StaffMaintenance/>} />
          <Route path="/stock-maintenance" element={<StockMaintenance/>} />
          <Route path="/delevery-maintenance" element={<DeleveryMaintenance/>} />
          <Route path="/order-transaction" element={<OrderTranstaction/>} />

          {/* Admin routes */}
          <Route path="/dashboard" element={<AdminDashboard />} />
          <Route path="/staff" element={<Staff />} />
          <Route path="/product" element={<Product />} />
          <Route path="/product_maintenance" element={<AdminItemSettings/>} />
          <Route path="/user-list" element={<UserList/>} />
          <Route path="/staff-list" element={<StaffList/>} />
          <Route path="/admin-stock-maintenance" element={<AdminStock/>} />
          <Route path="/admin-supplier-maintenance" element={<AdminSupplier/>} />
          <Route path="/audit-trail" element={<AuditTrail/>} />
          <Route path="/admin-delevery-maintenance" element={<AdminDelivery/>} />
        </Routes>
      </Router>
    </UserProvider>
  );
};

export default App;