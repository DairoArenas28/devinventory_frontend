import { useQuery } from "@tanstack/react-query";
import { FilePlus2 } from "lucide-react";
import { useState } from "react";
import { getProduct } from "../../api/DevInventoryAPI";
import { Product, ProductResponse } from "./types";
import Modal from "../../shared/components/Modal";
import { ProductForm } from "./components/ProductForm";
import { ModalConfirm } from "../../shared/components/ModalConfirm";
import { Pagination } from "../../shared/components/Pagination";
import { useProductForm } from "./hooks/useProductForm";
import { ProductTable } from "./components/ProductTable";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { close, open } from "../../features/ui/modalSlice";

export const ProductView = () => {

    const [productToEdit, setProductToEdit] = useState<Product | null>(null);
    const [showConfirm, setShowConfirm] = useState(false);
    const [selectedId, setSelectedId] = useState<number | null>(null);

    const page = useAppSelector(state => state.page.value)
    const limit = useAppSelector(state => state.limit.value)
    
    const dispatch = useAppDispatch()

    const { data, isLoading, isError, error } = useQuery<ProductResponse>({
        queryFn: () => getProduct({ page, limit }),
        queryKey: ['product', page],
        retry: 1,
        refetchOnWindowFocus: false
    });

    const { handleDelete } = useProductForm({
        defaultValues: null,
        onSuccessCallback: () => {
            dispatch(close())
            setProductToEdit(null);
        }
    });

    const confirmDelete = () => {
        if (selectedId) {
            handleDelete(selectedId, () => {
                setSelectedId(null);
                setShowConfirm(false);
            });
        }
    };

    if (isLoading) return <div className="p-4">Cargando productos...</div>;

    if (isError) return (
        <div className="p-4 text-red-600">
            Error al cargar los productos: {error.message || "Error desconocido"}
        </div>
    );



    return (
        <div className="p-4 overflow-x-auto">
            <div className="flex items-center justify-start mb-4">
                <h2 className="text-2xl font-bold text-gray-800">Lista de Productos</h2>
                <button onClick={() => dispatch(open())} className="p-2 rounded hover:bg-gray-200 transition">
                    <FilePlus2 className="w-6 h-6 text-gray-600" />
                </button>
            </div>

            {/* Tabla o mensaje vacío */}

            {data && (
                <ProductTable
                    data={data}
                    setProductToEdit={setProductToEdit}
                    setSelectedId={setSelectedId}
                    setShowConfirm={setShowConfirm}
                />
            )}

            <div className="flex justify-end mt-4">
                <Pagination
                    total={data?.total || 0}
                />
            </div>
            {/* Modal para agregar o editar */}
            <Modal
                onClose={() => {
                    dispatch(close())
                    setProductToEdit(null);
                }}
                title={productToEdit ? 'Editar Producto' : 'Agregar Producto'}
            >
                <ProductForm
                    defaultValues={productToEdit}
                    onClose={() => {
                        dispatch(close())
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