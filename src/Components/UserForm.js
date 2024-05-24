import React from 'react';
import styled from 'styled-components';

const HONE = styled.h4`
  color: black;
  margin-top: 10px;
  margin-bottom: 30px;
  margin-left: 150px;
`;

const InputFieldsContainer = {
  padding: "2px 15px 15px 15px"
};

const myflexbutton = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  marginTop: "15px"
};

const mystylecard = {
  marginTop: "80px",
  width: "42%",
  marginLeft: "400px",
  backgroundColor: "rgba(255,255,255,255)"
};

// const selectOption = {
//   display: "flex",
//   alignItems: "center"
// };

const UserForm = ({
  name, setName, age, setAge, gender, setGender,
  handleSubmit, handleReset, editingIndex
}) => {
  const handleGenderChange = (e) => {
    setGender(e.target.value);
  };

  return (
    <div className="card" style={mystylecard}>
      <div className="card-body">
        <HONE>Register Account Form</HONE>
        <div className="container" style={InputFieldsContainer}>
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

            {/* <div style={selectOption}>
              <span style={{ marginRight: "10px" }}>Gender:</span>
              <div style={{ display: "flex", alignItems: "center" }}>
                <input
                  type="radio"
                  name="radio-btn"
                  id="male-opt"
                  value="male"
                  checked={gender === "male"}
                  onChange={handleGenderChange}
                  required
                /> &nbsp;
                <label htmlFor="male-opt" style={{ marginRight: "10px" }}>Male</label>
              </div>
              <div style={{ marginLeft: "10px" }}>
                <input
                  type="radio"
                  name="radio-btn"
                  id="female-opt"
                  value="female"
                  checked={gender === "female"}
                  onChange={handleGenderChange}
                  required
                /> {" "}
                <label htmlFor="female-opt" style={{ marginRight: "10px" }}>Female</label>
              </div>
            </div> */}
            <div className="form-group">
              <label htmlFor="gender" className="form-label">Gender:</label>
              <select className="form-control" id="gender" value={gender} onChange={handleGenderChange} required>
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>

            <br />
            <div style={myflexbutton}>
              <button type="submit" className="btn btn-outline-success shadow" style={{ width: "160px" }}>
                {editingIndex !== null ? (
                  <>
                    <i className="fa-solid fa-pencil-alt" /> Update
                  </>
                ) : (
                  <>
                    <i className="fa-regular fa-circle-check" /> Submit
                  </>
                )}
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
  );
};

export default UserForm;