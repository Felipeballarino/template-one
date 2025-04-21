import Tables from '../../../components/Tables';
import { deleteCategories } from '../../../services/categoriesServices';
import HeaderTable from '../components/HeaderTable';
import { categoriesColumns } from '../../../constants/columns/categoriesColumns';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

import { useGlobalData } from '../../../context/data/useGlobalData';

const ListarCategorias = () => {
    const navigate = useNavigate()

    const { categorias, fetchCategorias } = useGlobalData();

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
                    fetchCategorias();
                }
            }
        });
    }

    const columns = categoriesColumns(navigate, deleteCateg);


    return (
        <div>
            <HeaderTable name={"Categorias"} url={"/admin/cargar-categoria"} />
            <Tables data={categorias} columns={columns} />
        </div>
    )
}

export default ListarCategorias
