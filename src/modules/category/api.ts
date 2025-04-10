import { isAxiosError } from "axios";
import api from "../../config/axios"
import { Category } from "./types"
import { toast } from "sonner";


export const createCategory = async (formData: Category): Promise<Category | null> => {
    try {
        const { data } = await api.post<Category>('/category', formData);
        return data;
    } catch (error) {
        if (isAxiosError(error)) {
            console.error("Error en la solicitud:", error.response?.data || error.message);
        } else {
            console.error("Error inesperado:", error);
        }
        return null;
    }
};

export const updateCategory = async (formData: Category): Promise<Category | null> => {
    try {
        const { data } = await api.put<Category>(`/category/${formData._id}`, formData)
        return data
    } catch (error) {
        if (isAxiosError(error)) {
            console.error("Error en la solicitud:", error.response?.data || error.message);
        } else {
            console.error("Error inesperado:", error);
        }
        return null;
    }
}

export const deleteCategory = async (id: Number) => {
    try {
        const { data } = await api.delete(`/category/${id}`)
        return data
    } catch (error) {
        if (isAxiosError(error)) {
            toast.error('Error al eliminar la categoria ', error.response?.data.error )
        } else {
            console.error("Error inesperado:", error);
        }
        return null;
    }
}