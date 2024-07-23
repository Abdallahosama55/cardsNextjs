import React from "react";

interface HeaderProps {
  onAddClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onAddClick }) => {
  return (
    <div>
      <div className="flex justify-end">
        <button
          className="bg-[#001F56] text-white py-2 px-3 rounded ps-4 text-sm"
          onClick={onAddClick}
        >
          + New User
        </button>
      </div>
    </div>
  );
};

export default Header;
