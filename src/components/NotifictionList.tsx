'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import del from '../../public/assets/images/delete.svg'
import right from '../../public/assets/images/right.svg';
import rec from '../../public/assets/images/rec.png';

const NotificationList = () => {
  const [selected, setSelected] = useState('All');

  const tabs = ['All', 'Unread', 'Mentioned'];
  const notifications = [
    { id: 1, text: 'Notification 1' , description :' Eleifend dui sit vitae eu non hendrerit malesuada convallis bibendum. Nisi cras id at urna id. Velit nam et integer bibendum pharetra eu consequat fringilla. Platea felis erat nibh neque porttitor enim in.' },
    { id: 2, text: 'Notification 2'  , description :' Eleifend dui sit vitae eu non hendrerit malesuada convallis bibendum. Nisi cras id at urna id. Velit nam et integer bibendum pharetra eu consequat fringilla. Platea felis erat nibh neque porttitor enim in.' },
    { id: 3, text: 'Notification 3'  , description :' Eleifend dui sit vitae eu non hendrerit malesuada convallis bibendum. Nisi cras id at urna id. Velit nam et integer bibendum pharetra eu consequat fringilla. Platea felis erat nibh neque porttitor enim in.' }
  ];

  const renderTabs = () => {
    return tabs.map((tab) => (
      <span
        key={tab}
        className={`cursor-pointer ${selected === tab ? 'border-blue-500 border-b-[3px]' : ''}`}
        onClick={() => setSelected(tab)}
      >
        {tab}
      </span>
    ));
  };

  const renderButton = (imgSrc, text) => {
    return (
      <button className='bg-[#1E1E1E14] py-1 px-2 rounded font-light text-xs text-dark flex items-center gap-1'>
        <Image src={imgSrc} className="w-20px" alt={text} />
        {text}
      </button>
    );
  };

  const renderNotifications = () => {
    return notifications.map((notification) => (
      <div key={notification.id} className=''>
        <div className='flex gap-2 items-center'>
      
          <h3 className='font-poppins font-bold text-dark'>{notification.text}</h3>
        </div>
        <p className='ps-4 text-start text-gray-500 text-sm'>
         {notification.description}
        </p>
      </div>
    ));
  };

  return (
    <div className='p-4 relative max-w-[450px]'>
      <Image src={rec} className='absolute top-[-10px] right-1 w-[30px]' alt="Decoration" />
      <h1 className='font-semibold py-4 text-start text-dark font-poppins'>Notifications</h1>
      <div className='border-b-[1px] border-[#1E1E1E80] pb-5 flex gap-3 font-poppins font-medium text-[16px]'>
        {renderTabs()}
      </div>
      <div className='flex gap-3 py-4'>
        {renderButton(del, 'Delete all')}
        {renderButton(right, 'Mark all as read')}
      </div>
      <div className='max-h-64 flex flex-col gap-2 overflow-y-auto' style={{ scrollbarWidth: 'thin', scrollbarColor: '#4B5563 ##1E1E1EBF' }}>
        {renderNotifications()}
      </div>
    </div>
  );
};

export default NotificationList;
