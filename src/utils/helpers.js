export const generarMensajeWhatsApp = (cart, cartTotal) => {
    if (!cart.length) return "";

    let mensaje = "Hola, quiero comprar los siguientes productos:%0A%0A";

    cart.forEach(item => {
        const subtotal = item.precio * item.quantity;
        mensaje += `• ${item.nombre}%0A`;
        mensaje += `  Codigo: ${item.id}%0A`;
        mensaje += `  Cantidad: ${item.quantity}%0A`;
        mensaje += `  Precio: $${item.precio} c/u%0A`;
        mensaje += `  Color: ${item.nombreColor}%0A`;
        mensaje += `  Talle: ${item.talle}%0A`;
        mensaje += `  Subtotal: $${subtotal}%0A%0A`;

    });

    mensaje += `Total: $${cartTotal}%0A`;
    mensaje += "¿Cómo puedo continuar con la compra?";

    return mensaje;
};

export const individualMensajeWhatsApp = (producto) => {
    if (!producto) return "";

    let mensaje = "Hola, quiero consultar por el siguiente producto:%0A%0A";


    mensaje += `• ${producto.nombre}%0A`;
    mensaje += `  Codigo: ${producto.id}%0A`;
    // mensaje += `  Cantidad: ${producto.quantity}%0A`;
    // mensaje += `  Precio: $${producto.precio} c/u%0A`;
    // mensaje += `  Color: ${producto.nombreColor}%0A`;
    // mensaje += `  Talle: ${producto.talle}%0A`;
    // mensaje += `  Subtotal: $${producto}%0A%0A`;



    mensaje += "¿Cómo puedo continuar con la compra?";

    return mensaje;
};


export const formatearPrecio = (numero) => {
    return new Intl.NumberFormat('es-AR', {
        style: 'currency',
        currency: 'ARS',
        minimumFractionDigits: 2
    }).format(numero);
}

export const aplicarDescuento = (precio, porcentaje) => {
    const descuento = (precio * porcentaje) / 100;
    return precio - descuento;
}


// Calcular descuento en %
export const calcularPorcentaje = (precio, precioDescuento) => {
    console.log(precio, precioDescuento)
    if (!precio || !precioDescuento) return 0
    return Math.round(((precio - precioDescuento) / precio) * 100)
}

// Calcular precio con descuento
export const calcularPrecioDescuento = (precio, porcentaje) => {
    if (!precio || !porcentaje) return 0
    return Math.round(precio * (1 - porcentaje / 100))
}