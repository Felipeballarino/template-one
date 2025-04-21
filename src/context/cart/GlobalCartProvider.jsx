import { useEffect, useState } from "react";
import { GlobalCartContext } from "./GlobalCartContext";

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState(() => {
        const saved = localStorage.getItem("cart");
        return saved ? JSON.parse(saved) : [];
    });
    const [openCart, setOpenCart] = useState(false);


    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart));
    }, [cart]);

    const addToCart = (product, quantity = 1) => {
        setCart(prev => {
            const existing = prev.find(item =>
                item.id === product.id &&
                item.color === product.color &&
                item.talle === product.talle
            );

            if (existing) {
                return prev.map(item =>
                    item.id === product.id &&
                        item.color === product.color &&
                        item.talle === product.talle
                        ? { ...item, quantity: item.quantity + quantity }
                        : item
                );
            } else {
                return [...prev, { ...product, quantity }];
            }
        });

        showDrawerCart();
    };


    const removeFromCart = (id) => {
        setCart(prev => prev.filter(item => item.id !== id));
        showDrawerCart()
    };

    const updateQuantity = (id, quantity) => {
        setCart(prev =>
            prev.map(item => {
                if (item.id === id) {
                    const nuevaCantidad = Math.min(quantity, item.stock);
                    return { ...item, quantity: nuevaCantidad };
                }
                return item;
            })
        );
    };

    const clearCart = () => setCart([]);


    const showDrawerCart = () => {
        setOpenCart(true);
    };

    const onCloseCart = () => {
        setOpenCart(false);
    };

    const cartTotal = cart.reduce((acc, item) => acc + item.precio * item.quantity, 0);
    const cartItems = cart.reduce((acc, item) => acc + item.quantity, 0);

    return (
        <GlobalCartContext.Provider
            value={{
                cart,
                addToCart,
                removeFromCart,
                updateQuantity,
                clearCart,
                cartTotal,
                cartItems,
                openCart,
                onCloseCart,
                showDrawerCart
            }}
        >
            {children}
        </GlobalCartContext.Provider>
    );
};