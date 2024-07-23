import React, { useEffect, useState } from 'react';
import { Modal } from './Modal';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from '../Loader/Loader';
import { updateUserProfile } from '@/Services/updateUserProfiles';

interface EditModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialValues: {
    user_name: string;
    name: string;
    email: string;
    age: number;
    country: number;
    job_title: string;
  };
  id: string | number;
  refetchUserProfiles :()=>void
}

interface Country {
  id: number;
  name: string;
}

const validationSchema = Yup.object({
  name: Yup.string(),
  user_name: Yup.string(),
  email: Yup.string().email('Invalid email address'),
  age: Yup.number().min(0, 'Invalid age'),
  country: Yup.number(),
  job_title: Yup.string(),
});

export const EditModal: React.FC<EditModalProps> = ({ isOpen, onClose, initialValues, id , refetchUserProfiles }) => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (isOpen) {
      const fetchCountries = async () => {
        try {
          const response = await fetch('https://dv2.brontosolutions.com:8000/assignment/countries/');
          const data = await response.json();
          setCountries(data.results);
        } catch (error) {
          console.error('Error fetching countries:', error);
        } finally {
          setLoading(false);
        }
      };
      fetchCountries();
    }
  }, [isOpen]);

  const formFields = [
    { name: 'name', label: 'Name', type: 'text' },
    { name: 'user_name', label: 'User Name', type: 'text' },
    { name: 'email', label: 'Email', type: 'email' },
    { name: 'age', label: 'Age', type: 'number' },
    { name: 'country', label: 'Country', type: 'select', options: countries },
    { name: 'job_title', label: 'Job Title', type: 'text' },
  ];

  const renderField = ({ name, label, type, options }: any) => (
    <div key={name} className="mb-3">
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">{label}</label>
      {type === 'select' ? (
        <Field as="select" name={name} className="mt-1 block w-full border-gray-300 border-[1px] px-3 py-2 rounded-md shadow-sm">
          <option value="">Select a country</option>
          {options.map((option: Country) => (
            <option key={option.id} value={option.id}>{option.name}</option>
          ))}
        </Field>
      ) : (
        <Field name={name} type={type} className="mt-1 block w-full border-gray-300 border-[1px] py-2 px-3 rounded-md shadow-sm" />
      )}
      <ErrorMessage name={name} component="div" className="text-red-500 text-xs mt-1" />
    </div>
  );

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h2 className="text-lg font-semibold text-2xl mb-2 pt-6">Edit Profile</h2>
      <p className="text-md text-[#575F6E]">Change profile settings and save your changes.</p>
      <h3 className="text-md font-semibold my-4">Your personal data</h3>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={async (values, { setSubmitting }) => {
          setSubmitting(true);
          try {
            await updateUserProfile(id, values);
            toast.success('Profile updated successfully!', {
              position: "bottom-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
            refetchUserProfiles();
          } catch (error) {
            toast.error('Error updating profile', {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
          } finally {
            setSubmitting(false);
            onClose(); // Close the modal after submission
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            {formFields.map(renderField)}
            <div className="flex justify-end gap-2 py-4">
              <button type="button" className="bg-white border-[1px] border-[#001F56] text-[#001F56] px-4 py-2 rounded-lg" onClick={onClose}>Cancel</button>
              <button type="submit" className="bg-[#001F56] text-white px-4 py-2 rounded-lg" disabled={isSubmitting}>
                {isSubmitting ? <Loader /> : 'Save Changes'}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </Modal>
  );
};
