import { useQuery, useQueryClient } from "@tanstack/react-query";
import { FilePlus2, Trash2, Pencil } from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";
import { getProduct, useDeleteProduct } from "../../api/DevInventoryAPI";
import { Product, ProductResponse } from "../../types/product.type";
import Modal from "../../components/Modal";
import { ProductFormAdd } from "./ProductFormView";
import { ModalConfirm } from "../../components/ModalConfirm";
import { Pagination } from "../../components/Pagination";

export const ProductView = () => {

    const [productToEdit, setProductToEdit] = useState<Product | null>(null);
    const [modalOpen, setModalOpen] = useState(false);
    const { mutate: deleteProduct } = useDeleteProduct()
    const [showConfirm, setShowConfirm] = useState(false);
    const [selectedId, setSelectedId] = useState<number | null>(null);
    const queryClient = useQueryClient();
    const [page, setPage] = useState(1);
    const limit = 10;

    const { data, isLoading, isError, error } = useQuery<ProductResponse>({
        queryFn: () => getProduct({ page, limit }),
        queryKey: ['product', page],
        retry: 1,
        refetchOnWindowFocus: false
    });

    if (isLoading) return <div className="p-4">Cargando productos...</div>;

    if (isError) return (
        <div className="p-4 text-red-600">
            Error al cargar los productos: {error.message || "Error desconocido"}
        </div>
    );

    const confirmDelete = () => {
        if (selectedId !== null) {
            deleteProduct(selectedId, {
                onSuccess: () => {
                    toast.success("Producto eliminado correctamente");
                    setSelectedId(null);
                    queryClient.invalidateQueries({ queryKey: ['product'] });
                },
                onError: () => {
                    toast.error("Hubo un error al eliminar el producto");
                }
            });
        }
    };

    return (
        <div className="p-4 overflow-x-auto">
            <div className="flex items-center justify-start mb-4">
                <h2 className="text-2xl font-bold text-gray-800">Lista de Productos</h2>
                <button onClick={() => setModalOpen(true)} className="p-2 rounded hover:bg-gray-200 transition">
                    <FilePlus2 className="w-6 h-6 text-gray-600" />
                </button>
            </div>
            {/* Tabla o mensaje vacío */}
            {!data || data.data.length === 0 ? (
                <div className="p-4 text-gray-600">No hay productos disponibles.</div>
            ) : (
                <table className="min-w-full bg-white border border-gray-200 rounded-lg overflow-hidden shadow-md">
                    <thead className="bg-gray-100 text-gray-700 uppercase text-sm font-semibold">
                        <tr>
                            <th className="px-6 py-3 text-left">Código</th>
                            <th className="px-6 py-3 text-left">Nombre</th>
                            <th className="px-6 py-3 text-left">Categoría</th>
                            <th className="px-6 py-3 text-left">Precio</th>
                            <th className=""></th>
                            <th className=""></th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-700 divide-y divide-gray-200">
                        {data.data.map((item: Product) => (
                            <tr key={item._id} className="hover:bg-gray-50">
                                <td className="px-6 py-3">{item.code}</td>
                                <td className="px-6 py-3">{item.name}</td>
                                <td className="px-6 py-3">{item.category_id.name}</td>
                                <td className="px-6 py-3">{item.price}</td>
                                <td>
                                    <button onClick={() => {
                                        setProductToEdit(item);
                                        setModalOpen(true);
                                    }}>
                                        <Pencil color="#0011ff" />
                                    </button>
                                </td>
                                <td>
                                    <button
                                        onClick={() => { setSelectedId(item._id); setShowConfirm(true); }}
                                    >
                                        <Trash2 color="#ff0000" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                    {/* Paginador */}

                </table>


            )}
            <div className="flex justify-end mt-4">
                <Pagination
                    total={data?.total || 0}
                    limit={limit}
                    page={page}
                    onPageChange={(newPage) => setPage(newPage)}
                />
            </div>
            {/* Modal para agregar o editar */}
            <Modal
                isOpen={modalOpen}
                onClose={() => {
                    setModalOpen(false);
                    setProductToEdit(null);
                }}
                title={productToEdit ? 'Editar Producto' : 'Agregar Producto'}
            >
                <ProductFormAdd
                    defaultValues={productToEdit ?? undefined}
                    onClose={() => {
                        setModalOpen(false);
                        setProductToEdit(null);
                    }}
                />
            </Modal>

            {/* Modal para confirmar si desea eliminar el registro */}
            <ModalConfirm
                isOpen={showConfirm}
                message="¿Estás seguro de eliminar este producto? Esta acción no se puede deshacer."
                onClose={() => setShowConfirm(false)}
                onConfirm={confirmDelete}
            />
        </div>
    );



};