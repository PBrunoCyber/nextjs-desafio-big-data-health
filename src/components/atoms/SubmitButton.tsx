import React from 'react'
import clsx from 'clsx';
import { CircularProgress } from '@mui/material';
import { LoadingButton } from '@mui/lab';

const baseStyles = 'px-4 py-2 rounded-[100px] focus:outline-none transition';

const variantStyles = {
    outlined: 'font-primary border-[1px] border-[#FF2313] text-[#FF2313] hover:bg-[#ffe1de] px-[15px] py-[10px]',
    outlinedBlack: 'font-primary border-[1px] border-[#000000] text-[#000000] hover:border-[#FF2313] hover:bg-[#fff1f0] px-[15px] py-[10px]',
    contained: 'font-primary text-white bg-[#FF2313] hover:bg-[#ac190f] px-[15px] py-[10px]',
    text: 'font-primary text-[#FF2313] hover:text-black',
    textBlack: 'font-primary hover:text-[#FF2313] text-black'
};

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    isLoading: boolean;
    type: "button" | "submit" | "reset" | undefined,
    variant: 'outlined' | 'outlinedBlack' | 'contained' | 'text' | 'textBlack';
    className?: string;
}

const SubmitButton: React.FC<ButtonProps> = ({ type, isLoading, onClick, variant, children, className }) => {
    const buttonClass = clsx(baseStyles, variantStyles[variant], className);

    return (
        <LoadingButton
            loading={isLoading}
            loadingIndicator={<CircularProgress size={20} className='text-[#ffffff]' />}
            loadingPosition='center'
            type={type}
            onClick={onClick}
            className={buttonClass}
        >
            {children}
        </LoadingButton>
    )
}

export default SubmitButton