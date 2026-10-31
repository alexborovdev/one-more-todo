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

  const activateEditMode = () => {
    setEditMode(true)
    setInputValue(title)
  }
  const activateViewMode = () => {
    const newTitle = inputValue.trim()

    if (newTitle && newTitle !== title) {
      onChange(newTitle)
    }

    setEditMode(false)
  }

  const onInputValueChange = (e: ChangeEvent<HTMLInputElement>) => setInputValue(e.currentTarget.value)

  return !editMode ?
    <span onDoubleClick={activateEditMode}>{title}</span> :
    <input
      value={inputValue}
      autoFocus={true}
      onChange={onInputValueChange}
      onBlur={activateViewMode}
    />
}

export default EditableSpan