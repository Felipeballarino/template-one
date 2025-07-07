import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/home/Home";
import ProductosList from "./pages/products/ProductosList"
import ProductoDetalle from "./pages/products/ProductoDetalle";
import AdminLayout from "./pages/admin/AdminLayout.jsx";
import CargaProductos from "./features/products/admin/cargarProductos/index";
import ListarProductos from "./features/products/admin/ListarProductos";
import ListarUsuarios from "./features/users/admin/ListarUsuarios";
import ListarCategorias from "./features/categories/admin/ListarCategorias";
import CargarCategorias from "./features/categories/admin/CargarCategorias";
import ListarMarcas from "./features/brands/admin/ListarMarcas";
import CargarMarcas from "./features/brands/admin/CargarMarcas";
import ListarVentas from "./features/sales/admin/ListarVentas";
import PrivateRoute from "./features/auth/components/PrivateRoutes";
import ConfigPages from "./features/settings/admin/ConfigPages";
import CheckoutPage from "./pages/checkout/CheckoutPage";

import 'quill/dist/quill.snow.css'
import { useEffect } from "react";
import { useBrandsStore } from "./store/brandsStore";
import { useCategoriesStore } from "./store/categoriesStore";
import { useProductsStore } from "./store/productsStore";

function App() {

  const { loadBrands } = useBrandsStore()
  const { loadCategories } = useCategoriesStore()
  const { loadProducts } = useProductsStore()

  useEffect(() => {
    loadBrands();
    loadCategories()
    loadProducts()
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/productos" element={<ProductosList />} />
        <Route path="/producto/:id" element={<ProductoDetalle />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/admin" element={
          <PrivateRoute allowedRoles={["super_admin", "admin"]}>
            <AdminLayout />
          </PrivateRoute>
        }>
          <Route index element={<Navigate to="/admin/listar-productos" replace />} />
          <Route path="listar-productos" element={<ListarProductos />} />
          <Route path="cargar-producto" element={<CargaProductos />} />
          <Route path="editar-producto/:id" element={<CargaProductos />} />
          <Route path="listar-categorias" element={<ListarCategorias />} />
          <Route path="cargar-categoria" element={<CargarCategorias />} />
          <Route path="editar-categoria/:id" element={<CargarCategorias />} />
          <Route path="listar-marcas" element={<ListarMarcas />} />
          <Route path="cargar-marcas" element={<CargarMarcas />} />
          <Route path="editar-marca/:id" element={<CargarMarcas />} />
          <Route path="listar-ventas" element={<ListarVentas />} />
          <Route path="listar-usuarios" element={<ListarUsuarios />} />
          <Route path="settings" element={<ConfigPages />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App
