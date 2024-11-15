import React, { useState } from "react";
import { Container, Button, Form } from "react-bootstrap";
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState(null);
  const [filter, setFilter] = useState({ priority: "", status: "" });

  const handleShowForm = () => setShowForm(true);
  const handleCloseForm = () => {
    setShowForm(false);
    setTaskToEdit(null);
  };

  const addTask = (task) => {
    setTasks([...tasks, { ...task, id: Date.now() }]);
  };

  const editTask = (updateTask) => {
    setTasks(tasks.map(task => (task.id === updateTask.id ? updateTask : task)));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const showEditForm = (task) => {
    setTaskToEdit(task);
    handleShowForm();
  };

  const handleFilterChange = (e) => {
    setFilter({ ...filter, [e.target.name]: e.target.value });
  };

  const filteredTasks = tasks.filter(task => {
    return (
      (filter.priority === "" || task.priority === filter.priority) &&
      (filter.status === "" || task.status === filter.status)
    );
  });

  return (
    <div className="App">
      <Container className="py-5">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h1>Task List</h1>
          <Button variant="primary" onClick={handleShowForm}>+ Add Task</Button>
        </div>

        {/* Filter Section */}
        <div className="mb-4">
          <Form>
            <div className="d-flex gap-3">
              <Form.Group>
                <Form.Label>Priority</Form.Label>
                <Form.Control as="select" name="priority" onChange={handleFilterChange}>
                  <option value="">All</option>
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="Hard">Hard</option>
                </Form.Control>
              </Form.Group>
              <Form.Group>
                <Form.Label>Status</Form.Label>
                <Form.Control as="select" name="status" onChange={handleFilterChange}>
                  <option value="">All</option>
                  <option value="To Do">To Do</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Done">Done</option>
                </Form.Control>
              </Form.Group>
            </div>
          </Form>
        </div>

        {/* Task List */}
        <div className="mt-4">
          <TaskList tasks={filteredTasks} deleteTask={deleteTask} showEditForm={showEditForm} />
          <TaskForm
            show={showForm}
            handleClose={handleCloseForm}
            addTask={addTask}
            editTask={editTask}
            taskToEdit={taskToEdit} />
        </div>
      </Container>
    </div>
  );
}

export default App;
