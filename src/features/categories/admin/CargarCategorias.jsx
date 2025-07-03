import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { createCategories, getCategoriesByID, updateCategories } from '../services/categoriesServices'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';

const CargarCategorias = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const { register, handleSubmit, reset } = useForm()
    const [nombreCategoria, setNombreCategoria] = useState('')


    useEffect(() => {
        if (id) {
            getCategoriesByID(id).then((categoria) => {
                console.log(categoria)
                reset({
                    nombre: categoria.nombre,
                    descripcion: categoria.descripcion,
                    imagen: categoria.imagen,
                })
                setNombreCategoria(categoria.nombre)
            })
        }
    }, [id, reset])





    const onSubmit = async (data) => {
        if (id) {
            await updateCategories(id, data)
        } else {
            await createCategories(data)
            reset()
            navigate(-1)
        }
        Swal.fire({
            icon: "success",
            title: id ? "Categoria guardada" : "Categoria creada",
            showConfirmButton: false,
            timer: 1500
        });
    }




    return (
        <div className="mx-auto py-1">
            <div className='flex mb-4'>
                <button className='cursor-pointer ' title='Volver' onClick={() => navigate(-1)}>
                    <ArrowBackIosIcon />
                </button>
                {id ? <h1 className="font-bold text-xl">{`${nombreCategoria} - ${id}`}</h1> : <h1 className="font-bold text-xl">Carga de categoria</h1>}
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                    <label className="block mb-1 font-medium">Nombre de la categoria</label>
                    <input
                        {...register('nombre')}
                        className="w-full border border-gray-300 rounded px-3 py-2"
                        placeholder="Ej: Zapatillas Nike"
                    />
                </div>

                <div>
                    <label className="block mb-1 font-medium">Descripción</label>
                    <textarea
                        {...register('descripcion')}
                        className="w-full border border-gray-300 rounded px-3 py-2"
                        placeholder="Descripción del producto"
                    />
                </div>

                <div>
                    <label className="block mb-1 font-medium">URL de imagen</label>
                    <input
                        {...register('imagen')}
                        className="w-full border border-gray-300 rounded px-3 py-2"
                        placeholder="https://..."
                    />
                </div>

                <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                    {id ? 'Guardar Categoria' : 'Cargar Categoria'}
                </button>
            </form>
        </div>
    )
}

export default CargarCategorias
