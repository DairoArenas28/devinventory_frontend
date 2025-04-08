import { useForm } from "react-hook-form"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { Product } from "../../types/product.type"
import { ErrorMessage } from "../../components/Error.Message"
import { getCategory, useRegisterProduct, useUpdateProduct } from "../../api/DevInventoryAPI"
import { toast } from "sonner"

interface ProductFormAddProps {
  defaultValues?: Product
  onClose: () => void
}

export const ProductFormAdd: React.FC<ProductFormAddProps> = ({ onClose, defaultValues }) => {

  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryFn: getCategory,
    queryKey: ['category'],
    retry: 1,
    refetchOnWindowFocus: false
  });

  const initialValues = {
    code: '',
    name: '',
    description: '',
    category_id: {
      name: ''
    },
    brand: '',
    price: 0,
    stock: 0
  }

  const { mutate: registerProduct } = useRegisterProduct()

  const { mutate: updateProduct } = useUpdateProduct()

  const { register, reset, handleSubmit, formState: { errors } } = useForm<Product>({
    defaultValues: defaultValues ?? initialValues
  })

  const handleregister = (formData: Product) => {
    if (defaultValues && defaultValues._id) {
      // Si hay un _id, es edición
      updateProduct({ ...formData, _id: defaultValues._id }, {
        onSuccess: () => {
          toast.success('Producto actualizado correctamente');
          reset();
          onClose();
          queryClient.invalidateQueries({ queryKey: ['product'] });
        },
      });
    } else {
      // Si no hay _id, es registro nuevo
      registerProduct(formData, {
        onSuccess: () => {
          toast.success('Producto registrado correctamente');
          reset();
          onClose();
          queryClient.invalidateQueries({ queryKey: ['product'] });
        },
      });
    }
  };
  
  return (
    <form onSubmit={handleSubmit(handleregister)} className="grid grid-cols-2 gap-4">
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

      {/* Categoría */}
      <div className="col-span-1">
        <label className="text-sm text-slate-500">Categoría</label>
        <select
          defaultValue={defaultValues?.category_id?._id}  // Selecciona automáticamente si viene algo
          {...register('category_id', { required: "La categoría es obligatoria" })}
          className="w-full bg-slate-200 border-none p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-400"
        >
          <option value="">Selecciona una categoría</option>
          {isLoading ? (
            <option value="">Cargando...</option>
          ) : (
            data?.map(category => (
              <option key={category._id} value={category._id}>
                {category.code} - {category.name}
              </option>
            ))
          )}
        </select>
        {errors.category_id && <ErrorMessage>{errors.category_id.message}</ErrorMessage>}
      </div>

      {/* Marca */}
      <div className="col-span-1">
        <label className="text-sm text-slate-500">Marca</label>
        <input
          type="text"
          className="w-full bg-slate-200 border-none p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-400"
          {...register('brand', { required: "La marca es obligatoria" })}
        />
        {errors.brand && <ErrorMessage>{errors.brand.message}</ErrorMessage>}
      </div>

      {/* Precio */}
      <div className="col-span-1">
        <label className="text-sm text-slate-500">Precio</label>
        <input
          type="number"
          className="w-full bg-slate-200 border-none p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-400"
          {...register('price', { required: "El precio es obligatorio", valueAsNumber: true })}
        />
        {errors.price && <ErrorMessage>{errors.price.message}</ErrorMessage>}
      </div>

      {/* Stock */}
      <div className="col-span-1">
        <label className="text-sm text-slate-500">Stock</label>
        <input
          type="number"
          className="w-full bg-slate-200 border-none p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-400"
          {...register('stock', { required: "El stock es obligatorio", valueAsNumber: true })}
        />
        {errors.stock && <ErrorMessage>{errors.stock.message}</ErrorMessage>}
      </div>

      {/* Botón de enviar (ocupa dos columnas) */}
      <div className="col-span-2">
        <input
          type="submit"
          className="w-full bg-cyan-400 p-3 text-lg uppercase text-white rounded-md font-semibold cursor-pointer hover:bg-cyan-500 transition"
          value="Registrar producto"
        />
      </div>
    </form>
  )
}