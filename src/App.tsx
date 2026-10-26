import { useState } from 'react'
import TodoList from './TodoList'
import './App.css'

type Task = {
  id: string
  title: string
  isDone: boolean
}
export type Tasks = Array<Task>
export type Filters = 'all' | 'completed' | 'active'

const App = () => {
  const [tasks, setTasks] = useState<Tasks>([
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
      isDone: true
    },
    {
      id: crypto.randomUUID(),
      title: 'Redux',
      isDone: false
    },
    {
      id: crypto.randomUUID(),
      title: 'Rest API',
      isDone: false
    },
    {
      id: crypto.randomUUID(),
      title: 'GraphQL',
      isDone: false
    },
    {
      id: crypto.randomUUID(),
      title: 'Web Socket',
      isDone: false
    },
  ])
  const [filter, setFilter] = useState<Filters>('all')
  const filteredTasks = tasks.filter(task => {
    if (filter === 'active') return !task.isDone
    if (filter === 'completed') return task.isDone
    return true
  })

  const addNewTask = (title: string) => {
    const newTask: Task = {
      id: crypto.randomUUID(),
      title,
      isDone: false
    }

    setTasks(prevState => [newTask, ...prevState])
  }
  const changeStatus = (id: string) => {
    setTasks(prevState => prevState.map(task => task.id === id
        ? { ...task, isDone: !task.isDone }
        : task
      )
    )
  }
  const removeTask = (id: string) => setTasks(prevState => prevState.filter(task => task.id !== id))
  const changeFilter = (value: Filters) => setFilter(value)

  return (
    <div className="App">
      <TodoList
        title="What to learn"
        tasks={filteredTasks}
        addNewTask={addNewTask}
        changeStatus={changeStatus}
        removeTask={removeTask}
        changeFilter={changeFilter}
        filter={filter}
      />
    </div>
  )
}

export default App