import { Drawer, Button, InputNumber } from 'antd'
import { DeleteOutlined } from '@ant-design/icons'
import foto1 from "../../../assets/remera.webp"
import { formatearPrecio } from '../../../utils/helpers'
// import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'
import { useCartStore } from '../../../store/cartStore'


const Cart = ({ open, onClose }) => {
    const navigate = useNavigate()
    const {
        cart,
        cartTotal,
        updateQuantity,
        removeFromCart,
        // clearCart
    } = useCartStore()
    // const sendWppSubmit = async () => {
    //     const mensaje = generarMensajeWhatsApp(cart, cartTotal);
    //     const telefono = "5493534196213";
    //     const url = `https://wa.me/${telefono}?text=${mensaje}`;
    //     window.open(url, '_blank');
    //     const result = await Swal.fire({
    //         title: '¿Pudiste comunicarte con el vendedor por WhatsApp?',
    //         text: 'Esto nos ayuda a confirmar tu pedido.',
    //         icon: 'question',
    //         showCancelButton: true,
    //         confirmButtonText: 'Sí, me comuniqué',
    //         cancelButtonText: 'No aún',
    //     });

    //     if (result.isConfirmed) {
    //         clearCart();
    //         onClose();
    //         await Swal.fire({
    //             title: '¡Gracias por tu compra!',
    //             icon: 'success',
    //             timer: 2000,
    //             showConfirmButton: false,
    //         });
    //     }
    // }
    return (
        <Drawer title="Tu Carrito" open={open} onClose={onClose} width={400}>
            <div className='flex flex-col h-full justify-between'>
                <div className='overflow-y-auto space-y-4 pr-2'>
                    {cart.length > 0 ? (
                        cart.map((item) => (
                            <div key={item.id} className='flex gap-4 items-center border-b pb-3'>
                                <img
                                    src={foto1}
                                    alt={item.nombre}
                                    className='w-16 h-16 object-cover rounded'
                                    loading="lazy"
                                />
                                <div className='flex-1'>
                                    <h3 className='font-medium'>{item.nombre}</h3>
                                    <p className='text-sm text-gray-500'>{formatearPrecio(item.precio)} c/u</p>
                                    <p className='text-sm text-gray-500'>Color: {item.nombreColor}</p>
                                    <p className='text-sm text-gray-500'>Talle: {item.talle}</p>
                                    <div className='flex items-center gap-2 mt-1'>
                                        <span className='text-sm'>Cantidad:</span>
                                        <InputNumber
                                            min={1}
                                            max={item.stock || 99}
                                            value={item.quantity}
                                            onChange={(value) => updateQuantity(item.id, value)}
                                            size='small'
                                        />
                                    </div>
                                </div>
                                <Button
                                    type='text'
                                    icon={<DeleteOutlined />}
                                    onClick={() => removeFromCart(item.id)}
                                    danger
                                />
                            </div>
                        ))
                    ) : (
                        <div className='text-center text-gray-500 mt-20'>
                            <p>🛍️ Tu carrito está vacío</p>
                        </div>
                    )}
                </div>

                <div className='pt-4 border-t mt-4'>
                    <div className='flex justify-between font-semibold text-lg mb-4'>
                        <span>Total:</span>
                        <span>{formatearPrecio(cartTotal())}</span>
                    </div>
                    {/* <Button
                        type='primary'
                        block
                        size='large'
                        disabled={cart.length === 0}
                        onClick={sendWppSubmit}
                    >
                        Finalizar Compra
                    </Button> */}

                    <Button type='primary'
                        block
                        size='large'
                        disabled={cart.length === 0}
                        onClick={() => navigate("/checkout")}>
                        Finalizar Compra
                    </Button>
                </div>

            </div>
        </Drawer>
    )
}

export default Cart

