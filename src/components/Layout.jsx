import React from 'react'
import Header from './header'
import Footer from './Footer'
import Cart from './Cart'

import { useGlobalCart } from '../context/cart/useGlobalCart'
import { FloatButton } from 'antd'
import { WhatsAppOutlined } from '@ant-design/icons'

const Layout = ({ children }) => {
    const { openCart, onCloseCart, showDrawerCart } = useGlobalCart()
    return (
        <div className='flex flex-col min-h-screen'>
            <Cart open={openCart} onClose={onCloseCart} />
            <Header showDrawer={showDrawerCart} />
            <main className="flex-grow p-4">
                {children}
            </main>
            <Footer />
            <FloatButton
                icon={<WhatsAppOutlined style={{ color: 'white' }} />}
                style={{
                    insetInlineEnd: 24,
                    backgroundColor: '#25D366', // Verde típico de WhatsApp
                    color: 'white'
                }}
                className="whatsapp-float"
            />
        </div>
    )
}

export default Layout
