import React, { useEffect, useState } from 'react'
import Tables from '../../../components/Tables';
import { getUsers } from '../../../services/usersSerivices';
import { userColumns } from '../../../constants/columns/usersColumns';
import HeaderTable from '../components/HeaderTable';


const ListarUsuarios = () => {
    const [users, setUsers] = useState([]);


    useEffect(() => {
        getUsers().then(setUsers);
    }, []);

    return (
        <div>
            <HeaderTable name={"Usuarios"} url={"/admin/cargar-usuario"} />
            <Tables data={users} columns={userColumns} />
        </div>
    )
}

export default ListarUsuarios
