import { useEffect, useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import Swal from 'sweetalert2'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'
import { Button, Select, InputNumber } from 'antd'

import { createProduct, getProductByID, updateProduct } from '../../services/productServices'
import VarianteColorForm from '../../components/organisms/VarianteColorForm'
import VarianteTalleForm from '../../components/organisms/VarianteTalleForm'
import NombreDescripcionSection from './sections/NombreDescripcionSection'
import CategoriaMarcaSection from './sections/CategoriaMarcaSection'
import ImagenesUpload from './sections/ImagenesUpload'
import PreciosSection from './sections/PreciosSection'
import DimensionesSection from './sections/DimensionesSection'
import DestacarProductoSection from './sections/DestacarProductoSection'
import { useBrandsStore } from '../../../../store/brandsStore'
import { useCategoriesStore } from '../../../../store/categoriesStore'
import { useProductsStore } from '../../../../store/productsStore'

const CargaProductos = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const { handleSubmit, reset, setValue, getValues, control } = useForm()

    const { categories } = useCategoriesStore();
    const { brands } = useBrandsStore()
    const { loadProducts } = useProductsStore()

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
        setColumCategorias(categories.map((cat) => ({ id: cat.id, value: cat.id, label: cat.nombre })))
        setColumMarcas(brands.map((brand) => ({ id: brand.id, value: brand.id, label: brand.nombre })))

        if (id) {
            getProductByID(id).then((producto) => {
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
    }, [id, reset, categories, brands])



    const onSubmit = async (data) => {
        const categoria = categories.find((cat) => cat.id === data.categoriaId)
        const marca = brands.find((m) => m.id === data.marcaId)

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
            loadProducts()
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
                {/* Inputs de nombre, descripcion*/}
                <NombreDescripcionSection control={control} />

                {/* Select de categorias  y marcas */}
                <CategoriaMarcaSection
                    control={control}
                    columCategorias={columCategorias}
                    columMarcas={columMarcas}
                />

                {/* Fotos y videos */}
                <ImagenesUpload />

                {/* Input precios */}
                <PreciosSection
                    control={control}
                    viewPrecios={viewPrecios}
                    setViewPrecios={setViewPrecios}
                    getValues={getValues}
                    setValue={setValue}
                />

                {/* Input peso y dimensiones */}
                <DimensionesSection control={control} />

                {/* Tipo de Variantes */}
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
                        />
                    }
                </div>
                {/* seccion destacar productos */}
                <DestacarProductoSection control={control} />

                <Button type="primary" htmlType="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                    {id ? 'Guardar Producto' : 'Cargar Producto'}
                </Button>
            </form>
        </div>
    )
}

export default CargaProductos
