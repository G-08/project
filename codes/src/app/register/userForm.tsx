"use client"
import { FormWrapper } from "./FormWrapper"

type UserData = {
  firstName: string
  lastName: string
  age: string
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
  age,
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
        className="text-black"
        autoFocus
        required
        type="text"
        value={firstName}
        onChange={e => updateFields({ firstName: e.target.value })}
      />
      <label>Cognome</label>
      <input
        className="text-black"
        required
        type="text"
        value={lastName}
        onChange={e => updateFields({ lastName: e.target.value })}
      />
      <label>Data di nascita</label>
      <input
        required
        className="text-black"
        type="string"
        value={age}
        onChange={e => updateFields({ age: e.target.value })}
      />
      <label>Peso</label>
      <input
        required
        className="text-black"
        type="number"
        value={user_weight}
        onChange={e => updateFields({ user_weight: Number(e.target.value) })}
      />
      <label>Gambe</label>
      <input
        required
        className="text-black"
        type="number"
        value={thighs}
        onChange={e => updateFields({ thighs: Number(e.target.value) })}
      />
      <label>Spalle</label>
      <input
        required
        className="text-black"
        type="number"
        value={shoulders}
        onChange={e => updateFields({ shoulders: Number(e.target.value) })}
      />
      <label>Vita</label>
      <input
        required
        className="text-black"
        type="number"
        value={waist}
        onChange={e => updateFields({ waist: Number(e.target.value) })}
      />
      <label>Bicipiti</label>
      <input
        required
        className="text-black"
        type="number"
        value={biceps}
        onChange={e => updateFields({ biceps: Number(e.target.value) })}
      />
    </FormWrapper>
  )
}