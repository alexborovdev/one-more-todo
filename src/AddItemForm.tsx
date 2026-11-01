import { useState, type ChangeEvent, type KeyboardEvent } from 'react'
import { IconButton, TextField } from '@mui/material'
import { ControlPoint } from '@mui/icons-material'

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
      <TextField
        variant="standard"
        label="Enter value"
        error={!!isError}
        helperText={isError}
        value={newItemTitle}
        onChange={onItemInputChange}
        onKeyDown={onItemInputKeyDown}
      />
      <IconButton
        color="primary"
        type="button"
        onClick={onAddItemButtonClick}>
        <ControlPoint />
      </IconButton>
    </div>
  )
}

export default AddItemForm