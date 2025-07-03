// import React from 'react'
// import { useGlobalData } from '../context/data/useGlobalData'
import { FacebookOutlined, InstagramOutlined, TwitterOutlined } from '@ant-design/icons'

const Footer = () => {
    // const { personalInformation } = useGlobalData()
    // console.log(personalInformation)
    return (
        <footer className='border-t py-4'>
            <ul className='w-full flex justify-center gap-10 '>
                <li><InstagramOutlined style={{ fontSize: "25px" }} /></li>
                <li><TwitterOutlined style={{ fontSize: "25px" }} /></li>
                <li><FacebookOutlined style={{ fontSize: "25px" }} /></li>
            </ul>
        </footer>
    )
}

export default Footer
