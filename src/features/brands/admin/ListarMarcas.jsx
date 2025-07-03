
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { marcasColumns } from '../constants/marcasColumns';
import { deleteMarcas } from "../services/marcasServices"
import TableComponent from '../../../shared/tables';
import { ADD_BRANDS } from '../constants/routes';
import { useBrandsStore } from '../../../store/brandsStore';

const ListarMarcas = () => {
    const navigate = useNavigate()

    const { brands, loadBrands, loading } = useBrandsStore();



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
                    loadBrands();
                }
            }
        });
    }

    const columns = marcasColumns(navigate, deleteMarca);


    return (
        <TableComponent
            name={"Marcas"}
            link={ADD_BRANDS}
            data={brands}
            columns={columns}
            loading={loading}
        />

    )
}
export default ListarMarcas
