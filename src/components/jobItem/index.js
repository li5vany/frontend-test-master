import React from 'react';
import moment from "moment";
import './jobItem.scss'

const JobItem = ({job}) => {

  return (
    <div className="job-item">
      <img src={job.company_logo} alt={job.company} height="100"/>
      <div className="company-description">
        <div><span className="company-name">{job.company}</span> {job.type && <span className="new">{job.type}</span>} {job.new && <span className="featured">featured</span>}</div>
        <h3 className="position">{job.title}</h3>
        <div className="secondary-color detail">about {moment(job.created_at).fromNow()} <span className="dot"/> {job.location}</div>

        <div className="separator"/>

        <div dangerouslySetInnerHTML={{__html: job.how_to_apply}} style={{overflow: "auto"}}/>

      </div>
    </div>
  )
};

export default JobItem;