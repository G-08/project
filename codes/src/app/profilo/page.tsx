'use client'
import { Button, message } from 'antd'
import axios from 'axios';
import React from 'react'

const Profilo = () => {

  const getData = async () => {
    try {
      const response = await axios.get("/api/auth/getUserData");
      console.log(response.data.data);
    } catch (error: any) {
      message.error(error.response.data.message);
    }
  };

  return (
    <div>Profilo
      <Button onClick={getData}>prendi dati</Button>
    </div>
  )
}

export default Profilo