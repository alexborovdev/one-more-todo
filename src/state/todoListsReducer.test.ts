import { expect, test } from 'vitest'
import type { Todos } from '@/types/todo'
import todoListsReducer, { type Action } from './todoListsReducer'

const createInitialState = (): Todos => [
  {
    id: 'todo-1',
    title: 'What to learn',
    filter: 'all'
  },
  {
    id: 'todo-2',
    title: 'What to buy',
    filter: 'all'
  }
]

test('adds a new todo list', () => {
  const newTodoListTitle = 'New Todo List'

  const action = {
    type: 'ADD_TODO',
    title: newTodoListTitle
  } satisfies Action

  const startState = createInitialState()
  const endState = todoListsReducer(startState, action)

  expect(endState.slice(1)).toEqual(startState)
  expect(endState).toHaveLength(3)
  expect(endState[0]).toEqual({
    id: expect.any(String),
    title: newTodoListTitle,
    filter: 'all'
  })
  expect(startState).toHaveLength(2)
  expect(endState).not.toBe(startState)
})
test('removes the specified todo list', () => {
  const action = {
    type: 'REMOVE_TODO',
    id: 'todo-1'
  } satisfies Action

  const startState = createInitialState()
  const endState = todoListsReducer(startState, action)

  expect(endState).toEqual([startState[1]])
  expect(startState).toHaveLength(2)
  expect(endState).not.toBe(startState)
})
test('changes the specified todo list title', () => {
  const newTodoListTitle = 'New Todo List'

  const action = {
    type: 'CHANGE_TODO_TITLE',
    id: 'todo-1',
    title: newTodoListTitle
  } satisfies Action

  const startState = createInitialState()
  const endState = todoListsReducer(startState, action)

  expect(startState[0].title).toBe('What to learn')
  expect(endState[0]).not.toBe(startState[0])
  expect(endState[1]).toBe(startState[1])
  expect(endState).toHaveLength(2)
  expect(endState[0]).toEqual({
    ...startState[0],
    title: newTodoListTitle
  })
  expect(endState).not.toBe(startState)
})
test('changes the specified todo list filter', () => {
  const newTodoListFilter = 'active'

  const action = {
    type: 'CHANGE_TODO_FILTER',
    id: 'todo-1',
    filter: newTodoListFilter
  } satisfies Action

  const startState = createInitialState()
  const endState = todoListsReducer(startState, action)

  expect(startState[0].filter).toBe('all')
  expect(endState[0]).not.toBe(startState[0])
  expect(endState[1]).toBe(startState[1])
  expect(endState).toHaveLength(2)
  expect(endState[0]).toEqual({
    ...startState[0],
    filter: newTodoListFilter
  })
  expect(endState).not.toBe(startState)
})