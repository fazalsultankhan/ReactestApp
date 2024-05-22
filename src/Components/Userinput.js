import React, { useState } from "react";
import styled from "styled-components";
import { Bar } from "react-chartjs-2";
import 'chart.js/auto';

const HONE = styled.h2`
  color: black;
  margin-top: 10px;
  margin-bottom: 30px;
`;
const InputTarget = styled.input`
  width: 60%;
  border-radius: 5px;
  height: 45px;
`;

const mygenerateButton ={
  width : "302px",
  height : "40px",
  display :"flex",
  alignItems: "center",
  justifyContent: "center",
  marginLeft : "57px",
  
};
const mytablestyle = {
  width : "100%" ,
  boxShadow : "2px 3px 2px 2px white",
  borderRadius : "8px !important"
};

const mystylecard ={
  marginTop: "60px",
  width:"35%",
  marginLeft : "400px",
  boxShadow: "3px 3px 3px 3px black"
};

const selectOption = {
  display: "flex",
  justifyContent: "space-evenly"
};

export default function Userinput() {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [users, setUsers] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);

  // usestates for counting male and female.
  const [gender, setGender] = useState("");
  const [male, setMale] = useState(0);
  const [female, setFemale] = useState(0);

  const [youngster, setYoungster] = useState(0);
  const [adult, setAdult] = useState(0);
  const [old, setOld] = useState(0);

  const [showReport, setShowReport] = useState(false);
  const [showChartcheck, setShowChartcheck] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (age <= 0) {
      alert("Please enter a valid age greater than 0");
      return;
    }
    setShowChartcheck(true);

    if (age >= 0 && age <= 18) {
      setYoungster(youngster + 1);
    } else if (age > 18 && age <= 40) {
      setAdult(adult + 1);
    } else {
      setOld(old + 1);
    }

    if (gender === "male") {
      setMale(male + 1);
    } else if (gender === "female") {
      setFemale(female + 1);
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
  };

  const handleEdit = (index) => {
    setName(users[index].name);
    setAge(users[index].age);
    setGender(users[index].gender);
    setEditingIndex(index);
  };

  const handleDelete = (index) => {
    const updatedUsers = users.filter((_, i) => i !== index);
    setUsers(updatedUsers);
  };

  function handleReset() {
    setName("");
    setAge("");
    setGender("");
    setEditingIndex(null);
  }

  const handleGenderChange = (e) => {
    setGender(e.target.value);
  };

  const generateReport = () => {
    if(showChartcheck === false){
      alert("Please Fill The Form First");
      return;
    }
    setShowReport(true);
  };

  const totalUsers = youngster + adult + old;
  const totalGenders = male + female;

  return (
    <>
<div className="card" style={mystylecard}>
    <div className="card-body">
    <HONE>User Submission Form!</HONE>
      <div className="container">
        <form onSubmit={handleSubmit}>
          Name: {" "}
          <InputTarget
          className="shadow-lg p-3 mb-5 bg-body-tertiary rounded"
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <br /> 
          Age:{""} &nbsp; &nbsp;
          <InputTarget
           className="shadow-lg p-3 mb-5 bg-body-tertiary rounded"
            type="number"
            placeholder="Enter your age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            required
          /> 

          <div style={selectOption}>
            Gender:
            <label htmlFor="male-opt">
              <input
                type="radio"
                name="radio-btn"
                id="male-opt"
                value="male"
                checked={gender === "male"}
                onChange={handleGenderChange}
                required
              /> {" "}
              Male
            </label>

            <label htmlFor="female-opt">
              <input
                type="radio"
                name="radio-btn"
                id="female-opt"
                value="female"
                checked={gender === "female"}
                onChange={handleGenderChange}
                required
              /> {" "}
              Female
            </label>
          </div>
          <br /> 
          <button type="submit" className="btn btn-outline-success shadow" style={{width: "150px"}}>
          <i className="fa-regular fa-circle-check" />{" "}
            {editingIndex !== null ? "Update" : "Submit"}
          </button>
          &nbsp;
          <button
          style={{width: "150px"}}
            type="reset"
            value="Reset"
            className="btn btn-outline-danger shadow"
            onClick={handleReset}
          >
            <i className="fa-solid fa-clock-rotate-left" /> {" "}
            Reset
          </button>
        </form>
        <br />
        <a href="#AGD" style={{textDecoration: "none"}}>
          <button onClick={generateReport} 
            className="btn btn-outline-dark shadow p-3 mb-5 rounded "
            style={mygenerateButton}>
              <i className="fa-solid fa-chart-simple" />  &nbsp;
            Generate Report
        </button>
        </a>
       
      </div>
    </div>
</div>

      <div className="container ">

        {users.length > 0 && (
          <>
          <br />
          <table
            style={mytablestyle}
            className="mt-5 table-bordered table table-striped  table-dark table-hover "
          >
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
                    <button
                      onClick={() => handleEdit(index)}
                      className="btn btn-outline-primary"
                    >
                      <i className="fa-solid fa-pen-to-square" />{" "}
                      Edit
                    </button>
                    &nbsp;
                    <button
                      onClick={() => handleDelete(index)}
                      className="btn btn-outline-danger"
                    >
                      <i className="fa-solid fa-trash" />{" "}
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
      <br />
      {showReport && (
        <div className="container">
          <HONE id="AGD">Age Group Distribution</HONE>
          <Bar
            data={{
              labels: ["Youngster", "Adult", "Old"],
              datasets: [
                {
                  label: "% of Age Groups",
                  data: [
                    (youngster / totalUsers) * 100,
                    (adult / totalUsers) * 100,
                    (old / totalUsers) * 100
                  ],
                  backgroundColor: ["#3e95cd", "#8e5ea2", "#3cba9f"]
                }
              ]
            }}
          />
          <HONE>Gender Distribution</HONE>
          <Bar
            data={{
              labels: ["Male", "Female"],
              datasets: [
                {
                  label: "% of Genders",
                  data: [
                    (male / totalGenders) * 100,
                    (female / totalGenders) * 100
                  ],
                  backgroundColor: ["#3e95cd", "#8e5ea2"]
                }
              ]
            }}
          />
        </div>
      )}
    </>
  );
}
