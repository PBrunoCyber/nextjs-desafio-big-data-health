import { productsService } from '@/services/products/Products'
import { useQuery } from 'react-query'

export function useGetAllProductsByCategory({ category, limit, sort }: { category: string | null,  limit: string, sort: string }) {
    return useQuery({
        queryKey: ['GetProductByCategory', { category, limit, sort }],
        queryFn: () => {
            if (category) {
                return productsService.getProductsByCategory({ category, limit, sort })
            }
        },
        retry: false,
        refetchOnWindowFocus: false,
    })
}