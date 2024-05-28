"use client"
import { Form } from "antd"
import { FormWrapper } from "./FormWrapper"

type GoalData = {
  initial: number
  goal: number
}

type GoalFormProps = GoalData & {
  updateFields: (fields: Partial<GoalData>) => void
}

export function GoalForm({
  initial,
  goal,
  updateFields,
}: GoalFormProps) {
  return (
    <FormWrapper title="Condizione Fisica">
      <label className='dark:text-white'>Condizione iniziale</label>
      <Form.Item name="initial">
      <input
        className="text-black border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400"
        autoFocus
        required
        type="number"
        value={initial}
        onChange={e => updateFields({ initial: Number(e.target.value) })}
      />
      </Form.Item>
      <label className='dark:text-white'>Obiettivo</label>
      <Form.Item name="goal">
      <input
        className="text-black border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400"
        required
        type="number"
        value={goal}
        onChange={e => updateFields({ goal: Number(e.target.value) })}
      />
      </Form.Item>
    </FormWrapper>
  )
}