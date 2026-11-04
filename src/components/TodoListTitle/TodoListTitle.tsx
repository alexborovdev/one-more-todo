import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { IconButton } from '@mui/material'
import { Delete } from '@mui/icons-material'
import type { RootState } from '@/app/store'
import { changeTodoTitleAC, removeTodoAC } from '@/state/todoListsReducer'
import EditableSpan from '@/components/EditableSpan'

type Props = {
  todoId: string
}

const TodoListTitle = ({ todoId }: Props) => {
  console.log('TodoListTitle has been called')

  const dispatch = useDispatch()

  const title = useSelector((state: RootState) =>
    state.todoLists.find(todo => todo.id === todoId)?.title
  )

  const changeTitle = useCallback((title: string) => {
    dispatch(changeTodoTitleAC(todoId, title))
  }, [dispatch, todoId])

  if (title === undefined) return null

  return (
    <h3>
      <EditableSpan title={title} onChange={changeTitle} />
      <IconButton onClick={() => dispatch(removeTodoAC(todoId))}>
        <Delete />
      </IconButton>
    </h3>
  )
}

export default TodoListTitle