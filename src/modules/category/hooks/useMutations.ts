import { useMutation } from "@tanstack/react-query"
import { createCategory, deleteCategory, updateCategory } from "../api"
import { isAxiosError } from "axios"
import { toast } from "sonner"


export const useRegisterCategoty = () => {
    return useMutation({
        mutationFn: createCategory,
        onError: (error) => {
            if(isAxiosError(error)){
                const message = error.response?.data.error || 'Error al registrar la categoria'
                toast.error(message)
            }
        }
    })
}

export const useUpdateCategory = () => {
    return useMutation({
        mutationFn: updateCategory,
        onError: (error) => {
            if(isAxiosError(error)){
                const message = error.response?.data.error || 'Error al actualizar la categoria'
                toast.error(message)
            }
        }
    })
}

export const useDeleteCategory = () => {
    return useMutation({
        mutationFn: deleteCategory,
        onError: (error) => {
            if(isAxiosError(error)){
                const message = error.response?.data.error || 'Error al actualizar la categoria'
                toast.error(message)
            }
        }
    })
}