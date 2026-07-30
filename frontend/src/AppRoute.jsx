import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Homepage from "./pages/Home/Homepage";
import FoodPage from "./pages/Food/FoodPage";
import CartPage from "./pages/Cart/CartPage";
import Loginpage from "./pages/login/Loginpage";
import RegisterPage from "./pages/Register/RegisterPage";
import AuthRoute from "./component/AuthRoute";
import CkeckoutPage from "./pages/Checkout/CkeckoutPage";
import PaymendPage from "./pages/Payment/PaymendPage";
import OrderTrackPage from "./pages/Track/OrderTrackPage";
import ProfilePage from "./pages/Profile/ProfilePage";
import OrdersPage from "./pages/Orders/OrdersPage";
import Dashboard from "./pages/Dashboard/Dashboard";
import AdminRouteExport from "./component/AdminRoute";
import FoodsAdminPage from "./pages/FoodsAdmin/FoodsAdminPage";
import FoodEditPage from "./pages/FoodEdit/FoodEditPage";
import UsersAdminPage from "./pages/UsersAdminPage/UsersAdminPage";
import EditUserPage from "./pages/EditUser/EditUserPage";
import PageTransition from "./component/PageTransition";

const withTransition = (element) => <PageTransition>{element}</PageTransition>;

function AppRoute() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={withTransition(<Homepage />)} />
        <Route path="/search/:searchTerm" element={withTransition(<Homepage />)} />
        <Route path="/tags/:Tag" element={withTransition(<Homepage />)} />
        <Route path="/food/:id" element={withTransition(<FoodPage />)} />
        <Route path="/cart" element={withTransition(<CartPage />)} />
        <Route path="/login" element={withTransition(<Loginpage />)} />
        <Route path="/register" element={withTransition(<RegisterPage />)} />
        <Route
          path="/checkout"
          element={
            <AuthRoute>{withTransition(<CkeckoutPage />)}</AuthRoute>
          }
        />
        <Route
          path="/payment"
          element={
            <AuthRoute>{withTransition(<PaymendPage />)}</AuthRoute>
          }
        />
        <Route
          path="/track/:orderId"
          element={
            <AuthRoute>{withTransition(<OrderTrackPage />)}</AuthRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <AuthRoute>{withTransition(<ProfilePage />)}</AuthRoute>
          }
        />
        <Route
          path="/orders/:filter?"
          element={
            <AuthRoute>{withTransition(<OrdersPage />)}</AuthRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <AuthRoute>{withTransition(<Dashboard />)}</AuthRoute>
          }
        />
        <Route
          path="/admin/foods/:searchTerm?"
          element={
            <AdminRouteExport>{withTransition(<FoodsAdminPage />)}</AdminRouteExport>
          }
        />
        <Route
          path="/admin/addfood"
          element={
            <AdminRouteExport>{withTransition(<FoodEditPage />)}</AdminRouteExport>
          }
        />
        <Route
          path="/admin/editfood/:foodId"
          element={
            <AdminRouteExport>{withTransition(<FoodEditPage />)}</AdminRouteExport>
          }
        />
        <Route
          path="/admin/users/:searchTerm?"
          element={
            <AdminRouteExport>{withTransition(<UsersAdminPage />)}</AdminRouteExport>
          }
        />
        <Route
          path="/admin/editUser/:userId"
          element={
            <AdminRouteExport>{withTransition(<EditUserPage />)}</AdminRouteExport>
          }
        />
      </Routes>
    </AnimatePresence>
  );
}

export default AppRoute;
