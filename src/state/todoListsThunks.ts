import { todoAPI } from '@/api/todoAPI.ts'
import { setTodosAC } from '@/state/todoListsReducer.ts'
import type { AppDispatch } from '@/app/store.ts'

export const fetchTodos = () => async (dispatch: AppDispatch) => {
  try {
    const response = await todoAPI.getTodos()

    dispatch(setTodosAC(response.data))
  } catch (error) {
    console.error(error)
  }
}