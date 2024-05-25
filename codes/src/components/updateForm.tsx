
import { Form } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

// Your component code here
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

const getData = async () => {
    try {
      console.log("Starting data fetch from /api/auth/getUserData");
  
      const res = await axios.get('../api/auth/getUserData', {
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

const updateData = async (newData: FormData) => {
  try {
      const res = await axios.post('/api/auth/updateUserData', newData, {
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
  console.log("!!!!!!!!!!! sono in UpdateForm");
  const [userData, setUserData] = useState(INITIAL_DATA);


    useEffect(() => {
      console.log("!!!!!!!!!!! sono in usesEffect");
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
        { name: "Username", value: userData.username, type: "string"},
        { name: "Nome", value: userData.username, type: "string"},
        { name: "Cognome", value: userData.username, type: "string" },
        { name: "Data di nascita", value: userData.username, type: "string" },
        { name: "Altezza (in cm)", value: userData.username, type: "number" },
        { name: "Peso (in kg)", value: userData.username, type: "number" },
        { name: "Circonferenza Gambe (in cm)", value: userData.username, type: "number" },
        { name: "Ampiezza Spalle (in cm)", value: userData.username, type: "number" },
        { name: "Circonferenza Vita (in cm)", value: userData.username, type: "number" },
        { name: "Circonferenza Bicipiti (in cm)", value: userData.username, type: "number" },
    ]

    const handleChange = (key: keyof FormData) => (event: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = event.target;
      setUserData({
          ...userData,
          [key]: key === 'user_weight' || key === 'user_height' || key === 'thighs' || key === 'shoulders' || key === 'waist' || key === 'biceps' ? Number(value) : value,
      });
    };
  
    const handleSubmit = async (event: React.FormEvent) => {
      event.preventDefault();
      try {
          await updateData(userData);
          alert('User data updated successfully');
      } catch (error) {
          console.error('Failed to update user data:', error);
          alert('Failed to update user data');
      }
    };

    return(
        <Form>
            {Menu.map((menu, index) => (
                <>
                    <label>{menu.name}</label>
                    <Form.Item name={menu.name}>
                        <input
                            key={index}
                            className="text-black border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400"
                            autoFocus
                            required
                            type={menu.type} 
                            value={menu.value}
                        />
                    </Form.Item>
                </>
            ))}

            <button type="submit" className='bg-sky-500 hover:bg-sky-700 text-white px-5 py-0.5 rounded-md'>salva</button>

        </Form>
    )
}

export default UpdateForm