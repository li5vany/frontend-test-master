import React, {useEffect, useState} from 'react';
import {jobService} from "../../services";
import JobItem from "../jobItem";
import './jobList.scss'
import JobDetail from "../jobDetail";

const JobList = () => {

  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [isFullTime, setIsFullTime] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [detailIdView, setDetailIdView] = useState('');
  const [jobs, setJobs] = useState([]);

  const getJobs = () => {
    setIsFetching(true);
    jobService().getJobs({description, location, isFullTime})
      .then(res => {
        setIsFetching(false);
        if (res && res.data) {
          setJobs(res.data);
        }
      })
      .catch(error => {
        setIsFetching(false);
        setJobs([]);
      });
  };

  useEffect(() => {
    getJobs()
  }, [setJobs]);

  return (
    <div>
      <div className="filter-list">
        {!detailIdView && <>
          <div>
            <label>Job Description</label>
            <input type="text" placeholder="Job Description" value={description} onChange={e => {
              setDescription(e.target.value)
            }}/>
          </div>
          <div>
            <label>Location</label>
            <input type="text" placeholder="Location" value={location} onChange={e => {
              setLocation(e.target.value)
            }}/>
          </div>
          <div>
            <label className="cursor-pointer">
              <input type="checkbox" placeholder="Full Time Only" checked={isFullTime} onChange={() => {
                setIsFullTime(!isFullTime)
              }}/>
              Full Time Only
            </label>
          </div>
          <div>
            <button onClick={() => {
              getJobs()
            }} disabled={isFetching}>Search {isFetching ? "..." : ""}</button>
          </div>
          {(description || location || isFullTime) &&
          <div className="clear" onClick={() => {
            setDescription("");
            setLocation("");
            setIsFullTime(false);
            getJobs();
          }}>Clear</div>}
        </>}

        {detailIdView && <>
          <div className="primary-color">Find another option here</div>
          {jobs.map((job, index) => (
            <span className="badge" key={index} onClick={() => {
              setDetailIdView(job.id)
            }}>
            {job.title} [{job.company}]
          </span>
          ))}
        </>}

      </div>

      {!detailIdView && <div className="job-list">
        {jobs.map((job, index) => (
          <JobItem key={index} job={job} setDetailIdView={setDetailIdView}/>
        ))}
      </div>}

      {detailIdView && <JobDetail id={detailIdView}/>}

    </div>
  )

};

export default JobList;