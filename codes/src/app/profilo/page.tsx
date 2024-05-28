'use client'

import { Button, Form, message, Modal } from 'antd';
import { useRouter } from 'next/navigation';
import Sidebar from '@/components/sidebar';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import axios from 'axios';

const Profilo = () => {
  const router = useRouter();
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = async () => {
    try {
      // Delete the account
      await axios.delete("/api/auth/deleteAccount");
      message.success('Account deleted successfully');

      // Logout the user
      await axios.get("/api/auth/logout");

      // Redirect the user to the home page or login page after account deletion and logout
      router.push('/'); // Change to the route you want to redirect to after deletion
    } catch (error) {
      console.error('Error deleting account:', error);
      message.error('Error deleting account:');
    }
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <div className='flex dark:bg-black dark:text-white'>
        <Sidebar />
        <div>
          <h1>Profilo</h1>
          <button className='bg-sky-500 hover:bg-sky-700 text-white px-5 py-2 rounded-md'>
            <Link href="/profilo/formPersonale">Modifica i tuoi dati personali</Link>
          </button>
          <button className='bg-sky-500 hover:bg-sky-700 text-white px-5 py-2 rounded-md'>
            <Link href="/profilo/formFisico">Modifica i tuoi dati fisici</Link>
          </button>
          <button className='bg-sky-500 hover:bg-sky-700 text-white px-5 py-2 rounded-md'>
            <Link href="/profilo/cambioPassword">Cambia la tua password</Link>
          </button>
          <button
            className='bg-red-500 hover:bg-red-700 text-white px-5 py-2 rounded-md ml-4'
            onClick={showModal}
          >
            Delete Account
          </button>
        </div>
      </div>

      <Modal
        title="Confirm Delete"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Yes, delete"
        cancelText="Cancel"
      >
        <p>Are you sure you want to delete your account? This action cannot be undone.</p>
      </Modal>
    </>
  );
};

export default Profilo;