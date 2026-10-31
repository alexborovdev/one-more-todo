import AddItemForm from './AddItemForm'
import EditableSpan from './EditableSpan'
import type { Tasks, Filters } from './App'

type Props = {
  id: string
  title: string
  tasks: Tasks
  filter: Filters
  addNewTask: (todoId: string, title: string) => void
  removeTask: (todoId: string, taskId: string) => void
  removeTodo: (todoId: string) => void
  changeStatus: (todoId: string, taskId: string) => void
  changeFilter: (todoId: string, value: Filters) => void
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
        <button type="button"
                onClick={onDeleteTodoButtonClick}>
          X
        </button>
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
            <li key={taskId}>
              <input type="checkbox"
                     checked={isDone}
                     onChange={onChangeStatusCheckboxCheck}
              />
              <EditableSpan
                title={title}
                onChange={onChangeInputValueChange}
              />
              <button type="button"
                      onClick={onRemoveTaskButtonClick}>
                X
              </button>
            </li>
          )
        })}
      </ul>
      <div>
        <button type="button"
                className={filter === 'all' ? 'active-filter' : ''}
                onClick={onChangeAllFilterButtonClick}>
          All
        </button>
        <button type="button"
                className={filter === 'active' ? 'active-filter' : ''}
                onClick={onChangeActiveFilterButtonClick}>
          Active
        </button>
        <button type="button"
                className={filter === 'completed' ? 'active-filter' : ''}
                onClick={onChangeCompletedFilterButtonClick}>
          Completed
        </button>
      </div>
    </div>
  )
}

export default TodoList