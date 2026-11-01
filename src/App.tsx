import { useState } from 'react'
import { AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography } from '@mui/material'
import { Menu } from '@mui/icons-material'
import type { Task, Filter, Todo, TasksByTodoId } from './types/todo'
import AddItemForm from './AddItemForm'
import TodoList from './TodoList'
import './App.css'

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

  const addNewTodoList = (title: string) => {
    const todo: Todo = {
      id: crypto.randomUUID(),
      title,
      filter: 'all'
    }

    setTodoLists(prevState => [todo, ...prevState])
    setTasks(prevState => ({ ...prevState, [todo.id]: [] }))
  }
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
  const changeFilter = (id: string, value: Filter) => {
    setTodoLists(prevState =>
      prevState.map(todoList =>
        todoList.id === id
          ? { ...todoList, filter: value }
          : todoList
      )
    )
  }

  const changeTaskTitle = (todoId: string, taskId: string, newTitle: string) => {
    setTasks(prevState => ({
      ...prevState,
      [todoId]: prevState[todoId].map(task =>
        task.id === taskId
          ? { ...task, title: newTitle }
          : task
      )
    }))
  }
  const changeTodoTitle = (todoId: string, newTitle: string) => {
    setTodoLists(prevState =>
      prevState.map(todo =>
        todo.id === todoId
          ? { ...todo, title: newTitle }
          : todo
      )
    )
  }

  return (
    <div className="App">
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
          >
            <Menu />
          </IconButton>
          <Typography variant="h6">
            News
          </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
      <Container fixed>
        <Grid
          container
          style={{ padding: '20px' }}
        >
          <AddItemForm
            addNewItem={addNewTodoList}
          />
        </Grid>
        <Grid
          container
          spacing={10}
        >
          {todoLists.map(({ id, title, filter }) => {
            const filteredTasks = tasks[id].filter(task => {
              if (filter === 'active') return !task.isDone
              if (filter === 'completed') return task.isDone
              return true
            })

            return (
              <Grid>
                <Paper style={{ padding: '10px' }}>
                  <TodoList
                    key={id}
                    id={id}
                    title={title}
                    tasks={filteredTasks}
                    filter={filter}
                    addNewTask={addNewTask}
                    removeTask={removeTask}
                    removeTodo={removeTodo}
                    changeStatus={changeStatus}
                    changeFilter={changeFilter}
                    changeTaskTitle={changeTaskTitle}
                    changeTodoTitle={changeTodoTitle}
                  />
                </Paper>
              </Grid>
            )
          })}
        </Grid>
      </Container>
    </div>
  )
}

export default App