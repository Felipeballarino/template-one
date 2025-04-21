import React, { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useEffect } from 'react'
import Layout from '../components/Layout';
import FiltrosCatalogos from '../components/FiltrosCatalogos';
import ProductCard from '../components/ProductCard';
import { useGlobalData } from '../context/data/useGlobalData';
import ProductCardWpp from '../components/ProductCardWpp';


const Productos = () => {
    const { categorias, marcas, productos } = useGlobalData();

    const [searchParams, setSearchParams] = useSearchParams();

    const [marcaSeleccionada, setMarcaSeleccionada] = useState([]);
    const [categoriaSeleccionada, setCategoriaSeleccionada] = useState([]);

    // Leer de la URL al cargar
    useEffect(() => {
        const marcasFromURL = searchParams.get("marcas")?.split(",") || [];
        const categoriasFromURL = searchParams.get("categorias")?.split(",") || [];
        setMarcaSeleccionada(marcasFromURL);
        setCategoriaSeleccionada(categoriasFromURL);
    }, [searchParams]);

    // Actualizar la URL cuando cambia el filtro
    useEffect(() => {
        const params = {};
        if (marcaSeleccionada.length > 0) {
            params.marcas = marcaSeleccionada.join(",");
        }
        if (categoriaSeleccionada.length > 0) {
            params.categorias = categoriaSeleccionada.join(",");
        }
        setSearchParams(params);
    }, [marcaSeleccionada, categoriaSeleccionada, setSearchParams]);

    const productosFiltrados = productos.filter(product => {
        const coincideMarca = marcaSeleccionada.length > 0 ? marcaSeleccionada.includes(product.marcaNombre) : true
        const coincideCategoria = categoriaSeleccionada.length > 0 ? categoriaSeleccionada.includes(product.categoriaNombre) : true
        return coincideMarca && coincideCategoria
    })

    return (
        <Layout>
            <div className="p-6 grid grid-cols-8 gap-4">
                <FiltrosCatalogos
                    marcas={marcas}
                    categorias={categorias}
                    marcaSeleccionada={marcaSeleccionada}
                    setMarcaSeleccionada={setMarcaSeleccionada}
                    categoriaSeleccionada={categoriaSeleccionada}
                    setCategoriaSeleccionada={setCategoriaSeleccionada}
                />
                <div className='col-span-6 grid grid-cols-3 gap-4 '>
                    {/* {productosFiltrados.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))} */}
                    {productosFiltrados.map((product) => (
                        <ProductCardWpp key={product.id} product={product} />
                    ))}
                </div>

            </div>
        </Layout>
    )
}
export default Productos
