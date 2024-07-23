import React, { useState } from 'react';
import { PiDotsThreeBold } from 'react-icons/pi';
import { Menu } from './Menu';
import Image from 'next/image';
import clender from '../../../public/assets/images/calendar-tick.svg';
import clock from '../../../public/assets/images/clock.svg';
import { Modal } from '../modals/Modal';
import { EditModal } from '../modals/EditModals';
import DeleteModal from '../modals/DeleteModal';

interface CardProps {
  id: string | number;
  name: string;
  created_at: string;
  age: string;
  job_title: string;
  isMenuOpen: string | number | null;
  toggleMenu: (id:number) => void;
  userImage: StaticImageData; 
  user_name: string;
  country: string;
  refetchUserProfiles: () => void; 
}

export const Card: React.FC<CardProps> = ({
  id,
  name,
  created_at,
  age,
  country,
  job_title,
  isMenuOpen,
  toggleMenu,
  userImage,
  user_name,
  refetchUserProfiles
}) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const initialValues = {
    name: name,
    user_name: user_name,
    email: '',
    age: age,
    country: country,
    job_title: job_title,
  };

  const handleEditClick = () => {
    setIsEditModalOpen(true);
    toggleMenu(id);
  };

  const handleDeleteClick = () => {
    setIsDeleteModalOpen(true);
    toggleMenu(id);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };

  const handleSubmit = (values: any) => {
    console.log('Form values:', values);
    closeEditModal();
  };

  return (
    <div key={id} className="bg-card rounded-lg min-h-[300px] text-white">
      <div className="p-4 overlaycard h-full rounded-lg">
        <div className="relative">
          <button className="flex float-end" onClick={() => toggleMenu(id)}>
            <PiDotsThreeBold color="#fff" size={25} />
          </button>
          <Menu
            isOpen={isMenuOpen === id}
            Id={id}
            onEdit={handleEditClick}
            onDelete={handleDeleteClick}
          />
        </div>
        <div className="flex h-full items-end">
          <div className="flex flex-col gap-3">
            <div>
              <span className="bg-[#FFFAFA] text-main rounded-2xl px-3 py-1">
                {job_title}
              </span>
            </div>
            <p className="font-bold">{name}</p>
            <div className="text-[12px] flex items-center gap-3">
              <div className="flex gap-2 items-center">
                <Image src={userImage} alt="user" />
                <span>{user_name}</span>
              </div>
              <div className="flex gap-2 items-center">
                <Image src={clender} alt="calendar" />
                <span>{created_at}</span>
              </div>
              <div className="flex gap-2 items-center">
                <Image src={clock} alt="clock" />
                <span>{age}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <EditModal
        isOpen={isEditModalOpen}
        onClose={closeEditModal}
        initialValues={initialValues}
        onSubmit={handleSubmit}
        id={id}
        refetchUserProfiles={refetchUserProfiles}
      />

      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={closeDeleteModal}
        id={id}
        refetchUserProfiles={refetchUserProfiles} 
      />
    </div>
  );
};
