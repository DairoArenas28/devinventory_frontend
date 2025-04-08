import { isAxiosError } from "axios"
import api from "../config/axios"
import { User } from "../types/user.type"
import { Product, ProductResponse } from "../types/product.type"
import { Category } from "../types/category.type"
import { useMutation } from "@tanstack/react-query"
import { toast } from "sonner"

interface GetProductProps {
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

export async function getCategory() {
    try {
        const { data } = await api<Category[]>('/category')
        //console.log(data)
        return data
    } catch (error) {
        if (isAxiosError(error) && error.message) {
            throw new Error(error.response?.data.error);
        }
    }
}

export const useRegisterProduct = () => {
    return useMutation({
        mutationFn: async (formData: Product) => {
            const { data } = await api.post('/product', formData)
            //console.log(data)
            return data
        },
        onError: (error) => {
            if (isAxiosError(error)) {
                toast.error(error.response?.data?.error || 'Error al registrar el producto')
            }
        }
    })
}

export const useUpdateProduct = () => {
    return useMutation({
        mutationFn: async (formData: Product) => {
            const { data } = await api.put(`/product/${formData._id}`, formData)
            //console.log(data)
            return data
        },
        onError: (error) => {
            if (isAxiosError(error)) {
                toast.error(error.response?.data?.error || 'Error al registrar el producto')
            }
        }
    })
}

export const useDeleteProduct = () => {
    return useMutation({
        mutationFn: async (id: number) => {
            const { data } = await api.delete(`/product/${id}`)
            //console.log(data)
            return data
        },
        onError: (error) => {
            if (isAxiosError(error)) {
                toast.error(error.response?.data?.error || 'Error al registrar el producto')
            }
        }
    })
}

