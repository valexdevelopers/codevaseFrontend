import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import * as BIcons from 'react-bootstrap-icons';
import '../../../../assets/styles/admin.tables.css';
import Cookies from 'js-cookie';
import axios from 'axios';

const AllTasks = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
    const [loading, setLoading] = useState(false);
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        const fetchTasks = async () => {
            setLoading(true);
            try {
                const csrfToken = Cookies.get('XSRF_TOKEN');
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/task/all`, {
                    headers: {
                        'X-CSRF-Token': csrfToken,

                    },
                    withCredentials: true,
                });
                setTasks(response.data.data);
            } catch (error) {
                const errorMessage = error.response?.data?.message || 'There was a problem with your request: Please try again.';
                console.error('Error fetching tasks:', errorMessage);
            } finally {
                setLoading(false);
            }
        };

        fetchTasks();
    }, []);

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

    const sortedTasks = [...tasks].sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
            return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
            return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
    });

    const filteredTasks = sortedTasks.filter(task =>
        task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        task.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        task.languages.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="container mt-5">
            <h2 className="mb-4 text-white">Tasks Table</h2>
            <div className="mb-3 d-flex justify-content-between">
                <a href="/admin/task/new" className="btn btn-primary">Create New Task</a>
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
                            <th onClick={() => handleSort('title')}>
                                <span>Title &nbsp;</span> <BIcons.SortDown />
                            </th>
                            <th onClick={() => handleSort('description')}>
                                <span>Description &nbsp;</span> <BIcons.SortDown />
                            </th>
                            <th onClick={() => handleSort('languages')}>
                                <span>Languages &nbsp;</span> <BIcons.SortDown />
                            </th>
                            <th onClick={() => handleSort('tasksCompleted')}>
                                <span>Tasks Completed &nbsp;</span> <BIcons.SortDown />
                            </th>
                            <th onClick={() => handleSort('attempts')}>
                                <span>Number of Attempts &nbsp;</span> <BIcons.SortDown />
                            </th>
                            <th>
                                <span>Action &nbsp;</span> <BIcons.CaretDown />
                            </th>
                        </tr>
                    </thead>
                </table>
                <div style={{ maxHeight: '400px', overflowY: 'scroll' }}>
                    <table className="table table-dark table-striped table-bordered">
                        <tbody>
                            {filteredTasks.map((task, index) => (
                                <tr key={index}>
                                    <td>{task.title}</td>
                                    <td>{task.description}</td>
                                    <td>{task.languages}</td>
                                    <td>{task.tasksCompleted}</td>
                                    <td>{task.attempts}</td>
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
                                            <div className="dropdown-menu" aria-labelledby={`dropdownMenuButton${index}`}>
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
            {loading && (
                <div className="loading-overlay">
                    <img src="https://i.gifer.com/yy3.gif" alt="Loading..." />
                </div>
            )}
        </div>
    );
};

export default AllTasks;
