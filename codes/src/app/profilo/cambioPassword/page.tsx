'use client'

import { Form, message } from 'antd';
import axios from 'axios';
import Link from 'next/link';
import React, { useState } from 'react';

const changePassword = async (oldPassword: string, newPassword1: string, newPassword2: string) => {
  console.log("!!!!!!!!!!!!!!!!!! sono dentro changePassword");
  if (newPassword1 !== newPassword2) {
    message.error('Old and new password do not match');
  } else if (oldPassword === newPassword1) {
    message.error('The new password is equal to the old password')
  } else {
    try {
      console.log("!!!!!!!!!!!!!!!!!! sono dentro il try catch");
      const res = await axios.put('/api/auth/changePassword', {
        oldPassword,
        newPassword: newPassword1
      });
      console.log("!!!!!!!!!!!!!!!!!! è arrivata la risposta");

      if (res.status !== 200) {
        throw new Error(`Failed to update data with status: ${res.status}`);
      }

      return res.data;
    } catch (error) {
      console.error('Error changing password:', error);
      throw error;
    }  
  }
}

const CambioPassword = () => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword1, setNewPassword1] = useState('');
  const [newPassword2, setNewPassword2] = useState('');

  const handleSubmit = async () => {
    try {
      await changePassword(oldPassword, newPassword1, newPassword2);
      message.success('Password modified successfully');
    } catch (error) {
      console.error('Failed to change the password: ', error);
      message.error('Failed to change the password');
    }
  };
  

  return (
    <Form onSubmitCapture={handleSubmit}>
      <h1 className='text-white mr-2'>Form cambio password</h1>
      <label className='text-white mr-2'>Vecchia password</label>
      <Form.Item name="oldPwd" className='flex-1'>
        <input
          className="text-black border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400"
          autoFocus
          required
          type="password"
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
        />
      </Form.Item>
      <label className='text-white mr-2'>Nuova password</label>
      <Form.Item name="newPwd1" className='flex-1'>
        <input
          className="text-black border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400"
          autoFocus
          required
          type="password"
          value={newPassword1}
          onChange={(e) => setNewPassword1(e.target.value)}
        />
      </Form.Item>
      <label className='text-white mr-2'>Ripeti nuova password</label>
      <Form.Item name="newPwd2" className='flex-1'>
        <input
          className="text-black border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400"
          autoFocus
          required
          type="password"
          value={newPassword2}
          onChange={(e) => setNewPassword2(e.target.value)}
        />
      </Form.Item>
      <button type="submit" className='bg-sky-500 hover:bg-sky-700 text-white px-5 py-0.5 rounded-md mt-4'>
        Conferma cambio password
      </button>
      <button type="submit" className='bg-sky-500 hover:bg-sky-700 text-white px-5 py-0.5 rounded-md mt-4'>
        <Link href="/profilo">Torna al profilo</Link>
      </button>
    </Form>
  );
}

export default CambioPassword;
