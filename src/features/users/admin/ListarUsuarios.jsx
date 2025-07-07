import { useEffect, useState } from 'react'
import { getUsers } from '../services/usersSerivices';
import { userColumns } from '../constants/usersColumns';
import TableComponent from '../../../shared/tables';


const ListarUsuarios = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true)


    useEffect(() => {
        getUsers().then(setUsers).finally(() => setLoading(false));
    }, []);

    return (
        <TableComponent
            name={"Usuarios"}
            link={"/admin/cargar-usuario"}
            data={users} columns={userColumns}
            loading={loading} />


    )
}

export default ListarUsuarios
