import { useState, type ChangeEvent, type KeyboardEvent } from 'react'

type Props = {
  addNewItem: (title: string) => void
}

const AddItemForm = (props: Props) => {
  const { addNewItem } = props

  const [newItemTitle, setNewItemTitle] = useState('')
  const [isError, setIsError] = useState(false)

  const addNewItemHandler = () => {
    const title = newItemTitle.trim()

    if (!title) {
      setIsError(true)
      return
    }

    setIsError(false)
    addNewItem(title)
    setNewItemTitle('')
  }

  const onItemInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.currentTarget.value.trim() && setIsError(false)
    setNewItemTitle(e.currentTarget.value)
  }
  const onItemInputKeyDown = (e: KeyboardEvent<HTMLInputElement>) => e.key === 'Enter' && addNewItemHandler()
  const onAddItemButtonClick = () => addNewItemHandler()

  return (
    <div>
      <input className={isError ? 'error' : ''}
             value={newItemTitle}
             onChange={onItemInputChange}
             onKeyDown={onItemInputKeyDown}
      />
      <button type="button"
              onClick={onAddItemButtonClick}>
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