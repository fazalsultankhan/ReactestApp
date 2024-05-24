// Report.js
import React from 'react';
import styled from 'styled-components';
import { Bar } from 'react-chartjs-2';

const HONE = styled.h4`
  color: black;
  margin-top: 10px;
  margin-bottom: 30px;
  margin-left :150px;
`;

const mygeneratingtable = {
  display: "flex",
  gap: "10px",
};

const indivisualTable = {
  height: "400px",
  width: "400px"
};


const Report = ({ youngsters, adult, olds, males, females, totalUsers, totalGenders }) => {
  return (
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
  );
};

export default Report;