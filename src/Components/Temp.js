import React, { useState } from "react";
import styled from "styled-components";
import { Bar } from "react-chartjs-2";
import 'chart.js/auto';

const HONE = styled.h4`
  color: black;
  margin-top: 10px;
  margin-bottom: 30px;
  margin-left :150px;
`;

const InputfeildsContainer = {
  padding: "2px 15px 15px 15px"
};

const myflexbutton = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  marginTop: "15px"
};

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

const mystylecard = {
  marginTop: "80px",
  width: "42%",
  marginLeft: "400px",
  backgroundColor: "rgba(255,255,255,255)"
};

const selectOption = {
  display: "flex",
  alignItems: "center"
};

const mygeneratingtable = {
  display: "flex",
  gap: "10px",
};

const indivisualTable = {
  height: "400px",
  width: "400px"
};

export default function Userinput() {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [users, setUsers] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);

  // usestates for counting males and females.
  const [gender, setGender] = useState("");
  const [males, setMales] = useState(0);
  const [females, setFemales] = useState(0);

  const [youngsters, setYoungsters] = useState(0);
  const [adult, setAdult] = useState(0);
  const [olds, setOlds] = useState(0);

  const [showReport, setShowReport] = useState(false);
  const [showForm, setShowForm] = useState(true);
  const [showTable, setShowTable] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (age <= 0) {
      alert("Please enter a valid age greater than 0");
      return;
    }

    if (editingIndex !== null) {
      // Adjust age group counts based on the previous age of the user being edited
      const prevAge = parseInt(users[editingIndex].age);
      if (prevAge <= 18) {
        setYoungsters(youngsters - 1);
      } else if (prevAge > 18 && prevAge <= 40) {
        setAdult(adult - 1);
      } else {
        setOlds(olds - 1);
      }

      // Adjust gender counts based on the previous gender of the user being edited
      const prevGender = users[editingIndex].gender;
      if (prevGender === "males") {
        setMales(males - 1);
      } else if (prevGender === "females") {
        setFemales(females - 1);
      }
    }

    if (age >= 0 && age <= 18) {
      setYoungsters(youngsters + 1);
    } else if (age > 18 && age <= 40) {
      setAdult(adult + 1);
    } else {
      setOlds(olds + 1);
    }

    if (gender === "males") {
      setMales(males + 1);
    } else if (gender === "females") {
      setFemales(females + 1);
    }

    if (editingIndex !== null) {
      const updatedUsers = users.map((user, index) =>
        index === editingIndex ? { name, age, gender } : user
      );
      setUsers(updatedUsers);
      setEditingIndex(null);
    } else {
      setUsers([...users, { name, age, gender }]);
    }
    setName("");
    setAge("");
    setGender("");
    setShowReport(true);
    setShowTable(true); // Ensure the table is displayed
    setShowForm(false); // Hide the form after submission
  };

  const handleEdit = (index) => {
    setName(users[index].name);
    setAge(users[index].age);
    setGender(users[index].gender);
    setEditingIndex(index);
    setShowForm(true);
    setShowReport(false);
    setShowTable(false);
  };

  const handleDelete = (index) => {
    if (window.confirm("This Action Can't Be Redo!")) {
      const deletedUser = users[index];
      const updatedUsers = users.filter((_, i) => i !== index);
      setUsers(updatedUsers);

      // Adjust age group counts based on the age of the user being deleted
      const { age: userAge, gender: userGender } = deletedUser;
      if (userAge <= 18) {
        setYoungsters(youngsters - 1);
      } else if (userAge > 18 && userAge <= 40) {
        setAdult(adult - 1);
      } else {
        setOlds(olds - 1);
      }

      // Adjust gender counts based on the gender of the user being deleted
      if (userGender === "males") {
        setMales(males - 1);
      } else if (userGender === "females") {
        setFemales(females - 1);
      }

      if (updatedUsers.length === 0) {
        setShowForm(true);
        setShowTable(false);
        setShowReport(false);
      }
    }
  };

  function handleReset() {
    if (name !== "" || age !== "" || gender !== "") {
      setName("");
      setAge("");
      setGender("");
    } else {
      if (users.length > 0) {
        setShowForm(false);
        setShowReport(true);
        setShowTable(true);
      }
    }
    setEditingIndex(null);
  }

  const handleGenderChange = (e) => {
    setGender(e.target.value);
  };

  const totalUsers = youngsters + adult + olds;
  const totalGenders = males + females;

  return (
    <>
      {showForm && (
        <div className="card" style={mystylecard}>
          <div className="card-body">
            <HONE>Register Account Form</HONE>
            <div className="container" style={InputfeildsContainer}>
              <form onSubmit={handleSubmit}>
                <label htmlFor="inputPassword5" className="form-label">Name:</label>
                <input type="text"
                  id="inputname"
                  placeholder="Enter your name"
                  className="form-control"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                /> <br />


                <label htmlFor="inputage" className="form-label">Age:</label>
                <input type="number"
                  id="inputage"
                  className="form-control"
                  placeholder="Enter your age"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  required
                />
                <br />

                <div style={selectOption}>
                  <span style={{ marginRight: "10px" }}>Gender:</span>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <input
                      type="radio"
                      name="radio-btn"
                      id="males-opt"
                      value="males"
                      checked={gender === "males"}
                      onChange={handleGenderChange}
                      required
                    /> &nbsp;
                    <label htmlFor="males-opt" style={{ marginRight: "10px" }}>Male</label>
                  </div>
                  <div style={{ marginLeft: "10px" }}>
                    <input
                      type="radio"
                      name="radio-btn"
                      id="females-opt"
                      value="females"
                      checked={gender === "females"}
                      onChange={handleGenderChange}
                      required
                    /> {" "}
                    <label htmlFor="females-opt"
                      value="females"
                      checked={gender === "females"}
                      onChange={handleGenderChange}
                      required
                    /> 
                    <label htmlFor="females-opt" style={{ marginRight: "10px" }}>Female</label>
                  </div>
                </div>
                <br />
                <div style={myflexbutton}>
                  <button type="submit" className="btn btn-outline-success shadow" style={{ width: "160px" }}>
                    {editingIndex !== null ? (<>
                      <i className="fa-solid fa-pencil-alt" /> Update
                    </>) : (<><i className="fa-regular fa-circle-check" /> Submit</>)}
                  </button>
                  &nbsp;
                  <button style={{ width: "160px" }} type="reset" value="Reset" className="btn btn-outline-danger shadow" onClick={handleReset}>
                    {name !== "" || age !== "" || gender !== "" ? (
                      <> <i className="fa-solid fa-clock-rotate-left" /> Reset</>
                    ) : (
                      <> <i className="fa-solid fa-person-circle-xmark" /> Close</>
                    )}
                  </button>

                </div>
              </form>
              <br />
            </div>
          </div>
        </div>
      )}

      {showReport && (
        <div className="container" style={mygeneratingtable}>
          <div className="container" style={indivisualTable}>
            <HONE id="AGD" style={{ marginLeft: "100px" }}>Age Group Distribution</HONE>
            <Bar
              data={{
                labels: ["youngsters", "Adult", "olds"],
                datasets: [
                  {
                    label: "% of Age Groups",
                    data: [
                      (youngsters / totalUsers) * 100,
                      (adult / totalUsers) * 100,
                      (olds / totalUsers) * 100
                    ],
                    backgroundColor: ["black", "yellow", "green"]
                  }
                ]
              }}
            />
          </div>

          <div className="container" style={indivisualTable}>
            <HONE style={{ marginLeft: "100px" }}>Gender Distribution</HONE>
            <Bar
              data={{
                labels: ["males", "Females"],
                datasets: [
                  {
                    label: "% of Genders",
                    data: [
                      (males / totalGenders) * 100,
                      (females / totalGenders) * 100
                    ],
                    backgroundColor: ["white", "indigo"]
                  }
                ]
              }}
            />
          </div>
        </div>
      )}

      {showTable && (
        <div className="container" style={mytablestyle}>
          {users.length > 0 && (
            <>
              <br />
              <div className="gap-3" style={TwoButtons}>
                <button onClick={() =>{setShowReport(true)}}
                  className="btn btn-outline-dark shadow p-3 mb-5 rounded "
                  style={mygenerateButton}>
                  <i className="fa-solid fa-chart-simple" />  &nbsp;
                  Generate Report
                </button>

                <button
                  className="btn btn-outline-dark shadow p-3 mb-5 rounded"
                  style={mygenerateButton}
                  onClick={() => { setShowForm(true); setShowReport(false); setShowTable(false); }}
                >
                  <i className="fa-solid fa-user-plus" />
                  &nbsp;
                  Add New Entry
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
                        <i className="fa-solid fa-pen-to-square" />{" "}
                          Edit
                        </button>
                        &nbsp;
                        <button onClick={() => { handleDelete(index); setShowReport(false); }} className="btn btn-outline-danger">
                        <i className="fa-solid fa-trash" /> {" "}
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          )}
        </div>
      )}
    </>
  );
}
