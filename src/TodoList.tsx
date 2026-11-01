import { Button, Checkbox, IconButton } from '@mui/material'
import { Delete } from '@mui/icons-material'
import type { Tasks, Filter } from '@/types/todo'
import AddItemForm from '@/AddItemForm'
import EditableSpan from '@/EditableSpan'

type Props = {
  id: string
  title: string
  tasks: Tasks
  filter: Filter
  addNewTask: (todoId: string, title: string) => void
  removeTask: (todoId: string, taskId: string) => void
  removeTodo: (todoId: string) => void
  changeStatus: (todoId: string, taskId: string) => void
  changeFilter: (todoId: string, value: Filter) => void
  changeTaskTitle: (todoId: string, taskId: string, newTitle: string) => void
  changeTodoTitle: (todoId: string, newTitle: string) => void
}

const TodoList = (props: Props) => {
  const {
    id,
    title,
    tasks,
    filter,
    addNewTask,
    removeTask,
    removeTodo,
    changeStatus,
    changeFilter,
    changeTaskTitle,
    changeTodoTitle,
  } = props

  const addTask = (title: string) => {
    addNewTask(id, title)
  }

  const onChangeTodoTitleChange = (title: string) => changeTodoTitle(id, title)
  const onDeleteTodoButtonClick = () => removeTodo(id)
  const onChangeAllFilterButtonClick = () => changeFilter(id, 'all')
  const onChangeActiveFilterButtonClick = () => changeFilter(id, 'active')
  const onChangeCompletedFilterButtonClick = () => changeFilter(id, 'completed')

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
        {tasks.map(({ id: taskId, title, isDone }) => {
          const onChangeStatusCheckboxCheck = () => changeStatus(id, taskId)
          const onRemoveTaskButtonClick = () => removeTask(id, taskId)
          const onChangeInputValueChange = (newValue: string) => changeTaskTitle(id, taskId, newValue)

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