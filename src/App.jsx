import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navigation from "./components/header/Navigation";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import SearchResults from "./pages/SearchResults";
import { AnimatePresence } from "framer-motion";
import Home from "./pages/Home";
import Checkout from "./pages/Checkout";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import PremiumHolsters from "./pages/PremiumHolsters";
import Delivery from "./pages/Delivery";
import Clients from "./pages/Clients";
import Address from "./pages/Address";
import Contact from "./pages/Contact";
import About from "./pages/About";
import BonusProgram from "./pages/BonusProgram";
import FlowerCare from "./pages/FlowerCare";
import WeddingBouquets from "./components/WeddingBouquets";
import ThemeToggle from "./components/ThemeToggle";
import SupportChat from "./components/SupportChat";
import AdminDashboard from "./pages/admin/Dashboard";
import AdminOrders from "./pages/admin/Orders";
import AdminProducts from "./pages/admin/Products";
import AdminStatistics from "./pages/admin/Statistics";
import AdminDiscounts from "./pages/admin/Discounts";
import AdminNotifications from "./pages/admin/Notifications";
import Analytics from "./pages/admin/Analytics";
import Categories from "./pages/Categories";
import Tracking from "./pages/Tracking";
import { NotificationProvider } from "./context/NotificationContext";
import { CartProvider } from "./context/CartContext";
import { AuthProvider } from "./context/AuthContext";
import { DeliveryProvider } from "./context/DeliveryContext";
import CustomScrollbar from "./components/CustomScrollbar";
import QuickAccess from "./components/QuickAccess";
import QRScanner from "./components/QRScanner";
import { ThemeProvider } from "./context/ThemeContext";
import { GalleryHoverProvider } from "./context/GalleryHoverContext";
import ScrollToTop from "./components/ScrollToTop";
import ScrollToTopButton from "./components/ScrollToTopButton";
import ScrollTestButton from "./components/ScrollTestButton";

const App = () => {
  return (
    <ThemeProvider>
      <AuthProvider>
        <CartProvider>
          <NotificationProvider>
            <DeliveryProvider>
              <GalleryHoverProvider>
                <Router>
                  <ScrollToTop />
                  <CustomScrollbar />
                  <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
                    <Navigation />
                    <main className="pt-16">
                      <AnimatePresence mode="wait">
                        <Routes>
                          <Route path="/" element={<Home />} />
                          <Route path="/products" element={<Products />} />
                          <Route path="/product/:id" element={<ProductDetail />} />
                          <Route path="/cart" element={<Cart />} />
                          <Route path="/search" element={<SearchResults />} />
                          <Route path="/checkout" element={<Checkout />} />
                          <Route path="/profile" element={<Profile />} />
                          <Route path="/login" element={<Login />} />
                          <Route path="/categories" element={<Categories />} />
                          <Route path="/delivery" element={<Delivery />} />
                          <Route path="/clients" element={<Clients />} />
                          <Route path="/address" element={<Address />} />
                          <Route path="/contact" element={<Contact />} />
                          <Route path="/about" element={<About />} />
                          <Route path="/bonus-program" element={<BonusProgram />} />
                          <Route path="/flower-care" element={<FlowerCare />} />
                          <Route path="/wedding-bouquets" element={<WeddingBouquets />} />
                          <Route path="/tracking" element={<Tracking />} />
                          <Route path="/premium-holsters" element={<PremiumHolsters />} />

                          {/* Admin Routes */}
                          <Route path="/admin" element={<AdminDashboard />}>
                            <Route index element={<AdminOrders />} />
                            <Route path="orders" element={<AdminOrders />} />
                            <Route path="products" element={<AdminProducts />} />
                            <Route path="statistics" element={<AdminStatistics />} />
                            <Route path="discounts" element={<AdminDiscounts />} />
                            <Route path="notifications" element={<AdminNotifications />} />
                            <Route path="analytics" element={<Analytics />} />
                          </Route>
                        </Routes>
                      </AnimatePresence>
                    </main>
                    <ScrollToTopButton />
                    {/* <ScrollTestButton /> */}
                    {/* <SupportChat /> */}
                    {/* <QuickAccess /> */}
                    {/* <QRScanner /> */}
                  </div>
                </Router>
              </GalleryHoverProvider>
            </DeliveryProvider>
          </NotificationProvider>
        </CartProvider>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;
