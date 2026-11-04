import { memo, useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { addTaskAC } from '@/state/tasksReducer'
import AddItemForm from '@/components/AddItemForm'
import TodoListTitle from '@/components/TodoListTitle'
import FilterButtons from '@/components/FilterButtons'
import TasksList from '@/components/TasksList'

type Props = {
  id: string
}

const TodoList = memo((props: Props) => {
  const { id } = props

  console.log('TodoList has been called')

  const dispatch = useDispatch()

  const addTask = useCallback((title: string) => {
    dispatch(addTaskAC(id, title))
  }, [dispatch, id])

  return (
    <div>
      <TodoListTitle todoId={id} />
      <AddItemForm addNewItem={addTask} />
      <TasksList todoId={id} />
      <FilterButtons todoId={id} />
    </div>
  )
})

export default TodoList