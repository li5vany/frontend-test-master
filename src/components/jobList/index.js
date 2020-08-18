import React, {useEffect, useState} from 'react';
import {jobService} from "../../services";
import JobItem from "../jobItem";
import './jobList.scss'

const JobList = () => {

  const [filter, setFilter] = useState([]);
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    setJobs(jobService().getJobs());
  }, [setJobs]);

  const handleFilter = (value) => {
    const index = filter.indexOf(value);
    let tmp = [...filter];
    if (index !== -1) {
      tmp.splice(index, 1);
    }

    setFilter(tmp)
  };

  let jobItems = [];

  const checkFilter = (job) => {
    if (filter.length === 0) {
      return true
    }

    const array = [job.role, job.level, ...job.languages, ...job.tools];

    for (let i in filter) {
      if (filter.hasOwnProperty(i) && array.some(tag => tag.toLowerCase() === filter[i].toLowerCase())) {
        return true
      }
    }
    return false;
  };

  for (let i in jobs) {
    if (jobs.hasOwnProperty(i) && checkFilter(jobs[i])) {
      jobItems.push(
        <JobItem key={i} job={jobs[i]} filter={filter} setFilter={setFilter}/>
      )
    }
  }

  return (
    <div>
      <div className="filter-list">
        {filter.map((f, index) => (
          <div key={index}>
            <div className="filter-item">{f}</div>
            <button onClick={() => handleFilter(f)}>×</button>
          </div>
        ))}
        {filter.length > 0 ? <div className="clear" onClick={() => {setFilter([])}}>Clear</div> : <div className="primary-color">You can select the tags to filter this list</div>}
      </div>
      <div className="job-list">
        {jobItems}
      </div>
    </div>
  )

};

export default JobList;