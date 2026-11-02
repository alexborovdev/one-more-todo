import { useDispatch, useSelector } from 'react-redux'
import { Button, Checkbox, IconButton } from '@mui/material'
import { Delete } from '@mui/icons-material'
import type { RootState } from '@/state/store'
import { changeTodoFilterAC, changeTodoTitleAC, removeTodoAC } from '@/state/todoListsReducer'
import { addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC } from '@/state/tasksReducer'
import AddItemForm from '@/AddItemForm'
import EditableSpan from '@/EditableSpan'

type Props = {
  id: string
}

const TodoList = (props: Props) => {
  const { id } = props

  const dispatch = useDispatch()
  const tasks = useSelector((state: RootState) => state.tasks[id])
  const todo = useSelector((state: RootState) => state.todoLists.find(todo => todo.id === id))

  if (!todo) return null

  const { title, filter } = todo

  const filteredTasks = tasks.filter(task => {
    if (filter === 'active') return !task.isDone
    if (filter === 'completed') return task.isDone
    return true
  })

  const addTask = (title: string) => {
    dispatch(addTaskAC(id, title))
  }

  const onChangeTodoTitleChange = (title: string) => {
    dispatch(changeTodoTitleAC(id, title))
  }
  const onDeleteTodoButtonClick = () => {
    dispatch(removeTodoAC(id))
  }
  const onChangeAllFilterButtonClick = () => {
    dispatch(changeTodoFilterAC(id, 'all'))
  }
  const onChangeActiveFilterButtonClick = () => {
    dispatch(changeTodoFilterAC(id, 'active'))
  }
  const onChangeCompletedFilterButtonClick = () => {
    dispatch(changeTodoFilterAC(id, 'completed'))
  }

  return (
    <div>
      <h3>
        <EditableSpan
          title={title}
          onChange={onChangeTodoTitleChange}
        />
        <IconButton
          type="button"
          onClick={onDeleteTodoButtonClick}>
          <Delete />
        </IconButton>
      </h3>
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
      <div>
        <Button variant={filter === 'all' ? 'contained' : 'text'}
                color="success"
                type="button"
                onClick={onChangeAllFilterButtonClick}>
          All
        </Button>
        <Button variant={filter === 'active' ? 'contained' : 'text'}
                color="primary"
                type="button"
                onClick={onChangeActiveFilterButtonClick}>
          Active
        </Button>
        <Button variant={filter === 'completed' ? 'contained' : 'text'}
                color="secondary"
                type="button"
                onClick={onChangeCompletedFilterButtonClick}>
          Completed
        </Button>
      </div>
    </div>
  )
}

export default TodoList