'use client'
import { Form, message } from 'antd'
import axios from 'axios';
import Link from 'next/link'
import { useRouter } from 'next/navigation';
import React from 'react'
import {useState, useEffect} from 'react';

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
}

const Login = () => {
  const router = useRouter();
  
  const onLogin = async (values: utente) => {
    try {
      await axios.post("api/auth/login", values);
      message.success("Login successful");
      router.push("/profilo");
    } catch (error: any) {
      message.error(error.response.data.message);
    }
  }
  const [theme, setTheme] = useState("Light");
  useEffect(()=> {
    if(theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]); 
  const handleThemeSwitch = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };
  
  return (
    <div className='flex min-h-screen flex-col items-center justify-between p-40 dark:bg-black dark:text-white'>
      <button onClick={handleThemeSwitch}>Switch Mode</button>
      <div className='bg-white px-10 py-10 rounded-xl shadow-sm dark:bg-black dark:text-white'>
      <h1>Login</h1>
      <Form onFinish={onLogin}>
        <label className='dark:text-white'>Email</label>
        <Form.Item name="email">
          <input
            className="text-black border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400"
            autoFocus
            required
            type="email"
          />
        </Form.Item>
        
        <label className='dark:text-white'>Password</label>
        <Form.Item name="password">
          <input
            className="text-black border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400"
            required
            type="password"
          />
        </Form.Item>
        <button type="submit" className='bg-sky-500 hover:bg-sky-700 text-white px-5 py-0.5 rounded-md'>Login</button>
      </Form>
      <Link href="/register" className=' hover:text-sky-600 text-xs pt-5'>Non hai un account? Registrati</Link>
    
      </div>
      </div>
  )
}

export default Login