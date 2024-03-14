import axios from 'axios';
import React, { useEffect, useState } from 'react';

export default function Table({ deleteUser, updateUser }) {
    const [data, setData] = useState([])

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get('http://localhost:3000/api/getusers');
                setData(response.data); // Assuming response.data is an array of users
            } catch (error) {
                console.log(error);
            }
        }
        fetchData();
    }, []);

    const handleDelete = (userId) => {
        deleteUser(userId); // Call the deletuser function passed as prop
    };

    const handleUpdate = (userId) => {
        updateUser(userId); // Call the updatedUser function passed as prop
    };

    return (
        <>
            <div className="container">
                <div className="table-wrapper">
                    <div className="table-title">
                        <div className="row">
                            <div className="col-sm-6">
                                <h2>Manage <b>Contacts</b></h2>
                            </div>
                            <div className="col-sm-6">
                                <button className="btn btn-success" data-bs-toggle="modal" data-bs-target="#addEmployeeModal">
                                    <i className="material-icons">&#xE147;</i> <span>Add New Contact</span>
                                </button>
                            </div>
                        </div>
                    </div>
                    <table className="table table-striped table-hover">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Phone 1</th>
                                <th>Phone 2</th>
                                <th>Address</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((elem, index) => {
                                const fullName = [elem.first_name, elem.middle_name, elem.last_name].filter(Boolean).join(' ');
                                return (
                                    <tr key={index}>
                                        <td>{fullName}</td>
                                        <td>{elem.email}</td>
                                        <td>{elem.phone_1}</td>
                                        <td>{elem.phone_2}</td>
                                        <td>{elem.address}</td>
                                        <td>
                                            <a href="#" className="edit" data-bs-toggle="modal" data-bs-target="#editEmployeeModal" onClick={() => handleUpdate(elem.id)}>
                                                <i className="material-icons" title="Edit">&#xE254;</i>
                                            </a>
                                            <a href="#" className="delete" data-bs-toggle="modal" data-bs-target="#deleteEmployeeModal" onClick={() => handleDelete(elem.id)}>
                                                <i className="material-icons" title="Delete">&#xE872;</i>
                                            </a>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}
