import { type ChangeEvent, type KeyboardEvent, useState } from 'react'
import type { Tasks, Filters } from './App'

type Props = {
  title: string
  tasks: Tasks
  addNewTask: (title: string) => void
  removeTask: (id: string) => void
  changeFilter: (value: Filters) => void
}

const TodoList = (props: Props) => {
  const {
    title,
    tasks,
    addNewTask,
    removeTask,
    changeFilter
  } = props

  const [newTaskTitle, setNewTaskTitle] = useState('')

  const addNewTaskHandler = () => {
    addNewTask(newTaskTitle)
    setNewTaskTitle('')
  }

  const onNewTaskInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setNewTaskTitle(event.currentTarget.value)
  }
  const onNewTaskInputKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      addNewTaskHandler()
    }
  }
  const onAddNewTaskButtonClick = () => {
    addNewTaskHandler()
  }
  const onRemoveTaskButtonClick = (id: string) => {
    removeTask(id)
  }
  const onChangeAllFilterButtonClick = () => {
    changeFilter('all')
  }
  const onChangeActiveFilterButtonClick = () => {
    changeFilter('active')
  }
  const onChangeCompletedFilterButtonClick = () => {
    changeFilter('completed')
  }

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
          {tasks.map(({ id, title, isDone }) =>
            <li key={id}>
              <input type="checkbox" checked={isDone} />
              <span>{title}</span>
              <button type="button"
                      onClick={() => onRemoveTaskButtonClick(id)}>
                X
              </button>
            </li>)}
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