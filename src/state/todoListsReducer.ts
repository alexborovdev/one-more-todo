import type { Todos, Filter } from '@/types/todo'

type Action =
  | ReturnType<typeof addTodoAC>
  | ReturnType<typeof removeTodoAC>
  | ReturnType<typeof changeTodoFilterAC>
  | ReturnType<typeof changeTodoTitleAC>

export const addTodoAC = (title: string) => ({
  type: 'ADD_TODO' as const,
  id: crypto.randomUUID(),
  title
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

const todoListsReducer = (state: Todos, action: Action): Todos => {
  switch (action.type) {
    case 'ADD_TODO': {
      return [{
        id: action.id,
        title: action.title,
        filter: 'all'
      },
        ...state]
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

    default:
      throw new Error('Invalid action type')
  }
}

export default todoListsReducer