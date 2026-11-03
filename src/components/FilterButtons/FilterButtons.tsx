import { Button } from '@mui/material'
import type { Filter } from '@/types/todo'

type Props = {
  filter: Filter
  changeFilterButtonClick: (filter: Filter) => void
}

const FilterButtons = (props: Props) => {
  const {
    filter,
    changeFilterButtonClick
  } = props

  return (
    <div>
      <Button variant={filter === 'all' ? 'contained' : 'text'}
              color="success"
              type="button"
              onClick={() => changeFilterButtonClick('all')}>
        All
      </Button>
      <Button variant={filter === 'active' ? 'contained' : 'text'}
              color="primary"
              type="button"
              onClick={() => changeFilterButtonClick('active')}>
        Active
      </Button>
      <Button variant={filter === 'completed' ? 'contained' : 'text'}
              color="secondary"
              type="button"
              onClick={() => changeFilterButtonClick('completed')}>
        Completed
      </Button>
    </div>
  )
}

export default FilterButtons