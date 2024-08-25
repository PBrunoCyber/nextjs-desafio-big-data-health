/* eslint-disable @next/next/no-img-element */
import { Box, ShoppingCart } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import LinkButton from '../atoms/LinkButton'

const NavBar = () => {
    return (
        <div className='bg-[#ffffff] rounded-b-[20px] px-[40px] py-[15px] w-full flex flex-wrap items-center justify-between'>
            <img src={'/images/logo.png'} width={180} height={40} alt='Logo Image' />
            <div className='flex gap-[20px]'>
                <LinkButton href='/' variant='textBlack'>Página Inicial</LinkButton>
                <LinkButton href='/explorar' variant='textBlack'>Explorar</LinkButton>
            </div>
            <div className='flex gap-[20px]'>
                <LinkButton className='h-[40px] w-[40px] flex justify-center items-center' href='/cart' variant='outlinedBlack'>
                    <ShoppingCart className='absolute' size={25}/>
                </LinkButton>
                <LinkButton href='/login' variant='textBlack'>Log in</LinkButton>
                <LinkButton href='/register' variant='outlined'>Criar uma conta</LinkButton>
            </div>
        </div>
    )
}

export default NavBar