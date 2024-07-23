// services/updateUserProfiles.ts
import { toast } from 'react-toastify';

export const updateUserProfile = async (id: string | number, values: any) => {
  try {
    const response = await fetch(
      `https://dv2.brontosolutions.com:8000/assignment/userprofiles/update/${id}/`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      }
    );

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    console.log('Update successful', data);

  } catch (error) {
    console.error('Error updating profile', error);
    toast.error('Failed to update profile. Please try again.');
  }
};
