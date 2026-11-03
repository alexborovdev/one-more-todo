import { memo, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Checkbox, IconButton } from '@mui/material'
import { Delete } from '@mui/icons-material'
import type { RootState } from '@/app/store'
import type { Filter } from '@/types/todo'
import { changeTodoFilterAC, changeTodoTitleAC, removeTodoAC } from '@/state/todoListsReducer'
import { addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC } from '@/state/tasksReducer'
import AddItemForm from '@/components/AddItemForm'
import EditableSpan from '@/components/EditableSpan'
import TodoListTitle from '@/components/TodoListTitle'
import FilterButtons from '@/components/FilterButtons'

type Props = {
  id: string
}

const TodoList = memo((props: Props) => {
  const { id } = props

  console.log('TodoList has been called')

  const dispatch = useDispatch()
  const tasks = useSelector((state: RootState) => state.tasks[id] ?? [])
  const todo = useSelector((state: RootState) => state.todoLists.find(todo => todo.id === id))

  if (!todo) return null

  const { title, filter } = todo

  const filteredTasks = tasks.filter(task => {
    if (filter === 'active') return !task.isDone
    if (filter === 'completed') return task.isDone
    return true
  })

  const addTask = useCallback((title: string) => {
    dispatch(addTaskAC(id, title))
  }, [dispatch, id])

  const onChangeTodoTitleChange = useCallback((title: string) => {
    dispatch(changeTodoTitleAC(id, title))
  }, [dispatch, id])
  const onDeleteTodoButtonClick = () => {
    dispatch(removeTodoAC(id))
  }
  const changeFilterButtonClick = (filter: Filter) => {
    dispatch(changeTodoFilterAC(id, filter))
  }

  return (
    <div>
      <TodoListTitle
        title={title}
        onChangeTodoTitleChange={onChangeTodoTitleChange}
        onDeleteTodoButtonClick={onDeleteTodoButtonClick}
      />
      <AddItemForm
        addNewItem={addTask}
      />
      <ul>
        {filteredTasks.map(({ id: taskId, title, isDone }) => {
          const onChangeStatusCheckboxCheck = () => {
            dispatch(changeTaskStatusAC(id, taskId))
          }
          const onRemoveTaskButtonClick = () => {
            dispatch(removeTaskAC(id, taskId))
          }
          const onChangeInputValueChange = (newValue: string) => {
            dispatch(changeTaskTitleAC(id, taskId, newValue))
          }

          return (
            <div key={taskId}>
              <Checkbox
                checked={isDone}
                onChange={onChangeStatusCheckboxCheck}
              />
              <EditableSpan
                title={title}
                onChange={onChangeInputValueChange}
              />
              <IconButton
                type="button"
                onClick={onRemoveTaskButtonClick}>
                <Delete />
              </IconButton>
            </div>
          )
        })}
      </ul>
      <FilterButtons
        filter={filter}
        changeFilterButtonClick={changeFilterButtonClick}
      />
    </div>
  )
})

export default TodoList