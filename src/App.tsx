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
type Todo = {
  id: string
  title: string
  filter: Filters
}
type TasksByTodoId = Record<string, Tasks>

const todoListId1 = crypto.randomUUID()
const todoListId2 = crypto.randomUUID()

const App = () => {
  const [todoLists, setTodoLists] = useState<Todo[]>([
    {
      id: todoListId1,
      title: 'What to learn',
      filter: 'all'
    },
    {
      id: todoListId2,
      title: 'What to buy',
      filter: 'all'
    }
  ])
  const [tasks, setTasks] = useState<TasksByTodoId>({
    [todoListId1]: [
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
      }
    ],
    [todoListId2]: [
      {
        id: crypto.randomUUID(),
        title: 'Apples',
        isDone: true
      },
      {
        id: crypto.randomUUID(),
        title: 'Bananas',
        isDone: false
      },
      {
        id: crypto.randomUUID(),
        title: 'Potatoes',
        isDone: false
      }
    ]
  })

  const addNewTask = (todoId: string, title: string) => {
    const newTask: Task = {
      id: crypto.randomUUID(),
      title,
      isDone: false
    }

    setTasks(prevState => ({
      ...prevState,
      [todoId]: [newTask, ...prevState[todoId]]
    }))
  }
  const changeStatus = (todoId: string, taskId: string) => {
    setTasks(prevState => ({
      ...prevState,
      [todoId]: prevState[todoId].map(task =>
        task.id === taskId
          ? { ...task, isDone: !task.isDone }
          : task
      )
    }))
  }
  const removeTask = (todoId: string, taskId: string) => {
    setTasks(prevState => ({
      ...prevState,
      [todoId]: prevState[todoId].filter(task => task.id !== taskId)
    }))
  }
  const removeTodo = (todoId: string) => {
    setTodoLists(prevState =>
      prevState.filter(({ id }) => id !== todoId)
    )

    setTasks(prevState => {
      const { [todoId]: removedTasks, ...remainingTasks } = prevState

      return remainingTasks
    })
  }
  const changeFilter = (id: string, value: Filters) => {
    setTodoLists(prevState =>
      prevState.map(todoList =>
        todoList.id === id
          ? { ...todoList, filter: value }
          : todoList
      )
    )
  }

  return (
    <div className="App">
      {todoLists.map(({ id, title, filter }) => {
        const filteredTasks = tasks[id].filter(task => {
          if (filter === 'active') return !task.isDone
          if (filter === 'completed') return task.isDone
          return true
        })

        return (
          <TodoList
            key={id}
            id={id}
            title={title}
            tasks={filteredTasks}
            addNewTask={addNewTask}
            changeStatus={changeStatus}
            removeTask={removeTask}
            removeTodo={removeTodo}
            changeFilter={changeFilter}
            filter={filter}
          />
        )
      })}

    </div>
  )
}

export default App