import { isAxiosError } from "axios"
import api from "../config/axios"
import { User } from "../types/user.type"
import { ProductResponse } from "../modules/products/types"
import { Category, CategoryResponse } from "../modules/category/types"

interface GetProductProps {
    page: number
    limit: number
}

interface GetCategoryProps {
    page: number
    limit: number
}


export async function getUser() {
    try {
        const { data } = await api<User>('/user')
        return data
    } catch (error) {
        if (isAxiosError(error) && error.message) {
            throw new Error(error.response?.data.error);
        }
    }
}


export async function getProduct({ page, limit }: GetProductProps): Promise<ProductResponse> {
    try {
        const { data } = await api.get<ProductResponse>(`/product?page=${page}&limit=${limit}`);
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response?.data?.error) {
            throw new Error(error.response.data.error);
        }
        throw new Error('Ocurrió un error al obtener los productos');
    }
}

export async function getCategory({ page, limit }: GetCategoryProps): Promise<CategoryResponse> {
    try {
        const { data } = await api<CategoryResponse>(`/category?page=${page}&limit=${limit}`)
        //console.log(data)
        return data
    } catch (error) {
        if (isAxiosError(error) && error.message) {
            throw new Error(error.response?.data.error);
        }
        throw new Error('Ocurrió un error al obtener las categorias');
    }
}

export async function getCategoryFind() {
    try {
        const { data } = await api<CategoryResponse>('/category')
        console.log('Categorías recibidas:', data) // 👈 agrega esto
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response?.data?.error) {
            throw new Error(error.response.data.error)
        }
        throw new Error('Ocurrió un error al obtener las categorías')
    }
}

