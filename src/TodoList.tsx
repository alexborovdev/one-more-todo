import type { Tasks, Filters } from './App'

type PropsType = {
  title: string
  tasks: Tasks
  removeTask: (id: string) => void
  changeFilter: (value: Filters) => void
}

const TodoList = (props: PropsType) => {
  const {
    title,
    tasks,
    removeTask,
    changeFilter
  } = props

  return (
    <div>
      <h3>{title}</h3>
      <div>
        <input />
        <button type="button">+</button>
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