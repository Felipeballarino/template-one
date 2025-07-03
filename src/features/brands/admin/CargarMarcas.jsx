import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { createMarcas, getMarcasByID, updateMarcas } from '../services/marcasServices'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';

const CargarMarcas = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const { register, handleSubmit, reset } = useForm()
    const [nombreMarca, setNombreMarca] = useState('')


    useEffect(() => {
        if (id) {
            getMarcasByID(id).then((marca) => {
                reset({
                    nombre: marca.nombre,
                    descripcion: marca.descripcion,
                    imagen: marca.imagen,
                })
                setNombreMarca(marca.nombre)
            })
        }
    }, [id, reset])





    const onSubmit = async (data) => {
        if (id) {
            await updateMarcas(id, data)
        } else {
            await createMarcas(data)
            reset()
            navigate(-1)
        }
        Swal.fire({
            icon: "success",
            title: id ? "Marca guardada" : "Marca creada",
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
                {id ? <h1 className="font-bold text-xl">{`${nombreMarca} - ${id}`}</h1> : <h1 className="font-bold text-xl">Carga de marca</h1>}
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                    <label className="block mb-1 font-medium">Nombre de la marca</label>
                    <input
                        {...register('nombre')}
                        className="w-full border border-gray-300 rounded px-3 py-2"
                        placeholder="Ej: Zapatillas Nike"
                    />
                </div>
                <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                    {id ? 'Guardar Marca' : 'Cargar Marca'}
                </button>
            </form>
        </div>
    )
}

export default CargarMarcas
