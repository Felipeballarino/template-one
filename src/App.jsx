import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Productos from "./pages/Productos";
import ProductoDetalle from "./pages/ProductoDetalle";
import AdminLayout from "./pages/Admin/AdminLayout";
import Dashboard from "./pages/Admin/Dashboard";
import CargaProductos from "./pages/Admin/productos/CargaProductos";
import ListarProductos from "./pages/Admin/productos/ListarProductos";
import ListarUsuarios from "./pages/Admin/usuarios/ListarUsuarios";
import ListarCategorias from "./pages/Admin/categorias/ListarCategorias";
import ListarMarcas from "./pages/Admin/marcas/ListarMarcas";
import ListarVentas from "./pages/Admin/ventas/ListarVentas";
import CargarCategorias from "./pages/Admin/categorias/CargarCategorias";
import CargarMarcas from "./pages/Admin/marcas/CargarMarcas";
import PrivateRoute from "./components/PrivateRoutes";

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/productos" element={<Productos />} />
        <Route path="/producto/:id" element={<ProductoDetalle />} />
        <Route path="/admin" element={
          <PrivateRoute allowedRoles={["super_admin", "admin"]}>
            <AdminLayout />
          </PrivateRoute>
        }>
          <Route index element={<Dashboard />} />
          <Route path="/admin/listar-productos" element={<ListarProductos />} />
          <Route path="/admin/cargar-producto" element={<CargaProductos />} />
          <Route path="/admin/editar-producto/:id" element={<CargaProductos />} />
          <Route path="/admin/listar-categorias" element={<ListarCategorias />} />
          <Route path="/admin/cargar-categoria" element={<CargarCategorias />} />
          <Route path="/admin/editar-categoria/:id" element={<CargarCategorias />} />
          <Route path="/admin/listar-marcas" element={<ListarMarcas />} />
          <Route path="/admin/cargar-marcas" element={<CargarMarcas />} />
          <Route path="/admin/editar-marca/:id" element={<CargarMarcas />} />
          <Route path="/admin/listar-ventas" element={<ListarVentas />} />
          <Route path="/admin/listar-usuarios" element={<ListarUsuarios />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App
