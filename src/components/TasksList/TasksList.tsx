import { useSelector } from 'react-redux'
import type { RootState } from '@/app/store'
import Task from '@/components/Task'

type Props = {
  todoId: string
}

const TasksList = (props: Props) => {
  const { todoId, } = props

  console.log('TasksList has been called')

  const tasks = useSelector((state: RootState) => state.tasks[todoId])

  const filter = useSelector(
    (state: RootState) =>
      state.todoLists.find(todo => todo.id === todoId)?.filter
  )

  const filteredTasks = tasks.filter(task => {
    if (filter === 'active') return !task.isDone
    if (filter === 'completed') return task.isDone
    return true
  })

  return (
    <ul>
      {filteredTasks.map(task => (
        <Task key={task.id} todoId={todoId} taskId={task.id} />
      ))}
    </ul>
  )
}

export default TasksList