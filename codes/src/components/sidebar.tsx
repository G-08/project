import React from "react";
import { useState } from "react";
import { BsArrowLeftSquareFill } from "react-icons/bs";
import Image from "next/image";

export default function Sidebar (){
    const [isOpen, setIsOpen] = useState(true);
    return (
        <div className={'bg-white h-screen p-5 pt-8 ${isOpen ? w-72 : w-20} duration-300 relative'}>
            <BsArrowLeftSquareFill 
                className='bg-white text-black text-3xl absolute -right-3 top-9 border cursor-pointer ${!isOpen && rotate-180}'
                onClick={() => setIsOpen(!isOpen)}
            />
            <div>
                <Image 
                    src='/logo-fitgym.png'
                    className="w-80 h-80"
                    //alt="logo fitgym"
                >
                    </Image>
                    
            </div>
        </div>
    )
}