import { userService } from '@/services/user/User'
import { useQuery } from 'react-query'

export function useGetUser(id: string) {
    return useQuery({
        queryKey: ['GetUserById', { id }],
        queryFn: () => {
            if (id) {
                return userService.getUser(id)
            }
        },
        retry: false,
        refetchOnWindowFocus: false,
    })
}