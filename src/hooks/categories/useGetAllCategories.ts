import { categoriesService } from '@/services/categories/Categories'
import { productsService } from '@/services/products/Products'
import { useQuery } from 'react-query'

export function useGetAllCategories() {
    return useQuery({
        queryKey: ['GetAllCategories'],
        queryFn: () => {
            return categoriesService.getCategories()
        },
        retry: false,
        refetchOnWindowFocus: false,
    })
}