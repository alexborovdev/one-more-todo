import type { TasksByTodoId } from '@/types/todo'

type Action =
  | ReturnType<typeof addTaskAC>
  | ReturnType<typeof removeTaskAC>
  | ReturnType<typeof changeTaskStatusAC>

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
export const changeTaskStatusAC = (todoId: string, taskId: string) => ({
  type: 'CHANGE_TASK_STATUS' as const,
  todoId,
  taskId
})

const taskReducer = (state: TasksByTodoId, action: Action): TasksByTodoId => {
  switch (action.type) {
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

    case 'REMOVE_TASK': {
      return {
        ...state,
        [action.todoId]: state[action.todoId].filter(task => task.id !== action.taskId)
      }
    }

    case 'CHANGE_TASK_STATUS': {
      return {
        ...state,
        [action.todoId]: state[action.todoId].map(task =>
          task.id === action.taskId
            ? { ...task, isDone: !task.isDone }
            : task
        )
      }
    }

    default:
      throw new Error('Invalid action type')
  }
}

export default taskReducer