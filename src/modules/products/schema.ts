/*import { z } from 'zod'

export const productSchema = z.object({
    _id: z.number().optional(), // <- esto es clave
    code: z.string().min(1, 'El código es obligatorioqq'),
    name: z.string().min(1, 'El nombre es obligatorio'),
    description: z.string().optional(),
    category_id: z.object({
        _id: z.string({
            required_error: "La categoría es obligatoria",
        }),
        name: z.string().min(1, 'La categoria es obligatoria'),
    }),
    brand: z.string().min(1, 'La marca es obligatoria'),
    price: z
        .number({ invalid_type_error: 'El precio debe ser un número' })
        .min(0, 'El precio debe ser mayor o igual a 0'),
    stock: z
        .number({ invalid_type_error: 'El stock debe ser un número' })
        .min(0, 'El stock debe ser mayor o igual a 0'),
})*/

