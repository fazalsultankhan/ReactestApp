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

}

const myflexbutton = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  marginTop: "15px"
}


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
}

const indivisualTable ={
  height : "400px" ,
  width : "400px"
}

export default function Userinput() {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [users, setUsers] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);

  // usestates for counting males and females.
  const [gender, setGender] = useState("");
  const [males, setmales] = useState(0);
  const [females, setFemales] = useState(0);

  const [youngsters, setyoungsters] = useState(0);
  const [adult, setAdult] = useState(0);
  const [olds, setOlds] = useState(0);

  const [showReport, setShowReport] = useState(false);
  const [showChartcheck, setShowChartcheck] = useState(false);
  // const [enablebutton, setenablebutton] = useState(true);

  const [checkdisplay , setcheckdisplay] =useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (age <= 0) {
      alert("Please enter a valid age greater than 0");
      return;
    }
    setShowChartcheck(true);
    // setenablebutton(false);

    if (age >= 0 && age <= 18) {
      setyoungsters(youngsters + 1);
    } else if (age > 18 && age <= 40) {
      setAdult(adult + 1);
    } else {
      setOlds(olds + 1);
    }

    if (gender === "males") {
      setmales(males + 1);
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
    handleclose();

    setName("");
    setAge("");
    setGender("");

  };

  const handleEdit = (index) => {
    setName(users[index].name);
    setAge(users[index].age);
    setGender(users[index].gender);
    setEditingIndex(index);
    handleShowDisplay();

  };

  const handleDelete = (index) => {
    if (window.confirm("This Action Can't Be Redo!")) {
      const updatedUsers = users.filter((_, i) => i !== index);
      setUsers(updatedUsers);
    } 
    if (users.length === 1) {
      let hiddenDisplay = document.getElementById('mainclass');
        hiddenDisplay.style.display = "block";
        let hidediv_3 =  document.getElementById('div-3');
        hidediv_3.style.display ="none";
    }
  };


  function handleReset() {
    setName("");
    setAge("");
    setGender("");
    setEditingIndex(null);
  }

  function handleclose() {
    let hiddenDisplay = document.getElementById('mainclass');
    hiddenDisplay.style.display = "none";

    let hidediv_2 =document.getElementById('div-2');
    hidediv_2.style.display ="block";
  }


  function handleShowDisplay() {
    
    let hidediv_2 =document.getElementById('div-2');
    let hidediv_3 = document.getElementById('div-3');
    hidediv_2.style.display ="none";
    hidediv_3.style.display ="none";

    let ShowDisplay = document.getElementById('mainclass');
    ShowDisplay.style.display = "block";
  }

  const handleGenderChange = (e) => {
    setGender(e.target.value);
  };

  const generateReport = () => {
    if (showChartcheck === false) {
      alert("Please Fill The Form First");
      return;
    }
    setShowReport(true);
    let hidediv_3 = document.getElementById('div-3');
    hidediv_3.style.display ="flex";
  };

  const totalUsers = youngsters + adult + olds;
  const totalGenders = males + females;

  return (
    <>
      <div className="card" style={mystylecard} id="mainclass">
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
                <span style={{ marginRight: "10px" }}>
                  Gender:
                </span>
                <div style={{ display: "flex", alignItems: "center" }}>

                  <input
                    type="radio"
                    name="radio-btn"
                    id="males-opt"
                    value="males"
                    checked={gender === "males"}
                    onChange={handleGenderChange}
                    required
                  />  &nbsp;
                  <label htmlFor="males-opt" style={{ marginRight: "10px" }}>
                    males
                  </label>
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
                  <label htmlFor="females-opt" style={{ marginRight: "10px" }}>
                    Females
                  </label>
                </div>
              </div>

              <br />
              <div style={myflexbutton}>

                <button type="submit"
                  className="btn btn-outline-success shadow"
                  style={{ width: "160px" }}>
                  <i className="fa-regular fa-circle-check" />{" "}
                  {editingIndex !== null ? "Update" : "Submit"}
                </button>
                &nbsp;
                <button
                  style={{ width: "160px" }}
                  type="reset"
                  value="Reset"
                  className="btn btn-outline-danger shadow"
                  onClick={handleReset}
                >
                  <i className="fa-solid fa-clock-rotate-left" /> {" "}
                  Reset
                </button>
                &nbsp;
                {/* <button
                  style={{ width: "160px" }}
                  type="reset"
                  value="Reset"
                  className={`btn btn-outline-danger shadow `}
                  onClick={handleclose}
                  disabled ={enablebutton}
                >
                  <i className="fa-solid fa-person-circle-xmark" /> {" "}
                  Close
                </button> */}
              </div>

            </form>
            <br />

          </div>
        </div>
      </div>

      <div className="container " id="div-2">
        {users.length > 0 && (
          <>
            <br />
            <div className="gap-3" style={TwoButtons}>      
                <button onClick={generateReport}
                  className="btn btn-outline-dark shadow p-3 mb-5 rounded "
                  style={mygenerateButton}>
                  <i className="fa-solid fa-chart-simple" />  &nbsp;
                  Generate Report
                </button>
              <button
                className="btn btn-outline-dark shadow p-3 mb-5 rounded  "
                style={mygenerateButton}
                onClick={handleShowDisplay}
              >
                <i className="fa-solid fa-user-plus" />
                &nbsp;
                Add New Entry
              </button>
            </div>

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
        <div className="container" style={mygeneratingtable} id="div-3">
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
    </>
  );
}
