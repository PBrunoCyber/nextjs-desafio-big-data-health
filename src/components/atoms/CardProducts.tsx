import React from 'react'
import LinkButton from './LinkButton'
import SubmitButton from './SubmitButton';
import { ChevronRight } from 'lucide-react';

interface CardProducts {
    id: number;
    image: string;
    price: string;
    title: string;
    description: string;
}

const truncateText = (text: string, maxLength: number) => {
    if (text.length > maxLength) {
        return text.substring(0, maxLength) + '...';
    }
    return text;
};

const CardProducts = ({ image, id, title, price, description }: CardProducts) => {
    return (
        <div className='flex flex-col gap-[10px] items-center max-w-[300px]'>

            <div>
                <img src={image} width={300} height={200} alt="Product" className='rounded-[20px] h-[250px] object-cover' />
            </div>

            <p className='font-primary text-[20px] font-bold text-center h-[60px]'>{truncateText(title, 40)}</p>
            <p className='font-primary text-[12px] text-center h-[40px]'>{truncateText(description, 90)}</p>
            <p className='font-primary text-[20px] text-center font-bold'>$ {price}</p>
            
            <LinkButton href={`/explorar/${id}`} variant='text' className='flex items-center'>
                <p className='font-primary text-[14px]'>Ver Detalhes</p>
                <ChevronRight />
            </LinkButton>
        </div>
    )
}

export default CardProducts