// components/Sidebar.tsx
import React from 'react';
import { IoMdArrowDropdown } from 'react-icons/io';
import { AiOutlineHome } from 'react-icons/ai';

const Sidebar = () => {
  return (
    <div className=" bg-[#001F56] text-white px-5">
  
      <ul className="nav">
        <li className="nav-item">
          <AiOutlineHome />
      
        </li>
        <li className="nav-item">
          <IoMdArrowDropdown />
        
        </li>
        {/* Add more navigation items here */}
      </ul>
    </div>
  );
};

export default Sidebar;
