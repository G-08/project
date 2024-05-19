'use client'
import Image from "next/image";
import Link from "next/link";
import {useState, useEffect} from "react";

export default function Home() {
  const [theme, setTheme] = useState("Light");
  //const userId = await validateJWT(request);

  useEffect(()=> {
    if(theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]); 

  const handleThemeSwitch = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 dark:bg-black dark:text-white">
      <button className='bg-grey' onClick={handleThemeSwitch}>Switch Mode</button>
      <h1>FitGym44</h1>
      <Link href="/login">login</Link>
      <Link href="/register">registrazione</Link>
      {}
    </main>
  );
}
