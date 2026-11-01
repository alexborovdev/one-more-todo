import type { Todos, Filter } from '@/types/todo'

export type Action =
  | { type: 'ADD_TODO'; title: string }
  | { type: 'REMOVE_TODO'; id: string }
  | { type: 'CHANGE_TODO_TITLE'; id: string; title: string }
  | { type: 'CHANGE_TODO_FILTER'; id: string; filter: Filter }

const todoListsReducer = (state: Todos, action: Action): Todos => {
  switch (action.type) {
    case 'ADD_TODO': {
      return [{
        id: crypto.randomUUID(),
        title: action.title,
        filter: 'all'
      },
        ...state]
    }

    case 'REMOVE_TODO': {
      return state.filter(todo => todo.id !== action.id)
    }

    case 'CHANGE_TODO_TITLE': {
      return state.map((todo) => todo.id === action.id ?
        { ...todo, title: action.title } :
        todo
      )
    }

    case 'CHANGE_TODO_FILTER': {
      return state.map((todo) => todo.id === action.id ?
        { ...todo, filter: action.filter } :
        todo
      )
    }

    default:
      throw new Error('Invalid action type')
  }
}

export default todoListsReducer