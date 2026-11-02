import type { TasksByTodoId } from '@/types/todo'
import { addTodoAC, removeTodoAC, todoListId1, todoListId2 } from './todoListsReducer'

type Action =
  | ReturnType<typeof addTaskAC>
  | ReturnType<typeof removeTaskAC>
  | ReturnType<typeof changeTaskStatusAC>
  | ReturnType<typeof changeTaskTitleAC>
  | ReturnType<typeof addTodoAC>
  | ReturnType<typeof removeTodoAC>

export const addTaskAC = (todoId: string, title: string) => ({
  type: 'ADD_TASK' as const,
  todoId,
  id: crypto.randomUUID(),
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
export const changeTaskTitleAC = (todoId: string, taskId: string, title: string) => ({
  type: 'CHANGE_TASK_TITLE' as const,
  todoId,
  taskId,
  title
})

const initialState: TasksByTodoId = {
  [todoListId1]: [
    {
      id: crypto.randomUUID(),
      title: 'HTML&CSS',
      isDone: true
    },
    {
      id: crypto.randomUUID(),
      title: 'JS',
      isDone: true
    },
    {
      id: crypto.randomUUID(),
      title: 'React',
      isDone: true
    },
    {
      id: crypto.randomUUID(),
      title: 'Redux',
      isDone: false
    }
  ],
  [todoListId2]: [
    {
      id: crypto.randomUUID(),
      title: 'Apples',
      isDone: true
    },
    {
      id: crypto.randomUUID(),
      title: 'Bananas',
      isDone: false
    },
    {
      id: crypto.randomUUID(),
      title: 'Potatoes',
      isDone: false
    }
  ]
}

const tasksReducer = (state: TasksByTodoId = initialState, action: Action): TasksByTodoId => {
  switch (action.type) {
    case 'ADD_TASK': {
      return {
        ...state,
        [action.todoId]: [
          {
            id: action.id,
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
    case 'CHANGE_TASK_TITLE': {
      return {
        ...state,
        [action.todoId]: state[action.todoId].map(task =>
          task.id === action.taskId
            ? { ...task, title: action.title }
            : task
        )
      }
    }
    case 'ADD_TODO': {
      return {
        ...state,
        [action.id]: []
      }
    }
    case 'REMOVE_TODO': {
      const { [action.id]: _, ...rest } = state
      return rest
    }

    default:
      return state
  }
}

export default tasksReducer