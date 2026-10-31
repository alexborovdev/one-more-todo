import { useState, type ChangeEvent } from 'react'

type Props = {
  title: string
  onChange: (value: string) => void
}

const EditableSpan = (props: Props) => {
  const {
    title,
    onChange
  } = props

  const [editMode, setEditMode] = useState(false)
  const [inputValue, setInputValue] = useState(title)
  const [isError, setIsError] = useState(false)

  const activateEditMode = () => {
    setInputValue(title)
    setIsError(false)
    setEditMode(true)
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

  return !editMode ?
    <span onDoubleClick={activateEditMode}>
      {title}
    </span> :
    <input
      className={isError ? 'error' : ''}
      value={inputValue}
      autoFocus={true}
      onChange={onInputValueChange}
      onBlur={activateViewMode}
    />
}

export default EditableSpan