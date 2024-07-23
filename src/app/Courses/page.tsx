
"use client";

import React, { useState, useEffect } from "react";
import { PiDotsThreeBold } from "react-icons/pi";
import "tailwindcss/tailwind.css";
import user from "../../../public/assets/images/Avatar menu button.svg"; // Placeholder image
import { Card } from "@/components/courses/Card";
import { fetchUserProfiles } from "../../Services/fetchUserProfiles"; // Adjust path as needed
import { formatDate } from "../../helpers/formatDate"; // Import the date formatting function
import Header from "@/components/courses/Header";
import { AddModal } from "@/components/modals/AddModal";

// Define types for user profiles
interface Country {
  id: number;
  name: string;
}

interface UserProfile {
  id: number;
  job_title: string;
  name: string;
  user_name: string;
  created_at: string;
  age: number;
  country: Country;
  gender: string;
}
const initialValues = {
  name: "",
  user_name: "",

  gender:'',
  age: NaN,
  country:"",
  job_title: "",
};
// Main component
const Cousrserpage: React.FC = () => {
  const [userProfiles, setUserProfiles] = useState<UserProfile[]>([]);
  const [isMenuOpen, setIsMenuOpen] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);
  
  
  
  const handleAddClick = () => {
    setIsAddModalOpen(true);

  };


  const closeAddModal = () => {
    setIsAddModalOpen(false);
  };
  const handleSubmit = (values: any) => {
    console.log('Form values:', values);
    closeAddModal();
  };

  // Fetch user profiles data on component mount
  const refetchUserProfiles = async () => {
    try {
      const result = await fetchUserProfiles();
      setUserProfiles(result.results);
    } catch (error) {
      setError('Failed to fetch user profiles');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refetchUserProfiles();
  }, []);

  const toggleMenu = (id: number): void => {
 
    console.log('Current Menu Open:', isMenuOpen);
    console.log('Toggle ID:', id);
    setIsMenuOpen(isMenuOpen === id ? null : id);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <Header onAddClick={handleAddClick} />
      <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-6 font-Helvetica">
        {userProfiles?.map((profile) => (
          <Card
            key={profile.id}
            id={profile.id}
            job_title={profile.job_title}
            name={profile.name}
            user_name={profile.user_name}
            created_at={formatDate(profile.created_at)} // Format the date here
            age={profile.age.toString()} // Convert age to string if needed
            userImage={user} // Use a placeholder image; adjust if actual image is needed
            country={profile.country.name} // Pass the country name
            isMenuOpen={isMenuOpen}
            toggleMenu={toggleMenu}
            refetchUserProfiles={refetchUserProfiles} // Pass refetch function to Card
          />
        ))}
         <AddModal
        isOpen={isAddModalOpen}
        onClose={closeAddModal}
        initialValues={initialValues}
        onSubmit={handleSubmit}
   
        refetchUserProfiles={refetchUserProfiles}
      />
      </div>
    </div>
  );
};

export default Cousrserpage;
