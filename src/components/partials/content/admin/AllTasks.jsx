import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import * as BIcons from 'react-bootstrap-icons';
import '../../../../assets/styles/admin.tables.css'

const AllTasks = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

  const users = [
    { username: 'john_doe', email: 'john@example.com', fullName: 'John Doe', image: 'https://via.placeholder.com/50', tasksCompleted: 15, attempts: 20 },
    { username: 'jane_smith', email: 'grace@example.com', fullName: 'Jane Smith', image: 'https://via.placeholder.com/50', tasksCompleted: 10, attempts: 18 },
    { username: 'alice_jones', email: 'alice@example.com', fullName: 'Alice Jones', image: 'https://via.placeholder.com/50', tasksCompleted: 12, attempts: 22 },
    { username: 'bob_brown', email: 'bob@example.com', fullName: 'Bob Brown', image: 'https://via.placeholder.com/50', tasksCompleted: 8, attempts: 17 },
    { username: 'carol_white', email: 'carol@example.com', fullName: 'Carol White', image: 'https://via.placeholder.com/50', tasksCompleted: 20, attempts: 25 },
    { username: 'dave_black', email: 'dave@example.com', fullName: 'Dave Black', image: 'https://via.placeholder.com/50', tasksCompleted: 18, attempts: 30 },
    { username: 'eve_green', email: 'eve@example.com', fullName: 'Eve Green', image: 'https://via.placeholder.com/50', tasksCompleted: 9, attempts: 15 },
    { username: 'frank_red', email: 'frank@example.com', fullName: 'Frank Red', image: 'https://via.placeholder.com/50', tasksCompleted: 7, attempts: 10 },
    { username: 'grace_blue', email: 'grace@example.com', fullName: 'Grace Blue', image: 'https://via.placeholder.com/50', tasksCompleted: 22, attempts: 28 },
    { username: 'henry_yellow', email: 'henry@example.com', fullName: 'Henry Yellow', image: 'https://via.placeholder.com/50', tasksCompleted: 13, attempts: 19 }
    // Add more user data as needed
  ];

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const sortedUsers = [...users].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === 'asc' ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === 'asc' ? 1 : -1;
    }
    return 0;
  });

  const filteredUsers = sortedUsers.filter(user =>
    user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.fullName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-white">Users Table</h2>
      <div className="mb-3 d-flex justify-content-between">
        <button className="btn btn-primary">Create New User</button>
        <input
          type="text"
          className="form-control w-25"
          placeholder="Search..."
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>
      <div className="table-responsive" style={{ maxHeight: '450px' }}>
        <table className="table table-dark table-striped table-bordered">
          <thead className="thead-dark">
            <tr>
              <th onClick={() => handleSort('username')}><span>Username &nbsp;</span> <BIcons.SortDown /></th>
              <th onClick={() => handleSort('email')}><span>Email &nbsp;</span><BIcons.SortDown /></th>
              <th onClick={() => handleSort('fullName')}><span>Full Name &nbsp;</span><BIcons.SortDown /></th>
              <th>Image</th>
              <th onClick={() => handleSort('tasksCompleted')}><span>Tasks Completed &nbsp;</span><BIcons.SortDown /></th>
              <th onClick={() => handleSort('attempts')}><span>Number of Attempts &nbsp;</span><BIcons.SortDown /></th>
              <th><span>Action &nbsp;</span><BIcons.CaretDown /></th>
            </tr>
          </thead>
        </table>
        <div style={{ maxHeight: '400px', overflowY: 'scroll' }}>
          <table className="table table-dark table-striped table-bordered">
            <tbody>
              {filteredUsers.map((user, index) => (
                <tr key={index}>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>{user.fullName}</td>
                  <td><img src={user.image} alt="User" /></td>
                  <td>{user.tasksCompleted}</td>
                  <td>{user.attempts}</td>
                  <td>
                    <div className="dropdown">
                      <button
                        className="btn btn-secondary dropdown-toggle"
                        type="button"
                        id={`dropdownMenuButton${index}`}
                        data-bs-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                      >
                        Action
                      </button>
                      <div className="dropdown-menu absolute_position" aria-labelledby={`dropdownMenuButton${index}`}>
                        <a className="dropdown-item" href="#">Delete</a>
                        <a className="dropdown-item" href="#">View More</a>
                        <a className="dropdown-item" href="#">Edit</a>
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AllTasks;
