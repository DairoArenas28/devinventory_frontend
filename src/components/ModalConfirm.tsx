import React from 'react';

interface ModalConfirmProps {
    isOpen: boolean;
    title?: string;
    message: string;
    onClose: () => void;
    onConfirm: () => void;
}

export const ModalConfirm: React.FC<ModalConfirmProps> = ({
    isOpen,
    title = "¿Estás seguro?",
    message,
    onClose,
    onConfirm,
}) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
            <div className="bg-white rounded-xl p-6 max-w-sm w-full shadow-lg">
                <h2 className="text-xl font-bold mb-4">{title}</h2>
                <p className="text-sm text-gray-700 mb-6">{message}</p>
                <div className="flex justify-end space-x-4">
                    <button
                        className="px-4 py-2 rounded-md bg-gray-300 hover:bg-gray-400 text-gray-800"
                        onClick={onClose}
                    >
                        Cancelar
                    </button>
                    <button
                        className="px-4 py-2 rounded-md bg-red-500 hover:bg-red-600 text-white"
                        onClick={() => {
                            onConfirm();
                            onClose();
                        }}
                    >
                        Confirmar
                    </button>
                </div>
            </div>
        </div>
    );
};