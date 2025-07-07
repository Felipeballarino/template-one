import { useEffect, useState } from 'react'
import Layout from '../../shared/layout/Layout'
import { useParams } from 'react-router-dom'
import { getProductByID } from '../../features/products/services/productServices'
import foto1 from "../../assets/remera.webp"
import { Divider } from 'antd'
import SwiperImagenes from '../../features/products/components/molecules/SwiperImagen'
import CircleIcon from '@mui/icons-material/Circle';
import Swal from 'sweetalert2'
import { aplicarDescuento, formatearPrecio } from '../../utils/helpers'
import { useCartStore } from '../../store/cartStore'


const ProductoDetalle = () => {
    const { id } = useParams()
    const [producto, setProducto] = useState(null)
    const [colorSeleccionado, setColorSeleccionado] = useState(null)
    const [talleSeleccionado, setTalleSeleccionado] = useState(null)

    const { addToCart } = useCartStore()

    useEffect(() => {
        const fetchProducto = async () => {
            const data = await getProductByID(id)
            setProducto(data)

            // Setear el primer color como seleccionado por defecto

            if (data?.tipoVariante == 1) {
                setColorSeleccionado(
                    {
                        color: "Unico",
                        nombreColor: "Unico",
                        stock: data.stockGeneral
                    })
                setTalleSeleccionado(null) // al cambiar de producto, reseteamos talle
            }
            if (data?.tipoVariante == 2) {
                setColorSeleccionado(data.variantesColor[0])
                setTalleSeleccionado(null) // al cambiar de producto, reseteamos talle
            }
            if (data?.tipoVariante == 3) {
                setColorSeleccionado(data.variantesTalle[0])
                setTalleSeleccionado(null) // al cambiar de producto, reseteamos talle
            }

        }

        if (id) fetchProducto()
    }, [id])

    if (!producto) {
        return (
            <Layout>
                <p>Cargando producto...</p>
            </Layout>
        )
    }

    const handleAddToCart = () => {
        if (producto.tipoVariante == 2 && !colorSeleccionado) {
            Swal.fire({
                icon: 'warning',
                title: 'Seleccioná un color ',
                text: 'Antes de agregar al carrito seleccionar color.',
            })
            return
        }
        if (producto.tipoVariante == 3 && (!colorSeleccionado || !talleSeleccionado)) {
            Swal.fire({
                icon: 'warning',
                title: 'Seleccioná un color y un talle',
                text: 'Antes de agregar al carrito, elegí ambas opciones.',
            })
            return
        }
        const precioNew = producto.poseeDescuento
            ? aplicarDescuento(producto.precio, producto.descuento)
            : producto.precio;

        const color = colorSeleccionado?.color ?? '';
        const talle = talleSeleccionado?.talle ?? 'Unico';

        const product = {
            key: `${producto.id}-${color}-${talle}`, // ⚠️ Clave única para distinguir en el carrito
            id: producto.id,
            nombre: producto.nombre,
            precio: precioNew,
            imagen: foto1,
            color,
            nombreColor: colorSeleccionado?.nombreColor ?? '',
            talle,
            stock: talleSeleccionado?.stock ?? colorSeleccionado?.stock ?? producto.stockGeneral,
        };
        addToCart(product, 1);
    };

    const imagenes = [foto1, foto1, foto1, foto1, foto1, foto1]
    return (
        <>
            <Seo title={producto?.nombre} description="Producto en web" />
            <Layout>
                <div className='grid grid-cols-2'>
                    <div className='min-h-150'>
                        <SwiperImagenes imagenes={imagenes} />
                    </div>
                    <div className='px-10 flex flex-col justify-between'>
                        <div>
                            <h1 className="text-xl font-bold my-6">{producto.nombre}</h1>
                            {producto.poseeDescuento ?
                                <div>
                                    <div className='flex items-center gap-4'>
                                        <p className='text-2xl text-gray-500 line-through'>{formatearPrecio(producto.precio)}</p>
                                        <p className='bg-blue-500 px-2 py-1 rounded text-white'>{producto.descuento}% OFF</p>
                                    </div>
                                    <p className='text-5xl font-bold'>{formatearPrecio(aplicarDescuento(producto.precio, producto.descuento))}</p>
                                </div>
                                :
                                <p className='text-5xl font-bold'>{formatearPrecio(producto.precio)}</p>
                            }
                            <Divider />
                            <div>
                                <h2 className='text-xl font-semibold'>Descripción:</h2>
                                <div className="ql-editor" dangerouslySetInnerHTML={{ __html: producto.descripcion }}></div>
                            </div>
                            <Divider />
                            {producto.tipoVariante == 2 && <div>
                                <h2 className='text-xl font-semibold mb-2'>Colores:</h2>
                                <div className="flex gap-4">
                                    {producto.variantesColor.map((v, idx) => (
                                        <div
                                            key={idx}
                                            className={`cursor-pointer text-center `}
                                            onClick={() => {
                                                setColorSeleccionado(v)
                                                setTalleSeleccionado(null)
                                            }}
                                        >
                                            <CircleIcon sx={{ color: v.color, fontSize: "30px" }} className={`${colorSeleccionado?.color === v.color ? 'ring-2 ring-black rounded-full' : ''}`} />
                                            <p className="text-sm">{v.nombreColor}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>}
                            {/* Colores */}
                            {producto.tipoVariante == 3 && <div>
                                <h2 className='text-xl font-semibold mb-2'>Colores:</h2>
                                <div className="flex gap-4">
                                    {producto.variantesTalle.map((v, idx) => (
                                        <div
                                            key={idx}
                                            className={`cursor-pointer text-center `}
                                            onClick={() => {
                                                setColorSeleccionado(v)
                                                setTalleSeleccionado(null)
                                            }}
                                        >
                                            <CircleIcon sx={{ color: v.color, fontSize: "30px" }} className={`${colorSeleccionado?.color === v.color ? 'ring-2 ring-black rounded-full' : ''}`} />
                                            <p className="text-sm">{v.nombreColor}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>}


                            {/* Talles */}
                            {producto.tipoVariante == 3 && colorSeleccionado && (
                                <div className="mt-4">
                                    <h2 className='text-xl font-semibold mb-2'>Stock disponible:</h2>
                                    <div className="flex gap-4 flex-wrap">
                                        {colorSeleccionado.talles.map((talleObj, i) => (
                                            <div div
                                                key={i}
                                                onClick={() => {
                                                    if (talleObj.stock > 0) setTalleSeleccionado(talleObj)
                                                }}
                                                className={`border px-4 py-2 rounded text-center ${talleObj.stock === 0
                                                    ? 'opacity-50 cursor-not-allowed'
                                                    : 'cursor-pointer'
                                                    } ${talleSeleccionado?.talle === talleObj.talle ? 'bg-blue-500 text-white' : ''}`}
                                            >
                                                <p>{talleObj.talle}</p>
                                                <p className={`text-xs ${talleSeleccionado?.talle === talleObj.talle ? "text-white" : "text-gray-500"}`}>
                                                    {talleObj.stock > 0 ? `${talleObj.stock} disponibles` : 'Sin stock'}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className='h-30 flex flex-col gap-5 mt-6'>
                            {producto.tipoVariante == 3 ? <p>¡Stock disponible por color/talle!</p> :
                                <p>¡{colorSeleccionado?.stock} piezas disponibles!</p>}
                            <button
                                onClick={handleAddToCart}
                                className='w-full cursor-pointer border p-2 rounded-md'
                            >
                                Agregar al carrito
                            </button>
                        </div>
                    </div>
                </div>
            </Layout >
        </>
    )
}

export default ProductoDetalle
