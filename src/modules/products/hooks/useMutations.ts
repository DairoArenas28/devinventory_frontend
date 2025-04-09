import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'
import { isAxiosError } from 'axios'
import { createProduct, updateProduct, deleteProduct } from '../api'

export const useRegisterProduct = () => {
    return useMutation({
        mutationFn: createProduct,
        onError: (error) => {
            if (isAxiosError(error)) {
                const msg = error.response?.data?.error || 'Error al registrar el producto';
                toast.error(msg);
            }
        }
    })
}

export const useUpdateProduct = () => {
    return useMutation({
        mutationFn: updateProduct,
        onError: (error) => {
            console.log(error);
            if (isAxiosError(error)) {
                const msg = error.response?.data?.error || 'Error al registrar el producto';
                console.log(error.response?.data?.error)
                toast.error(msg)
            }
        }
    })
}

export const useDeleteProduct = () => {
    return useMutation({
        mutationFn: deleteProduct,
        onError: (error) => {
            if (isAxiosError(error)) {
                toast.error(error.response?.data?.error || 'Error al eliminar el producto')
            }
        }
    })
}