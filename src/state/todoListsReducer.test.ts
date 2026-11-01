import { expect, test } from 'vitest'
import type { Todos } from '@/types/todo'
import todoListsReducer, { type Action } from './todoListsReducer'

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
test('adds a new todo list', () => {
  const todoListId1 = crypto.randomUUID()
  const todoListId2 = crypto.randomUUID()

  const newTodoListTitle = 'New Todo List'

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
    type: 'ADD_TODO',
    title: newTodoListTitle
  })

  expect(endState).toHaveLength(3)
  expect(endState[0]).toEqual({
    id: expect.any(String),
    title: newTodoListTitle,
    filter: 'all'
  })
  expect(startState).toHaveLength(2)
  expect(endState).not.toBe(startState)
})
test('changes the specified todo list title', () => {
  const todoListId1 = crypto.randomUUID()
  const todoListId2 = crypto.randomUUID()

  const newTodoListTitle = 'New Todo List'

  const action = {
    type: 'CHANGE_TODO_TITLE',
    id: todoListId1,
    title: newTodoListTitle
  } satisfies Action

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
  const endState = todoListsReducer(startState, action)

  expect(endState).toHaveLength(2)
  expect(endState[0]).toEqual({
    ...startState[0],
    title: newTodoListTitle
  })
  expect(endState[1]).toEqual(startState[1])
  expect(endState).not.toBe(startState)
})