// UserTable.js
import React from 'react';

const mygenerateButton = {
  width: "190px",
  height: "40px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const TwoButtons = {
  height: "50px",
  display: "flex",
  justifyItems: "center",
  float: "right"
};

const mytablestyle = {
  width: "100%",
  textAlign: "center"
};

const UserTable = ({ users, handleEdit, handleDelete, setShowReport, setShowForm, setShowTable }) => {
  return (
    <div className="container" style={mytablestyle}>
      {users.length > 0 && (
        <>
          <br />
          <div className="gap-3" style={TwoButtons}>
            <button
              onClick={() => { setShowReport(true); }}
              className="btn btn-outline-dark shadow p-3 mb-5 rounded"
              style={mygenerateButton}
            >
              <i className="fa-solid fa-chart-simple" /> &nbsp; Generate Report
            </button>

            <button
              className="btn btn-outline-dark shadow p-3 mb-5 rounded"
              style={mygenerateButton}
              onClick={() => { setShowForm(true); setShowReport(false); setShowTable(false); }}
            >
              <i className="fa-solid fa-user-plus" /> &nbsp; Add New Entry
            </button>
          </div>
          <table className="mt-5 table-bordered table table-striped table-dark table-hover">
            <thead>
              <tr>
                <th>Name</th>
                <th>Age</th>
                <th>Gender</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={index}>
                  <td>{user.name}</td>
                  <td>{user.age}</td>
                  <td>{user.gender}</td>
                  <td>
                    <button onClick={() => handleEdit(index)} className="btn btn-outline-primary">
                      <i className="fa-solid fa-pen-to-square" /> Edit
                    </button>
                    &nbsp;
                    <button onClick={() => { handleDelete(index); setShowReport(false); }} className="btn btn-outline-danger">
                      <i className="fa-solid fa-trash" /> Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};

export default UserTable;