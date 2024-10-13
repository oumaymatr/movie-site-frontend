"use client";
import React, { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode"; // Assuming you're using jwt-decode
import Image from 'next/image';
import { FaUser, FaEnvelope, FaLock, FaClock } from 'react-icons/fa'; // Icons for user, email, password, time

type User = {
  id: string;
  nom_d_utilisateur: string;
  email: string;
  mot_de_passe: string; // Password field
  date_de_creation: string;
  photo_de_profil: string;
};

interface DecodedToken {
  sub: string; // Assuming the token contains the user ID
}

const Profile = () => {
  const [userInfo, setUserInfo] = useState<User | null>(null);
  const [isEditing, setIsEditing] = useState(false); // State for edit mode
  const [editableUserInfo, setEditableUserInfo] = useState<User | null>(null); // State for editable user info

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("No token found");

        const decodedToken: DecodedToken = jwtDecode<DecodedToken>(token);
        const userId = decodedToken.sub;

        const response = await fetch(`http://localhost:3000/user/${userId}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }

        const userData: User = await response.json();
        setUserInfo(userData);
        setEditableUserInfo(userData); // Initialize editable info
      } catch (error) {
        console.error("Error fetching user info:", error);
      }
    };

    fetchUserData();
  }, []);

  const handleEditClick = () => {
    if (isEditing) {
      // Save changes
      const token = localStorage.getItem("token");
      const userId = jwtDecode<DecodedToken>(token!).sub;

      // Update user details on the backend
      const updateUser = async () => {
        try {
          await fetch(`http://localhost:3000/user/${userId}/username`, {
            method: "PUT",
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ nom_d_utilisateur: editableUserInfo?.nom_d_utilisateur }),
          });

          await fetch(`http://localhost:3000/user/${userId}/email`, {
            method: "PUT",
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: editableUserInfo?.email }),
          });

          await fetch(`http://localhost:3000/user/${userId}/password`, {
            method: "PUT",
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ mot_de_passe: editableUserInfo?.mot_de_passe }),
          });

          await fetch(`http://localhost:3000/user/${userId}/profile-picture`, {
            method: "PUT",
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ photo_de_profil: editableUserInfo?.photo_de_profil }),
          });

          // Optionally, you could refetch user data here
          setUserInfo(editableUserInfo); // Update the main user info state
        } catch (error) {
          console.error("Error updating user info:", error);
        }
      };

      updateUser();
    } else {
      // Switch to edit mode
      setEditableUserInfo(userInfo); // Set editable info to current user info
    }
    setIsEditing(!isEditing); // Toggle edit mode
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, field: keyof User) => {
    if (editableUserInfo) {
      setEditableUserInfo({
        ...editableUserInfo,
        [field]: e.target.value, // Update specific field
      });
    }
  };

  if (!userInfo) return <div>Loading...</div>;

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="flex items-center space-x-15 w-full max-w-4xl">
        <Image
          src={userInfo.photo_de_profil}
          alt="Profile Picture"
          width={400} // Increased width for the profile image
          height={400} // Increased height for the profile image
          className="rounded-full mr-5"
        />
        <div className="flex flex-col space-y-4 mt-10"> {/* Increased margin-top for more spacing */}
          <div className="flex items-center border rounded-full p-3 shadow-md">
            <FaUser className="text-gray-500 ml-3 mr-3 text-xl" />
            <input
              type="text"
              value={isEditing ? editableUserInfo?.nom_d_utilisateur : userInfo.nom_d_utilisateur} // Use editable or regular value
              onChange={(e) => handleInputChange(e, 'nom_d_utilisateur')} // Handle input change
              readOnly={!isEditing} // Toggle readOnly based on edit mode
              className="flex-1 p-2 outline-none dark:bg-transparent bg-transparent"
            />
          </div>
          <div className="flex items-center border rounded-full p-3 shadow-md">
            <FaEnvelope className="text-gray-500 ml-3 mr-3 text-xl" />
            <input
              type="email"
              value={isEditing ? editableUserInfo?.email : userInfo.email} // Use editable or regular value
              onChange={(e) => handleInputChange(e, 'email')} // Handle input change
              readOnly={!isEditing} // Toggle readOnly based on edit mode
              className="flex-1 p-2 outline-none dark:bg-transparent bg-transparent"
            />
          </div>
          <div className="flex items-center border rounded-full p-3 shadow-md">
            <FaLock className="text-gray-500 ml-3 mr-3 text-xl" /> {/* Password icon */}
            <input
              type="password"
              value={isEditing ? editableUserInfo?.mot_de_passe : userInfo.mot_de_passe} // Use editable or regular value
              onChange={(e) => handleInputChange(e, 'mot_de_passe')} // Handle input change
              readOnly={!isEditing} // Toggle readOnly based on edit mode
              className="flex-1 p-2 outline-none dark:bg-transparent bg-transparent"
            />
          </div>
          <div className="flex items-center border rounded-full p-3 shadow-md">
            <FaClock className="text-gray-500 ml-3 mr-3 text-xl" /> {/* Updated icon */}
            <input
              type="text"
              value={userInfo.date_de_creation} // Read-only for date
              readOnly
              className="flex-1 p-2 outline-none dark:bg-transparent bg-transparent"
            />
          </div>
        </div>
      </div>
      {/* Buttons positioned at the bottom right, without affecting the layout */}
      <div className="absolute bottom-10 right-10 flex space-x-4">
        <button 
          onClick={handleEditClick} // Handle button click
          className="px-4 py-2 rounded-full bg-blue-500 text-white font-semibold hover:bg-blue-600 transition-all duration-300 shadow-md"
        >
          {isEditing ? 'Save' : 'Edit Details'} {/* Change button text based on edit mode */}
        </button>
        <button className="px-4 py-2 rounded-full bg-green-500 text-white font-semibold hover:bg-green-600 transition-all duration-300 shadow-md">
          Upload Photo
        </button>
      </div>
    </div>
  );
};

export default Profile;
