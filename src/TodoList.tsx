import { type ChangeEvent, type KeyboardEvent, useState } from 'react'
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

  const [newTaskTitle, setNewTaskTitle] = useState('')
  const [isError, setIsError] = useState(false)

  const addNewTaskHandler = () => {
    const title = newTaskTitle.trim()

    if (!title) {
      setIsError(true)
      return
    }

    setIsError(false)
    addNewTask(id, title)
    setNewTaskTitle('')
  }

  const onNewTaskInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.currentTarget.value.trim() && setIsError(false)
    setNewTaskTitle(e.currentTarget.value)
  }
  const onNewTaskInputKeyDown = (e: KeyboardEvent<HTMLInputElement>) => e.key === 'Enter' && addNewTaskHandler()
  const onAddNewTaskButtonClick = () => addNewTaskHandler()
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
      <div>
        <input className={isError ? 'error' : ''}
               value={newTaskTitle}
               onChange={onNewTaskInputChange}
               onKeyDown={onNewTaskInputKeyDown}
        />
        <button type="button"
                onClick={onAddNewTaskButtonClick}>
          +
        </button>
        {isError &&
          <div className="error-message">
            Title is required
          </div>}
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
      </div>
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