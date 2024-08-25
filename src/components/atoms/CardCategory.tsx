/* eslint-disable @next/next/no-img-element */
import { Box, ChevronRight } from 'lucide-react'
import React from 'react'
import LinkButton from './LinkButton'

const CardCategory = ({ src, title, description, href }: { src: string, title: string, description: string, href: string }) => {
    return (
        <div className='flex flex-col gap-[10px] items-center max-w-[300px]'>
            <div className='max-h-[200px]'>
                <img src={src} width={400} height={200} alt="Category" className='rounded-[20px] max-h-[150px] object-cover' />
            </div>
            <p className='font-primary text-[15px] font-bold text-center'>{title}</p>
            <p className='font-primary text-[12px] text-center'>{description}</p>
            <LinkButton href={href} className='flex items-center' variant='textBlack'>
                <p className='font-primary text-[14px]'>Ver Mais</p>
                <ChevronRight />
            </LinkButton>
        </div>
    )
}

export default CardCategory