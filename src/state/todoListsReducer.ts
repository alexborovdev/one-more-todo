import type { Todos } from '@/types/todo'

export type Action =
  | { type: 'REMOVE_TODO'; id: string }
  | { type: 'ADD_TODO'; title: string }
  | { type: 'CHANGE_TODO_TITLE'; id: string; title: string }

const todoListsReducer = (state: Todos, action: Action): Todos => {
  switch (action.type) {
    case 'REMOVE_TODO': {
      return state.filter(todo => todo.id !== action.id)
    }

    case 'ADD_TODO': {
      return [{
        id: crypto.randomUUID(),
        title: action.title,
        filter: 'all'
      },
        ...state]
    }

    case 'CHANGE_TODO_TITLE': {
      return state.map((todo) => todo.id === action.id ?
        { ...todo, title: action.title } :
        todo
      )
    }

    default:
      throw new Error('Invalid action type')
  }
}

export default todoListsReducer