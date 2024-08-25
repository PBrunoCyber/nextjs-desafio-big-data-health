import { AxiosError } from 'axios'
import { MutationOptions } from '../useMutation'
import { useMutation } from 'react-query'
import { toast } from 'react-toastify'

import { userService } from '../../services/user/User'

export function useLoginUser(options?: MutationOptions<any>) {
    const mutation = useMutation<any, AxiosError, {email: string, password: string}>({
        mutationFn: async (dataPost: {email: string, password: string}) => {
            return await userService.login(dataPost)
        },
        retry: false,
        onError: (error: any) => {
            toast.error(
                error.message.response.data.message,
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
        login: (data: {email: string, password: string}) =>
            mutation.mutate(data),
        isSuccess: mutation.isSuccess,
        isError: mutation.isError,
    }
}
