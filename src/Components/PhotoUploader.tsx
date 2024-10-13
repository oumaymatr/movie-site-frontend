import React, { useState } from "react";

// Définition de l'interface pour les props
interface PhotoUploaderProps {
  onUpload: (file: File) => void; // Définir le type pour onUpload
}

const PhotoUploader: React.FC<PhotoUploaderProps> = ({ onUpload }) => {
  const [image, setImage] = useState<string | null>(null); // Type d'état pour l'image

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]; // Récupérer le fichier téléchargé
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string); // Met à jour l'état avec l'URL de l'image
        onUpload(file); // Appelle la fonction onUpload pour gérer le fichier
      };
      reader.readAsDataURL(file); // Lire le fichier
    }
  };

  return (
    <div className="flex flex-col items-center">
      <label htmlFor="file-upload" className="cursor-pointer">
        <button className="px-4 py-2 rounded bg-green-500 text-white">
          Upload Photo
        </button>
        <input
          id="file-upload"
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden" // Masquer l'input de fichier
        />
      </label>
      {image && (
        <img
          src={image}
          alt="Uploaded Preview"
          style={{ width: "200px", marginTop: "20px" }}
          className="rounded-full" // Ajoute un style pour arrondir l'image
        />
      )}
    </div>
  );
};

export default PhotoUploader;
