import { expect, test } from 'vitest'
import type { TasksByTodoId } from '@/types/todo'
import taskReducer, { removeTaskAC } from './taskReducer'

const createInitialState = (): TasksByTodoId => (
  {
    'todo-1': [
      {
        id: 'task-1',
        title: 'Task 1',
        isDone: false
      },
      {
        id: 'task-2',
        title: 'Task 2',
        isDone: true
      }
    ],
    'todo-2': [
      {
        id: 'task-1',
        title: 'Task 3',
        isDone: true
      },
      {
        id: 'task-2',
        title: 'Task 4',
        isDone: false
      }
    ]
  }
)

test('removes the specified task from the specified todo list', () => {
  const action = removeTaskAC('todo-1', 'task-1')
  const startState = createInitialState()
  const endState = taskReducer(startState, action)

  expect(endState['todo-1']).toEqual([startState['todo-1'][1]])
  expect(endState['todo-2']).toEqual(startState['todo-2'])
  expect(endState).not.toBe(startState)
  expect(endState['todo-1']).not.toBe(startState['todo-1'])
  expect(endState['todo-2']).toBe(startState['todo-2'])
})