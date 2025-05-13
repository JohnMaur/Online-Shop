// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import { Login, SignUp, Admin, LoginStaff } from "./(auth)";
// import { AdminDashboard, Staff, Product, AdminItemSettings, UserList, StaffList, AdminStock, AdminSupplier, AuditTrail, AdminDelivery, AdminToShip, AdminToReceive, AdminOrderReceived, AdminCanceledOrder, AdminOrderTransaction, AdminVAT, AdminProductReview } from "./sections/master_admin";
// import { StaffDashboard, StaffProduct, StaffReceiving, StaffShipping, StaffProfile, ItemSettings, StaffMaintenance, StockMaintenance, DeleveryMaintenance, OrderTranstaction, OrderReceived, CanceledOrder, StaffProductreview } from "./sections/staff";
// import { UserLandingPage, Receiving, Shipping, Cart, Homepage, UsersProduct, UserOrderReceived, UserCancelled } from "./sections/users";

// import { UserProvider } from "./(auth)/UserContext";

// const App = () => {
//   return (
//     <UserProvider>
//       <Router>
//         <Routes>
//           <Route path="/login" element={<Login />} />
//           <Route path="/sign-up" element={<SignUp />} />
//           <Route path="/admin" element={<Admin />} />
//           <Route path="/login-staff" element={<LoginStaff />} />

//           {/* User routes */}
//           <Route path="/account-info" element={<UserLandingPage />} />
//           <Route path="/home" element={<Homepage />} />
//           <Route path="/user-product" element={<UsersProduct />} />
//           <Route path="/shipping" element={<Shipping/>} />
//           <Route path="/receiving" element={<Receiving />} />
//           <Route path="/cart" element={<Cart />} />
//           <Route path="/order-received" element={<UserOrderReceived />} />
//           <Route path="/order-cancelled" element={<UserCancelled />} />

//           {/* Staff routes */}
//           <Route path="/staff-dashboard" element={<StaffDashboard />} />
//           <Route path="/staff-product" element={<StaffProduct />} />
//           <Route path="/staff-shipping" element={<StaffShipping />} />
//           <Route path="/staff-receiving" element={<StaffReceiving/>} />
//           <Route path="/product-maintenance" element={<ItemSettings/>} />
//           <Route path="/staff-info" element={<StaffProfile/>} />
//           <Route path="/supplier-maintenance" element={<StaffMaintenance/>} />
//           <Route path="/stock-maintenance" element={<StockMaintenance/>} />
//           <Route path="/delevery-maintenance" element={<DeleveryMaintenance/>} />
//           <Route path="/order-transaction" element={<OrderTranstaction/>} />
//           <Route path="/staff-order-received" element={<OrderReceived/>} />
//           <Route path="/staff-canceled-order" element={<CanceledOrder/>} />
//           <Route path="/staff-product-review" element={<StaffProductreview/>} />

//           {/* Admin routes */}
//           <Route path="/dashboard" element={<AdminDashboard />} />
//           <Route path="/staff" element={<Staff />} />
//           <Route path="/product" element={<Product />} />
//           <Route path="/product_maintenance" element={<AdminItemSettings/>} />
//           <Route path="/user-list" element={<UserList/>} />
//           <Route path="/staff-list" element={<StaffList/>} />
//           <Route path="/admin-stock-maintenance" element={<AdminStock/>} />
//           <Route path="/admin-supplier-maintenance" element={<AdminSupplier/>} />
//           <Route path="/audit-trail" element={<AuditTrail/>} />
//           <Route path="/admin-delevery-maintenance" element={<AdminDelivery/>} />
//           <Route path="/admin-to-ship" element={<AdminToShip/>} />
//           <Route path="/admin-to-receive" element={<AdminToReceive/>} />
//           <Route path="/admin-order-received" element={<AdminOrderReceived/>} />
//           <Route path="/admin-order-canceled" element={<AdminCanceledOrder/>} />
//           <Route path="/admin-order-transaction" element={<AdminOrderTransaction/>} />
//           <Route path="/admin-VAT" element={<AdminVAT/>} />
//           <Route path="/admin-product-review" element={<AdminProductReview/>} />
//         </Routes>
//       </Router>
//     </UserProvider>
//   );
// };

// export default App;

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Login, SignUp, Admin, LoginStaff, ProtectedRoute } from "./(auth)";
import { AdminDashboard, Staff, Product, AdminItemSettings, UserList, StaffList, AdminStock, AdminSupplier, AuditTrail, AdminDelivery, AdminToShip, AdminToReceive, AdminOrderReceived, AdminCanceledOrder, AdminOrderTransaction, AdminVAT, AdminProductReview, AdminOrderTransac } from "./sections/master_admin";
import { StaffDashboard, StaffProduct, StaffReceiving, StaffShipping, StaffProfile, ItemSettings, StaffMaintenance, StockMaintenance, DeleveryMaintenance, OrderTranstaction, OrderReceived, CanceledOrder, StaffProductreview, OrderTransac } from "./sections/staff";
import { UserLandingPage, Receiving, Shipping, Cart, Homepage, UsersProduct, UserOrderReceived, UserCancelled } from "./sections/users";

