import React from 'react'
import foto1 from "../assets/remera.webp"
import CircleIcon from '@mui/icons-material/Circle';
import { Button } from 'antd';
import { WhatsAppOutlined } from '@ant-design/icons'
import { aplicarDescuento, formatearPrecio, individualMensajeWhatsApp } from '../../../utils/utils';
import Swal from 'sweetalert2';

const ProductCardWpp = ({ product }) => {
    return (
        <div className='border rounded-lg p-4 shadow-md relative'>
            {product.poseeDescuento &&
                <div className='absolute top-4 left-0 bg-blue-500 text-white font-bold py-1 px-2 rounded-r'>
                    {product.descuento}% OFF
                </div>
            }
            <img src={foto1} loading="lazy" alt={product.nombre} className='w-full h-48 object-cover' />
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
            <p className='text-sm'>{product.descripcion}</p>
            {product.poseeDescuento ?
                <div className='flex items-center gap-3'>
                    <p className='text-gray-500 text-sm line-through'>{formatearPrecio(product.precio)}</p>
                    <p className='text-gray-500 font-bold'>{formatearPrecio(aplicarDescuento(product.precio, product.descuento))}</p>
                </div>
                :
                <p className='text-gray-500'>{formatearPrecio(product.precio)}</p>
            }
            <Button
                className="mt-2 w-full bg-green-600 hover:bg-green-700 text-white flex items-center justify-center gap-2"
                variant="solid"
                onClick={async () => {
                    const mensaje = individualMensajeWhatsApp(product);
                    const telefono = "5493534196213";
                    const url = `https://wa.me/${telefono}?text=${mensaje}`;
                    window.open(url, '_blank');
                    const result = await Swal.fire({
                        title: '¿Pudiste comunicarte con el vendedor por WhatsApp?',
                        text: 'Esto nos ayuda a confirmar tu pedido.',
                        icon: 'question',
                        showCancelButton: true,
                        confirmButtonText: 'Sí, me comuniqué',
                        cancelButtonText: 'No aún',
                    });

                    if (result.isConfirmed) {
                        await Swal.fire({
                            title: '¡Gracias por tu consulta!',
                            icon: 'success',
                            timer: 2000,
                            showConfirmButton: false,
                        });
                    }
                }}
            >
                <WhatsAppOutlined className="text-xl" />
                Consultar al wpp
            </Button>
        </div>
    )
}

export default ProductCardWpp
