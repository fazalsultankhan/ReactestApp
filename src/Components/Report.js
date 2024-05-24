import React from 'react';
import styled from 'styled-components';
import { Bar } from 'react-chartjs-2';

const HONE = styled.h4`
  color: white;
  margin-top: 40px;
  margin-bottom: 10px;
  margin-left: 150px;
`;

const mygeneratingtable = {
  display: 'flex',
  gap: '120px',
};

const indivisualTable = {
  height: '400px',
  width: '500px',
};

const Report = ({ youngsters, adult, olds, males, females, totalUsers, totalGenders }) => {
  const ageGroupData = {
    labels: ['Youngsters', 'Adult', 'Olds'],
    datasets: [
      {
        label: '% of Age Groups',
        data: [(youngsters / totalUsers) * 100, (adult / totalUsers) * 100, (olds / totalUsers) * 100],
        backgroundColor: ['black', 'yellow', 'green'],
      },
    ],
  };

  const genderData = {
    labels: ['Male', 'Female'],
    datasets: [
      {
        label: '% of Genders',
        data: [(males / totalGenders) * 100, (females / totalGenders) * 100],
        backgroundColor: ['white', 'indigo'],
      },
    ],
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

  return (
    <div className="container" style={mygeneratingtable}>
      <div className="container" style={indivisualTable}>
        <HONE id="AGD" style={{ marginLeft: '100px' }}>Age Group Distribution</HONE>
        <Bar data={ageGroupData} options={options} />
      </div>

      <div className="container" style={indivisualTable}>
        <HONE style={{ marginLeft: '100px' }}>Gender Distribution</HONE>
        <Bar data={genderData} options={options} />
      </div>
    </div>
  );
};

export default Report;
