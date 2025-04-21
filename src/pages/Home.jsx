import React from 'react'
import { Link } from 'react-router-dom'
import Layout from '../components/Layout'

const Home = () => {
    return (
        <Layout>
            <div className='text-center p-6'>
                <h1 className='text-3xl font-bold'>Bienvenido a mi catalogo</h1>
                <Link to="/productos" className='border-1 mt-4 inline-block bg-blue-500 text-white font-bold py-2 px-2 rounded'>Ver productos</Link>
            </div>
        </Layout>
    )
}

export default Home
