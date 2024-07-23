// PersonalList.js
import React from 'react';
import Link from 'next/link'; // Import Link from next/link

const PersonalList = () => {
  // Sample data for personal list with routes
  const items = [
    { id: 1, text: 'My Profile', href: '/profile' },
    { id: 2, text: 'Settings', href: '/settings' },
    { id: 3, text: 'Logout', href: '/logout' },
  ];

  return (
    <div className='p-4 text-start text-sm text-gray'>
      <ul className='list-none'>
        {items.map(item => (
          <li key={item.id} className='py-2 border-b'>
            <Link 
              href={item.href}
              className='text-gray-800 hover:text-blue-600 transition-colors'
            >
              {item.text}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PersonalList;
