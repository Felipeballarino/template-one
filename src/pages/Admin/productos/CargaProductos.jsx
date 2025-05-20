import React, { useEffect, useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import Swal from 'sweetalert2'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'
import { Button, Input, Select, InputNumber, Checkbox } from 'antd'

import { createProduct, getProductByID, updateProduct } from '../../../services/productServices'
import { useGlobalData } from '../../../context/data/useGlobalData'
import { talles } from '../../../constants/enums'
import EditorTextArea from './Components/EditorTextArea'
import VarianteColorForm from './Components/VarianteColorForm'
import VarianteTalleForm from './Components/VarianteTalleForm'


const CargaProductos = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const { handleSubmit, reset, setValue, getValues, control } = useForm()

    const { categorias, marcas, fetchProductos } = useGlobalData()
    const [columCategorias, setColumCategorias] = useState([])
    const [columMarcas, setColumMarcas] = useState([])
    const [nombreProducto, setNombreProducto] = useState('')
    const [viewPrecios, setViewPrecios] = useState(false)

    const [tipoVariante, setTipoVariante] = useState(1); // '1:solo', '2:color', '3:talle'

    const [variantesTalle, setVariantesTalle] = useState([])
    const [nuevaVarianteTalle, setNuevaVarianteTalle] = useState({
        color: '#000000',
        nombreColor: '',
        talles: []
    })
    const [nuevoTalle, setNuevoTalle] = useState({ talle: null, stock: 0 })

    const [variantesColor, setVariantesColor] = useState([]);
    const [nuevaVarianteColor, setNuevaVarianteColor] = useState({
        color: '#000000',
        nombreColor: '',
        stock: 0
    });



    useEffect(() => {
        setColumCategorias(categorias.map((cat) => ({ id: cat.id, value: cat.id, label: cat.nombre })))
        setColumMarcas(marcas.map((cat) => ({ id: cat.id, value: cat.id, label: cat.nombre })))

        if (id) {
            getProductByID(id).then((producto) => {
                console.log(producto)
                reset({
                    nombre: producto.nombre,
                    descripcion: producto.descripcion,
                    viewPrecios: producto.viewPrecios,
                    precio: producto.precio,
                    categoriaId: producto.categoriaId,
                    marcaId: producto.marcaId,
                    variantes: producto.variantes,
                    precioDescuento: producto.precioDescuento,
                    porcentajeDescuento: producto.porcentajeDescuento,
                    peso: producto.peso,
                    profundidad: producto.profundidad,
                    ancho: producto.ancho,
                    alto: producto.alto,
                    isDestacado: producto.isDestacado,
                    isNovedad: producto.isNovedad,
                    isOferta: producto.isOferta,
                    tipoVariante: producto.tipoVariante,
                    stockGeneral: producto.stockGeneral
                })
                setNombreProducto(producto.nombre)
                setViewPrecios(producto.viewPrecios)
                setTipoVariante(producto.tipoVariante)
                if (producto.variantesTalle) {
                    setVariantesTalle(producto.variantesTalle)
                }
                if (producto.variantesColor) {
                    setVariantesColor(producto.variantesColor)
                }

            })
        }
    }, [id, reset, categorias, marcas])



    const onSubmit = async (data) => {
        const categoria = categorias.find((cat) => cat.id === data.categoriaId)
        const marca = marcas.find((m) => m.id === data.marcaId)

        if (!categoria || !marca) return alert('Faltan datos !')

        const productoFinal = {
            ...data,
            variantesColor,
            variantesTalle,
            categoriaNombre: categoria?.nombre || '',
            marcaNombre: marca?.nombre || ''
        }

        if (id) {
            await updateProduct(id, productoFinal)
        } else {
            await createProduct(productoFinal)
            reset()
            setVariantesTalle([])
            setVariantesColor([])
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

    // Calcular descuento en %
    const calcularPorcentaje = (precio, precioDescuento) => {
        console.log(precio, precioDescuento)
        if (!precio || !precioDescuento) return 0
        return Math.round(((precio - precioDescuento) / precio) * 100)
    }

    // Calcular precio con descuento
    const calcularPrecioDescuento = (precio, porcentaje) => {
        if (!precio || !porcentaje) return 0
        return Math.round(precio * (1 - porcentaje / 100))
    }


    return (
        <div className="mx-auto py-1">
            <div className="flex mb-4 bg-white p-6 rounded shadow">
                <button className="cursor-pointer" title="Volver" onClick={() => navigate(-1)}>
                    <ArrowBackIosIcon />
                </button>
                {id ? (
                    <h1 className="font-bold text-3xl">{`${nombreProducto} - ${id}`}</h1>
                ) : (
                    <h1 className="font-bold text-xl">Carga de Productos</h1>
                )}
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {/* Inputs de nombre, descripcion, etc. mantenidos igual */}
                <div className='bg-white p-6 rounded shadow'>
                    <h2 className='font-bold text-2xl mb-2'>Nombre y Descripcion</h2>
                    <Controller
                        name="nombre"
                        control={control}
                        defaultValue=""
                        render={({ field }) => (
                            <>
                                <label className="block mb-1 text-gray-500 font-medium text-sm">Nombre<span className="text-red-500">*</span></label>
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
                                <label className="block mb-1 text-gray-500 font-medium text-sm mt-3">Descripción <span className="text-red-500">*</span></label>
                                {/* <TextArea {...field} rows={4} placeholder="Descripción del producto" required /> */}
                                <EditorTextArea value={field.value} onChange={field.onChange} />
                            </>
                        )}
                    />
                </div>

                <div className="bg-white p-6 rounded shadow">
                    <h2 className='font-bold text-2xl mb-2'>Categoria y Marca</h2>
                    <div className='flex gap-4'>
                        <Controller
                            name="categoriaId"
                            control={control}
                            defaultValue=""
                            render={({ field }) => (
                                <div className='w-1/2'>
                                    <label className="block mb-1 text-gray-500 font-medium text-sm">Categoría <span className="text-red-500">*</span></label>
                                    <Select {...field} className='w-full' options={columCategorias} required />
                                </div>
                            )}
                        />
                        <Controller
                            name="marcaId"
                            control={control}
                            defaultValue=""
                            render={({ field }) => (
                                <div className='w-1/2'>
                                    <label className="block mb-1 text-gray-500 font-medium text-sm">Marca <span className="text-red-500">*</span></label>
                                    <Select {...field} className='w-full' options={columMarcas} required />
                                </div>
                            )}
                        />
                    </div>
                </div>
                <div className="bg-white p-6 rounded shadow">
                    <h2 className='font-bold text-2xl mb-2'>Fotos y Videos</h2>
                    <div
                        className='border-2 border-dashed border-blue-600 rounded w-full h-24 flex justify-center items-center  '>
                        <label
                            htmlFor="fileInput"
                            className='cursor-pointer rounded flex flex-col items-center justify-center text-center w-full h-full bg-blue-50 '
                        >
                            <div className='text-sm text-blue-600 font-medium '>
                                Haz clic aquí para subir archivos<br />
                                <span style={{ fontSize: "12px" }}>(Formatos permitidos: .png, .pdf, .jpg, .jpeg)</span>
                            </div>
                        </label>
                        <input
                            id="fileInput"
                            type="file"
                            name="documentosParaAdjuntar"
                            accept=".png,.pdf,.jpg,.jpeg"
                            style={{ display: "none" }}
                            onChange={(e) => console.log(e)}
                        />
                    </div>
                </div>
                <div className="bg-white p-6 rounded shadow">
                    <h2 className='font-bold text-2xl mb-2'>Precios</h2>
                    <Controller
                        name="viewPrecios"
                        control={control}
                        defaultValue=""
                        render={({ field: { value, onChange } }) => (
                            <>
                                <Checkbox
                                    checked={value}
                                    onChange={e => {
                                        const isChecked = e.target.checked
                                        setViewPrecios(isChecked)
                                        onChange(isChecked)
                                    }}
                                    className="block mb-8 font-medium w-full"
                                >
                                    Mostrar precios en tienda
                                </Checkbox>
                            </>
                        )}
                    />
                    <div className='flex gap-4 mt-2'>
                        <Controller
                            name="precio"
                            control={control}
                            defaultValue=""
                            render={({ field }) => (
                                <div className='w-full' >
                                    <label className="block mb-1 text-gray-500 font-medium text-sm">Precio de venta<span className="text-red-500">*</span></label>
                                    <InputNumber
                                        {...field}
                                        style={{ width: '100%' }}
                                        type="number"
                                        min={0}
                                        placeholder="Ej: 19999.99"
                                        required
                                        disabled={!viewPrecios}
                                        prefix={"$"}
                                        onChange={(value) => {
                                            field.onChange(value)
                                            const currentDescuento = getValues('porcentajeDescuento')
                                            setValue('precioDescuento', calcularPrecioDescuento(value, currentDescuento))
                                        }}
                                    />
                                </div>
                            )}
                        />
                        <Controller
                            name="precioDescuento"
                            control={control}
                            defaultValue=""
                            render={({ field }) => (
                                <div className='w-full'>
                                    <label className="block mb-1 text-gray-500 font-medium text-sm">Precio promocional</label>
                                    <InputNumber
                                        {...field}
                                        style={{ width: '100%' }}
                                        type="number"
                                        min={0}
                                        placeholder="Ej: 19999.99"
                                        prefix={"$"}
                                        disabled={!viewPrecios}
                                        onChange={(value) => {
                                            field.onChange(value)
                                            const currentPrecio = getValues('precio')
                                            setValue('porcentajeDescuento', calcularPorcentaje(currentPrecio, value))
                                        }}
                                    />
                                </div>
                            )}
                        />
                        <Controller
                            name="porcentajeDescuento"
                            control={control}
                            defaultValue=""
                            render={({ field }) => (
                                <div className='w-full'>
                                    <label className="block mb-1 text-gray-500 font-medium text-sm">Descuento (%)</label>
                                    <InputNumber
                                        {...field}
                                        style={{ width: '100%' }}
                                        type="number"
                                        max={100}
                                        min={0}
                                        placeholder="Ej: 10"
                                        required
                                        prefix={"%"}
                                        disabled={!viewPrecios}
                                        onChange={(value) => {
                                            field.onChange(value)
                                            const currentPrecio = getValues('precio')
                                            setValue('precioDescuento', calcularPrecioDescuento(currentPrecio, value))
                                        }}
                                    />
                                </div>
                            )}
                        />
                    </div>
                </div>
                <div className="bg-white p-6 rounded shadow">
                    <h2 className='font-bold text-2xl mb-2'>Peso y dimensiones</h2>
                    <p className='mb-2'>Ingresá los datos para calcular el costo de envío de los productos y mostrar los medios de envío en tu tienda.</p>
                    <div className='flex gap-4'>
                        <Controller
                            name="peso"
                            control={control}
                            defaultValue=""
                            render={({ field }) => (
                                <div className='w-1/2'>
                                    <label className="block mb-1 text-gray-500 font-medium text-sm">Peso</label>
                                    <Input
                                        {...field}
                                        className='w-full'
                                        type="number"
                                        placeholder="0.00"
                                        suffix={"kg"}
                                    />
                                </div>
                            )}
                        />
                        <Controller
                            name="profundidad"
                            control={control}
                            defaultValue=""
                            render={({ field }) => (
                                <div className='w-1/2'>
                                    <label className="block mb-1 text-gray-500 font-medium text-sm">Profundidad</label>
                                    <Input
                                        {...field}
                                        className='w-full'
                                        type="number"
                                        placeholder="0.00"
                                        suffix={"cm"}
                                    />
                                </div>
                            )}
                        />
                        <Controller
                            name="ancho"
                            control={control}
                            defaultValue=""
                            render={({ field }) => (
                                <div className='w-1/2'>
                                    <label className="block mb-1 text-gray-500 font-medium text-sm">Ancho</label>
                                    <Input
                                        {...field}
                                        className='w-full'
                                        type="number"
                                        placeholder="0.00"
                                        suffix={"cm"}
                                    />
                                </div>
                            )}
                        />
                        <Controller
                            name="alto"
                            control={control}
                            defaultValue=""
                            render={({ field }) => (
                                <div className='w-1/2'>
                                    <label className="block mb-1 text-gray-500 font-medium text-sm">Alto</label>
                                    <Input
                                        {...field}
                                        className='w-full'
                                        type="number"
                                        placeholder="0.00"
                                        suffix={"cm"}
                                    />
                                </div>
                            )}
                        />
                    </div>
                </div>
                <div className="bg-white p-6 rounded shadow">
                    <h2 className='font-bold text-2xl mb-2'>Variantes</h2>
                    <div className="mb-4">
                        <Controller
                            name="tipoVariante"
                            control={control}
                            defaultValue=""
                            render={({ field }) => (
                                <div className='w-1/2'>
                                    <label className="font-medium block mb-1">Tipo de variantes</label>
                                    <Select
                                        {...field}
                                        value={tipoVariante}
                                        options={[
                                            { label: 'Solo stock', value: 1 },
                                            { label: 'Color + Stock', value: 2 },
                                            { label: 'Color + Talle + Stock', value: 3 },
                                        ]}
                                        style={{ width: 250 }}
                                        onChange={value => {
                                            setTipoVariante(value)
                                            field.onChange(value)
                                        }}
                                        required />
                                </div>
                            )}
                        />
                    </div>
                    {tipoVariante === 1 && (
                        <div className="flex flex-col gap-2 mb-4">
                            <Controller
                                name="stockGeneral"
                                control={control}
                                defaultValue=""
                                render={({ field }) => (
                                    <div className='w-full' >
                                        <label className="block mb-1 text-gray-500 font-medium text-sm">Stock</label>
                                        <InputNumber
                                            {...field}
                                            style={{ width: '100%' }}
                                            type="number"
                                            min={0}
                                            placeholder="Ej: 50"
                                        />
                                    </div>
                                )}
                            />

                        </div>
                    )}
                    {
                        tipoVariante === 2 &&
                        <VarianteColorForm
                            variantesColor={variantesColor}
                            setVariantesColor={setVariantesColor}
                            nuevaVarianteColor={nuevaVarianteColor}
                            setNuevaVarianteColor={setNuevaVarianteColor}
                        />
                    }
                    {tipoVariante === 3 &&
                        <VarianteTalleForm
                            variantesTalle={variantesTalle}
                            setVariantesTalle={setVariantesTalle}
                            nuevaVarianteTalle={nuevaVarianteTalle}
                            setNuevaVarianteTalle={setNuevaVarianteTalle}
                            nuevoTalle={nuevoTalle}
                            setNuevoTalle={setNuevoTalle}
                            talles={talles}
                        />
                    }
                </div>
                <div className="bg-white p-6 rounded shadow">
                    <h2 className='font-bold text-2xl mb-2'>Destacar producto</h2>
                    <Controller
                        name="isDestacado"
                        control={control}
                        defaultValue=""
                        render={({ field: { value, onChange } }) => (
                            <>
                                <Checkbox
                                    checked={value}
                                    onChange={e => {
                                        const isChecked = e.target.checked
                                        onChange(isChecked)
                                    }}
                                    className="block mb-8 font-medium w-full"
                                >
                                    Destacados
                                </Checkbox>
                            </>
                        )}
                    />
                    <Controller
                        name="isNovedad"
                        control={control}
                        defaultValue=""
                        render={({ field: { value, onChange } }) => (
                            <>
                                <Checkbox
                                    checked={value}
                                    onChange={e => {
                                        const isChecked = e.target.checked
                                        onChange(isChecked)
                                    }}
                                    className="block mb-8 font-medium w-full"
                                >
                                    Novedades
                                </Checkbox>
                            </>
                        )}
                    />
                    <Controller
                        name="isOferta"
                        control={control}
                        defaultValue=""
                        render={({ field: { value, onChange } }) => (
                            <>
                                <Checkbox
                                    checked={value}
                                    onChange={e => {
                                        const isChecked = e.target.checked
                                        onChange(isChecked)
                                    }}
                                    className="block mb-8 font-medium w-full"
                                >
                                    Ofertas
                                </Checkbox>
                            </>
                        )}
                    />


                </div>
                <Button type="primary" htmlType="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                    {id ? 'Guardar Producto' : 'Cargar Producto'}
                </Button>
            </form>
        </div>
    )
}

export default CargaProductos
