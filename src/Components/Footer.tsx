// src/Components/Footer.tsx
import React from 'react';

const Footer = () => {
  return (
    <footer className=" dark:bg-gray-600 bg-indigo-200 text-white py-4 text-center">
      <p className="text-sm font-bold">
        &copy; {new Date().getFullYear()} Oumayma. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
