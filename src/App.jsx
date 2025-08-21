import { BrowserRouter, Routes, Route } from "react-router"
import { Toaster, toast } from 'sonner';
import Product from "./pages/Product";
import ProductAdd from "./pages/ProductAdd";
import ProductEdit from "./pages/ProductEdit";
import CartPage from "./pages/CartPage";
function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Product />} />
          <Route path="/products/new" element={<ProductAdd />} />
          <Route path="/products/:id/edit" element={<ProductEdit />} />
          <Route path="/cart" element={<CartPage />} />
        </Routes>
        <Toaster/>
      </BrowserRouter>
  );
}

export default App
  