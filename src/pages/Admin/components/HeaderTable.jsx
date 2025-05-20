import React from 'react'
import { useNavigate } from 'react-router-dom'

const HeaderTable = ({ name, url }) => {
    const navigate = useNavigate()

    const createProduct = () => {
        navigate(url)
    }

    return (
        <div className='flex justify-between items-center py-2'>
            <h1 className='font-semibold text-3xl py-1 '>{name}</h1>
            <button
                onClick={createProduct}
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 cursor-pointer"
            >
                Cargar {name}
            </button>
        </div>
    )
}

export default HeaderTable
