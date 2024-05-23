'use client'
import { Button, Form, message } from 'antd'
import axios from 'axios';
import { useRouter } from 'next/navigation'
import Sidebar from '@/components/sidebar';
import { useEffect, useState } from 'react';
import UpdateForm from '@/components/updateForm';


type FormData = {
  firstName: string
  lastName: string
  username: string
  date_of_birth: string
  user_weight: number
  user_height: number
  thighs: number
  shoulders: number
  waist: number
  biceps: number
}

const INITIAL_DATA: FormData = {
  firstName: "",
  lastName: "",
  username: "",
  date_of_birth: "",
  user_weight: 0,
  user_height: 0,
  thighs: 0,
  shoulders: 0,
  waist: 0,
  biceps: 0,
}
/*
interface utente{
  email: string
  firstName: string
  lastName: string
  password: string
  username: string
  date_of_birth: string
  user_weight: number
  user_height: number
  thighs: number
  shoulders: number
  waist: number
  biceps: number
  initial: string
  goal: string
} */

const getData = async () => {
  try {
    console.log("Starting data fetch from /api/auth/getUserData");

    const res = await axios.get('/api/auth/getUserData', {
      withCredentials: true, // Ensure cookies are sent with the request
    });

    if (res.status !== 200) {
      throw new Error(`Failed to fetch data with status: ${res.status}`);
    }

    return res.data.data;
  } catch (error: any) {
    console.error('Error loading user data:', error.message);
    throw error;
  }
};

const Profilo = () => {

  const [userData, setData] = useState(INITIAL_DATA);


  useEffect(() => {
    (async () => {
      try {
        const data = await getData();
        setData(data);
      } catch (error) {
        console.error('Failed to load user data:', error);
      }
    })();
  }, []);

  if (!userData) {
    return <div>No user data found</div>;
  }
  
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
      <div className='flex'>
        <Sidebar></Sidebar>
        <h1>Profilo</h1>
        <UpdateForm></UpdateForm>      
      </div>
    </>
  )
}

export default Profilo