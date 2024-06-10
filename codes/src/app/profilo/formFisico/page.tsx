'use client'
import { Form, message } from 'antd';
import axios from 'axios';
import Link from 'next/link';
import React, { use, useEffect, useState } from 'react';

type NewFormData = {
  user_weight: number;
  user_height: number;
  thighs: number;
  shoulders: number;
  waist: number;
  biceps: number;
  initial: number;
  goal: number;
  theme: string;
}

const INITIAL_DATA: NewFormData = {
  user_weight: 0,
  user_height: 0,
  thighs: 0,
  shoulders: 0,
  waist: 0,
  biceps: 0,
  initial: 0,
  goal: 0,
  theme: ""
}

const getTheme = async () => {
  try {
    const res = await axios.get('/api/auth/getUserData', {
      withCredentials: true,
    });

    if (res.status !== 200) {
      throw new Error(`Failed to fetch data with status: ${res.status}`);
    }

    return res.data.data.theme;
  } catch (error: any) {
    console.error('Error loading user data:', error.message);
    throw error;
  }
};

const getData = async () => {
  try {
    const res = await axios.get('/api/auth/getUserData', {
      withCredentials: true,
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

const updateData = async (newData: NewFormData) => {
  try {
    const res = await axios.put('/api/auth/updateUserData', newData, {
      withCredentials: true,
    });

    if (res.status !== 200) {
      throw new Error(`Failed to update data with status: ${res.status}`);
    }

    return res.data;
  } catch (error: any) {
    console.error('Error updating user data:', error.message);
    throw error;
  }
};

const deleteScheda = async () => {
  try {
      await axios.delete("/api/auth/deleteScheda");
      //message.success('Scheda eliminata correttamente');

  } catch (error) {
      console.error('Si è verificato un errore durante l\'eliminazione della scheda:', error);
      message.error('Si è verificato un errore durante l\'eliminazione della scheda');
  }
};

const updateScheda = async () => {
  try {
      console.log("chiamo updateScheda");
      const scheda = await axios.post("/api/auth/updateScheda");
      message.success('Scheda aggiornata correttamente');

  } catch (error) {
      console.error('Si è verificato un errore durante la creazione della nuova scheda:', error);
      message.error('Si è verificato un errore durante la creazione della nuova scheda:');
  }
};

const UpdateFormFisico = () => {
  const [error, setError] = useState("");
  const [userData, setUserData] = useState<NewFormData>(INITIAL_DATA);
  const [editingField, setEditingField] = useState<string | null>(null);
  const [theme, setTheme] = useState(""); // State lifted up

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getTheme();
        setTheme(data); // Update the theme in the parent component
      } catch (error) {
        console.error('Failed to fetch user data', error);
      }
    };

    fetchData();
  }, [setTheme]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getData();
        userData.user_weight = data.user_weight;
        userData.user_height = data.user_height;
        userData.thighs = data.thighs;
        userData.shoulders = data.shoulders;
        userData.waist = data.waist;
        userData.biceps = data.biceps;
        userData.initial = data.initial;
        userData.goal = data.goal;
        userData.theme = data.theme;
        printUserData(userData);
      } catch (error) {
        console.error('Failed to fetch user data', error);
      }
    };

    fetchData();
  }, []);

  const Menu = [
    { name: "Altezza (in cm)", value: userData.user_height, type: "number", key: "user_height" },
    { name: "Peso (in kg)", value: userData.user_weight, type: "number", key: "user_weight" },
    { name: "Circonferenza Gambe (in cm)", value: userData.thighs, type: "number", key: "thighs" },
    { name: "Ampiezza Spalle (in cm)", value: userData.shoulders, type: "number", key: "shoulders" },
    { name: "Circonferenza Vita (in cm)", value: userData.waist, type: "number", key: "waist" },
    { name: "Circonferenza Bicipiti (in cm)", value: userData.biceps, type: "number", key: "biceps" },
    { name: "Condizione iniziale", value: userData.initial, type: "number", key: "initial" },
    { name: "Obiettivo", value: userData.goal, type: "number", key: "goal" },
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, key: keyof FormData) => {
    setUserData({
      ...userData,
      [key]: e.target.value,
    });
  };

  const handleEditClick = (key: string) => {
    if (editingField === key) {
      setEditingField(null);
    } else {
      setEditingField(key);
    }
    printUserData(userData);
  };

  const handleSubmit = async () => {
    try {
      if (userData.user_height <= 0 || userData.user_weight <= 0 || userData.thighs <= 0 || userData.shoulders <= 0 || userData.waist <= 0 || userData.biceps <= 0) {
        setError("Misure non valide");
        return;
      }

      if (userData.initial < 1 || userData.initial > 3){
        setError("Condizione iniziale non valida");
        return;
      }

      if (userData.goal < 1 || userData.goal > 3){
        setError("Obiettivo non valido");
        return;
      }

      await updateData(userData);
      message.success('Dati fisici aggiornati correttamente');
      
      await deleteScheda();
      console.log("scheda vecchia eliminata");

      await updateScheda();
      console.log("scheda nuova creata");

      setEditingField(null); // Reset editingField after successful submit
      // aggiungere funzione per ricreare scheda
    } catch (error) {
      console.error('Failed to update user data:', error);
      message.error('Failed to update user data');
    }
  };

  return (
    <Form onFinish={handleSubmit}>
        <h1>Form aggiornamento dati fisici</h1>
      {Menu.map((menu, index) => (
        <div className='flex items-center mb-4' key={index}>
          <label className='text-white mr-2'>{menu.name}</label>
          <Form.Item name={menu.key} className='flex-1'>
            <input
              className="text-black border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400"
              autoFocus
              required
              type={menu.type}
              placeholder={`${menu.value}`}
              value={userData[menu.key as keyof NewFormData]}
              disabled={editingField !== menu.key}
              onChange={(e) => handleChange(e, menu.key as keyof FormData)}
            />
          </Form.Item>
          <button
            type="button"
            className='bg-sky-500 hover:bg-sky-700 text-white px-5 py-0.5 rounded-md ml-2'
            onClick={() => handleEditClick(menu.key)}
          >
            {editingField === menu.key ? 'Salva' : 'Modifica'}
          </button>
        </div>
      ))}

      <br></br> <p>{error && error}</p>
      <button type="submit" className='bg-sky-500 hover:bg-sky-700 text-white px-5 py-0.5 rounded-md mt-4'>
        Salva Tutto
      </button>
      <button className='bg-sky-500 hover:bg-sky-700 text-white px-5 py-0.5 rounded-md mt-4'>
        <Link href="/profilo">Torna al profilo</Link>
      </button>
    </Form>
  );
}

export default UpdateFormFisico;

const printUserData = (userData: NewFormData) => {
  for (const key in userData) {
    if (userData.hasOwnProperty(key)) {
      console.log(`${key}: ${userData[key as keyof NewFormData]}`);
    }
  }
};
