'use client'

import { Form, message } from 'antd';
import axios from 'axios';
import Link from 'next/link';
import React, { use, useEffect, useState } from 'react';

type NewFormData = {
  username: string;
  firstName: string;
  lastName: string;
  date_of_birth: string;
  theme: string;
}

const INITIAL_DATA: NewFormData = {
  username: "",
  firstName: "",
  lastName: "",
  date_of_birth: "",
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

const UpdateForm = () => {
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
        userData.username = data.username;
        userData.firstName = data.firstName;
        userData.lastName = data.lastName;
        userData.date_of_birth = data.date_of_birth;
        userData.theme = data.theme;
        printUserData(userData);
      } catch (error) {
        console.error('Failed to fetch user data', error);
      }
    };

    fetchData();
  }, []);

  const Menu = [
    { name: "Username", value: userData.username, type: "string", key: "username" },
    { name: "Nome", value: userData.firstName, type: "string", key: "firstName" },
    { name: "Cognome", value: userData.lastName, type: "string", key: "lastName" },
    { name: "Data di nascita", value: userData.date_of_birth, type: "string", key: "date_of_birth" }
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
      if (!containsOnlyCharacters(userData.firstName, userData.lastName)) {
        setError("first name or last name is invalid");
        return;
      }
      if (!correctFormat(userData.date_of_birth)) {
        setError("Date of birth is bad formed");
        return;
      }
      await updateData(userData);
      message.success('User data updated successfully');
      setEditingField(null); // Reset editingField after successful submit
      // aggiungere funzione per ricreare scheda
    } catch (error) {
      console.error('Failed to update user data:', error);
      message.error('Failed to update user data');
    }
  };

  return (
    <div className='p-10 rounded-md bg-white w-1/2 m-auto'>
      <Form onFinish={handleSubmit}>
        <h1>Form aggiornamento dati</h1>
      {Menu.map((menu, index) => (
        <div className='flex items-center mb-4' key={index}>
          <label className='text-black mr-2'>{menu.name}</label>
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
      <div className='px-1'></div>
      <button className='bg-sky-500 hover:bg-sky-700 text-white px-5 py-0.5 rounded-md mt-4'>
        <Link href="/profilo">Torna al profilo</Link>
      </button>
    </Form>
    </div>
  );
}

export default UpdateForm;

const printUserData = (userData: NewFormData) => {
  for (const key in userData) {
    if (userData.hasOwnProperty(key)) {
      console.log(`${key}: ${userData[key as keyof NewFormData]}`);
    }
  }
}

function containsOnlyCharacters(str1: string, str2: string): boolean {
  const regex = /^[a-zA-Z]+$/;
  return regex.test(str1) && regex.test(str2);
}

function correctFormat(date: string): boolean {
  const regex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;

  // Verifica se la stringa soddisfa il formato della data
  if (!regex.test(date)) {
    return false;
  }

  // Splitta la stringa in giorno, mese e anno
  const [giorno, mese, anno] = date.split('/').map(Number);
  
  // Controlla se il mese è valido (da 1 a 12)
  if (mese < 1 || mese > 12) {
    return false;
  }

  // Controlla i giorni in base al mese
  const giorniPerMese = [31, anno % 4 === 0 && (anno % 100 !== 0 || anno % 400 === 0) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  if (giorno < 1 || giorno > giorniPerMese[mese - 1]) {
    return false;
  }

  return true;
}