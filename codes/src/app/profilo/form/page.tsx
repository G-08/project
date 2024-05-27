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
  user_weight: number;
  user_height: number;
  thighs: number;
  shoulders: number;
  waist: number;
  biceps: number;
  initial: string;
  goal: string;
}

const INITIAL_DATA: NewFormData = {
  username: "",
  firstName: "",
  lastName: "",
  date_of_birth: "",
  user_weight: 0,
  user_height: 0,
  thighs: 0,
  shoulders: 0,
  waist: 0,
  biceps: 0,
  initial: "",
  goal: "",
}

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
  const [userData, setUserData] = useState<NewFormData>(INITIAL_DATA);
  const [editingField, setEditingField] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getData();
        userData.username = data.username;
        userData.firstName = data.firstName;
        userData.lastName = data.lastName;
        userData.date_of_birth = data.date_of_birth;
        userData.user_weight = data.user_weight;
        userData.user_height = data.user_height;
        userData.thighs = data.thighs;
        userData.shoulders = data.shoulders;
        userData.waist = data.waist;
        userData.biceps = data.biceps;
        userData.initial = data.initial;
        userData.goal = data.goal;
        console.log("!!!!!!!!!!!!!!!!!!! ", userData);
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
    { name: "Data di nascita", value: userData.date_of_birth, type: "string", key: "date_of_birth" },
    { name: "Altezza (in cm)", value: userData.user_height, type: "number", key: "user_height" },
    { name: "Peso (in kg)", value: userData.user_weight, type: "number", key: "user_weight" },
    { name: "Circonferenza Gambe (in cm)", value: userData.thighs, type: "number", key: "thighs" },
    { name: "Ampiezza Spalle (in cm)", value: userData.shoulders, type: "number", key: "shoulders" },
    { name: "Circonferenza Vita (in cm)", value: userData.waist, type: "number", key: "waist" },
    { name: "Circonferenza Bicipiti (in cm)", value: userData.biceps, type: "number", key: "biceps" },
    { name: "Condizione iniziale", value: userData.initial, type: "string", key: "initial" },
    { name: "Obiettivo", value: userData.goal, type: "string", key: "goal" },
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
      await updateData(userData);
      message.success('User data updated successfully');
      setEditingField(null); // Reset editingField after successful submit
    } catch (error) {
      console.error('Failed to update user data:', error);
      message.error('Failed to update user data');
    }
  };

  return (
    <Form onFinish={handleSubmit}>
        <h1>Form aggiornamento dati</h1>
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

      <button type="submit" className='bg-sky-500 hover:bg-sky-700 text-white px-5 py-0.5 rounded-md mt-4'>
        Salva Tutto
      </button>
      <button type="submit" className='bg-sky-500 hover:bg-sky-700 text-white px-5 py-0.5 rounded-md mt-4'>
        <Link href="/profilo">Torna al profilo</Link>
      </button>
    </Form>
  );
}

export default UpdateForm;

const printUserData = (userData: NewFormData) => {
  for (const key in userData) {
    if (userData.hasOwnProperty(key)) {
      console.log(`${key}: ${userData[key as keyof NewFormData]}`);
    }
  }
};
