
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="py-6 text-center">
      <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-teal-300">
          Logic League AI Image Generator
        </span>
      </h1>
      <p className="mt-2 text-lg text-gray-400">
        Create stunning visuals of your favorite sports moments.
      </p>
    </header>
  );
};

export default Header;
