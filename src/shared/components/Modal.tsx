import React, { ReactNode } from "react";
import { close } from "../../features/ui/modalSlice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";

interface ModalProps {
    onClose: () => void;
    title?: string;
    children: ReactNode;
  }

const Modal: React.FC<ModalProps> = ({ title, children }) => {

  const openModalCategory = useAppSelector(state => state.openModal.value)
  const dispatch = useAppDispatch()

  if (!openModalCategory) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-2xl p-6 relative ">
        <button
          onClick={() => {
            dispatch(close())
          }}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-xl"
        >
          &times;
        </button>
        {title && <h2 className="text-xl font-bold mb-4">{title}</h2>}
        <div>{children}</div>
      </div>
    </div>
  );
};

export default Modal;