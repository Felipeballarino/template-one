import React, { useEffect, useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import Swal from 'sweetalert2'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'
import { Button, Input, Select, InputNumber } from 'antd'

import { createProduct, getProductByID, updateProduct } from '../../../services/productServices'
import { useGlobalData } from '../../../context/data/useGlobalData'
import { talles } from '../../../constants/enums'

const { TextArea } = Input

const CargaProductos = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const { handleSubmit, reset, control } = useForm()

    const { categorias, marcas, fetchProductos } = useGlobalData()
    const [columCategorias, setColumCategorias] = useState([])
    const [columMarcas, setColumMarcas] = useState([])
    const [nombreProducto, setNombreProducto] = useState('')

    const [variantes, setVariantes] = useState([])
    const [nuevaVariante, setNuevaVariante] = useState({
        imagen: '',
        color: '#000000',
        nombreColor: '',
        talles: []
    })

    const [nuevoTalle, setNuevoTalle] = useState({ talle: '', stock: 0 })
    const [poseeDescuentoValue, setPoseeDescuentoValue] = useState(false);


    useEffect(() => {
        setColumCategorias(categorias.map((cat) => ({ id: cat.id, value: cat.id, label: cat.nombre })))
        setColumMarcas(marcas.map((cat) => ({ id: cat.id, value: cat.id, label: cat.nombre })))

        if (id) {
            getProductByID(id).then((producto) => {
                reset({
                    nombre: producto.nombre,
                    descripcion: producto.descripcion,
                    precio: producto.precio,
                    categoriaId: producto.categoriaId,
                    marcaId: producto.marcaId,
                    variantes: producto.variantes,
                    poseeDescuento: producto.poseeDescuento,
                    descuento: producto.descuento
                })
                setNombreProducto(producto.nombre)
                if (producto.variantes) {
                    setVariantes(producto.variantes)
                }
                if (producto.poseeDescuento) {
                    setPoseeDescuentoValue(producto.poseeDescuento)
                }
            })
        }
    }, [id, reset, categorias, marcas])


    const agregarTalle = () => {
        if (!nuevoTalle.talle || nuevoTalle.stock < 0) return
        setNuevaVariante({
            ...nuevaVariante,
            talles: [...nuevaVariante.talles, nuevoTalle]
        })
        setNuevoTalle({ talle: '', stock: 0 })
    }

    const eliminarTalle = (index) => {
        setNuevaVariante({
            ...nuevaVariante,
            talles: nuevaVariante.talles.filter((_, i) => i !== index)
        })
    }

    const agregarVariante = () => {
        const { imagen, color, nombreColor, talles } = nuevaVariante
        if (!imagen || !nombreColor || !color || talles.length === 0) return alert('Completá todos los campos de la variante')

        setVariantes([...variantes, nuevaVariante])
        setNuevaVariante({ imagen: '', color: '#000000', nombreColor: '', talles: [] })
    }

    const eliminarVariante = (index) => {
        setVariantes(variantes.filter((_, i) => i !== index))
    }

    const onSubmit = async (data) => {
        const categoria = categorias.find((cat) => cat.id === data.categoriaId)
        const marca = marcas.find((m) => m.id === data.marcaId)

        console.log(data)
        if (poseeDescuentoValue && !data?.descuento) {
            return alert('Cargar descuento !')
        }

        if (variantes.length === 0 || !categoria || !marca) return alert('Faltan datos !')


        const productoFinal = {
            ...data,
            variantes,
            categoriaNombre: categoria?.nombre || '',
            marcaNombre: marca?.nombre || ''
        }

        if (id) {
            await updateProduct(id, productoFinal)
        } else {
            await createProduct(productoFinal)
            reset()
            setVariantes([])
            navigate(-1)
            fetchProductos()
        }

        Swal.fire({
            icon: 'success',
            title: id ? 'Producto guardado' : 'Producto creado',
            showConfirmButton: false,
            timer: 1500
        })
    }

    return (
        <div className="mx-auto py-1">
            <div className="flex mb-4">
                <button className="cursor-pointer" title="Volver" onClick={() => navigate(-1)}>
                    <ArrowBackIosIcon />
                </button>
                {id ? (
                    <h1 className="font-bold text-xl">{`${nombreProducto} - ${id}`}</h1>
                ) : (
                    <h1 className="font-bold text-xl">Carga de Productos</h1>
                )}
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {/* Inputs de nombre, descripcion, etc. mantenidos igual */}
                <Controller
                    name="nombre"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                        <>
                            <label className="block mb-1 font-medium">Nombre del producto <span className="text-red-500">*</span></label>
                            <Input {...field} placeholder="Ej: Zapatillas Nike" required />
                        </>
                    )}
                />

                <Controller
                    name="descripcion"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                        <>
                            <label className="block mb-1 font-medium">Descripción <span className="text-red-500">*</span></label>
                            <TextArea {...field} rows={4} placeholder="Descripción del producto" required />
                        </>
                    )}
                />

                <div className="flex gap-4">
                    <Controller
                        name="categoriaId"
                        control={control}
                        defaultValue=""
                        render={({ field }) => (
                            <div>
                                <label className="block mb-1 font-medium">Categoría <span className="text-red-500">*</span></label>
                                <Select {...field} className="w-50" options={columCategorias} required />
                            </div>
                        )}
                    />
                    <Controller
                        name="marcaId"
                        control={control}
                        defaultValue=""
                        render={({ field }) => (
                            <div>
                                <label className="block mb-1 font-medium">Marca <span className="text-red-500">*</span></label>
                                <Select {...field} className="w-50" options={columMarcas} required />
                            </div>
                        )}
                    />
                    <Controller
                        name="poseeDescuento"
                        control={control}
                        defaultValue=""
                        render={({ field }) => (
                            <div>
                                <label className="block mb-1 font-medium">Posee descuento <span className="text-red-500">*</span></label>
                                <Select
                                    {...field}
                                    className="w-50"
                                    options={[
                                        { value: true, label: 'Sí' },
                                        { value: false, label: 'No' }
                                    ]}
                                    onChange={(value) => {
                                        field.onChange(value)
                                        setPoseeDescuentoValue(value)
                                    }}
                                />
                            </div>
                        )}
                    />
                    {poseeDescuentoValue && (
                        <Controller
                            name="descuento"
                            control={control}
                            defaultValue=""
                            render={({ field }) => (
                                <div>
                                    <label className="block mb-1 font-medium">Descuento % <span className="text-red-500">*</span></label>
                                    <InputNumber {...field} min={0} max={100} className="w-50" />
                                </div>
                            )}
                        />
                    )}
                </div>

                <Controller
                    name="precio"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                        <>
                            <label className="block mb-1 font-medium">Precio <span className="text-red-500">*</span></label>
                            <Input {...field} type="number" step="0.01" min={0} placeholder="Ej: 19999.99" required />
                        </>
                    )}
                />

                {/* VARIANTES */}
                <div className="mt-6 border p-4 rounded">
                    <h2 className="font-semibold mb-4">Agregar Variantes <span className="text-red-500">*</span></h2>

                    <Input placeholder="URL de imagen" value={nuevaVariante.imagen} onChange={(e) => setNuevaVariante({ ...nuevaVariante, imagen: e.target.value })} />

                    <div className="flex items-center gap-3 flex-wrap">
                        <label className="font-medium">Color</label>
                        <input type="color" value={nuevaVariante.color} onChange={(e) => setNuevaVariante({ ...nuevaVariante, color: e.target.value })} className="w-10 h-10 rounded border" />
                        <Input placeholder="Nombre del color" value={nuevaVariante.nombreColor} onChange={(e) => setNuevaVariante({ ...nuevaVariante, nombreColor: e.target.value })} />
                    </div>

                    <div className="mt-3 flex items-center gap-3 flex-wrap">
                        <Select placeholder="Talle" value={nuevoTalle.talle} onChange={(value) => setNuevoTalle({ ...nuevoTalle, talle: value })} options={talles} style={{ width: 100 }} />
                        <InputNumber placeholder="Stock" min={0} value={nuevoTalle.stock} onChange={(value) => setNuevoTalle({ ...nuevoTalle, stock: value })} />
                        <Button type="dashed" onClick={agregarTalle}>Agregar Talle</Button>
                    </div>

                    {nuevaVariante.talles.length > 0 && (
                        <div className="mt-2 space-y-1">
                            {nuevaVariante.talles.map((t, i) => (
                                <div key={i} className="flex justify-between items-center">
                                    <span>{t.talle} - Stock: {t.stock}</span>
                                    <Button size="small" danger onClick={() => eliminarTalle(i)}>Eliminar</Button>
                                </div>
                            ))}
                        </div>
                    )}

                    <Button type="primary" className="mt-3" onClick={agregarVariante}>Agregar Variante</Button>

                    {variantes.length > 0 && (
                        <div className="mt-4 space-y-2">
                            {variantes.map((v, i) => (
                                <div key={i} className="border px-3 py-2 rounded">
                                    <div className="flex items-center gap-4">
                                        <img src={v.imagen} alt="Variante" className="w-12 h-12 object-cover rounded" />
                                        <div>
                                            <div>{v.nombreColor}</div>
                                            <div className="text-sm text-gray-500">
                                                <span className="inline-block w-3 h-3 rounded-full mr-2" style={{ backgroundColor: v.color }}></span>
                                                {v.talles.map(t => `${t.talle} (${t.stock})`).join(', ')}
                                            </div>
                                        </div>
                                    </div>
                                    <Button danger onClick={() => eliminarVariante(i)} className="mt-2">Eliminar</Button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <Button type="primary" htmlType="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                    {id ? 'Guardar Producto' : 'Cargar Producto'}
                </Button>
            </form>
        </div>
    )
}

export default CargaProductos
