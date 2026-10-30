import AddItemForm from './AddItemForm'
import type { Tasks, Filters } from './App'

type Props = {
  id: string
  title: string
  tasks: Tasks
  addNewTask: (todoId: string, title: string) => void
  changeStatus: (todoId: string, taskId: string) => void
  removeTask: (todoId: string, taskId: string) => void
  removeTodo: (todoId: string) => void
  changeFilter: (todoId: string, value: Filters) => void
  filter: Filters
}

const TodoList = (props: Props) => {
  const {
    id,
    title,
    tasks,
    addNewTask,
    changeStatus,
    removeTask,
    removeTodo,
    changeFilter,
    filter
  } = props

  const onDeleteTodoButtonClick = () => removeTodo(id)
  const onChangeAllFilterButtonClick = () => changeFilter(id, 'all')
  const onChangeActiveFilterButtonClick = () => changeFilter(id, 'active')
  const onChangeCompletedFilterButtonClick = () => changeFilter(id, 'completed')

  return (
    <div>
      <h3>
        {title}
        <button type="button"
                onClick={onDeleteTodoButtonClick}>
          X
        </button>
      </h3>
      <AddItemForm
        id={id}
        addNewTask={addNewTask}
      />
      <ul>
        {tasks.map(({ id: taskId, title, isDone }) => {
          const onChangeStatusCheckboxCheck = () => changeStatus(id, taskId)
          const onRemoveTaskButtonClick = () => removeTask(id, taskId)

          return (
            <li key={taskId}>
              <input type="checkbox"
                     checked={isDone}
                     onChange={onChangeStatusCheckboxCheck}
              />
              <span className={isDone ? 'is-done' : ''}>
                  {title}
                </span>
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