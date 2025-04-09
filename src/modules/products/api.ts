import api from '../../config/axios'
import { Product } from './types'

export const createProduct = async (formData: Product) => {
  const { data } = await api.post('/product', formData)
  return data
}

export const updateProduct = async (formData: Product) => {
  const { data } = await api.put(`/product/${formData._id}`, formData)
  return data
}

export const deleteProduct = async (id: number) => {
  const { data } = await api.delete(`/product/${id}`)
  return data
}