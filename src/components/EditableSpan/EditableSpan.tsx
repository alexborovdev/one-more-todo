import { memo, useState, type ChangeEvent, type KeyboardEvent } from 'react'
import { TextField } from '@mui/material'

type Props = {
  title: string
  onChange: (value: string) => void
}

const EditableSpan = memo((props: Props) => {
  const {
    title,
    onChange
  } = props

  console.log('EditableSpan has been called')

  const [editMode, setEditMode] = useState(false)
  const [inputValue, setInputValue] = useState(title)
  const [isError, setIsError] = useState(false)

  const activateEditMode = () => {
    setInputValue(title)
    setIsError(false)
    setEditMode(true)
  }
  const cancelEditMode = () => {
    setInputValue(title)
    setIsError(false)
    setEditMode(false)
  }
  const activateViewMode = () => {
    const newTitle = inputValue.trim()

    if (!newTitle) {
      setIsError(true)
      return
    }

    if (newTitle !== title) {
      onChange(newTitle)
    }

    setIsError(false)
    setEditMode(false)
  }

  const onInputValueChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value
    value.trim() && setIsError(false)
    setInputValue(value)
  }
  const onInputKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      activateViewMode()
    }

    if (e.key === 'Escape') {
      cancelEditMode()
    }
  }

  return !editMode ?
    <span onDoubleClick={activateEditMode}>
      {title}
    </span> :
    <TextField
      variant="standard"
      className={isError ? 'error' : ''}
      value={inputValue}
      autoFocus={true}
      onChange={onInputValueChange}
      onKeyDown={onInputKeyDown}
      onBlur={activateViewMode}
    />
})

export default EditableSpan