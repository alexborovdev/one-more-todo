import type { TasksByTodoId } from '@/types/todo'

type Action = ReturnType<typeof removeTaskAC>

export const removeTaskAC = (todoId: string, taskId: string) => ({
  type: 'REMOVE_TASK' as const,
  todoId,
  taskId
})

const taskReducer = (state: TasksByTodoId, action: Action): TasksByTodoId => {
  switch (action.type) {
    case 'REMOVE_TASK': {
      return {
        ...state,
        [action.todoId]: state[action.todoId].filter(task => task.id !== action.taskId)
      }
    }

    default:
      throw new Error('Invalid action type')
  }
}

export default taskReducer