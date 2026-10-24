import { useState } from 'react'
import TodoList from './TodoList'
import './App.css'

type TaskType = {
  id: string
  title: string
  isDone: boolean
}

export type TasksType = Array<TaskType>

const App = () => {
  const [tasks, setTasks] = useState<TasksType>([
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
  ])

  const removeTask = (id: string) => setTasks(prevState => prevState.filter(task => task.id !== id))

  return (
    <div className="App">
      <TodoList
        title="What to learn"
        tasks={tasks}
        removeTask={removeTask}
      />
    </div>
  )
}

export default App