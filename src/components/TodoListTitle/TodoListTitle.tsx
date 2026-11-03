import { IconButton } from '@mui/material'
import { Delete } from '@mui/icons-material'
import EditableSpan from '@/components/EditableSpan'

type Props = {
  title: string
  onChangeTodoTitleChange: (title: string) => void
  onDeleteTodoButtonClick: () => void
}

const TodoListTitle = (props: Props) => {
  const {
    title,
    onChangeTodoTitleChange,
    onDeleteTodoButtonClick
  } = props

  return (
    <h3>
      <EditableSpan
        title={title}
        onChange={onChangeTodoTitleChange}
      />
      <IconButton
        type="button"
        onClick={onDeleteTodoButtonClick}>
        <Delete />
      </IconButton>
    </h3>
  )
}

export default TodoListTitle