import type { TasksType } from './App'

type PropsType = {
  title: string
  tasks: TasksType
  removeTask: (id: string) => void
}

const TodoList = (props: PropsType) => {
  const {
    title,
    tasks,
    removeTask
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
        <button type="button">All</button>
        <button type="button">Active</button>
        <button type="button">Completed</button>
      </div>
    </div>
  )
}

export default TodoList