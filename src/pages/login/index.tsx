/* eslint-disable @next/next/no-img-element */
import TextField from '@/components/atoms/TextField'
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react'
import { useForm } from 'react-hook-form'
import { LoginSchema, loginSchema } from '@/schemas/loginSchema';
import SubmitButton from '@/components/atoms/SubmitButton';
import { useLoginUser } from '@/hooks/user/useLogin';
import { toast } from 'react-toastify';
import LinkButton from '@/components/atoms/LinkButton';

const LoginPage = () => {

    const {
        control,
        handleSubmit,
        formState: { errors }
    } = useForm<LoginSchema>({
        resolver: zodResolver(loginSchema),
    });

    const { login } = useLoginUser({
        onSuccess: (data) => {
            console.log(data);
            toast.success('Seja bem-vindo!')
        },
    })

    const onSubmit = (data: any) => {
        login({ email: data.email, password: data.password })
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
                        label='Email'
                        placeholder='Digite seu e-mail'
                        name='email'
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
                    <SubmitButton variant='contained' className='font-bold' type='submit'>
                        Fazer Login
                    </SubmitButton>
                </div>
            </form>
        </div>
    )
}

export default LoginPage