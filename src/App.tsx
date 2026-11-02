import { useDispatch, useSelector } from 'react-redux'
import { AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography } from '@mui/material'
import { Menu } from '@mui/icons-material'
import type { RootState } from '@/state/store'
import type { Filter } from '@/types/todo'
import { addTodoAC, changeTodoFilterAC, changeTodoTitleAC, removeTodoAC } from '@/state/todoListsReducer'
import { addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC } from '@/state/tasksReducer'
import AddItemForm from '@/AddItemForm'
import TodoList from '@/TodoList'
import '@/App.css'

const App = () => {
  const dispatch = useDispatch()
  const todoLists = useSelector((state: RootState) => state.todoLists)
  const tasks = useSelector((state: RootState) => state.tasks)

  const addNewTodoList = (title: string) => {
    dispatch(addTodoAC(title))
  }
  const removeTodoList = (todoId: string) => {
    dispatch(removeTodoAC(todoId))
  }
  const changeTodoTitle = (todoId: string, newTitle: string) => {
    dispatch(changeTodoTitleAC(todoId, newTitle))
  }
  const addNewTask = (todoId: string, title: string) => {
    dispatch(addTaskAC(todoId, title))
  }
  const removeTask = (todoId: string, taskId: string) => {
    dispatch(removeTaskAC(todoId, taskId))
  }
  const changeTaskTitle = (todoId: string, taskId: string, newTitle: string) => {
    dispatch(changeTaskTitleAC(todoId, taskId, newTitle))
  }
  const changeStatus = (todoId: string, taskId: string) => {
    dispatch(changeTaskStatusAC(todoId, taskId))
  }
  const changeFilter = (id: string, value: Filter) => {
    dispatch(changeTodoFilterAC(id, value))
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