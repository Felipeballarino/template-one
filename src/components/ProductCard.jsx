import React from 'react'
import { Link } from 'react-router-dom'
import foto1 from "../assets/remera.webp"
import CircleIcon from '@mui/icons-material/Circle';
import { aplicarDescuento, formatearPrecio } from '../utils/utils';

const ProductCard = ({ product }) => {
    console.log(product)
    return (
        <Link to={`/producto/${product.id}`} className='border rounded-lg p-4 shadow-md relative'>
            {product.poseeDescuento &&
                <div className='absolute top-4 left-0 bg-blue-500 text-white font-bold py-1 px-2 rounded-r'>
                    {product.descuento}% OFF
                </div>
            }
            <img src={foto1} alt={product.nombre} className='w-full h-48 object-cover' />
            <div className='py-1'>
                {
                    product.variantes?.map(variant => {
                        if (variant.color) {
                            return <CircleIcon sx={{ color: variant.color }} titleAccess={variant.nombreColor} />
                        }
                    })
                }
            </div>
            <h3 className='text-lg font-bold'>{product.nombre}</h3>
            {product.poseeDescuento ?
                <div className='flex items-center gap-3'>
                    <p className='text-gray-500 text-sm line-through'>{formatearPrecio(product.precio)}</p>
                    <p className='text-gray-500 font-bold'>{formatearPrecio(aplicarDescuento(product.precio, product.descuento))}</p>
                </div>
                :
                <p className='text-gray-500'>{formatearPrecio(product.precio)}</p>
            }
        </Link>
    )
}

export default ProductCard  
