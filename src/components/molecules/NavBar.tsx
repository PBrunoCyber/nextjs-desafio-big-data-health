/* eslint-disable @next/next/no-img-element */
import { ChevronDown, ShoppingCart } from 'lucide-react'
import React, { useContext, useMemo, useState } from 'react'
import LinkButton from '../atoms/LinkButton'
import { CircularProgress } from '@mui/material'
import useFetchUserInformations from '@/hooks/user/useFetchUserInformations'
import MenuNavbar from '../atoms/MenuNavBar'
import { CartContext } from '@/context/CartContext'

const NavBar = () => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const { user, isLoading, token, handleLogout } = useFetchUserInformations();

    const { cartQuantity } = useContext(CartContext);

    const handleButtonClick = (event: any) => {
        setAnchorEl(event.currentTarget); // Abre o menu
    };

    const memoUserInformations = useMemo(() => {
        return (
            <>
                {!token ?
                    <div>
                        <LinkButton href='/login' variant='textBlack'>Log in</LinkButton>
                        <LinkButton href='/register' variant='outlined'>Criar uma conta</LinkButton>
                    </div>
                    : isLoading ? <CircularProgress className='text-[#FF2313]' />
                        :
                        <div className='flex itemns-center hover:text-[#FF2313] py-[10px] cursor-pointer gap-[10px] justify-between'
                            onClick={handleButtonClick}
                        >
                            <p className="font-bold capitalize hover:text-[#FF2313] font-primary">Hi, {user?.name.firstname}</p>
                            <ChevronDown className='hover:text-[#FF2313]' />
                        </div>
                }
                <MenuNavbar logout={() => handleLogout(setAnchorEl)} anchorEl={anchorEl} setAnchorEl={setAnchorEl} />
            </>
        );
    }, [token, isLoading, user?.name.firstname, anchorEl, handleLogout]);

    return (
        <div className='bg-[#ffffff] rounded-b-[20px] px-[40px] py-[15px] w-full flex flex-wrap gap-[20px] items-center md:justify-between justify-center'>
            <img src={'/images/logo.png'} width={180} height={40} alt='Logo Image' />
            <div className='flex gap-[20px]'>
                <LinkButton href='/' variant='textBlack'>Página Inicial</LinkButton>
                <LinkButton href='/explorar' variant='textBlack'>Explorar</LinkButton>
            </div>
            <div className='flex items-center justify-center gap-[20px]'>
                <div className='flex'>
                    <LinkButton className='h-[40px] w-[40px] flex justify-center items-center' href='/carrinho' variant='outlinedBlack'>
                        <ShoppingCart className='absolute' size={25} />
                    </LinkButton>
                    {cartQuantity !== 0 && user ? <p className='font-primary flex items-center justify-center text-[12px] rounded-[100px] ml-[-10px] font-bold text-[#fff] h-[20px] w-[20px] bg-[#FF2313]'>{cartQuantity}</p> : null}
                </div>
                {memoUserInformations}
            </div>
        </div>
    )
}

export default NavBar