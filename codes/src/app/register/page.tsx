"use client"
import Link from 'next/link'
import React from 'react'
import { FormEvent, useState } from "react"
import { AccountForm } from "./AccountForm"
import { GoalForm } from "./GoalForm"
import { useMultistepForm } from "./useMultistepForm"
import { UserForm } from "./userForm"
import { useRouter } from 'next/router'

type FormData = {
  email: string
  firstName: string
  lastName: string
  password: string
  username: string
  age: string
  user_weight: number
  user_height: number
  thighs: number
  shoulders: number
  waist: number
  biceps: number
  initial: string
  goal: string
}

const INITIAL_DATA: FormData = {
  email: "",
  firstName: "",
  lastName: "",
  password: "",
  username: "",
  age: "",
  user_weight: 0,
  user_height: 0,
  thighs: 0,
  shoulders: 0,
  waist: 0,
  biceps: 0,
  initial: "",
  goal: ""
}
const Register = () => {
/*   const [error, setError] = useState("");
  const router = useRouter(); */
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

  const submitHandler = async (e: FormEvent, fd: FormData) => {
    e.preventDefault()
    if (!isLastStep) return next()
    const email = fd.email;
    const firstName = fd.firstName;
    const lastName = fd.lastName;
    const password = fd.password;
    const username = fd.username;
    const age = fd.age;
    const user_weight = fd.user_weight;
    const user_height = fd.user_height;
    const thighs = fd.thighs;
    const shoulders = fd.shoulders;
    const waist = fd.waist;
    const biceps = fd.biceps;
    const initials = fd.initial;
    const goal = fd.goal;

/*     if (!isValidEmail(email)) {
      setError("This email is invalid");
      return;
    }
    if (!conainsCharacters(firstName, lastName)) {
      return;
    }
    if (!containsUpperCase(firstName, lastName, password)){
      return;
    }
    if (!containsLowerCase(firstName, lastName, password)){
      return;
    }
    if (!containsNumber(password, age, user_weight, user_height, thighs, shoulders, waist, biceps, initials, goal, initials)) {
      return;
    }
    if (correctFormat(age)) {
      return;
    }
    if (!password || password.length < 8) {
      setError("Password is invalid");
      return;
    }

    try {
      const res = await fetch("api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          firstName,
          lastName,
          password,
          username,
          age,
          user_weight,
          user_height,
          thighs,
          shoulders,
          waist,
          biceps,
          initials,
          goal,
        }),
      })
      if (res.status === 400) {
        setError("This email is already registered");
      }if (res.status === 200) {
        setError("");
        router.push("/login");
      }
    } catch (error) {
      setError("Error try again");
      console.log(error);
    }*/
    alert("Account creato correttamente")
  }

  return (
    <div className='flex min-h-screen flex-col items-center justify-between p-24'>
        <div className='bg-white px-10 py-10 rounded-xl shadow-sm'>
            <h1 className='underline'>Registrazione FitGym44</h1>
            <br></br>
            <br></br>
            <form onSubmit={e => submitHandler(e, data)}>
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
{/*                 <p>{error && error}</p> */}
              </div>
            </form>
            <Link href="/login" className=' hover:text-sky-600'>Hai già un account? Effettua l'accesso</Link>
        </div>
    </div>
  )
}

export default Register

function isValidEmail(email: string) {
    throw new Error('Function not implemented.')
  }
