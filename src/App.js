import React from 'react';
import './App.scss';
import Header from "./components/header";
import JobList from "./components/jobList";

function App() {
  return (
    <div>
      <Header/>
      <div className="container">
        <JobList/>
      </div>
    </div>
  );
}

export default App;
