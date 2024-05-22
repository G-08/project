'use client'
import { Button, Form, message } from 'antd'
import axios from 'axios';
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import Sidebar from '@/components/sidebar';
import FormProfilo from '@/components/formProfilo';
import Utente from '@/models/Utente';
import { useSelector } from 'react-redux';

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


const Profilo = () => {
  console.log("!! sono in profilo");
  const { currentUser } = useSelector((state: any) => state.user);

  console.log("!!", currentUser);
  const router = useRouter();
    
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

    <div className='flex'>
      <Sidebar></Sidebar>
      <h1>Profilo</h1>
      <p>{currentUser.firstName}</p>
      
      <Form>
      <label>Username</label>
      <Form.Item name="username">
        <input
          className="text-black border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400"
          autoFocus
          required
          type="string"
          value={currentUser.username}
        />
      </Form.Item>
      <label>Nome</label>
      <Form.Item name = "firstName">
        <input
          className="text-black border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400"
          autoFocus
          required
          type="text"
          //value={data.firstName}
        />
      </Form.Item>
      <label>Cognome</label>
      <Form.Item name = "lastName">
        <input
          className="text-black border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400"
          required
          type="text"
  /*         value={data.lastName}
  */      />
      </Form.Item>
      <label>Data di nascita</label>
      <Form.Item name="date_of_birth">
        <input
          required
          className="text-black border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400"
          type="string"
  /*         value={data.date_of_birth}
  */      />
      </Form.Item>
      <label>Altezza (in cm)</label>
      <Form.Item name = "user_height">
        <input
          required
          className="text-black border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400"
          type="number"
  /*         value={data.user_height}
  */      />
      </Form.Item>
      <label>Peso (in kg)</label>
      <Form.Item name = "user_weight">
        <input
          required
          className="text-black border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400"
          type="number"
  /*         value={data.user_weight}
  */      />
      </Form.Item>
      <label>Circonferenza Gambe (in cm)</label>
      <Form.Item name = "thighs">
        <input
          required
          className="text-black border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400"
          type="number"
  /*         value={data.thighs}
  */      />
      </Form.Item>
      <label>Ampiezza Spalle (in cm)</label>
      <Form.Item name = "shoulders">
        <input
          required
          className="text-black border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400"
          type="number"
  /*         value={data.shoulders}
  */      />
      </Form.Item>
      <label>Circonferenza Vita (in cm)</label>
      <Form.Item name = "waist">
        <input
          required
          className="text-black border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400"
          type="number"
  /*         value={data.waist}
  */      />
      </Form.Item>
      <label>Circonferenza Bicipiti (in cm)</label>
      <Form.Item name = "biceps">
        <input
          required
          className="text-black border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400"
          type="number"
  /*         value={data.biceps}
  */      />
      </Form.Item>
      <button type="submit" className='bg-sky-500 hover:bg-sky-700 text-white px-5 py-0.5 rounded-md'>salva</button>
    </Form>

      <Button>logout</Button>

    </div>
  )
}

export default Profilo