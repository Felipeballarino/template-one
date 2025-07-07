import { Link } from 'react-router-dom'
import foto1 from "../../../../assets/remera.webp"
import CircleIcon from '@mui/icons-material/Circle';
import { formatearPrecio } from '../../../../utils/helpers';

const ProductCard = ({ product }) => {
    return (
        <Link to={`/producto/${product.id}`} className='border rounded-lg p-4 shadow-md relative min-h-[300px] h-fit'>
            {product.porcentajeDescuento !== 0 &&
                <div className='absolute top-4 left-0 bg-blue-500 text-white font-bold py-1 px-2 rounded-r'>
                    {product.porcentajeDescuento}% OFF
                </div>
            }
            <img src={foto1} alt={product.nombre} loading="lazy" className='w-full h-48 object-cover' />
            {product.tipoVariante === 1 &&
                (
                    product.stockGeneral !== 0 ?
                        <div className='py-1 bg-gray-100 w-fit px-1 mt-2 rounded flex'>
                            <span className='text-[12px]'><strong>{product.stockGeneral}</strong> piezas disponibles</span>
                        </div>
                        :
                        <div className='py-1 bg-gray-100 w-fit px-1 mt-2 rounded flex'>
                            <span className='text-[12px] font-bold'>Sin Stock</span>
                        </div>
                )
            }
            {product.tipoVariante === 2 &&
                <div className='py-1'>
                    {
                        product.variantesColor?.map(variant => {
                            if (variant.color) {
                                return <CircleIcon sx={{ color: variant.color }} titleAccess={variant.nombreColor} className='border border-black rounded-full' />
                            }
                        })
                    }
                </div>
            }
            {product.tipoVariante === 3 &&
                <div className='py-1'>
                    {
                        product.variantesTalle?.map(variant => {
                            if (variant.color) {
                                return <CircleIcon sx={{ color: variant.color }} titleAccess={variant.nombreColor} className='border border-black rounded-full' />
                            }
                        })
                    }
                </div>
            }
            <h3 className='text-lg font-bold'>{product.nombre}</h3>
            <p className='text-sm text-gray-500'>{product.marcaNombre}</p>
            {product.viewPrecios &&
                (product.porcentajeDescuento ?
                    <div className='flex items-center gap-3'>
                        <p className='text-gray-500 text-sm line-through'>{formatearPrecio(product.precio)}</p>
                        <p className='text-gray-500 font-bold'>{formatearPrecio(product.precioDescuento)}</p>
                    </div>
                    :
                    <p className='text-gray-500'>{formatearPrecio(product.precio)}</p>
                )
            }
        </Link>
    )
}

export default ProductCard  
