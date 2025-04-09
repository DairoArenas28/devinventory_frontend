import { toast } from 'sonner'
import { useQueryClient } from '@tanstack/react-query'
import { useRegisterProduct, useUpdateProduct, useDeleteProduct } from './useMutations'
import { Product } from '../types'

interface UseProductFormProps {
  defaultValues?: Product | null
  onSuccessCallback: () => void
}

export const useProductForm = ({ defaultValues, onSuccessCallback }: UseProductFormProps) => {
  const queryClient = useQueryClient();
  const registerProduct = useRegisterProduct();
  const updateProduct = useUpdateProduct();
  const deleteProduct = useDeleteProduct();

  const handleRegister = (formData: Product) => {
    const onSuccess = () => {
      toast.success(
        defaultValues && defaultValues._id
          ? 'Producto actualizado correctamente'
          : 'Producto registrado correctamente'
      )
      onSuccessCallback()
      queryClient.invalidateQueries({ queryKey: ['product'] })
    }

    if (defaultValues && defaultValues._id) {
      updateProduct.mutate({ ...formData, _id: defaultValues._id }, { onSuccess })
    } else {
      registerProduct.mutate(formData, { onSuccess })
    }
  }

  const handleDelete = (id: number | null, onFinish?: () => void) => {
    if (!id) return;

    deleteProduct.mutate(id, {
      onSuccess: () => {
        toast.success("Producto eliminado correctamente");
        queryClient.invalidateQueries({ queryKey: ["product"] });
        if (onFinish) onFinish();
      },
      onError: () => {
        toast.error("Hubo un error al eliminar el producto");
      }
    });
  };

  return {
    handleRegister,
    handleDelete,
  };
};