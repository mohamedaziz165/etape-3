import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [status, setStatus] = useState('Pending');
  const [deadline, setDeadline] = useState('');

  useEffect(() => {
    // Fetch tasks when the component mounts
    axios.get('http://localhost:3000/api/tasks')
      .then(response => {
        setTasks(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the tasks!', error);
      });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newTask = { title, status, deadline };

    try {
      await axios.post('http://localhost:3000/api/tasks', newTask);
      setTasks([...tasks, newTask]); // Update the task list without refreshing
      setTitle('');
      setStatus('Pending');
      setDeadline('');
    } catch (error) {
      console.error('Error creating task:', error);
    }
  };

  return (
    <div className="App">
      <h1>Create New Task</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Task Title:
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Status:
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            required
          >
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </label>
        <br />
        <label>
          Deadline:
          <input
            type="date"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            required
          />
        </label>
        <br />
        <button type="submit">Create Task</button>
      </form>

      <h2>Task List</h2>
      {tasks.length > 0 ? (
        tasks.map((task, index) => (
          <div key={index} style={{ marginBottom: '10px', border: '1px solid #ccc', padding: '10px' }}>
            <h3>{task.title}</h3>
            <p>Status: {task.status}</p>
            <p>Deadline: {task.deadline}</p>
          </div>
        ))
      ) : (
        <p>No tasks available</p>
      )}
    </div>
  );
}

export default App;
