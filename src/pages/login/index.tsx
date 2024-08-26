/* eslint-disable @next/next/no-img-element */
import TextField from '@/components/atoms/TextField'
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useContext } from 'react'
import { useForm } from 'react-hook-form'
import { LoginSchema, loginSchema } from '@/schemas/loginSchema';
import SubmitButton from '@/components/atoms/SubmitButton';
import { useLoginUser } from '@/hooks/user/useLogin';
import LinkButton from '@/components/atoms/LinkButton';
import nookies from 'nookies';
import { GetServerSideProps } from 'next';
import { parseCookies } from "nookies";
import { useRouter } from 'next/router';
import { jwtDecode } from 'jwt-decode';
import { CartContext } from '@/context/CartContext';

const LoginPage = () => {
    const router = useRouter();
    const {
        control,
        handleSubmit
    } = useForm<LoginSchema>({
        resolver: zodResolver(loginSchema),
    });

    const { updateCart } = useContext(CartContext);


    const { login, isLoading } = useLoginUser({
        onSuccess: (data) => {
            const user = jwtDecode(data.token);
            updateCart(Number(user?.sub) ?? 0);
            nookies.set(null, 'token', data.token, {
                maxAge: 5 * 24 * 60 * 60, //5 dias
                path: '/',
            })

            router.push('/');
        },
    })

    const onSubmit = (data: any) => {
        login({ username: data.username, password: data.password })
    }

    return (
        <div className='w-full h-screen min-h-[400px] flex flex-col items-center justify-center'>
            <form onSubmit={handleSubmit(onSubmit)} className='max-w-[600px] w-full p-[20px] bg-[#fff] flex flex-col items-center rounded-[20px]'>
                <LinkButton variant='textBlack' href='/'>
                    <img src="images/logo.png" width={100} alt="" />
                </LinkButton>
                <h1 className='font-primary font-bold text-[#FF2313]'>Welcome</h1>
                <div className='flex flex-col gap-[10px] w-full mb-[20px] px-[30px] py-[10px]'>
                    <TextField
                        control={control}
                        label='Username'
                        placeholder='Digite seu nome de usuário'
                        name='username'
                        className='grow-[1px]'
                        type="input"
                    />
                    <TextField
                        control={control}
                        label='Password'
                        placeholder='Digite sua senha'
                        name='password'
                        type="password"
                    />
                </div>
                <div className='flex flex-wrap items-center w-full justify-between px-[30px]'>
                    <div className='flex flex-wrap items-center justify-between'>
                        <p>Não possui cadastro?</p>
                        <LinkButton variant='text' href='/register'>Registre-se</LinkButton>
                    </div>
                    <SubmitButton isLoading={isLoading} className={"font-bold"} variant='contained' type='submit'>
                        Fazer Login
                    </SubmitButton>
                </div>
            </form>
        </div>
    )
}
export const getServerSideProps: GetServerSideProps = async (ctx)=> {
    
    const { token } = parseCookies(ctx);

    if (token) {
        return {
          redirect: {
            destination: "/",
            permanent: false,
          },
        };
      }

    return {
        props: {}
    }
}

export default LoginPage