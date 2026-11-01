import type { Todos } from '@/types/todo'

type Action = {
  type: string,
  [key: string]: any
}

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

    default:
      throw new Error('Invalid action type')
  }
}

export default todoListsReducer