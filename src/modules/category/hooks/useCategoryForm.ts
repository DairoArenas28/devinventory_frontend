import { toast } from 'sonner'
import { useQueryClient } from '@tanstack/react-query'
import { useRegisterCategoty, useUpdateCategory, useDeleteCategory } from './useMutations'
import { Category } from '../types'

interface UseProductFormProps {
  defaultValues?: Category | null
  onSuccessCallback: () => void
}

export const useCategoryForm = ({ defaultValues, onSuccessCallback }: UseProductFormProps) => {
  const queryClient = useQueryClient();
  const registerCategory  = useRegisterCategoty();
  const updateCategory  = useUpdateCategory();
  const deleteCategory = useDeleteCategory();

  const handleRegister = (formData: Category) => {
    const onSuccess = () => {
      toast.success(
        defaultValues && defaultValues._id
          ? 'Categoria actualizado correctamente'
          : 'Categoria registrado correctamente'
      )
      onSuccessCallback()
      queryClient.invalidateQueries({ queryKey: ['category'] })  
    }

    if (defaultValues && defaultValues._id) {
      updateCategory.mutate({ ...formData, _id: defaultValues._id }, { onSuccess })
    } else {
      registerCategory.mutate(formData, { onSuccess })
    }
  }

  const handleDelete = (id: number, onFinish?: () => void) => {
    if (!id) return;
    console.log(id)
    deleteCategory.mutate(id, {
      onSuccess: () => {
        toast.success("Categoria eliminada correctamente");
        queryClient.invalidateQueries({ queryKey: ["category"] });
        if (onFinish) onFinish();
      },
      onError: () => {
        toast.error("Hubo un error al eliminar la categoria");
      }
    });
  };

  return {
    handleRegister,
    handleDelete,
  };
};