export type PlanType = {
  name: string
  phase: PhaseType[]
}

export type PhaseType = {
  name: string
  task: TaskType[]
}

export type TaskType = {
  name: string
  plane: PlaneType[]
}

export type PlaneType = {
  name: string
  quantity: number
}
