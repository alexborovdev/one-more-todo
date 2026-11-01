export type Task = {
  id: string
  title: string
  isDone: boolean
}

export type Tasks = Task[]

export type Filter = 'all' | 'completed' | 'active'

export type Todo = {
  id: string
  title: string
  filter: Filter
}

export type TasksByTodoId = Record<string, Tasks>