import type { TasksByTodoId } from '@/types/todo'

type Action =
  | ReturnType<typeof addTaskAC>
  | ReturnType<typeof removeTaskAC>

export const addTaskAC = (todoId: string, title: string) => ({
  type: 'ADD_TASK' as const,
  todoId,
  title
})
export const removeTaskAC = (todoId: string, taskId: string) => ({
  type: 'REMOVE_TASK' as const,
  todoId,
  taskId
})

const taskReducer = (state: TasksByTodoId, action: Action): TasksByTodoId => {
  switch (action.type) {
    case 'REMOVE_TASK': {
      return {
        ...state,
        [action.todoId]: state[action.todoId].filter(task => task.id !== action.taskId)
      }
    }

    case 'ADD_TASK': {
      return {
        ...state,
        [action.todoId]: [
          {
            id: crypto.randomUUID(),
            title: action.title,
            isDone: false
          },
          ...state[action.todoId]
        ]
      }
    }

    default:
      throw new Error('Invalid action type')
  }
}

export default taskReducer