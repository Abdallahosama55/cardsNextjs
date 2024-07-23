// components/Loader.tsx
import React from 'react';

const Loader: React.FC = () => (
  <div className="flex justify-center items-center">
    <div className="w-8 h-8 border-4 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>
  </div>
);

export default Loader;
