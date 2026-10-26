import { type ChangeEvent, type KeyboardEvent, useState } from 'react'
import type { Tasks, Filters } from './App'

type Props = {
  title: string
  tasks: Tasks
  addNewTask: (title: string) => void
  changeStatus: (id: string) => void
  removeTask: (id: string) => void
  changeFilter: (value: Filters) => void
  filter: Filters
}

const TodoList = (props: Props) => {
  const {
    title,
    tasks,
    addNewTask,
    changeStatus,
    removeTask,
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
    addNewTask(title)
    setNewTaskTitle('')
  }

  const onNewTaskInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.currentTarget.value.trim() && setIsError(false)
    setNewTaskTitle(e.currentTarget.value)
  }
  const onNewTaskInputKeyDown = (e: KeyboardEvent<HTMLInputElement>) => e.key === 'Enter' && addNewTaskHandler()
  const onAddNewTaskButtonClick = () => addNewTaskHandler()
  const onChangeAllFilterButtonClick = () => changeFilter('all')
  const onChangeActiveFilterButtonClick = () => changeFilter('active')
  const onChangeCompletedFilterButtonClick = () => changeFilter('completed')

  return (
    <div>
      <h3>{title}</h3>
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
          {tasks.map(({ id, title, isDone }) => {
            const onChangeStatusCheckboxCheck = () => changeStatus(id)
            const onRemoveTaskButtonClick = () => removeTask(id)

            return (
              <li key={id}>
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