/* eslint-disable @next/next/no-img-element */
import { Box } from 'lucide-react'
import React from 'react'

const Footer = () => {
    return (
        <div className='flex flex-col items-center'>
            <div className='h-[300px] flex flex-col items-center justify-center'>
                <img src="images/logo.png" width={200} alt="Logo" />
            </div>
            <div className='bg-[#ddd] w-full p-[20px]'>
                <p className='text-center'>© 2024 Zigma. Todos os direitos reservados.</p>
            </div>
        </div>
    )
}

export default Footer