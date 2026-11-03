import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography } from '@mui/material'
import { Menu } from '@mui/icons-material'
import type { RootState } from '@/state/store'
import { addTodoAC } from '@/state/todoListsReducer'
import AddItemForm from '@/AddItemForm'
import TodoList from '@/TodoList'
import '@/App.css'

const App = () => {
  console.log('App has been called')

  const dispatch = useDispatch()
  const todoLists = useSelector((state: RootState) => state.todoLists)

  const addNewTodoList = useCallback((title: string) => {
    dispatch(addTodoAC(title))
  }, [dispatch])

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
          {todoLists.map(({ id }) => (
            <Grid key={id}>
              <Paper style={{ padding: '10px' }}>
                <TodoList id={id} />
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>
    </div>
  )
}

export default App