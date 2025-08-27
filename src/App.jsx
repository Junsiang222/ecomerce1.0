import { BrowserRouter, Routes, Route } from "react-router"
import { Toaster, toast } from 'sonner';
import Product from "./pages/Product";
import ProductAdd from "./pages/ProductAdd";
import ProductEdit from "./pages/ProductEdit";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import PaymentVerify from "./pages/PaymentVerify";
import OrdersPage from "./pages/OrdersPage";
function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Product />} />
          <Route path="/products/new" element={<ProductAdd />} />
          <Route path="/products/:id/edit" element={<ProductEdit />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/verify-payment" element={< PaymentVerify/>} />
          <Route path="/orders" element={< OrdersPage/>} />
        </Routes>
        <Toaster/>
      </BrowserRouter>
  );
}

export default App
