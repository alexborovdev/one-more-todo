import { useCallback, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Container, Grid } from '@mui/material'
import type { AppDispatch } from '@/app/store'
import { addTodoAC } from '@/state/todoListsReducer'
import { fetchTodos } from '@/state/todoListsThunks'
import Header from '@/components/Header'
import AddItemForm from '@/components/AddItemForm'
import TodoLists from '@/components/TodoLists'
import './App.css'

const App = () => {
  console.log('App has been called')

  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    dispatch(fetchTodos())
  }, [dispatch])

  const addNewTodoList = useCallback((title: string) => {
    dispatch(addTodoAC(title))
  }, [dispatch])

  return (
    <>
      <Header />
      <main>
        <Container maxWidth="xl">
          <Grid container sx={{ py: 5 }}>
            <AddItemForm addNewItem={addNewTodoList} />
          </Grid>
          <Grid container spacing={6}>
            <TodoLists />
          </Grid>
        </Container>
      </main>
    </>
  )
}

export default App