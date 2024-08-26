import { AxiosError } from 'axios'
import { IRegister, IRegisterResponse } from './interface/IUserService'
import { endpoints } from '../endpoints'
import { clientAxios as api } from '../../pages/api/client';

const login = async (params: {
    username: string
    password: string
}): Promise<string> => {
    try {
        const { data } = await api.post(endpoints.login, params)
        return data
    } catch (e: any) {
        throw new AxiosError(e);
    }
}

const register = async (params: IRegister): Promise<IRegisterResponse> => {
    try {
        const { data } = await api.post(endpoints.register, params)
        return data
    } catch (e: any) {
        throw new AxiosError(e);
    }
}

const getUser = async (id: string): Promise<IRegisterResponse> => {
    try {
        const { data } = await api.get(endpoints.user.replace(':id', id));
        return data
    } catch (e: any) {
        throw new AxiosError(e);
    }
}

export const userService = {
    login,
    register,
    getUser,
}
