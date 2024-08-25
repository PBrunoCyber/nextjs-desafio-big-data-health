import { AxiosError } from 'axios'
import { IRegisterResponse } from './interface/IUserService'
import { endpointsUser } from '../endpoints'
import { clientAxios as api } from '../../pages/api/client';

const login = async (params: {
    email: string
    password: string
}): Promise<string> => {
    try {
        const { data } = await api.post(endpointsUser.login, params)
        return data
    } catch (e: any) {
        throw new AxiosError(e);
    }
}

const register = async (params: {
    email: string,
    password: string,
    firstName: string,
    lastName: string,
}): Promise<IRegisterResponse> => {
    try {
        const { data } = await api.post(endpointsUser.register, params)
        return data
    } catch (e: any) {
        throw new AxiosError(e);
    }
}

export const userService = {
    login,
    register,
}
