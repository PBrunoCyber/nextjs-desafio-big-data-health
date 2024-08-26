import { AxiosError } from 'axios'
import { MutationOptions } from '../useMutation'
import { useMutation } from 'react-query'
import { toast } from 'react-toastify'

import { userService } from '@/services/user/User'

export function useLoginUser(options?: MutationOptions<any>) {
    const mutation = useMutation<any, AxiosError, {username: string, password: string}>({
        mutationFn: async (dataPost: {username: string, password: string}) => {
            return await userService.login(dataPost)
        },
        retry: false,
        onError: (error: any) => {
            toast.error(
                error.message.response.data, {className: "capitalize"}
            )
            if (options?.onError) {
                options.onError(error.message)
            }
        },
        onSuccess: (data: any) => {
            if (options?.onSuccess) {
                options.onSuccess(data)
            }
        },
    })

    return {
        isLoading: mutation.isLoading,
        login: (data: {username: string, password: string}) =>
            mutation.mutate(data),
        isSuccess: mutation.isSuccess,
        isError: mutation.isError,
    }
}
