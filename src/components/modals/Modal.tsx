// src/components/Modal.tsx
import React from 'react';
import { IoMdClose } from 'react-icons/io';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 text-[#242731] ">
      <div className="fixed inset-0 bg-black opacity-50" onClick={onClose}></div>
      <div className="bg-white rounded-lg p-6 py-0 z-10 relative max-w-lg   mx-12 lg:min-w-[900px] overflow-y-auto max-h-[700px] w-full ">
        <button className="absolute top-2 right-2" onClick={onClose}><IoMdClose size={22} color='#1A1A1A'/></button>
        {children}
      </div>
    </div>
  );
};
