import React, { useState } from "react";
import styled from "styled-components";
import { Bar } from "react-chartjs-2";
import 'chart.js/auto';

const HONE = styled.h2`
  color: green;
  margin-top: 30px;
  margin-bottom: 40px;
`;
const InputTarget = styled.input`
  width: 60%;
  border-radius: 5px;
  height: 45px;
`;

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
    console.log(setGender(e.target.value));
  };

  const generateReport = () => {
    if(showChartcheck === false){
      alert("Please Fill The Form First");
      return;
    }
    setShowReport(true);
  };

  return (
    <>
      <div className="container">
        <HONE>User Submission Form!</HONE>
        <form onSubmit={handleSubmit}>
          Name:{" "}
          <InputTarget
          className="shadow-lg p-3 mb-5 bg-body-tertiary rounded"
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <br /> <br />
          Age: &nbsp;
          <InputTarget
          className="shadow-lg p-3 mb-5 bg-body-tertiary rounded"
            type="number"
            placeholder="Enter your age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            required
          />
          <br /> <br />

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
              />
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
              />
              Female
            </label>
          </div>

          <br /> <br />
          <button type="submit" className="btn btn-outline-success" style={{width: "365px"}}>
            {editingIndex !== null ? "Update" : "Submit"}
          </button>
          &nbsp;
          <button
          style={{width: "365px"}}
            type="reset"
            value="Reset"
            className="btn btn-outline-danger"
            onClick={handleReset}
          >
            Reset
          </button>
        </form>

        {users.length > 0 && (
          <table
            style={{ width: "100%" }}
            className="table-bordered table table-striped mt-4"
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
                      Edit
                    </button>
                    &nbsp;
                    <button
                      onClick={() => handleDelete(index)}
                      className="btn btn-outline-danger"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      <br />
      <button onClick={generateReport} className="btn btn-outline-primary shadow p-3 mb-5 rounded " style={{width: "730px"}}>
        Generate Report
      </button>
      {showReport && (
        <div>
          <h3>Age Group Distribution</h3>
          <Bar
            data={{
              labels: ["Youngster", "Adult", "Old"],
              datasets: [
                {
                  label: "% of Age Groups",
                  data: [
                    (youngster / users.length) * 100,
                    (adult / users.length) * 100,
                    (old / users.length) * 100
                  ],
                  backgroundColor: ["#3e95cd", "#8e5ea2", "#3cba9f"]
                }
              ]
            }}
          />
          <h3>Gender Distribution</h3>
          <Bar
            data={{
              labels: ["Male", "Female"],
              datasets: [
                {
                  label: "% of Genders",
                  data: [
                    (male / users.length) * 100,
                    (female / users.length) * 100
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

