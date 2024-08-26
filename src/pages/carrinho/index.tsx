/* eslint-disable @next/next/no-img-element */
import Button from '@/components/atoms/Button';
import NavBar from '@/components/molecules/NavBar';
import { CartContext } from '@/context/CartContext';
import { useGetAllProducts } from '@/hooks/products/useGetAllProducts';
import { Box, CircularProgress, Divider } from '@mui/material';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { GetServerSideProps } from 'next';
import { parseCookies } from 'nookies';
import React, { useContext, useEffect, useState } from 'react'
import Footer from '@/components/molecules/Footer';
import useFetchUserInformations from '@/hooks/user/useFetchUserInformations';
import { cartService } from '@/services/cart/Cart';
import { toast } from 'react-toastify';
import LinkButton from '@/components/atoms/LinkButton';

const DESCONTO = 45.5;
const IMPOSTO = 10000.0;

const Carrinho = () => {

    const { cartInfo, updateCart } = useContext(CartContext);
    const { user, token } = useFetchUserInformations();
    const { data: products, isLoading } = useGetAllProducts({ limit: "", sort: "asc" });

    const productsIds = cartInfo.cart?.map((cart) => cart.productId);
    const filteredProducts = products?.filter(product => productsIds?.includes(product.id)) || null;

    const [qtd, setQtd] = useState<Array<number>>([])

    //Calculo dos preços * quantidades
    const prices = filteredProducts?.map(product => product.price);
    const totalCosts = prices?.map((price, index) => Number(price) * qtd[index]);

    //Somatório do resultado
    const subTotal = totalCosts?.reduce((accumulator, currentValue) => accumulator + currentValue, 0);

    const add = (index: number) => {
        const updatedQtd = [...qtd];
        updatedQtd[index] = updatedQtd[index] + 1;
        setQtd(updatedQtd);
    }

    const remove = (index: number) => {
        if (qtd[index] !== 1) {
            const updatedQtd = [...qtd];
            updatedQtd[index] = updatedQtd[index] - 1;
            setQtd(updatedQtd);
        }
    }

    useEffect(() => {
        if (cartInfo.cart) {
            const qntd = cartInfo.cart.map((cart) => cart.quantity);
            setQtd(qntd);
        }
    }, [cartInfo])

    const handleRemoveCart = ({ productId, index }: { productId: number, index: number }) => {
        if (token && user) {
            try {
                const response = cartService.removeCart({ userId: user.id, productId: Number(productId), quantity: qtd[index] })
                updateCart(user.id);
                toast.success(response);
            } catch (error: any) {
                toast.error(error.message);
            }

        }
    }

    return (
        <>
            <NavBar />
            <div className='flex flex-col justify-center items-center mt-[40px] py-[40px] m-[20px]'>
                <Box maxWidth={"1400px"} className="w-full bg-white py-[20px] px-[30px] rounded-xl">
                    <div className='flex flex-col gap-[20px]'>
                        <h1 className='font-bold font-primary text-[#FF2313] text-[30pt]'>Carrinho</h1>
                        <Box className="flex items-center gap-[20px]" >
                            <p className='font-bold font-primary'>1. Carrinho</p>
                            <div className='h-[2px] max-w-[100px] w-full bg-[#ccc]' />
                            <p className='text-[#686868] font-primary'>2. Checkout</p>
                            <div className='h-[2px] max-w-[100px] w-full bg-[#ccc]' />
                            <p className='text-[#686868] font-primary'>3. Payment</p>
                        </Box>
                    </div>
                    {isLoading ?
                        <Box minHeight={"500px"} className="flex flex-col items-center gap-[20px] justify-center">
                            <CircularProgress className='text-[#FF2313]' />
                        </Box>
                        : filteredProducts?.length === 0 ?
                            <Box minHeight={"500px"} className="flex flex-col items-center gap-[20px] justify-center">
                                <img src="/images/shopping_cart.svg" width={400} alt="Shopping Cart" />
                                <Box maxWidth={"400px"} className="flex justify-between items-center flex-wrap w-full mt-[20px]">
                                    <p className='text-center font-primary font-bold text'>Carrinho Vazio :(</p>
                                    <LinkButton variant='contained' href='explorar'>Ver Produtos</LinkButton>
                                </Box>
                            </Box>
                            :
                            <Box className="flex flex-wrap items-start gap-[20px]">
                                <Box className="flex flex-wrap gap-[20px]">
                                    <Box maxWidth={'1000px'} minHeight={"500px"} className="flex flex-col w-full items-center gap-[40px] mt-[60px] mb-[30px]">
                                        {filteredProducts && filteredProducts?.length > 0 && filteredProducts?.map((product, index) => {
                                            return (
                                                <Box key={product.id} className="flex flex-col gap-[20px]">
                                                    <Box className=" flex gap-[20px] items-center flex-wrap">
                                                        <img src={product.image} width={200} height={200} className='rounded-[20px]' alt="" />
                                                        <Box maxWidth={"600px"} className="flex flex-col gap-[10px]">
                                                            <p className='font-primary text-[12pt] text-[#FF2313] font-bold leading-1'>{product.category}</p>
                                                            <p className='font-primary font-bold text-[20pt] leading-10'>{product.title}</p>
                                                            <p className='font-primary text-[12pt] leading-1'>{product.description}</p>
                                                            <p className='font-primary text-[15pt] text-[#FF2313] font-bold leading-1'>$ {product.price}</p>
                                                        </Box>
                                                    </Box>
                                                    <Divider />
                                                    <Box className="flex items-center gap-[20px] flex-wrap justify-between">
                                                        <Box className="flex gap-[10px] items-center">
                                                            <Button onClick={() => remove(index)} className='h-[40px] w-[40px] flex justify-center items-center  hover:cursor-pointer' variant='outlinedBlack'>
                                                                <Minus className='absolute' size={25} />
                                                            </Button>
                                                            <div className='h-[60px] w-[60px] border-[1px] border-black rounded-[100px] flex justify-center items-center'>
                                                                <p className='font-primary'>{qtd[index]}</p>
                                                            </div>
                                                            <Button onClick={() => add(index)} className='h-[40px] w-[40px] flex justify-center items-center border-[1px] hover:cursor-pointer' variant='outlinedBlack'>
                                                                <Plus className='absolute' size={25} />
                                                            </Button>
                                                        </Box>
                                                        <Button onClick={() => handleRemoveCart({ productId: product.id, index: index })} className='flex justify-center gap-[10px] items-center border-[1px] hover:cursor-pointer' variant='outlined'>
                                                            <Trash2 size={25} />
                                                            <p className='font-primary font-bold'>Remover do carrinho</p>
                                                        </Button>
                                                    </Box>
                                                </Box>
                                            )
                                        })
                                        }
                                    </Box>
                                </Box>
                                <Box maxWidth={"500px"} className="p-[30px] bg-[#fff0ee] w-full rounded-xl">
                                    <p className='font-bold font-primary text-[20pt] mb-[60px]'>Resumo do pedido</p>
                                    <Box className="flex flex-col gap-[20px]">
                                        <Box className="flex justify-between">
                                            <p className='font-primary text-[15pt]'>Sub Total</p>
                                            <p className='font-primary font-bold text-[15pt]'>$ {subTotal}</p>
                                        </Box>
                                        <Box className="flex justify-between">
                                            <p className='font-primary text-[15pt]'>Desconto</p>
                                            <p className='font-primary font-bold text-[15pt]'>$ {DESCONTO}</p>
                                        </Box>
                                        <Box className="flex justify-between">
                                            <p className='font-primary text-[15pt]'>Imposto</p>
                                            <p className='font-primary font-bold text-[15pt]'>$ {IMPOSTO}</p>
                                        </Box>
                                        <Box className="flex justify-between">
                                            <p className='font-primary text-[15pt]'>Frete</p>
                                            <p className='font-primary font-bold text-[15pt] text-[#FF2313]'>Grátis</p>
                                        </Box>
                                        <Box className="flex justify-between">
                                            <p className='font-primary text-[15pt]'>Total</p>
                                            <p className='font-primary font-bold text-[15pt]'>$ {subTotal ? subTotal - DESCONTO + IMPOSTO : 0.00}</p>
                                        </Box>
                                        <Box>
                                            <Button variant='contained' className='bg-[#2e2e2e] flex hover:bg-[#000] hover:cursor-pointer flex-col justify-between text-center mt-[40px]' onClick={() => toast.success("Palmeiras não tem mundial!")}>
                                                Prosseguir para o checkout
                                            </Button>
                                            <Divider className='py-[10px]' />
                                            <p className='font-primary text-center py-[20px]'>Estimativa de entrega para: <span className='font-primary font-bold'>28 de Agosto, 2024</span></p>
                                        </Box>
                                    </Box>
                                </Box>
                            </Box>
                    }
                </Box>
            </div>
            <Footer />
        </>
    )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {

    const { token } = parseCookies(ctx);

    if (!token) {
        return {
            redirect: {
                destination: "/login",
                permanent: false,
            },
        };
    }

    return {
        props: {}
    }
}

export default Carrinho