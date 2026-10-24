import TodoList from './TodoList'
import './App.css'

type TaskType = {
  id: string
  title: string
  isDone: boolean
}

export type TasksType = Array<TaskType>

const App = () => {
  const technologies: TasksType = [
    {
      id: crypto.randomUUID(),
      title: 'HTML&CSS',
      isDone: true
    },
    {
      id: crypto.randomUUID(),
      title: 'JS',
      isDone: true
    },
    {
      id: crypto.randomUUID(),
      title: 'React',
      isDone: false
    }
  ]

  const movies: TasksType = [
    {
      id: crypto.randomUUID(),
      title: 'American Pie',
      isDone: true
    },
    {
      id: crypto.randomUUID(),
      title: 'Superbad',
      isDone: false
    },
    {
      id: crypto.randomUUID(),
      title: '21 Jump Street',
      isDone: true
    }
  ]

  return (
    <div className="App">
      <TodoList title="What to learn" tasks={technologies} />
      <TodoList title="Movies" tasks={movies} />
    </div>
  )
}

export default App