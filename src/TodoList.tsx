import { useState } from 'react'
import type { Tasks, Filters } from './App'

type Props = {
  title: string
  tasks: Tasks
  addTask: (title: string) => void
  removeTask: (id: string) => void
  changeFilter: (value: Filters) => void
}

const TodoList = (props: Props) => {
  const {
    title,
    tasks,
    addTask,
    removeTask,
    changeFilter
  } = props

  const [newTaskTitle, setNewTaskTitle] = useState<string>('')

  return (
    <div>
      <h3>{title}</h3>
      <div>
        <input value={newTaskTitle}
               onChange={({ currentTarget }) => setNewTaskTitle(currentTarget.value)}
               onKeyDown={({ key }) => {
                 if (key === 'Enter') {
                   addTask(newTaskTitle)
                   setNewTaskTitle('')
                 }
               }}
        />
        <button type="button"
                onClick={() => {
                  addTask(newTaskTitle)
                  setNewTaskTitle('')
                }}>
          +
        </button>
        <ul>
          {tasks.map(({ id, title, isDone }) =>
            <li key={id}>
              <input type="checkbox" checked={isDone} />
              <span>{title}</span>
              <button type="button"
                      onClick={() => removeTask(id)}>
                X
              </button>
            </li>)}
        </ul>
      </div>
      <div>
        <button type="button"
                onClick={() => changeFilter('all')}>
          All
        </button>
        <button type="button"
                onClick={() => changeFilter('active')}>
          Active
        </button>
        <button type="button"
                onClick={() => changeFilter('completed')}>
          Completed
        </button>
      </div>
    </div>
  )
}

export default TodoList