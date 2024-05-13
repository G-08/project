"use client"
import { FormWrapper } from "./FormWrapper"

type GoalData = {
  initial: string
  goal: string
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
    <FormWrapper title="Condizioni Fiscica">
      <label>Condizione iniziale</label>
      <input
        className="text-black border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400"
        autoFocus
        required
        type="text"
        value={initial}
        onChange={e => updateFields({ initial: e.target.value })}
      />
      <label>Obiettivo</label>
      <input
        className="text-black border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400"
        required
        type="text"
        value={goal}
        onChange={e => updateFields({ goal: e.target.value })}
      />
    </FormWrapper>
  )
}