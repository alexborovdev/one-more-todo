import { type ChangeEvent, type KeyboardEvent, useState } from 'react'

type Props = {
  id: string
  addNewTask: (todoId: string, title: string) => void
}

const AddItemForm = (props: Props) => {
  const {
    id,
    addNewTask
  } = props

  const [newTaskTitle, setNewTaskTitle] = useState('')
  const [isError, setIsError] = useState(false)

  const addNewTaskHandler = () => {
    const title = newTaskTitle.trim()

    if (!title) {
      setIsError(true)
      return
    }

    setIsError(false)
    addNewTask(id, title)
    setNewTaskTitle('')
  }

  const onNewTaskInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.currentTarget.value.trim() && setIsError(false)
    setNewTaskTitle(e.currentTarget.value)
  }
  const onNewTaskInputKeyDown = (e: KeyboardEvent<HTMLInputElement>) => e.key === 'Enter' && addNewTaskHandler()
  const onAddNewTaskButtonClick = () => addNewTaskHandler()

  return (
    <div>
      <input className={isError ? 'error' : ''}
             value={newTaskTitle}
             onChange={onNewTaskInputChange}
             onKeyDown={onNewTaskInputKeyDown}
      />
      <button type="button"
              onClick={onAddNewTaskButtonClick}>
        +
      </button>
      {isError &&
        <div className="error-message">
          Title is required
        </div>}
    </div>
  )
}

export default AddItemForm