import { UserProvider } from "./(auth)/UserContext";

const App = () => {
  return (
    <UserProvider>
      <Router>
        <Routes>
          {/* Auth routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/login-staff" element={<LoginStaff />} />

          {/* User routes */}
          <Route path="/account-info" element={<ProtectedRoute role="user" element={<UserLandingPage />} />} />
          <Route path="/home" element={<ProtectedRoute role="user" element={<Homepage />} />} />
          <Route path="/user-product" element={<ProtectedRoute role="user" element={<UsersProduct />} />} />
          <Route path="/shipping" element={<ProtectedRoute role="user" element={<Shipping />} />} />
          <Route path="/receiving" element={<ProtectedRoute role="user" element={<Receiving />} />} />
          <Route path="/cart" element={<ProtectedRoute role="user" element={<Cart />} />} />
          <Route path="/order-received" element={<ProtectedRoute role="user" element={<UserOrderReceived />} />} />
          <Route path="/order-cancelled" element={<ProtectedRoute role="user" element={<UserCancelled />} />} />

          {/* Staff routes */}
          <Route path="/staff-dashboard" element={<ProtectedRoute role="staff" element={<StaffDashboard />} />} />
          <Route path="/staff-product" element={<ProtectedRoute role="staff" element={<StaffProduct />} />} />
          <Route path="/staff-order-transaction" element={<ProtectedRoute role="staff" element={<OrderTransac />} />} />
          <Route path="/staff-shipping" element={<ProtectedRoute role="staff" element={<StaffShipping />} />} />
          <Route path="/staff-receiving" element={<ProtectedRoute role="staff" element={<StaffReceiving />} />} />
          <Route path="/product-maintenance" element={<ProtectedRoute role="staff" element={<ItemSettings />} />} />
          <Route path="/staff-info" element={<ProtectedRoute role="staff" element={<StaffProfile />} />} />
          <Route path="/supplier-maintenance" element={<ProtectedRoute role="staff" element={<StaffMaintenance />} />} />
          <Route path="/stock-maintenance" element={<ProtectedRoute role="staff" element={<StockMaintenance />} />} />
          <Route path="/delevery-maintenance" element={<ProtectedRoute role="staff" element={<DeleveryMaintenance />} />} />
          <Route path="/order-transaction" element={<ProtectedRoute role="staff" element={<OrderTranstaction />} />} />
          <Route path="/staff-order-received" element={<ProtectedRoute role="staff" element={<OrderReceived />} />} />
          <Route path="/staff-canceled-order" element={<ProtectedRoute role="staff" element={<CanceledOrder />} />} />
          <Route path="/staff-product-review" element={<ProtectedRoute role="staff" element={<StaffProductreview />} />} />

          {/* Admin routes */}
          <Route path="/dashboard" element={<ProtectedRoute role="admin" element={<AdminDashboard />} />} />
          <Route path="/staff" element={<ProtectedRoute role="admin" element={<Staff />} />} />
          <Route path="/product" element={<ProtectedRoute role="admin" element={<Product />} />} />
          <Route path="/product_maintenance" element={<ProtectedRoute role="admin" element={<AdminItemSettings />} />} />
          <Route path="/user-list" element={<ProtectedRoute role="admin" element={<UserList />} />} />
          <Route path="/staff-list" element={<ProtectedRoute role="admin" element={<StaffList />} />} />
          <Route path="/admin-stock-maintenance" element={<ProtectedRoute role="admin" element={<AdminStock />} />} />
          <Route path="/admin-supplier-maintenance" element={<ProtectedRoute role="admin" element={<AdminSupplier />} />} />
          <Route path="/audit-trail" element={<ProtectedRoute role="admin" element={<AuditTrail />} />} />
          <Route path="/admin-delevery-maintenance" element={<ProtectedRoute role="admin" element={<AdminDelivery />} />} />
          <Route path="/admin-to-ship" element={<ProtectedRoute role="admin" element={<AdminToShip />} />} />
          <Route path="/admin-to-receive" element={<ProtectedRoute role="admin" element={<AdminToReceive />} />} />
          <Route path="/admin-order-received" element={<ProtectedRoute role="admin" element={<AdminOrderReceived />} />} />
          <Route path="/admin-order-canceled" element={<ProtectedRoute role="admin" element={<AdminCanceledOrder />} />} />
          <Route path="/admin-order-transac" element={<ProtectedRoute role="admin" element={<AdminOrderTransac />} />} />
          <Route path="/admin-order-transaction" element={<ProtectedRoute role="admin" element={<AdminOrderTransaction />} />} />
          <Route path="/admin-VAT" element={<ProtectedRoute role="admin" element={<AdminVAT />} />} />
          <Route path="/admin-product-review" element={<ProtectedRoute role="admin" element={<AdminProductReview />} />} />
        </Routes>
      </Router>
    </UserProvider>
  );
};

export default App;