import Tables from '../../../components/Tables';
import HeaderTable from '../components/HeaderTable';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { marcasColumns } from '../../../constants/columns/marcasColumns';
import { deleteMarcas } from "../../../services/marcasServices"

import { useGlobalData } from '../../../context/data/useGlobalData';

const ListarMarcas = () => {
    const navigate = useNavigate()

    const { marcas, fetchMarcas } = useGlobalData();


    const deleteMarca = (id) => {
        Swal.fire({
            title: "Desea elimar el producto??",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Eliminar"
        }).then(async (result) => {
            if (result.isConfirmed) {
                const resp = await deleteMarcas(id)
                if (resp) {
                    Swal.fire({
                        title: "Producto Eliminado!",
                        icon: "success"
                    });
                    fetchMarcas();
                }
            }
        });
    }

    const columns = marcasColumns(navigate, deleteMarca);


    return (
        <div>
            <HeaderTable name={"Marcas"} url={"/admin/cargar-marcas"} />
            <Tables data={marcas} columns={columns} />
        </div>
    )
}
export default ListarMarcas
