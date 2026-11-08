import axios from 'axios'

export type ApiTodo = {
  id: string
  title: string
}

export type ApiTask = {
  id: string
  todoId: string
  title: string
  isDone: boolean
}

const api = axios.create({
  baseURL: 'http://localhost:3001'
})

export const todoApi = {
  getTodos: () =>
    api.get<ApiTodo[]>('/todo-lists'),

  createTodo: (title: string) =>
    api.post<ApiTodo>('/todo-lists', { title }),

  updateTodo: (id: string, title: string) =>
    api.patch<ApiTodo>(`/todo-lists/${id}`, { title }),

  deleteTodo: (id: string) =>
    api.delete(`/todo-lists/${id}`),

  getTasks: (todoId: string) =>
    api.get<ApiTask[]>('/tasks', {
      params: { todoId }
    }),

  createTask: (todoId: string, title: string) =>
    api.post<ApiTask>('/tasks', {
      todoId,
      title,
      isDone: false
    }),

  updateTask: (
    taskId: string,
    changes: Partial<Pick<ApiTask, 'title' | 'isDone'>>
  ) =>
    api.patch<ApiTask>(`/tasks/${taskId}`, changes),

  deleteTask: (taskId: string) =>
    api.delete(`/tasks/${taskId}`)
}