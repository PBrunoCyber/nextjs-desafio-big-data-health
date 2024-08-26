/* eslint-disable @next/next/no-img-element */
import TextField from '@/components/atoms/TextField'
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react'
import { useForm } from 'react-hook-form'
import { RegisterSchema, registerSchema } from '@/schemas/registerSchema';
import SubmitButton from '@/components/atoms/SubmitButton';
import { useRegisterUser } from '@/hooks/user/useRegister';
import { toast } from 'react-toastify';
import LinkButton from '@/components/atoms/LinkButton';
import { useRouter } from 'next/navigation';
import { parseCookies } from 'nookies';
import { GetServerSideProps } from 'next';

const RegisterPage = () => {
    const router = useRouter();
    const {
        control,
        handleSubmit,
    } = useForm<RegisterSchema>({
        resolver: zodResolver(registerSchema),
    });

    const { register, isLoading } = useRegisterUser({
        onSuccess: () => {
            toast.success('Registrado com sucesso, agora faça o login!');
            router.push('/login');
        },
    })

    const onSubmit = (data: any) => {
        register({
            email: data.email,
            password: data.password,
            name: {
                firstname: data.firstName,
                lastname: data.lastName
            },
            address: {
                city: "Teresina",
                geolocation: {
                    lat: '-37.3159',
                    long: '81.1496'
                },
                street: "Hello",
                number: 3,
                zipcode: '12926-3874'
            },
            phone: "1-570-236-7033"
        })
    }

    return (
        <div className='w-full h-screen min-h-[400px] flex flex-col items-center justify-center'>
            <form onSubmit={handleSubmit(onSubmit)} className='max-w-[600px] w-full p-[20px] bg-[#fff] flex flex-col items-center rounded-[20px]'>
                <LinkButton variant='textBlack' href='/'>
                    <img src="images/logo.png" width={100} alt="" />
                </LinkButton>
                <h1 className='font-primary font-bold text-[#FF2313]'>Faça seu cadastro</h1>
                <div className='flex flex-row w-full px-[30px] gap-[20px] mt-[30px]'>
                    <TextField
                        control={control}
                        label='First Name'
                        placeholder='Digite seu nome'
                        name='firstName'
                        type="input"
                    />
                    <TextField
                        control={control}
                        label='Last Name'
                        placeholder='Digite seu sobrenome'
                        name='lastName'
                        type="input"
                    />
                </div>
                <div className='flex flex-col gap-[10px] w-full mb-[20px] px-[30px] py-[10px]'>
                    <TextField
                        control={control}
                        label='Email'
                        placeholder='Digite seu e-mail'
                        name='email'
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
                        <p>Já possui cadastro?</p>
                        <LinkButton variant='text' href='/login'>Faça Log in</LinkButton>
                    </div>
                    <SubmitButton isLoading={isLoading} variant='contained' className='font-bold' type='submit'>
                        Registrar
                    </SubmitButton>
                </div>
            </form>
        </div>
    )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {

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

export default RegisterPage