import Header from './Header'
import Footer from './Footer'
import Cart from '../../features/cart/components/Cart'

import { FloatButton } from 'antd'
import { WhatsAppOutlined } from '@ant-design/icons'
import { useCartStore } from '../../store/cartStore'

const Layout = ({ children }) => {
    const { openCart, onCloseCart, showDrawerCart } = useCartStore()
    return (
        <div className='flex flex-col min-h-screen'>
            <Cart open={openCart} onClose={onCloseCart} />
            <Header showDrawer={showDrawerCart} />
            <main className="flex-grow p-4">
                {children}
            </main>
            <Footer />
            <FloatButton
                icon={<WhatsAppOutlined style={{ color: 'white', fontSize: "40px" }} />}
                style={{
                    insetInlineEnd: 24,
                    backgroundColor: '#25D366', // Verde típico de WhatsApp
                    color: 'white',
                    width: "70px",
                    height: "70px"
                }}
                className="whatsapp-float"
            />
        </div>
    )
}

export default Layout
