import React, { useEffect, useState } from 'react'
import Tables from '../../../components/Tables';
import { getProduct, deleteProduct } from '../../../services/productServices';
import { productColumns } from '../../../constants/columns/productColumns';
import HeaderTable from '../components/HeaderTable';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const ListarVentas = () => {
    const navigate = useNavigate()
    const [productos, setProductos] = useState([]);


    useEffect(() => {
        getProduct().then(setProductos);
    }, []);

    const deleteProd = (id) => {
        Swal.fire({
            title: "Desea elimar el producto??",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Eliminar"
        }).then(async (result) => {
            if (result.isConfirmed) {
                const resp = await deleteProduct(id)
                if (resp) {
                    Swal.fire({
                        title: "Producto Eliminado!",
                        icon: "success"
                    });
                    const nuevosProductos = await getProduct();
                    setProductos(nuevosProductos);
                }
            }
        });
    }

    const columns = productColumns(navigate, deleteProd); // pasamos navigate

    return (
        <div>
            <HeaderTable name={"Productos"} url={"/admin/cargar-producto"} />
            <Tables data={productos} columns={columns} />
        </div>
    )
}

export default ListarVentas
