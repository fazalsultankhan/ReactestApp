// UserForm.js
import React from 'react';
import styled from 'styled-components';

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

const mystylecard = {
  marginTop: "80px",
  width: "42%",
  marginLeft: "400px",
  backgroundColor: "rgba(255,255,255,255)"
};

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
        <div className="container" style={InputfeildsContainer}>
          <form onSubmit={handleSubmit}>
            <label htmlFor="inputname" className="form-label">Name:</label>
            <input
              type="text"
              id="inputname"
              placeholder="Enter your name"
              className="form-control"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <br />

            <label htmlFor="inputage" className="form-label">Age:</label>
            <input
              type="number"
              id="inputage"
              className="form-control"
              placeholder="Enter your age"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              required
            />
            <br />

            <div className="form-group">
              <label htmlFor="gender" className="form-label">Gender:</label>
              <select className="form-control" id="gender" value={gender} onChange={handleGenderChange} required>
                <option value="">Select Gender</option>
                <option value="males">Male</option>
                <option value="females">Female</option>
              </select>
            </div>

            <div className="container" style={myflexbutton}>
              <button style={{ width: "160px" }} type="submit" className="btn btn-outline-success shadow">
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
              <button
                style={{ width: "160px" }}
                type="reset"
                value="Reset"
                className="btn btn-outline-danger shadow"
                onClick={handleReset}
              >
                {name !== "" || age !== "" || gender !== "" ? (
                  <>
                    <i className="fa-solid fa-clock-rotate-left" /> Reset
                  </>
                ) : (
                  <>
                    <i className="fa-solid fa-person-circle-xmark" /> Close
                  </>
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
