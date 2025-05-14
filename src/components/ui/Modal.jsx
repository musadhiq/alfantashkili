import React from "react";
import { X } from "lucide-react";

const Modal = ({ open, onClose, title, children }) => {
  if (!open) return null;

  return (
    <div className="modal-overlay fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="modal-container bg-white w-[90%] max-w-md p-6 rounded-lg shadow-lg relative animate-fade-in">
        <div className="modal-header flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">{title}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-800">
            <X size={20} />
          </button>
        </div>

        <div className="modal-body">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
