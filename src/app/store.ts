import { applyMiddleware, combineReducers, legacy_createStore as createStore, type Reducer } from 'redux'
import { thunk } from 'redux-thunk'
import todoListsReducer from '@/state/todoListsReducer'
import tasksReducer from '@/state/tasksReducer'

const rootReducer = combineReducers({
  todoLists: todoListsReducer,
  tasks: tasksReducer
})

const store = createStore(
  rootReducer as unknown as Reducer<
    ReturnType<typeof rootReducer>,
    any
  >,
  applyMiddleware(thunk))

export type RootState = ReturnType<typeof rootReducer>
export type AppDispatch = typeof store.dispatch

export default store