import React, { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useEffect } from 'react'
import Layout from '../../shared/layout/Layout';
import FiltrosCatalogos from '../../features/products/components/organisms/FiltrosCatalogos';
import ProductCard from '../../features/products/components/organisms/ProductCard';
import { useProductsStore } from '../../store/productsStore';
import Seo from '../../shared/seo/Seo';
// import ProductCardWpp from '../components/ProductCardWpp';



const Productos = () => {
    const { products } = useProductsStore();

    const [searchParams, setSearchParams] = useSearchParams();

    const [marcaSeleccionada, setMarcaSeleccionada] = useState([]);
    const [categoriaSeleccionada, setCategoriaSeleccionada] = useState([]);

    const [busqueda, setBusqueda] = useState("");


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

    const productosFiltrados = products.filter(product => {
        const coincideMarca = marcaSeleccionada.length > 0 ? marcaSeleccionada.includes(product.marcaNombre) : true;
        const coincideCategoria = categoriaSeleccionada.length > 0 ? categoriaSeleccionada.includes(product.categoriaNombre) : true;
        const coincideBusqueda = busqueda
            ? [
                product.nombre,
                product.descripcion,
                product.marcaNombre,
                product.categoriaNombre
            ]
                .some(campo =>
                    campo?.toLowerCase().includes(busqueda.toLowerCase())
                )
            : true;

        return coincideMarca && coincideCategoria && coincideBusqueda;
    });

    return (
        <>
            <Seo title="Catalogo" description="Catalogo web" />
            <Layout>
                <div className="p-6 grid grid-cols-8 gap-4">
                    <FiltrosCatalogos
                        marcaSeleccionada={marcaSeleccionada}
                        setMarcaSeleccionada={setMarcaSeleccionada}
                        categoriaSeleccionada={categoriaSeleccionada}
                        setCategoriaSeleccionada={setCategoriaSeleccionada}
                        onSearch={setBusqueda}
                    />
                    <div className='col-span-6 grid grid-cols-3 gap-4 '>
                        {productosFiltrados.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}

                    </div>

                </div>
            </Layout>
        </>
    )
}
export default Productos
