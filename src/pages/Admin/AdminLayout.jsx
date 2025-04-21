import React from 'react'
import Layout from '../../components/Layout'
import { Outlet, NavLink } from "react-router-dom";


const AdminLayout = () => {


    return (
        <Layout>
            <div className="flex min-h-screen bg-gray-100">
                {/* Sidebar */}
                <aside className="w-64 bg-white shadow-md p-6">
                    <h2 className="text-xl font-bold mb-6">Admin</h2>
                    <nav className="space-y-4 flex flex-col">
                        <NavLink to="/admin/listar-productos" className={({ isActive }) => isActive ? 'text-blue-600 font-bold' : ''}>📦 Productos</NavLink>
                        <NavLink to="/admin/listar-categorias" className={({ isActive }) => isActive ? 'text-blue-600 font-bold' : ''}>🗃️ Categorias</NavLink>
                        <NavLink to="/admin/listar-marcas" className={({ isActive }) => isActive ? 'text-blue-600 font-bold' : ''}>🔖 Marcas</NavLink>
                        <NavLink to="/admin/listar-ventas" className={({ isActive }) => isActive ? 'text-blue-600 font-bold' : ''}>📈 Ventas</NavLink>
                        <NavLink to="/admin/listar-usuarios" className={({ isActive }) => isActive ? 'text-blue-600 font-bold' : ''}>👥 Usuarios</NavLink>
                    </nav>
                </aside>

                {/* Contenido Principal */}
                <main className="flex-grow p-8 w-100">
                    <div className="flex justify-between items-center mb-6">
                        <h1 className="text-2xl font-bold">Panel de Administración</h1>
                    </div>

                    <div className="bg-white p-6 rounded shadow">
                        <Outlet />
                    </div>
                </main>
            </div>
        </Layout>
    );
}

export default AdminLayout
