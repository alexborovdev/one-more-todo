import type { Todos, Filter } from '@/types/todo'
import type { ApiTodo } from '@/api/todoAPI.ts'

type Action =
  | ReturnType<typeof addTodoAC>
  | ReturnType<typeof removeTodoAC>
  | ReturnType<typeof changeTodoFilterAC>
  | ReturnType<typeof changeTodoTitleAC>
  | ReturnType<typeof setTodosAC>

export const addTodoAC = (todo: ApiTodo) => ({
  type: 'ADD_TODO' as const,
  todo
})
export const removeTodoAC = (id: string) => ({
  type: 'REMOVE_TODO' as const,
  id
})
export const changeTodoTitleAC = (id: string, title: string) => ({
  type: 'CHANGE_TODO_TITLE' as const,
  id,
  title
})
export const changeTodoFilterAC = (id: string, filter: Filter) => ({
  type: 'CHANGE_TODO_FILTER' as const,
  id,
  filter
})
export const setTodosAC = (todos: ApiTodo[]) => ({
  type: 'SET_TODOS' as const,
  todos
})

const initialState: Todos = []

const todoListsReducer = (state: Todos = initialState, action: Action): Todos => {
  switch (action.type) {
    case 'ADD_TODO': {
      return [
        {
          ...action.todo,
          filter: 'all'
        },
        ...state
      ]
    }
    case 'REMOVE_TODO': {
      return state.filter(todo => todo.id !== action.id)
    }
    case 'CHANGE_TODO_FILTER': {
      return state.map((todo) => todo.id === action.id
        ? { ...todo, filter: action.filter }
        : todo
      )
    }
    case 'CHANGE_TODO_TITLE': {
      return state.map((todo) => todo.id === action.id
        ? { ...todo, title: action.title }
        : todo
      )
    }
    case 'SET_TODOS': {
      return action.todos.map(todo => ({
        ...todo,
        filter: 'all' as const
      }))
    }

    default:
      return state
  }
}

export default todoListsReducer