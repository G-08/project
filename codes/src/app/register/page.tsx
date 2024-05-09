"use client"
import Link from 'next/link'
import React from 'react'
import { FormEvent, useState } from "react"
import { AccountForm } from "./AccountForm"
import { GoalForm } from "./GoalForm"
import { useMultistepForm } from "./useMultistepForm"
import { UserForm } from "./userForm"

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

  const submitHandler = async (e: any) => {
    e.preventDefault()
    if (!isLastStep) return next()
    /*const email = e.target[0].value;
    const firstName = e.target[1].value;
    const lastName = e.target[2].value;
    const password = e.target[3].value;
    const username = e.target[4].value;
    const age = e.target[5].value;
    const user_weight = e.target[6].value;
    const user_height = e.target[7].value;
    const thighs = e.target[8].value;
    const shoulders = e.target[9].value;
    const waist = e.target[10].value;
    const biceps = e.target[11].value;*/
    const initials = e.target[12].value;
    const goal = e.target[13].value;
    
    //console.log(email, firstName, lastName, username, password, age, user_weight, user_height);
    console.log(initials, goal);
    alert("Account creato correttamente")
  }

  return (
    <div className='flex min-h-screen flex-col items-center justify-between p-24'>
        <div>
            <h1>Registrazione mongobonni</h1>
            <form onSubmit={submitHandler}>
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
                <button type="submit">{isLastStep ? "Finish" : "Next"}</button>
              </div>
            </form>
            <Link href="/login">Hai già un account? Effettua l'accesso</Link>
        </div>
    </div>
  )
}

export default Register