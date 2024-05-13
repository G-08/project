"use client"
import { FormWrapper } from "./FormWrapper"

type UserData = {
  firstName: string
  lastName: string
  date_of_birth: string
  user_weight: number
  user_height: number
  thighs: number
  shoulders: number
  waist: number
  biceps: number
}

type UserFormProps = UserData & {
  updateFields: (fields: Partial<UserData>) => void
}

export function UserForm({
  firstName,
  lastName,
  date_of_birth,
  user_height,
  user_weight,
  thighs,
  shoulders,
  waist,
  biceps,
  updateFields,
}: UserFormProps) {
  return (
    <FormWrapper title="Dati Utente">
      <label>Nome</label>
      <input
        className="text-black border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400"
        autoFocus
        required
        type="text"
        value={firstName}
        onChange={e => updateFields({ firstName: e.target.value })}
      />
      <label>Cognome</label>
      <input
        className="text-black border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400"
        required
        type="text"
        value={lastName}
        onChange={e => updateFields({ lastName: e.target.value })}
      />
      <label>Data di nascita</label>
      <input
        required
        className="text-black border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400"
        type="string"
        value={date_of_birth}
        onChange={e => updateFields({ date_of_birth: e.target.value })}
      />
      <label>Altezza (in cm)</label>
      <input
        required
        className="text-black border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400"
        type="number"
        value={user_height}
        onChange={e => updateFields({ user_height: Number(e.target.value) })}
      />
      <label>Peso (in kg)</label>
      <input
        required
        className="text-black border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400"
        type="number"
        value={user_weight}
        onChange={e => updateFields({ user_weight: Number(e.target.value) })}
      />
      <label>Circonferenza Gambe (in cm)</label>
      <input
        required
        className="text-black border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400"
        type="number"
        value={thighs}
        onChange={e => updateFields({ thighs: Number(e.target.value) })}
      />
      <label>Ampiezza Spalle (in cm)</label>
      <input
        required
        className="text-black border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400"
        type="number"
        value={shoulders}
        onChange={e => updateFields({ shoulders: Number(e.target.value) })}
      />
      <label>Circonferenza Vita (in cm)</label>
      <input
        required
        className="text-black border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400"
        type="number"
        value={waist}
        onChange={e => updateFields({ waist: Number(e.target.value) })}
      />
      <label>Circonferenza Bicipiti (in cm)</label>
      <input
        required
        className="text-black border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400"
        type="number"
        value={biceps}
        onChange={e => updateFields({ biceps: Number(e.target.value) })}
      />
    </FormWrapper>
  )
}