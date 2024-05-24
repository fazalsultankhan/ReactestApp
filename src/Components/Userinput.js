import React, { useState } from "react";
import Report from "./Report";
import UserTable from './UserTable';
import UserForm from './UserForm';
import 'chart.js/auto';

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

    
      const { age: userAge, gender: userGender } = deletedUser;
      if (userAge <= 18) {
        setYoungsters(youngsters - 1);
      } else if (userAge > 18 && userAge <= 40) {
        setAdult(adult - 1);
      } else {
        setOlds(olds - 1);
      }

    
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
        <Report
          youngsters={youngsters}
          adult={adult}
          olds={olds}
          males={males}
          females={females}
          totalUsers={totalUsers}
          totalGenders={totalGenders}
        />
      )}
      
       {showTable && (
        <UserTable
          users={users}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
          setShowReport={setShowReport}
          setShowForm={setShowForm}
          setShowTable={setShowTable}
        />
      )}
    </>
  );
}
