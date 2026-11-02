import { useReducer } from 'react'
import { AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography } from '@mui/material'
import { Menu } from '@mui/icons-material'
import type { Filter } from '@/types/todo'
import todoListsReducer, { addTodoAC, changeTodoFilterAC, changeTodoTitleAC, removeTodoAC } from '@/state/todoListsReducer'
import taskReducer, { addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC } from '@/state/taskReducer'
import AddItemForm from '@/AddItemForm'
import TodoList from '@/TodoList'
import '@/App.css'

const todoListId1 = crypto.randomUUID()
const todoListId2 = crypto.randomUUID()

const App = () => {
  const [todoLists, dispatchToTodoLists] = useReducer(todoListsReducer, [
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
  const [tasks, dispatchToTasks] = useReducer(taskReducer, {
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
    const action = addTodoAC(title)
    dispatchToTodoLists(action)
    dispatchToTasks(action)
  }
  const removeTodoList = (todoId: string) => {
    const action = removeTodoAC(todoId)
    dispatchToTodoLists(action)
    dispatchToTasks(action)
  }
  const changeTodoTitle = (todoId: string, newTitle: string) => {
    const action = changeTodoTitleAC(todoId, newTitle)
    dispatchToTodoLists(action)
  }
  const addNewTask = (todoId: string, title: string) => {
    const action = addTaskAC(todoId, title)
    dispatchToTasks(action)
  }
  const removeTask = (todoId: string, taskId: string) => {
    const action = removeTaskAC(todoId, taskId)
    dispatchToTasks(action)
  }
  const changeTaskTitle = (todoId: string, taskId: string, newTitle: string) => {
    const action = changeTaskTitleAC(todoId, taskId, newTitle)
    dispatchToTasks(action)
  }
  const changeStatus = (todoId: string, taskId: string) => {
    const action = changeTaskStatusAC(todoId, taskId)
    dispatchToTasks(action)
  }
  const changeFilter = (id: string, value: Filter) => {
    const action = changeTodoFilterAC(id, value)
    dispatchToTodoLists(action)
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
            const filteredTasks = (tasks[id] ?? []).filter(task => {
              if (filter === 'active') return !task.isDone
              if (filter === 'completed') return task.isDone
              return true
            })

            return (
              <Grid key={id}>
                <Paper style={{ padding: '10px' }}>
                  <TodoList
                    id={id}
                    title={title}
                    tasks={filteredTasks}
                    filter={filter}
                    removeTodoList={removeTodoList}
                    changeTodoTitle={changeTodoTitle}
                    addNewTask={addNewTask}
                    removeTask={removeTask}
                    changeTaskTitle={changeTaskTitle}
                    changeStatus={changeStatus}
                    changeFilter={changeFilter}
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