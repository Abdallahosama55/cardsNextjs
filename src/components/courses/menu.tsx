import React, { useState } from 'react';
import Image from 'next/image';
import edit from '../../../public/assets/images/edit.svg';
import Delete from '../../../public/assets/images/delete.svg';
import { Modal } from '../modals/Modal';
import { ToastContainer } from 'react-toastify';

interface MenuProps {
  isOpen: boolean;
  Id: string | number;
  onEdit: () => void;
  onDelete: () => void;
}

export const Menu: React.FC<MenuProps> = ({ isOpen, onEdit, onDelete, Id }) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleEditClick = () => {
    setIsEditModalOpen(true);
    onEdit();
  };

  const handleDeleteClick = () => {
    setIsDeleteModalOpen(true);
    onDelete();
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };

  return (
    <div>
      <div
        className={`absolute right-0 w-48 mt-6 bg-white rounded-md shadow-lg z-10 transition-all duration-300 ease-in-out overflow-hidden ${
          isOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <button
          className="px-4 py-2 flex items-center gap-2 hover:bg-gray-100 w-full text-left"
          onClick={handleEditClick}
        >
          <Image src={edit} alt="edit" />
          <span className="text-main">Edit</span>
        </button>
        <button
          className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 w-full text-left"
          onClick={handleDeleteClick}
        >
          <Image src={Delete} alt="Delete" />
          <span className="text-[#D8052B]">Delete</span>
        </button>
      </div>



      <ToastContainer />
    </div>
  );
};
