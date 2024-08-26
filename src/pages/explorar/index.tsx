import CardProducts from '@/components/atoms/CardProducts'
import SelectField from '@/components/atoms/SelectField'
import Footer from '@/components/molecules/Footer'
import NavBar from '@/components/molecules/NavBar'
import { useGetAllCategories } from '@/hooks/categories/useGetAllCategories'
import { useGetAllProducts } from '@/hooks/products/useGetAllProducts'
import { useGetAllProductsByCategory } from '@/hooks/products/useGetProductByCategory'
import { Box, CircularProgress, Divider, List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import { Eye, PowerOffIcon, Shirt, Waypoints, Zap } from 'lucide-react'
import React, { ReactNode, useState } from 'react'
import { useForm } from 'react-hook-form'

const arrayIcons: Array<ReactNode> = [
    <Zap key={1} />,
    <Waypoints key={2} />,
    <Shirt key={3} />,
    <Shirt key={4} />
]

const Explorar = () => {

    const [selectedIndex, setSelectedIndex] = useState<number>(0)
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

    const { control, watch, reset } = useForm<any>();
    const limit = watch('limit');
    const sort = watch('sort');
    const { data: products, isLoading: isLoadingProducts } = useGetAllProducts({ limit: limit, sort: sort });
    const { data: categories, isLoading: isLoadingCategories } = useGetAllCategories();
    const { data: productsByCategory, isLoading: isLoadingProductsByCategory } = useGetAllProductsByCategory({ category: selectedCategory, limit: limit, sort: sort })



    const handleListItemClick = (
        index: number,
        category: string,
    ) => {
        reset({ limit: '', sort: '' })
        setSelectedIndex(index)
        setSelectedCategory(category)
    }

    return (
        <>
            <NavBar />
            {!isLoadingCategories ?
                <Box className="w-full flex flex-col items-center">
                    <Box maxWidth={'1400px'} className="w-full mt-[30px] p-[10px] rounded-md">
                        <div className={"flex flex-wrap items-center justify-between mb-[40px] bg-white rounded-lg py-[20px] px-[40px]"}>
                            <h1 className='font-primary font-bold text-[#FF2313]'>Explorar</h1>
                            <Box className="flex gap-[20px] w-[200px]">
                                <SelectField
                                    values={[
                                        { value: 1, label: "1" },
                                        { value: 2, label: "2" },
                                        { value: 3, label: "3" },
                                        { value: 4, label: "4" },
                                        { value: 5, label: "5" },
                                        { value: 6, label: "6" },
                                        { value: 7, label: "7" },
                                        { value: 8, label: "8" },
                                        { value: 9, label: "9" },
                                        { value: 10, label: "10" },
                                        { value: 11, label: "11" },
                                        { value: 12, label: "12" },
                                        { value: 13, label: "13" },
                                        { value: 14, label: "14" },
                                        { value: 15, label: "15" },
                                        { value: 16, label: "16" },
                                        { value: 17, label: "17" },
                                        { value: 18, label: "18" },
                                        { value: 19, label: "19" },
                                        { value: 20, label: "20" },
                                    ]}
                                    control={control}
                                    label='Limitar:'
                                    name='limit'
                                />
                                <SelectField
                                    control={control}
                                    label='Ordenar:'
                                    name='sort'
                                    values={[
                                        { value: 'asc', label: "Asc" },
                                        { value: 'desc', label: "Desc" }
                                    ]}
                                />
                            </Box>
                        </div>
                        <Box className="flex items-start justify-center max-[600px]:flex-wrap gap-[20px]">
                            <Box className="w-full max-w-[370px] border-[1px] rounded-[50px]">
                                <p className="h-[60px] text-[20px] rounded-tl-md rounded-tr-md font-primary flex justify-start pl-5 font-bold items-center bg-[#FF2313] text-white">
                                    CATEGORIAS
                                </p>
                                <List
                                    component="nav"
                                    aria-label="main mailbox folders"
                                    className="p-[15px] bg-white rounded-md">
                                    <ListItemButton
                                        selected={selectedIndex === 0}
                                        onClick={(event) =>
                                            handleListItemClick(0, '')
                                        }>
                                        <ListItemIcon>
                                            <Eye />
                                        </ListItemIcon>
                                        <ListItemText primary={'Mostrar tudo'} className='capitalize font-primary' />
                                    </ListItemButton>
                                    <Divider className='py-[5px]' />
                                    {categories?.map((category, index) => {
                                        return (
                                            <ListItemButton
                                                key={index}
                                                selected={selectedIndex === index + 1}
                                                onClick={(event) =>
                                                    handleListItemClick(index + 1, category)
                                                }>
                                                <ListItemIcon>
                                                    {arrayIcons[index]}
                                                </ListItemIcon>
                                                <ListItemText primary={category} className='capitalize font-primary' />
                                            </ListItemButton>
                                        )
                                    })}
                                </List>
                            </Box>
                            {selectedIndex === 0 ?
                                isLoadingProducts ?
                                    <div className='flex max-w-[950px] w-full mt-[40px] justify-center gap-[20px] flex-wrap min-h-screen'>
                                        <CircularProgress className='text-[#FF2313]' />
                                    </div>
                                    :
                                    <div className='flex max-w-[950px] w-full justify-center gap-[20px] flex-wrap min-h-screen'>
                                        {products?.map((product) => {
                                            return <CardProducts
                                                key={product.id}
                                                id={product.id}
                                                title={product.title}
                                                description={product.description}
                                                image={product.image}
                                                price={product.price}
                                            />
                                        })}
                                    </div>
                                :
                                isLoadingProductsByCategory ?
                                    <div className='flex max-w-[950px] w-full justify-center mt-[40px] gap-[20px] flex-wrap min-h-screen'>
                                        <CircularProgress className='text-[#FF2313]' />
                                    </div>
                                    :
                                    <div className='flex max-w-[950px] w-full justify-center gap-[20px] flex-wrap min-h-screen'>
                                        {productsByCategory?.map((product) => {
                                            return <CardProducts
                                                key={product.id}
                                                id={product.id}
                                                title={product.title}
                                                description={product.description}
                                                image={product.image}
                                                price={product.price}
                                            />
                                        })}
                                    </div>
                            }
                        </Box>
                    </Box>
                </Box>
                : <p className='w-full flex flex-col items-center h-screen mt-[70px] font-primary'>Carregando...</p>
            }
            <br />
            <Footer />
        </>
    )
}

export default Explorar