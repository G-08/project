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
    alert("Account creato correttamente")
  }

  return (
    <div className='flex min-h-screen flex-col items-center justify-between p-24'>
        <div>
            <h1>Registrazione mongobonni</h1>
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
                <button type="submit">{isLastStep ? "Finish" : "Next"}</button>
              </div>
            </form>
            <Link href="/login">Hai già un account? Effettua l'accesso</Link>
        </div>
    </div>
  )
}

export default Register