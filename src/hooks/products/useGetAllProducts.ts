import { productsService } from '@/services/products/Products'
import { useQuery } from 'react-query'

export function useGetAllProducts({limit, sort}: {limit: string, sort: string}) {
    return useQuery({
        queryKey: ['GetAllProducts', { limit, sort }],
        queryFn: () => {
            return productsService.getProducts({limit, sort})
        },
        retry: false,
        refetchOnWindowFocus: false,
    })
}