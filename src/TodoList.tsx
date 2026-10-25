import { type ChangeEvent, type KeyboardEvent, useState } from 'react'
import type { Tasks, Filters } from './App'

type Props = {
  title: string
  tasks: Tasks
  addNewTask: (title: string) => void
  changeStatus: (id: string) => void
  removeTask: (id: string) => void
  changeFilter: (value: Filters) => void
}

const TodoList = (props: Props) => {
  const {
    title,
    tasks,
    addNewTask,
    changeStatus,
    removeTask,
    changeFilter
  } = props

  const [newTaskTitle, setNewTaskTitle] = useState('')

  const addNewTaskHandler = () => {
    const title = newTaskTitle.trim()

    if (!title) {
      return
    }

    addNewTask(title)
    setNewTaskTitle('')
  }

  const onNewTaskInputChange = (e: ChangeEvent<HTMLInputElement>) => setNewTaskTitle(e.currentTarget.value)
  const onNewTaskInputKeyDown = (e: KeyboardEvent<HTMLInputElement>) => e.key === 'Enter' && addNewTaskHandler()
  const onAddNewTaskButtonClick = () => addNewTaskHandler()
  const onChangeAllFilterButtonClick = () => changeFilter('all')
  const onChangeActiveFilterButtonClick = () => changeFilter('active')
  const onChangeCompletedFilterButtonClick = () => changeFilter('completed')

  return (
    <div>
      <h3>{title}</h3>
      <div>
        <input value={newTaskTitle}
               onChange={onNewTaskInputChange}
               onKeyDown={onNewTaskInputKeyDown}
        />
        <button type="button"
                onClick={onAddNewTaskButtonClick}>
          +
        </button>
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
                <span>{title}</span>
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
                onClick={onChangeAllFilterButtonClick}>
          All
        </button>
        <button type="button"
                onClick={onChangeActiveFilterButtonClick}>
          Active
        </button>
        <button type="button"
                onClick={onChangeCompletedFilterButtonClick}>
          Completed
        </button>
      </div>
    </div>
  )
}

export default TodoList