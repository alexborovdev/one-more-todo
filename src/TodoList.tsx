import type { TasksType } from './App'

type PropsType = {
  title: string
  tasks: TasksType
}

const TodoList = (props: PropsType) => {
  const { title, tasks } = props

  return (
    <div>
      <h3>{title}</h3>
      <div>
        <input />
        <button type="button">+</button>
        <ul>
          <li><input type="checkbox" checked={tasks[0].isDone} /><span>{tasks[0].title}</span></li>
          <li><input type="checkbox" checked={tasks[1].isDone} /><span>{tasks[1].title}</span></li>
          <li><input type="checkbox" checked={tasks[2].isDone} /><span>{tasks[2].title}</span></li>
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