import { useQuery } from "@tanstack/react-query";
import { FilePlus2 } from "lucide-react";
import { useState } from "react";
import { getCategory } from "../../api/DevInventoryAPI";
import Modal from "../../components/Modal";
import { CategoryForm } from "./components/CategoryForm";
import { ModalConfirm } from "../../components/ModalConfirm";
import { Pagination } from "../../components/Pagination";
import { useCategoryForm } from "./hooks/useCategoryForm";
import { CategoryTable } from "./components/CategoryTable";
import { Category, CategoryResponse } from "./types";

export const CategoryPage = () => {

    const [productToEdit, setProductToEdit] = useState<Category | null>(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [selectedId, setSelectedId] = useState<number | null>(null);
    const [page, setPage] = useState(1);
    const limit = 10;

    const { data, isLoading, isError, error } = useQuery<CategoryResponse>({
        queryFn: () => getCategory({ page, limit }),
        queryKey: ['category', page],
        retry: 1,
        refetchOnWindowFocus: false
    });

    const { handleDelete } = useCategoryForm({
        defaultValues: null,
        onSuccessCallback: () => {
            setModalOpen(false);
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
                <button onClick={() => setModalOpen(true)} className="p-2 rounded hover:bg-gray-200 transition">
                    <FilePlus2 className="w-6 h-6 text-gray-600" />
                </button>
            </div>

            {/* Tabla o mensaje vacío */}

            {data && (
                <CategoryTable
                    data={data}
                    setProductToEdit={setProductToEdit}
                    setModalOpen={setModalOpen}
                    setSelectedId={setSelectedId}
                    setShowConfirm={setShowConfirm}
                />
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
                title={productToEdit ? 'Editar Categoria' : 'Agregar Categoria'}
            >
                <CategoryForm
                    defaultValues={productToEdit}
                    onClose={() => {
                        setModalOpen(false);
                        setProductToEdit(null);
                    }}
                />
            </Modal>

            {/* Modal para confirmar si desea eliminar el registro */}
            <ModalConfirm
                isOpen={showConfirm}
                message="¿Estás seguro de eliminar esta categoria? Esta acción no se puede deshacer."
                onClose={() => setShowConfirm(false)}
                onConfirm={confirmDelete}
            />
        </div>
    );



};