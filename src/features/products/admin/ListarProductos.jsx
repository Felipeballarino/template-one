import { deleteProduct } from '../services/productServices';
import { productColumns } from '../constants/productColumns';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import TableComponent from '../../../shared/tables';
import { useProductsStore } from '../../../store/productsStore';

const ListarProductos = () => {
    const navigate = useNavigate()

    const { products, loadProducts, loading } = useProductsStore();


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
                    loadProducts()
                }
            }
        });
    }

    const columns = productColumns(navigate, deleteProd); // pasamos navigate

    return (
        <TableComponent
            name={"Productos"}
            link={"/admin/cargar-producto"}
            data={products} columns={columns}
            loading={loading} />

    )
}

export default ListarProductos
