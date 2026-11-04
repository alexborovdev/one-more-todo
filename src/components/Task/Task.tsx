import { memo, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Checkbox, IconButton } from '@mui/material'
import { Delete } from '@mui/icons-material'
import type { RootState } from '@/app/store'
import { changeTaskStatusAC, changeTaskTitleAC, removeTaskAC } from '@/state/tasksReducer'
import EditableSpan from '@/components/EditableSpan'

type Props = {
  todoId: string
  taskId: string
}

const Task = memo((props: Props) => {
  console.log('Task has been called')

  const {
    todoId,
    taskId
  } = props

  const dispatch = useDispatch()

  const task = useSelector((state: RootState) =>
    state.tasks[todoId]?.find(task => task.id === taskId)
  )

  const changeTitle = useCallback((title: string) => {
    dispatch(changeTaskTitleAC(todoId, taskId, title))
  }, [dispatch, todoId, taskId])

  if (!task) return null

  return (
    <li>
      <Checkbox
        checked={task.isDone}
        onChange={() => dispatch(changeTaskStatusAC(todoId, taskId))}
      />

      <EditableSpan
        title={task.title}
        onChange={changeTitle}
      />

      <IconButton
        onClick={() => dispatch(removeTaskAC(todoId, taskId))}
      >
        <Delete />
      </IconButton>
    </li>
  )
})

export default Task