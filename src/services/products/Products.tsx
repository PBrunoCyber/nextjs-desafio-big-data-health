import { AxiosError } from 'axios'
import { endpoints } from '../endpoints'
import { clientAxios as api } from '../../pages/api/client';
import { IProductResponse } from './interface/IProductService';

const getProducts = async ({ limit, sort }: { limit: string, sort: string }): Promise<IProductResponse[]> => {
    try {
        const { data } = await api.get(endpoints.products.replace(':limit', limit ?? "").replace(':sort', sort ?? ""));
        return data
    } catch (e: any) {
        throw new AxiosError(e);
    }
}

const getProductsById = async ( id: string ): Promise<IProductResponse> => {
    try {
        const { data } = await api.get(endpoints.productsById.replace(':id', id ?? ""));
        return data
    } catch (e: any) {
        throw new AxiosError(e);
    }
}

const getProductsByCategory = async ({ category, limit, sort }: { category: string, limit: string, sort: string }): Promise<IProductResponse[]> => {
    try {
        const { data } = await api.get(
            endpoints.productsByCategory
                .replace(':category', category ?? "")
                .replace(':limit', limit ?? "")
                .replace(':sort', sort ?? "")
        );
        return data
    } catch (e: any) {
        throw new AxiosError(e);
    }
}

export const productsService = {
    getProducts,
    getProductsByCategory,
    getProductsById,
}
