import React, { useEffect, useState } from 'react';
import './home-page.css';
import axios from 'axios';

export const HomePage = () => {
  const [data, setData] = useState([]);
  const [clickID, setClickID] = useState(null);
  const [search, setSearch] = useState('');
  const [newUserId, setNewUserId] = useState(11);
  const [inputValue, setInputValue] = useState('');
  const [taskUserId, setTaskUserId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('https://jsonplaceholder.typicode.com/todos');
        setData(res.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const addUser = async () => {
    const newUser = {
      userId: parseInt(newUserId),
      id: data.length + 1,
      title:'',
      completed: false,
    };
    try {
      const response = await axios.post('https://jsonplaceholder.typicode.com/todos', newUser);
      setData([...data, response.data]);
    } catch (error) {
      console.error('Error posting data:', error);
    }
  };

  const handleAddUser = () => {
    const maxUserId = uniqueUserIds.length > 0 ? Math.max(...uniqueUserIds) : 0;
    const nextUserId = maxUserId + 1;
    setNewUserId(nextUserId);
    addUser();
  };

  const deleteUser = (id) => {
    setData(data.filter(item => item.userId !== id));
  };

  const addTask = async () => {
    const newTask = {
      userId: parseInt(taskUserId),
      id: data.length + 1,
      title: inputValue,
      completed: false,
    };
    try {
      const response = await axios.post('https://jsonplaceholder.typicode.com/todos', newTask);
      setData([...data, response.data]);
    } catch (error) {
      console.error('Error posting task:', error);
    }
  };

  const taskData = data.filter(item => item.userId === clickID);

  const [uniqueUserIds, setUniqueUserIds] = useState([]);
  useEffect(() => {
    setUniqueUserIds(Array.from(new Set(data.map(item => item.userId))));
  }, [data]);
  
  const filteredUserIds = uniqueUserIds.filter((userId,index) => userId.toString().includes(search));

  const deleteTask = (id) => {
    setData(data.filter(item => item.id !== id))
  }

  return (
    <div className="container">
      <nav className="navbar nav">
        <div className="container-fluid nav">
          <a className="navbar-brand fw-bold">To-Dos</a>
          <form className="d-flex">
            <input
              onChange={(e) => setSearch(e.target.value)}
              className="form-control me-2"
              placeholder="Search"
              aria-label="Search"
            />
          </form>
        </div>
      </nav>
      <div style={{ height: '100vh' }} className="d-flex align-items-center gap-3 mt-3">
        <div className="board rounded p-2">
          <div className="taskBoard">
            <h1>Users</h1>
            <button onClick={handleAddUser} type="button" className="btn btn-success">
              + Users
            </button>
          </div>
          <ul>
            {filteredUserIds.map((userId,index) => (
              <li key={userId} onClick={() => setClickID(userId)}>
                <div className="d-flex justify-content-between align-items-center">
                  <span>{userId}. User</span>
                  <button onClick={() => deleteUser(userId)} className="btn btn-danger" type="button">
                    <span>
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash3-fill" viewBox="0 0 16 16">
                        <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06m6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528M8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5"/>
                      </svg>
                    </span>
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="task rounded p-2">
          <div className="taskNav">
            <h1>Assignments</h1>
            <button type="button" className="btn btn-success" data-bs-toggle="modal" data-bs-target="#exampleModal">
              + Assignments
            </button>
          </div>
          <div className="row">
            {taskData.map((item, index) => (
              <div key={item.id} className="boardUl d-flex align-items-center justify-content-between">
                <p>
                  <span className="fw-bold">{index + 1}. </span>
                  {item.title}
                </p>
                <div className="d-flex align-items-center gap-3">
                  {item.completed ? (
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-check2-circle text-success" viewBox="0 0 16 16">
                      <path d="M2.5 8a5.5 5.5 0 0 1 8.25-4.764.5.5 0 0 0 .5-.866A6.5 6.5 0 1 0 14.5 8a.5.5 0 0 0-1 0 5.5 5.5 0 1 1-11 0"/>
                      <path d="M15.354 3.354a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0z"/>
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x text-danger" viewBox="0 0 16 16">
                      <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
                    </svg>
                  )}
                  <button onClick={() => {deleteTask(item.id)}} className="btn btn-danger" type="button">
                    <span>
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash3-fill" viewBox="0 0 16 16">
                        <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06m6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528M8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5"/>
                      </svg>
                    </span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Assignment</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <label>Task kiriting:</label><br/>
              <input onChange={(e) => setInputValue(e.target.value)} placeholder="Task kiriting..." className="rounded form-control w-50" /><br/>
              <label>Users number:</label><br/>
              <input onChange={(e)=>{setTaskUserId(e.target.value)}} className='' type='number'/>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                Close
              </button>
              <button onClick={addTask} type="button" className="btn btn-primary" data-bs-dismiss="modal">
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};