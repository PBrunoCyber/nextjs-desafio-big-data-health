import { productsService } from '@/services/products/Products'
import { useQuery } from 'react-query'

export function useGetProductById(id: string) {
    return useQuery({
        queryKey: ['GetProductById', { id }],
        queryFn: () => {
            if (id) {
                return productsService.getProductsById(id)
            }
        },
        retry: false,
        refetchOnWindowFocus: false,
    })
}