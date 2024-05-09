"use client"
import { FormWrapper } from "./FormWrapper"

type AccountData = {
  email: string
  username: string
  password: string
}

type AccountFormProps = AccountData & {
  updateFields: (fields: Partial<AccountData>) => void
}

export function AccountForm({
  email,
  username,
  password,
  updateFields,
}: AccountFormProps) {
  return (
    <FormWrapper title="Creazione Account">
      <label>Email</label>
      <input
        className="text-black"
        autoFocus
        required
        type="email"
        value={email}
        onChange={e => updateFields({ email: e.target.value })}
      />
      <label>Username</label>
      <input
        className="text-black"
        autoFocus
        required
        type="string"
        value={username}
        onChange={e => updateFields({ username: e.target.value })}
      />
      <label>Password</label>
      <input
        className="text-black"
        required
        type="password"
        value={password}
        onChange={e => updateFields({ password: e.target.value })}
      />
    </FormWrapper>
  )
}