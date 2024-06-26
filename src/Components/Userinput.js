import React, { useState } from "react";
import styled from "styled-components";
import { Bar } from "react-chartjs-2";
import 'chart.js/auto';
import UserForm from "./UserForm";

const HONE = styled.h4`
  color: white;
  margin-top: 50px;
  margin-bottom: 20px;
  margin-left :150px;
`;

const mygeneratingtable = {
  display: 'flex',
  gap: '120px',
};

const indivisualTable = {
  height: '400px',
  width: '500px',
};

const mytablestyle = {
  width: "100%",
  textAlign: "center"
};

const mygenerateButton = {
  width: "190px",
  height: "40px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};
const options = {
  plugins: {
    legend: {
      labels: {
        color: 'white', // Label color
      },
    },
  },
  scales: {
    x: {
      grid: {
        color: 'white', // Grid line color
      },
      ticks: {
        color: 'white', // Axis label color
      },
    },
    y: {
      grid: {
        color: 'white', // Grid line color
      },
      ticks: {
        color: 'white', // Axis label color
      },
    },
  },
};

const TwoButtons = {
  height: "50px",
  display: "flex",
  justifyItems: "center",
  float: "right"
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
      const prevAge = parseInt(users[editingIndex].age);
      if (prevAge <= 18) {
        setYoungsters(youngsters - 1);
      } else if (prevAge > 18 && prevAge <= 40) {
        setAdult(adult - 1);
      } else {
        setOlds(olds - 1);
      }

      const prevGender = users[editingIndex].gender;
      if (prevGender === "Male") {
        setMales(males - 1);
      } else if (prevGender === "Female") {
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

    if (gender === "Male") {
      setMales(males + 1);
    } else if (gender === "Female") {
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
      if (userGender === "Male") {
        setMales(males - 1);
      } else if (userGender === "Female") {
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

  const totalUsers = youngsters + adult + olds;
  const totalGenders = males + females;

  return (
    <>
      {showForm && (
        <UserForm
          name={name}
          setName={setName}
          age={age}
          setAge={setAge}
          gender={gender}
          setGender={setGender}
          handleSubmit={handleSubmit}
          handleReset={handleReset}
          editingIndex={editingIndex}
        />
      )}

      {showReport && (
        <div className="container" style={mygeneratingtable}>
          <div className="container" style={indivisualTable}>
            <HONE id="AGD" style={{ marginLeft: "100px" }}>Age Group Distribution</HONE>
            <Bar
              data={{
                labels: ["Youngsters", "Adult", "Olds"],
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
              }} options={options}
            />
          </div>

          <div className="container" style={indivisualTable}>
            <HONE style={{ marginLeft: "100px" }}>Gender Distribution</HONE>
            <Bar
              data={{
                labels: ["Male", "Female"],
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
              }} options={options}
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
                  className="btn btn-dark  p-3 mb-5 rounded "
                  style={mygenerateButton}>
                  <i className="fa-solid fa-chart-simple" />  &nbsp;
                  Generate Report
                </button>

                <button
                  className="btn btn-dark p-3 mb-5 rounded"
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
