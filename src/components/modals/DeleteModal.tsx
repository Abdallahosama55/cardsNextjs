import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { Modal } from './Modal';

interface DeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  id: string | number;
  refetchUserProfiles: () => void; // Add refetchUserProfiles prop
}

const deleteUserProfile = async (id: string | number) => {
  try {
    const response = await fetch(`https://dv2.brontosolutions.com:8000/assignment/userprofiles/delete/${id}/`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.status === 204 || response.status === 200) {
      return { success: true };
    }

    const text = await response.text();
    const data = text ? JSON.parse(text) : {};
    return { success: false, message: data.message || 'Failed to delete user profile' };
  } catch (error) {
    console.error('There was a problem with the fetch operation:', error);
    return { success: false, message: error.message };
  }
};

const DeleteModal: React.FC<DeleteModalProps> = ({ isOpen, onClose, id, refetchUserProfiles }) => {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    const result = await deleteUserProfile(id);

    if (result.success) {
      toast.success('User profile deleted successfully.');
      refetchUserProfiles(); // Refetch user profiles after successful deletion
    } else {
      toast.error(result.message || 'Failed to delete user profile.');
    }

    setLoading(false);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="p-6">
        <h2 className="text-lg font-semibold">Delete users list</h2>
        <p>Once you delete users list, you will lose all data associated with it.</p>
        <div className="mt-6 flex justify-end">
          <button className="mr-4 rounded-lg px-4 py-2 border-[#6B72804D] border-[1px] text-[#111827]" onClick={onClose}>Cancel</button>
          <button className="rounded-lg px-4 py-2 bg-[#b91c1c2e] text-[#B91C1C]" onClick={handleDelete} disabled={loading}>
            {loading ? 'Deleting...' : 'Delete'}
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteModal;
