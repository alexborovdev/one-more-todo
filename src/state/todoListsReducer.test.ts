import { expect, test } from 'vitest'
import type { Todos } from '@/types/todo'
import todoListsReducer from './todoListsReducer'

test('removes the specified todo list', () => {
  const todoListId1 = crypto.randomUUID()
  const todoListId2 = crypto.randomUUID()

  const startState: Todos = [
    {
      id: todoListId1,
      title: 'What to learn',
      filter: 'all'
    },
    {
      id: todoListId2,
      title: 'What to buy',
      filter: 'all'
    },
  ]
  const endState = todoListsReducer(startState, {
    type: 'REMOVE_TODO',
    id: todoListId1
  })

  expect(endState).toEqual([startState[1]])
  expect(startState).toHaveLength(2)
  expect(endState).not.toBe(startState)
})