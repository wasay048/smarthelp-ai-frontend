import React from 'react';

interface ModalProps {
    isVisible: boolean;
    onClose: () => void;
    children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isVisible, onClose, children }) => {
    if (!isVisible) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div className="bg-white rounded-lg shadow-lg p-6">
                <button onClick={onClose} className="absolute top-2 right-2 text-gray-600">
                    &times;
                </button>
                {children}
            </div>
        </div>
    );
};

export default Modal;