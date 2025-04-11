import { Pencil, Trash2 } from "lucide-react";
import { useDispatch } from "react-redux";
import { Category, CategoryResponse } from "../types";
import { open } from "../../../features/ui/modalSlice";

interface CategoryTableProps {
  data: CategoryResponse;
  setProductToEdit: (product: Category) => void;
  setSelectedId: (id: number) => void;
  setShowConfirm: (show: boolean) => void;
}

export const CategoryTable: React.FC<CategoryTableProps> = ({
  data,
  setProductToEdit,
  setSelectedId,
  setShowConfirm,
}) => {

  const dispatch = useDispatch()

  if (!data || data.data.length === 0) {
    return <div className="p-4 text-gray-600">No hay productos disponibles.</div>;
  }

  return (
    <table className="min-w-full bg-white border border-gray-200 rounded-lg overflow-hidden shadow-md">
      <thead className="bg-gray-100 text-gray-700 uppercase text-sm font-semibold">
        <tr>
          <th className="px-6 py-3 text-left">Código</th>
          <th className="px-6 py-3 text-left">Nombre</th>
          <th className="px-6 py-3 text-left">Descripción</th>
          <th></th>
          <th></th>
        </tr>
      </thead>
      <tbody className="text-gray-700 divide-y divide-gray-200">
        {data.data.map((item: Category) => (
          <tr key={item._id} className="hover:bg-gray-50">
            <td className="px-6 py-3">{item.code}</td>
            <td className="px-6 py-3">{item.name}</td>
            <td className="px-6 py-3">{item.description}</td>
            <td>
              <button
                onClick={() => {
                  setProductToEdit(item);
                  dispatch(open())
                }}
              >
                <Pencil color="#0011ff" />
              </button>
            </td>
            <td>
              <button
                onClick={() => {
                  setSelectedId(item._id);
                  setShowConfirm(true);
                }}
              >
                <Trash2 color="#ff0000" />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};