// context/GlobalDataProvider.jsx
import { useEffect, useState } from "react";
import { getCategories } from "../../services/categoriesServices";
import { getMarcas } from "../../services/marcasServices";
import { getProduct } from "../../services/productServices";
import { GlobalDataContext } from "./GlobalDataContext";

export const GlobalDataProvider = ({ children }) => {
    const [categorias, setCategorias] = useState([]);
    const [marcas, setMarcas] = useState([]);
    const [productos, setProductos] = useState([]);

    const fetchCategorias = async () => {
        const data = await getCategories();
        setCategorias(data);
    };

    const fetchMarcas = async () => {
        const data = await getMarcas();
        setMarcas(data);
    };

    const fetchProductos = async () => {
        const data = await getProduct();
        setProductos(data);
    };



    useEffect(() => {
        fetchCategorias();
        fetchMarcas();
        fetchProductos();
    }, []);

    return (
        <GlobalDataContext.Provider
            value={{
                categorias,
                marcas,
                fetchCategorias,
                fetchMarcas,
                fetchProductos,
                productos,
            }}
        >
            {children}
        </GlobalDataContext.Provider>
    );
};
