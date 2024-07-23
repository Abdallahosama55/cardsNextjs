'use client';

import React, { useState } from 'react';
import { IoMdArrowDropdown } from 'react-icons/io';
import NotificationList from './NotifictionList';
import MessageList from './MessageList';
import PersonalList from './PersonalList';
import { DropdownMenu } from './DropdownMenu';

// Define types for NavbarButton props
interface NavbarButtonProps {
  src: string;
  alt: string;
  onClick?: () => void;
  children?: React.ReactNode;
}

// Define NavbarButton component
const NavbarButton: React.FC<NavbarButtonProps> = ({ src, alt, onClick, children }) => (
  <button onClick={onClick} className='relative flex gap-3'>
  
    {children}
    <img src={src} alt={alt} />
  </button>
);

// Define types for Navbar state
interface NavbarState {
  notifications: boolean;
  messages: boolean;
  personal: boolean;
  search: boolean;
  courses: boolean;
}

const Navbar: React.FC = () => {
  const [visible, setVisible] = useState<NavbarState>({
    notifications: false,
    messages: false,
    personal: false,
    search: false,
    courses: false
  });

  // Toggle visibility of dropdowns
  const handleToggle = (key: keyof NavbarState) => {
    setVisible(prevState => ({
      ...prevState,
      [key]: !prevState[key]
    }));
  };

  // Handle dropdown clicks and close other dropdowns
  const handleDropdownClick = (dropdown: keyof NavbarState) => {
    handleToggle(dropdown);
    Object.keys(visible).forEach(key => {
      if (key !== dropdown) setVisible(prevState => ({ ...prevState, [key]: false }));
    });
  };

  return (
    <header className='flex px-6 lg:px-9 border-b-[1px] border-[0px] border-[#0000000D] py-4'>
      <div className='relative flex-grow'>
        <button
          className='rounded-lg bg-gray-200 outline-0 py-2 px-2 flex items-center gap-2 text-main'
          onClick={() => handleDropdownClick('courses')}
        >
          Courses
          <IoMdArrowDropdown size={22} />
        </button>
        <DropdownMenu
          items={[
            { href: '/course-1', label: 'Course 1' },
            { href: '/course-2', label: 'Course 2' },
            { href: '/course-3', label: 'Course 3' }
          ]}
          isVisible={visible.courses}
        />
      </div>

      <div className='flex items-center lg:gap-5 md:gap-5 gap-3'>
        <div className='relative flex gap-3 items-center'>
          <NavbarButton src="/assets/images/search-normal.svg" alt="search" onClick={() => handleToggle('search')}>
            <div
              className={`transition-all duration-300 ease-in-out overflow-hidden ${visible.search ? 'max-h-20 opacity-100 w-full' : 'max-h-0 opacity-0 w-0 p-0'}`}
            >
              <input
                type='text'
                className='outline-0 border-b-[1px] bg-transparent transition-all duration-300 ease-in-out'
                placeholder='Type in search'
              />
            </div>
          </NavbarButton>

          <NavbarButton src="/assets/images/calendar.svg" alt="calendar" />

          <NavbarButton src='/assets/images/message.svg' alt="message" onClick={() => handleDropdownClick('messages')}>
            <div
              className={`absolute top-full right-0 min-w-[450px] mt-2 z-50 text-dark bg-white shadow-lg rounded-xl shadow-custom transition-all duration-300 ease-in-out ${
                visible.messages ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'
              }`}
            >
              {visible.messages && <MessageList />}
            </div>
          </NavbarButton>

          <NavbarButton src="/assets/images/notification-bing.svg" alt="notification" onClick={() => handleDropdownClick('notifications')}>
            <div
              className={`absolute top-full right-0 min-w-[450px] mt-2 z-50 text-dark bg-white shadow-lg rounded-xl shadow-custom transition-all duration-300 ease-in-out ${
                visible.notifications ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'
              }`}
            >
              {visible.notifications && <NotificationList />}
            </div>
          </NavbarButton>

          <NavbarButton src="/assets/images/Avatar menu button.svg" alt="personal" onClick={() => handleDropdownClick('personal')}>
            <div
              className={`absolute top-full right-0 min-w-[150px] mt-2 z-50 text-dark bg-white shadow-lg rounded-xl shadow-custom transition-all duration-300 ease-in-out ${
                visible.personal ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'
              }`}
            >
              {visible.personal && <PersonalList />}
            </div>
          </NavbarButton>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
