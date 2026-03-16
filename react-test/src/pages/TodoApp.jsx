import { useState } from 'react';

function TodoApp() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState('');
  const [editIndex, setEditIndex] = useState(-1);

  const addTask = () => {
    if (input.trim() === '') return;

    if (editIndex !== -1) {
      const updatedTasks = [...tasks];
      updatedTasks[editIndex] = { text: input };
      setTasks(updatedTasks);
      setEditIndex(-1);
    } else {
      setTasks([...tasks, { text: input }]);
    }
    setInput('');
  };

  const handleEdit = (index) => {
    setInput(tasks[index].text);
    setEditIndex(index);
  };

  const handleDelete = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
    if (editIndex === index) {
      setEditIndex(-1);
      setInput('');
    }
  };

  return (
    <div className="todo-app-container">
      <h2>Todo App</h2>
      <div className="input-group">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter Task"
          onKeyDown={(e) => {
            if (e.key === 'Enter') addTask();
          }}
        />
        <button onClick={addTask}>{editIndex !== -1 ? 'Update' : 'Add'}</button>
      </div>

      <ul>
        {tasks.map((task, index) => (
          <li key={index} className="task-item">
            <span className="task-text">{task.text}</span>
            <div className="action-buttons">
              <button onClick={() => handleEdit(index)}>Edit</button>
              <button onClick={() => handleDelete(index)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoApp;
