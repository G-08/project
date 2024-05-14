"use client"
import FormItem from "antd/es/form/FormItem"
import { FormWrapper } from "./FormWrapper"
import {Form, message} from "antd"

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
      <Form.Item name="email">
        <input
          className="text-black border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400"
          autoFocus
          required
          type="email"
          value={email}
          onChange={e => updateFields({ email: e.target.value })}
        />
      </Form.Item>
      <label>Username</label>
      <Form.Item name="username">
        <input
          className="text-black border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400"
          autoFocus
          required
          type="string"
          value={username}
          onChange={e => updateFields({ username: e.target.value })}
        />
      </Form.Item>
      
      <label>Password</label>
      <Form.Item name="password">
        <input
          className="text-black border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400"
          required
          type="password"
          value={password}
          onChange={e => updateFields({ password: e.target.value })}
        />
      </Form.Item>
    </FormWrapper>
  )
}