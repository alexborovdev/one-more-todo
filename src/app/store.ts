import { combineReducers, legacy_createStore as createStore } from 'redux'
import todoListsReducer from '@/state/todoListsReducer'
import tasksReducer from '@/state/tasksReducer'

const rootReducer = combineReducers({
  todoLists: todoListsReducer,
  tasks: tasksReducer
})

export type RootState = ReturnType<typeof rootReducer>

const store = createStore(rootReducer)

export default store