const TodoList = () => {
  return (
    <div>
      <h3>What to learn</h3>
      <div>
        <input />
        <button type="button">+</button>
        <ul>
          <li><input type="checkbox" checked={true} /><span>CSS&HTML</span></li>
          <li><input type="checkbox" checked={true} /><span>JS</span></li>
          <li><input type="checkbox" checked={false} /><span>React</span></li>
        </ul>
      </div>
      <div>
        <button type="button">All</button>
        <button type="button">Active</button>
        <button type="button">Completed</button>
      </div>
    </div>
  )
}

export default TodoList