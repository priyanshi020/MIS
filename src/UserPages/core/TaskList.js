import React,{useState,useEffect} from 'react'

const TaskList = () => {
    const [taskInput, setTaskInput] = useState('');
    const [tasks, setTasks] = useState([]);
  
    const handleInputChange = (event) => {
      setTaskInput(event.target.value);
    };
  
    const handleAddTask = (event) => {
      event.preventDefault();
  
      if (taskInput.trim() !== '') {
        setTasks((prevTasks) => [...prevTasks, taskInput]);
        setTaskInput('');
      }
    };
  
    const handleRemoveTask = (index) => {
      const updatedTasks = tasks.filter((_, i) => i !== index);
      setTasks(updatedTasks);
    };
  return (
    <div className="mb-3 shadow shadow-lg rounded-5" style={{ maxWidth: "400px" }}>
    <div className="row g-0">
      <div className="card rounded-4" style={{ height: '388px' }}>
        <div className="card-body p-3">
          <h4 className="mb-3 text-center pb-3">DAILY TASK</h4>

          <form className="d-flex justify-content-center align-items-center mb-4">
            <div className="form-outline flex-fill">
              <input
                type="text"
                id="form3"
                className="form-control form-control-sm"
                value={taskInput}
                onChange={handleInputChange}
              />
            </div>
            <button
              type="submit"
              className="btn btn-primary btn-sm ms-2"
              onClick={handleAddTask}
            >
              Add
            </button>
          </form>

          <ul className="list-group mb-0">
            {tasks.map((task, index) => (
              <li
                key={index}
                className="list-group-item d-flex justify-content-between align-items-center border-start-0 border-top-0 border-end-0 border-bottom rounded-0 mb-2"
              >
                <div className="d-flex align-items-center">
                  <input
                    className="form-check-input me-2"
                    type="checkbox"
                    value=""
                    aria-label="..."
                  />
                  {task}
                </div>
                <button
                  type="button"
                  className="btn btn-link text-decoration-none"
                  onClick={() => handleRemoveTask(index)}
                >
                  ❌
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  </div>
  )
}

export default TaskList