import { useForm } from "react-hook-form"
import { Category } from "../types"
import { ErrorMessage } from "../../../components/Error.Message"
import { useCategoryForm } from "../hooks/useCategoryForm"

interface ProductFormProps {
  defaultValues?: Category | null
  onClose: () => void
}

export const CategoryForm: React.FC<ProductFormProps> = ({ onClose, defaultValues }) => {

  const initialValues = {
    code: '',
    name: '',
    description: '',
    category_id: { _id: 0, name: "" },
    brand: '',
    price: 0,
    stock: 0
  }

  const { register, reset, handleSubmit, formState: { errors } } = useForm<Category>({
    defaultValues: defaultValues ?? initialValues
  })

  const { handleRegister } = useCategoryForm({
    defaultValues,
    onSuccessCallback: () => {
      reset()
      onClose()
    },
  })

  return (
    <form onSubmit={handleSubmit(handleRegister)} className="grid grid-cols-2 gap-4">
      {/* Código del producto */}
      <div className="col-span-1">
        <label className="text-sm text-slate-500">Código del producto</label>
        <input
          type="text"
          className="w-full bg-slate-200 border-none p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-400"
          {...register('code', { required: "El código es obligatorio" })}
        />
        {errors.code && <ErrorMessage>{errors.code.message}</ErrorMessage>}
      </div>

      {/* Nombre del producto */}
      <div className="col-span-1">
        <label className="text-sm text-slate-500">Nombre del producto</label>
        <input
          type="text"
          className="w-full bg-slate-200 border-none p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-400"
          {...register('name', { required: "El nombre es obligatorio" })}
        />
        {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}
      </div>

      {/* Descripción (ocupa dos columnas) */}
      <div className="col-span-2">
        <label className="text-sm text-slate-500">Descripción</label>
        <textarea
          className="w-full bg-slate-200 border-none p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-400"
          {...register('description', { required: "La descripción es obligatoria" })}
        />
        {errors.description && <ErrorMessage>{errors.description.message}</ErrorMessage>}
      </div>

      {/* Botón de enviar (ocupa dos columnas) */}
      <div className="col-span-2">
        <input
          type="submit"
          className="w-full bg-cyan-400 p-3 text-lg uppercase text-white rounded-md font-semibold cursor-pointer hover:bg-cyan-500 transition"
          value="Registrar categoria"
        />
      </div>
    </form>
  )
}