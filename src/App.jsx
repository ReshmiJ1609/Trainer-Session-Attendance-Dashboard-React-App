import React, { useState } from "react";
import "./App.css";

function App() {
  const [students, setStudents] = useState([
    { id: 1, name: "Arun", batch: "Batch A", status: "Present" },
    { id: 2, name: "Priya", batch: "Batch A", status: "Absent" },
    { id: 3, name: "Kavin", batch: "Batch B", status: "Present" },
    { id: 4, name: "Meena", batch: "Batch B", status: "Present" },
  ]);

  const [filterBatch, setFilterBatch] = useState("All");
  const [date, setDate] = useState("");

  const updateStatus = (id, newStatus) => {
    setStudents(
      students.map((student) =>
        student.id === id ? { ...student, status: newStatus } : student
      )
    );
  };

  const filteredStudents =
    filterBatch === "All"
      ? students
      : students.filter((s) => s.batch === filterBatch);

  const presentCount = students.filter((s) => s.status === "Present").length;
  const percentage = ((presentCount / students.length) * 100).toFixed(1);

  return (
    <div className="container">
      <h1>📚 Trainer Attendance Dashboard</h1>

      <div className="controls">
        <select onChange={(e) => setFilterBatch(e.target.value)}>
          <option>All</option>
          <option>Batch A</option>
          <option>Batch B</option>
        </select>

        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </div>

      <div className="dashboard">
        <div className="card">
          <h3>Total Students</h3>
          <p>{students.length}</p>
        </div>

        <div className="card">
          <h3>Present</h3>
          <p>{presentCount}</p>
        </div>

        <div className="card">
          <h3>Attendance %</h3>
          <p>{percentage}%</p>
        </div>
      </div>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Batch</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {filteredStudents.map((student) => (
            <tr key={student.id}>
              <td>{student.name}</td>
              <td>{student.batch}</td>
              <td>
                <select
                  value={student.status}
                  onChange={(e) => updateStatus(student.id, e.target.value)}
                >
                  <option>Present</option>
                  <option>Absent</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <p className="dateText">
        {date ? `Showing attendance for: ${date}` : "Select a date"}
      </p>
    </div>
  );
}

export default App;