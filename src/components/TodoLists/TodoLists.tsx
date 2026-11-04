import { shallowEqual, useSelector } from 'react-redux'
import { Grid, Paper } from '@mui/material'
import type { RootState } from '@/app/store'
import TodoList from '@/components/TodoList'

const TodoLists = () => {
  console.log('TodoLists has been called')

  const todoIds = useSelector(
    (state: RootState) => state.todoLists.map(todo => todo.id),
    shallowEqual
  )

  return todoIds.map(id => (
    <Grid key={id}>
      <Paper sx={{ p: 1.25 }}>
        <TodoList id={id} />
      </Paper>
    </Grid>
  ))
}

export default TodoLists