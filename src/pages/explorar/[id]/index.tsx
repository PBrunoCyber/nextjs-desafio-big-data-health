/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import Button from '@/components/atoms/Button';
import Footer from '@/components/molecules/Footer';
import NavBar from '@/components/molecules/NavBar';
import { useGetProductById } from '@/hooks/products/useGetProductById';
import useFetchUserInformations from '@/hooks/user/useFetchUserInformations';
import { CartDetails, cartService, ICart } from '@/services/cart/Cart';
import { Box, CircularProgress, Divider } from '@mui/material';
import { Minus, Plus } from 'lucide-react';
import { useRouter } from 'next/router';
import React, { useContext, useEffect, useMemo, useState } from 'react'
import { toast } from 'react-toastify';
import nookies from 'nookies';
import { CartContext } from '@/context/CartContext';

const ExplorarProductById = () => {
  const router = useRouter();
  const { id } = router.query;

  const productId = Array.isArray(id) ? id[0] : id;

  const { user, token, isLoading: isLoadingUser } = useFetchUserInformations();
  const { updateCart } = useContext(CartContext);
  const { data, isLoading } = useGetProductById(productId ?? "");

  const [qtd, setQtd] = useState(1)
  const [total, setTotal] = useState(Number(data?.price))
  const [isAdded, setIsAdded] = useState(false);



  useEffect(() => {
    setTotal(Number(data?.price));
  }, [data])

  const add = () => {
    setTotal(Number(data?.price) * (qtd + 1));
    setQtd(qtd + 1);
  }

  const remove = () => {
    if (qtd !== 1) {
      setTotal(Number(data?.price) * (qtd - 1));
      setQtd(qtd - 1);
    } else {
      setTotal(Number(data?.price));
    }
  }

  useEffect(() => {
    const { cart } = nookies.get();
    if (cart && user?.id) {
      const compras = JSON.parse(cart);

      if (compras.length > 0) {
        const index = compras.findIndex((compra: ICart) => compra.userId === Number(user.id));
        if (index !== -1) {
          const product = compras[index].cart.find((compra: CartDetails) => compra.productId === Number(productId));
          if (product) {
            setQtd(product.quantity);
            setTotal(Number(data?.price) * product.quantity)
            setIsAdded(true);
          }
        }
      }
    }
  }, [data?.price, productId, user])

  const handleAddToCart = () => {
    if (token && user) {
      const response = cartService.addToCart({ userId: user.id, productId: Number(productId), quantity: qtd })
      setIsAdded(true);
      updateCart(user.id);
      toast.success(response);
    } else {
      toast.warning("Faça login antes de adicionar algo no carrinho!");
      router.push('/login');
    }
  }

  const handleRemoveCart = () => {
    if (token && user) {
      try {
        const response = cartService.removeCart({ userId: user.id, productId: Number(productId), quantity: qtd })
        setIsAdded(false);
        updateCart(user.id);
        toast.success(response);
      } catch (error: any) {
        toast.error(error.message);
      }

    } else {
      toast.warning("Faça login antes de adicionar algo no carrinho!");
      router.push('/login');
    }
  }

  const memoButtonAddOrRemoveCart = useMemo(() => {
    return (
      !isAdded ?
        <Button variant='contained' className='hover:cursor-pointer' onClick={handleAddToCart}>
          <p className='font-primary font-bold text-center'>ADICIONAR AO CARRINHO</p>
        </Button>
        :
        <Button variant='outlined' className='hover:cursor-pointer' onClick={handleRemoveCart}>
          <p className='font-primary font-bold text-center'>REMOVER DO CARRINHO</p>
        </Button>
    )
  }, [handleAddToCart, handleRemoveCart])


  return (
    <>
      <NavBar />
      <div className='flex flex-col justify-center items-center h-[600px] mt-[70px]'>
        {isLoading || isLoadingUser ?
          <CircularProgress className='text-[#FF2313]' />
          :
          <Box maxWidth={"xl"} className="w-full flex items-center gap-[40px]">
            <Box maxWidth={"600px"} className="flex flex-col gap-[20px]">
              <p className='font-primary text-[#FF2313] font-bold'>{data?.category}</p>
              <h1 className='font-primary text-black text-[30pt] font-bold  leading-[60px]'>{data?.title}</h1>
              <p className='font-primary'>{data?.description}</p>
              <p className='font-primary text-[#FF2313] text-[30pt] font-bold'>$ {data?.price}</p>
            </Box>
            <Box>
              <img src={data?.image} width={400} alt="" className='rounded-[30px]' />
            </Box>
            <Box className="flex flex-col gap-[20px]">
              <Box>
                <h1 className='font-primary text-black text-[30pt] font-bold  leading-[70px]'>Quantidade</h1>
                <Box className="flex gap-[10px] items-center">
                  <Button onClick={remove} className='h-[40px] w-[40px] flex justify-center items-center  hover:cursor-pointer' variant='outlinedBlack'>
                    <Minus className='absolute' size={25} />
                  </Button>
                  <div className='h-[60px] w-[60px] border-[1px] border-black rounded-[100px] flex justify-center items-center'>
                    <p className='font-primary'>{qtd}</p>
                  </div>
                  <Button onClick={add} className='h-[40px] w-[40px] flex justify-center items-center border-[1px] hover:cursor-pointer' variant='outlinedBlack'>
                    <Plus className='absolute' size={25} />
                  </Button>
                </Box>
              </Box>
              <Box>
                <h1 className='font-primary text-black text-[30pt] font-bold  leading-[70px]'>Total</h1>
                <p className='font-primary text-[#FF2313] text-[20pt] font-bold'>$ {total}</p>
              </Box>
              <Divider className='py-[5px]' />
              {memoButtonAddOrRemoveCart}
            </Box>
          </Box>
        }
      </div>
      <Footer />
    </>
  )
}

export default ExplorarProductById