"use client";
    
import React, { useEffect, useState } from "react";
import { BsArrowLeftSquareFill } from "react-icons/bs";
import Image from "next/image";
import Link from "next/link";
import { Button, message } from "antd";
import axios from "axios";
import { useRouter } from 'next/navigation';

interface SidebarProps {
    theme: string;
    setTheme: React.Dispatch<React.SetStateAction<string>>;
}

export default function Sidebar({ theme, setTheme }: SidebarProps) {
    const [isOpen, setIsOpen] = useState(true);
    const router = useRouter();

    const Menus = [
        { title: "Allenamento", dest: "/scheda", icon: <Image
                                            src='/icons8-gym-100.png'
                                            width={20}
                                            height={20}
                                            alt="logo fitgym"
                                            className={`cursor-pointer block float-left mr-2 duration-500 ${isOpen && 'rotate-[360deg]'}`}
                                        />
        },
        { title: "Profilo", dest: "/profilo", icon: <Image
                                        src='/icons8-user-94.png'
                                        width={20}
                                        height={20}
                                        alt="logo fitgym"
                                        className={`cursor-pointer block float-left mr-2 duration-500 ${isOpen && 'rotate-[360deg]'}`}
                                    /> 
        },
    ];

    const switchTheme = async () => {
        const updatedTheme = theme === "white" ? "black" : "white";

        try {
            const res = await axios.put('/api/auth/updateUserTheme', { theme: updatedTheme }, {
                withCredentials: true,
            });
        
            if (res.status !== 200) {
                throw new Error(`Failed to update data with status: ${res.status}`);
            }

            setTheme(updatedTheme);
            message.success('Theme updated successfully');
        } catch (error: any) {
            console.error('Error updating user data:', error.message);
            message.error('Error updating theme');
        }
    };
    
    const handleLogout = async () => {
        try {
            await axios.get("/api/auth/logout");
            message.success("Logout avvenuto correttamente");
            router.push("/");
          } catch (error: any) {
            message.error(error.message);
          }
    };

    return (
        <div className={`bg-white h-screen p-5 pt-8 ${isOpen ? 'w-72' : 'w-20'} duration-300 relative`}>
            <BsArrowLeftSquareFill 
                className={`bg-white text-blue-500 text-3xl absolute -right-3 top-9 border cursor-pointer ${!isOpen && 'rotate-180'}`}
                onClick={() => setIsOpen(!isOpen)}
            />
            <div className="inline-flex">
                <Image
                    src='/logo-fitgym.png'
                    width={50}
                    height={50}
                    alt="logo fitgym"
                    className={`cursor-pointer block float-left mr-2 duration-500 ${isOpen && 'rotate-[360deg]'}`}
                />
                <h1 className={`text-black origin-left font-medium text-2xl duration-300 ${!isOpen && 'scale-0'}`}>
                    FitGym44
                </h1>
            </div>
            <div className="pt-2">
                {Menus.map((menu, index) => (
                    <Link key={index} href={menu.dest}>
                        <li className='text-black tex-sm flex items-center gap-x-4 cursor-pointer p-2 hover:bg-sky-300 rounded-md mt-2'>
                            <span>{menu.icon}</span>
                            <span className={`text-base font-medium flex-1 duration-200 ${!isOpen && 'hidden'}`}>{menu.title}</span>
                        </li>
                    </Link>
                ))}
            </div>
            <div className="mt-4">
                <Button onClick={switchTheme} className='bg-black hover:bg-red-700 text-white'>Switch theme</Button>
            </div>
            <div className="mt-4">
                <Button onClick={handleLogout} className='bg-red-500 hover:bg-red-700 text-white'>Logout</Button>
            </div>
        </div>
    );
}
