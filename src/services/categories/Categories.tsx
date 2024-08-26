import { AxiosError } from 'axios'
import { endpoints } from '../endpoints'
import { clientAxios as api } from '../../pages/api/client';

const getCategories = async (): Promise<Array<string>> => {
    try {
        const { data } = await api.get(endpoints.categories);
        return data
    } catch (e: any) {
        throw new AxiosError(e);
    }
}

export const categoriesService = {
    getCategories,
}
