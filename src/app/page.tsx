// app/page.tsx
import React from 'react';
import Cousrserpage from './Courses/page';
import { ToastContainer } from 'react-toastify';

const Home: React.FC = () => {
  return (
    <div>
<Cousrserpage></Cousrserpage>
<ToastContainer/>
    </div>
  );
};

export default Home;
