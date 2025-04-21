import { Button } from 'antd'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Login from './Login'
import { useAuth } from '../context/auth/useAuth'


const Header = ({ showDrawer }) => {
    const [modalOpen, setModalOpen] = useState(false);

    const { user, logout } = useAuth()

    const roleView = ["super_admin", "admin"]
    return (
        <div className='border-b w-full flex justify-between items-center px-4 py-6'>
            <div>
                <h1>logo</h1>
            </div>
            <div>
                <ul className='flex gap-8'>
                    <li>
                        <Link to={"/"}>Inicio</Link>
                    </li>
                    <li>
                        <Link to={"/productos"}>Catalogo</Link>
                    </li>
                    {roleView.includes(user?.role) && <li>
                        <Link to={"/admin"}>Administrador</Link>
                    </li>}
                </ul>
            </div>
            <div>
                {/* <Button onClick={showDrawer}>
                    carrito
                </Button> */}
                {/* <Avatar icon={<UserOutlined />} /> */}
                {user ?
                    <Button onClick={logout}>
                        Logout
                    </Button>
                    :
                    <Button onClick={() => setModalOpen(true)}>
                        login
                    </Button>
                }
            </div>
            <Login open={modalOpen} onClose={() => setModalOpen(false)} />
        </div >
    )
}

export default Header
