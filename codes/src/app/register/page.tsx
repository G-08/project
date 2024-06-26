'use client'
import Link from 'next/link'
import React from 'react'
import { FormEvent, useState } from "react"
import { AccountForm } from "./AccountForm"
import { GoalForm } from "./GoalForm"
import { useMultistepForm } from "./useMultistepForm"
import { UserForm } from "./userForm"
import { useRouter } from 'next/navigation'
import {useEffect} from "react";
import axios from 'axios'
import { message, Form } from 'antd'

type FormData = {
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
  initial: number
  goal: number
  theme: string
}

const INITIAL_DATA: FormData = {
  email: "",
  firstName: "",
  lastName: "",
  password: "",
  username: "",
  date_of_birth: "",
  user_weight: 0,
  user_height: 0,
  thighs: 0,
  shoulders: 0,
  waist: 0,
  biceps: 0,
  initial: 0,
  goal: 0,
  theme: "white"
}

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
  initial: number
  goal: number
  theme: string
}

const Register = () => {
  const [error, setError] = useState("");
  const router = useRouter();
  const [data, setData] = useState(INITIAL_DATA)
  function updateFields(fields: Partial<FormData>) {
    setData(prev => {
      return { ...prev, ...fields }
    })
  }
  const { steps, currentStepIndex, step, isFirstStep, isLastStep, back, next } =
    useMultistepForm([
      <AccountForm {...data} updateFields={updateFields} />,
      <UserForm {...data} updateFields={updateFields} />,
      <GoalForm {...data} updateFields={updateFields} />
    ])

  const onRegister = async (values: utente) => {
    if (!isLastStep) return next();

    if (!isValidEmail(data.email)) {
      setError("This email is invalid");
      return;
    }
    if (!containsOnlyCharacters(data.firstName, data.lastName)) {
      setError("first name or last name is invalid");
      return;
    }
    if (!containsUpperCase(data.password)){
      setError("password must have uppercase characters");
      return;
    }
    if (!containsLowerCase(data.password)){
      setError("password must have lowercase characters");
      return;
    }
    if (!containsNumber(data.password)) {
      setError("password must have a number");
      return;
    }
    if (!correctFormat(data.date_of_birth)) {
      setError("Date of birth is bad formed");
      return;
    }
    if (data.user_height <= 0 || data.user_weight <= 0 || data.thighs <= 0 || data.shoulders <= 0 || data.waist <= 0 || data.biceps <= 0) {
      setError("Misure non valide");
      return;
    }
    if (!data.password || data.password.length < 8) {
      setError("Password is invalid");
      return;
    }

    if (data.initial < 1 || data.initial > 3){
      setError("Condizione iniziale non valida");
      return;
    }

    if (data.goal < 1 || data.goal > 3){
      setError("Obiettivo non valido");
      return;
    }

    values.email = data.email;
    values.firstName = data.firstName;
    values.lastName = data.lastName;
    values.password = data.password;
    values.username = data.username;
    values.date_of_birth = data.date_of_birth;
    values.user_weight = data.user_weight;
    values.user_height = data.user_height;
    values.thighs = data.thighs;
    values.shoulders = data.shoulders;
    values.waist = data.waist;
    values.biceps = data.biceps;
    values.initial = data.initial;
    values.goal = data.goal;
    values.theme = data.theme;
    console.log("!!!!!!!!!!!!", values.theme);
    
    try{
      await axios.post("api/register", values);
      message.success("utente registrato");
      await axios.post("api/creaScheda", values);
      router.push("/login");
    }catch(error: any){
      message.error(error.response.data.message);
    }
    
  };

  const [theme, setTheme] = useState("Light");

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
    <div className='flex min-h-screen flex-col items-center justify-between p-24 dark:bg-grey dark:text-white'>
        <button onClick={handleThemeSwitch}>Switch Mode</button>
        <div className='bg-white px-10 py-10 rounded-xl shadow-sm dark:bg-black dark:text-white'>
            <h1 className='underline'>Registrazione FitGym44</h1>
            <br></br>
            <br></br>
            <Form onFinish={onRegister}>
              <div style={{ position: "absolute", top: ".5rem", right: ".5rem" }}>
                {currentStepIndex + 1} / {steps.length}
              </div>
              {step}
              <div
                style={{
                  marginTop: "1rem",
                  display: "flex",
                  gap: ".5rem",
                  justifyContent: "flex-end",
                }}
              >
                {!isFirstStep && (
                  <button type="button" onClick={back}>
                    Back
                  </button>
                )}
                <button type="submit" className='bg-sky-500 hover:bg-sky-700 text-white px-5 py-0.5 rounded-md'>{isLastStep ? "Finish" : "Next"}</button>
                <br></br> <p>{error && error}</p>
              </div>
            </Form>
            <Link href="/login" className=' hover:text-sky-600'>Hai già un account? Effettua l'accesso</Link>
        </div>
    </div>
  )
}

export default Register


function isValidEmail(email: string): boolean {
  const regex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
  return regex.test(email);
}

function containsOnlyCharacters(str1: string, str2: string): boolean {
  const regex = /^[a-zA-Z]+$/;
  return regex.test(str1) && regex.test(str2);
}

function containsUpperCase(password: string): boolean {
  return /[A-Z]/.test(password);
}

function containsLowerCase(password: string): boolean {
  return /[a-z]/.test(password);
}

function containsNumber(password: string): boolean {
  return /\d/.test(password);
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