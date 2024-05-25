'use client'

import { Button, Form, message } from 'antd'
import axios from 'axios';
import { useRouter } from 'next/navigation'
import Sidebar from '@/components/sidebar';
import { useEffect, useState } from 'react';
import UpdateForm from '@/components/updateForm';


// const [theme, setTheme] = useState("Light");


// useEffect(()=> {
//   if(theme === "dark") {
//     document.documentElement.classList.add("dark");
//   } else {
//     document.documentElement.classList.remove("dark");
//   }
// }, [theme]); 

// const handleThemeSwitch = () => {
//   setTheme(theme === "dark" ? "light" : "dark");
// };

const Profilo = () => {
  
/*   const [theme, setTheme] = useState("Light");

  useEffect(()=> {
    if(theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]); 

  const handleThemeSwitch = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  }; */


  return (
    <>
      <div className='flex dark:bg-black dark:text-white'>
        <Sidebar></Sidebar>
        <h1>Profilo</h1>
        <UpdateForm></UpdateForm>      
      </div>
    </>
  );
}

export default Profilo