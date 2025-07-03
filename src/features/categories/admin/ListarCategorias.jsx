import { deleteCategories } from '../services/categoriesServices';
import { categoriesColumns } from '../constants/categoriesColumns';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

import TableComponent from '../../../shared/tables';
import { useCategoriesStore } from '../../../store/categoriesStore';

const ListarCategorias = () => {
    const navigate = useNavigate()

    const { categories, loadCategories, loading } = useCategoriesStore();

    const deleteCateg = (id) => {
        Swal.fire({
            title: "Desea elimar la categoria??",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Eliminar"
        }).then(async (result) => {
            if (result.isConfirmed) {
                const resp = await deleteCategories(id)
                if (resp) {
                    Swal.fire({
                        title: "Categoria Eliminada!",
                        icon: "success"
                    });
                    loadCategories();
                }
            }
        });
    }

    const columns = categoriesColumns(navigate, deleteCateg);


    return (
        <TableComponent
            name={"Categorias"}
            link={"/admin/cargar-categoria"}
            data={categories} columns={columns}
            loading={loading} />

    )
}

export default ListarCategorias
