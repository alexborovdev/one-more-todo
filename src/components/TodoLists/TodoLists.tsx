import { Grid, Paper } from '@mui/material'
import { useSelector } from 'react-redux'
import type { RootState } from '@/app/store'
import TodoList from '@/components/TodoList'
import { memo } from 'react'

const TodoLists = memo(() => {
  console.log('TodoLists has been called')

  const todoLists = useSelector((state: RootState) => state.todoLists)

  return todoLists.map(({ id }) => (
    <Grid key={id}>
      <Paper style={{ padding: '10px' }}>
        <TodoList id={id} />
      </Paper>
    </Grid>
  ))
})

export default TodoLists