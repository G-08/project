import { Form } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

type FormData = {
    firstName: string;
    lastName: string;
    username: string;
    date_of_birth: string;
    user_weight: number;
    user_height: number;
    thighs: number;
    shoulders: number;
    waist: number;
    biceps: number;
};

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
};

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

const getData = async () => {
    try {
        console.log("Starting data fetch from /api/getUserData");

        const res = await axios.get('../api/getUserData', {
            withCredentials: true, // Ensure cookies are sent with the request
        });

        if (res.status !== 200) {
            throw new Error(`Failed to fetch data with status: ${res.status}`);
        }
        console.log("AAAAAAAAAAAAAAAA", res.data.data);
        return res.data.data;
    } catch (error: any) {
        console.error('Error loading user data:', error.message);
        throw error;
    }
};

const updateData = async (newData: FormData) => {
  try {
      const res = await axios.post('/api/updateUserData', newData, {
          withCredentials: true,
      });

      if (res.status!== 200) {
          throw new Error(`Failed to update data with status: ${res.status}`);
      }

      return res.data;
  } catch (error: any) {
      console.error('Error updating user data:', error.message);
      throw error;
  }
};

const UpdateForm = () => {
    const [userData, setUserData] = useState<FormData>(INITIAL_DATA);

    useEffect(() => {
        (async () => {
            try {
                const data = await getData();
                setUserData(data);
            } catch (error) {
                console.error('Failed to load user data:', error);
            }
        })();
    }, []);

    if (!userData) {
        return <div>No user data found</div>;
    }
    
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
    ];

    const handleChange = (key: keyof FormData) => (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        setUserData({
            ...userData,
            [key]: key === 'user_weight' || key === 'user_height' || key === 'thighs' || key === 'shoulders' || key === 'waist' || key === 'biceps' ? Number(value) : value,
        });
    };
    
    const handleSubmit = async (event: React.FormEvent) => {
      try {
          await updateData(userData);
          console.log(userData);
          alert('User data updated successfully');
      } catch (error) {
          console.error('Failed to update user data:', error);
          alert('Failed to update user data');
      }
    };

    return (
      <Form onFinish={handleSubmit}>
            <p>{userData.username}</p>
            {Menu.map((menu, index) => (
                <div className='flex' key={index}>
                    <label className='text-white'>{menu.name}</label>
                    <Form.Item name={menu.name}>
                        <input
                            className="text-black border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400"
                            autoFocus
                            required
                            type={menu.type}
                            value={menu.value}
                            onChange={handleChange(menu.key as keyof FormData)}
                        />
                    </Form.Item>
                </div>
            ))}

            <button type="submit" className='bg-sky-500 hover:bg-sky-700 text-white px-5 py-0.5 rounded-md'>salva</button>
        </Form>
    );
};

export default UpdateForm;
