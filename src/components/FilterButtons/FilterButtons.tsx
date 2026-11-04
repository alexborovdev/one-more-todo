import { useDispatch, useSelector } from 'react-redux'
import { Button } from '@mui/material'
import type { Filter } from '@/types/todo'
import type { RootState } from '@/app/store'
import { changeTodoFilterAC } from '@/state/todoListsReducer'

type Props = {
  todoId: string
}

const FilterButtons = (props: Props) => {
  const { todoId } = props

  console.log('FilterButtons has been called')

  const dispatch = useDispatch()

  const filter = useSelector((state: RootState) =>
    state.todoLists.find(todo => todo.id === todoId)?.filter
  )

  const changeFilter = (filter: Filter) => {
    dispatch(changeTodoFilterAC(todoId, filter))
  }

  return (
    <div>
      <Button variant={filter === 'all' ? 'contained' : 'text'}
              color="success"
              type="button"
              onClick={() => changeFilter('all')}>
        All
      </Button>
      <Button variant={filter === 'active' ? 'contained' : 'text'}
              color="primary"
              type="button"
              onClick={() => changeFilter('active')}>
        Active
      </Button>
      <Button variant={filter === 'completed' ? 'contained' : 'text'}
              color="secondary"
              type="button"
              onClick={() => changeFilter('completed')}>
        Completed
      </Button>
    </div>
  )
}

export default FilterButtons