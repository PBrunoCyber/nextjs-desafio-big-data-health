import React, { MouseEventHandler, ReactNode } from 'react'
import PropTypes from 'prop-types';
import clsx from 'clsx';
import Link from 'next/link';
import { Button as ButtonMui, IconButton } from '@mui/material';
const baseStyles = 'px-4 py-2 rounded-[100px] focus:outline-none transition';

const variantStyles = {
    outlined: 'font-primary border-[1px] border-[#FF2313] text-[#FF2313] hover:bg-[#ffe1de] px-[15px] py-[10px]',
    outlinedBlack: 'font-primary border-[1px] border-[#000000] text-[#000000] hover:border-[#FF2313] hover:bg-[#fff1f0] hover:text-[#FF2313] px-[15px] py-[10px]',
    contained: 'font-primary text-white bg-[#FF2313] hover:bg-[#ac190f] px-[15px] py-[10px]',
    text: 'font-primary text-[#FF2313] hover:text-black',
    textBlack: 'font-primary hover:text-[#FF2313] text-black'
};

interface ButtonProps {
    variant: 'outlined' | 'outlinedBlack' | 'contained' | 'text' | 'textBlack';
    className?: string;
    children: ReactNode;
    onClick: () => void
}

const Button: React.FC<ButtonProps> = ({ onClick, variant, children, className }) => {
    const buttonClass = clsx(baseStyles, variantStyles[variant], className);

    return (
        <a
            className={buttonClass}
            onClick={onClick}
        >
            {children}
        </a>
    )
}

export default Button