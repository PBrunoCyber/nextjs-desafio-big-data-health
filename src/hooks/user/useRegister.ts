import { AxiosError } from 'axios'
import { MutationOptions } from '../useMutation'
import { useMutation } from 'react-query'
import { toast } from 'react-toastify'

import { userService } from '../../services/user/User'
import { IRegister } from '@/services/user/interface/IUserService'

export function useRegisterUser(options?: MutationOptions<any>) {
    const mutation = useMutation<any, AxiosError, IRegister>({
        mutationFn: async (dataPost: IRegister) => {
            return await userService.register(dataPost)
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
        register: (data: IRegister) =>
            mutation.mutate(data),
        isSuccess: mutation.isSuccess,
        isError: mutation.isError,
    }
}
