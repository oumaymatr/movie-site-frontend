"use client";
import React, { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode"; // Assuming you're using jwt-decode
import Image from "next/image";
import { FaUser, FaEnvelope, FaLock, FaClock } from "react-icons/fa"; // Icons for user, email, password, time
import axios from "axios";

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

const Profile: React.FC = () => {
  const [userInfo, setUserInfo] = useState<User | null>(null);
  const [isEditing, setIsEditing] = useState(false); // State for edit mode
  const [editableUserInfo, setEditableUserInfo] = useState<User | null>(null); // State for editable user info

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      timeZoneName: "short",
    };
    return new Date(dateString).toLocaleString("en-US", options);
  };

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

  const handlePhotoUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return; // Ensure a file is selected

    const formData = new FormData();
    const token = localStorage.getItem("token");
    const userId = jwtDecode<DecodedToken>(token!).sub;
    formData.append("photo", file); // Append the selected file

    try {
      const response = await axios.post(
        `http://localhost:3000/user/${userId}/upload-photo`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data", // Ensure multipart data is sent
          },
        }
      );

      if (response.data.photoUrl) {
        // Update the UI or state to reflect the new profile picture
        setUserInfo((prevState) =>
          prevState
            ? { ...prevState, photo_de_profil: response.data.photoUrl }
            : null
        );
        console.log("Profile picture updated:", response.data.photoUrl);
      }
    } catch (error) {
      console.error("Error uploading photo:", error);
    }
  };

  const handleEditClick = () => {
    if (isEditing) {
      // Save changes
      const token = localStorage.getItem("token");
      const userId = jwtDecode<DecodedToken>(token!).sub;

      const updateUser = async () => {
        try {
          await fetch(`http://localhost:3000/user/${userId}/username`, {
            method: "PUT",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              nom_d_utilisateur: editableUserInfo?.nom_d_utilisateur,
            }),
          });

          await fetch(`http://localhost:3000/user/${userId}/email`, {
            method: "PUT",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email: editableUserInfo?.email }),
          });

          await fetch(`http://localhost:3000/user/${userId}/password`, {
            method: "PUT",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              mot_de_passe: editableUserInfo?.mot_de_passe,
            }),
          });

          setUserInfo(editableUserInfo); // Update the main user info state
        } catch (error) {
          console.error("Error updating user info:", error);
        }
      };

      updateUser();
    } else {
      setEditableUserInfo(userInfo); // Set editable info to current user info
    }
    setIsEditing(!isEditing); // Toggle edit mode
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: keyof User
  ) => {
    if (editableUserInfo) {
      setEditableUserInfo({
        ...editableUserInfo,
        [field]: e.target.value, // Update specific field
      });
    }
  };

  if (!userInfo) return <div>Loading...</div>;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="w-full max-w-4xl flex flex-col md:flex-row items-center md:items-start md:space-x-8 p-5">
        <div className="w-full md:w-1/2 mb-8 md:mb-0">
          <Image
            src={
              userInfo.photo_de_profil.startsWith("http")
                ? userInfo.photo_de_profil // If it's an absolute URL, use it as is
                : `http://localhost:3000${userInfo.photo_de_profil}` // Prepend localhost if it's a relative URL
            }
            alt="Profile Picture"
            width={400}
            height={400}
            className="rounded-full w-full h-auto"
          />
        </div>
        <div className="w-full md:w-1/2 flex flex-col space-y-4 mt-12 pt-8">
          <InputField
            icon={<FaUser className="text-gray-500 text-xl" />}
            value={
              isEditing
                ? editableUserInfo?.nom_d_utilisateur || ""
                : userInfo.nom_d_utilisateur
            }
            onChange={(e) => handleInputChange(e, "nom_d_utilisateur")}
            readOnly={!isEditing}
          />
          <InputField
            icon={<FaEnvelope className="text-gray-500 text-xl" />}
            value={isEditing ? editableUserInfo?.email || "" : userInfo.email}
            onChange={(e) => handleInputChange(e, "email")}
            readOnly={!isEditing}
            type="email"
          />
          <InputField
            icon={<FaLock className="text-gray-500 text-xl" />}
            value={
              isEditing
                ? editableUserInfo?.mot_de_passe || ""
                : userInfo.mot_de_passe
            }
            onChange={(e) => handleInputChange(e, "mot_de_passe")}
            readOnly={!isEditing}
            type="password"
          />
          <InputField
            icon={<FaClock className="text-gray-500 text-xl" />}
            value={formatDate(userInfo.date_de_creation)}
            readOnly
            onChange={function (): void {
              throw new Error("Function not implemented.");
            }}
          />
        </div>
      </div>

      <input
        type="file"
        id="fileInput"
        onChange={handlePhotoUpload}
        className="hidden"
      />

      <div className="mt-8 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
        <Button onClick={handleEditClick}>
          {isEditing ? "Save" : "Edit Details"}
        </Button>
        <Button onClick={() => document.getElementById("fileInput")?.click()}>
          Upload Photo
        </Button>
      </div>
    </div>
  );
};

interface InputFieldProps {
  icon: React.ReactNode;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  readOnly: boolean;
  type?: string;
}

const InputField: React.FC<InputFieldProps> = ({
  icon,
  value,
  onChange,
  readOnly,
  type = "text",
}) => (
  <div className="flex items-center border rounded-full p-3 shadow-md">
    <span className="ml-3 mr-3">{icon}</span>
    <input
      type={type}
      value={value}
      onChange={onChange}
      readOnly={readOnly}
      className="flex-1 p-2 outline-none bg-transparent"
    />
  </div>
);

interface ButtonProps {
  children: React.ReactNode;
  onClick: () => void;
}

const Button: React.FC<ButtonProps> = ({ children, onClick }) => (
  <button
    onClick={onClick}
    className="w-full sm:w-auto px-4 py-2 rounded-full bg-blue-500 text-white font-semibold hover:bg-blue-600 transition-all duration-300 shadow-md"
  >
    {children}
  </button>
);

export default Profile;
