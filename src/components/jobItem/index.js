import React from 'react';
import './jobItem.scss'

const JobItem = ({job, filter, setFilter}) => {

  const handleFilter = (value) => {
    const index = filter.indexOf(value);
    let tmp = [...filter];
    if (index !== -1) {
      // If you want toggle the selection
      // tmp.splice(index, 1);
    } else {
      tmp.push(value)
    }
    setFilter(tmp)
  };

  const isActive = (value) => filter.some(f => f.toLowerCase() === value.toLowerCase()) ? "active" : "";

  return (
    <div className="job-item">
      <img src={require('../../resources/' + job.logo.replace("./", ''))} alt={job.company} height="100"/>
      <div className="company-description">
        <div><span className="company-name">{job.company}</span> {job.new && <span className="new">New!</span>} {job.new && <span className="featured">featured</span>}</div>
        <h3 className="position">{job.position}</h3>
        <div className="secondary-color detail">{job.postedAt} <span className="dot"/> {job.contract} <span className="dot"/> {job.location}</div>
      </div>
      <div className="separator"/>
      <div className="tags">
        <div className={isActive(job.role)} onClick={() => {handleFilter(job.role)}}>{job.role}</div>

        <div className={isActive(job.level)} onClick={() => {handleFilter(job.level)}}>{job.level}</div>

        {job.languages.map((language, index) => <div className={isActive(language)} key={index} onClick={() => {handleFilter(language)}}>{language}</div>)}

        {job.tools.map((tool, index) => <div className={isActive(tool)} key={index} onClick={() => {handleFilter(tool)}}>{tool}</div>)}
      </div>
    </div>
  )
};

export default JobItem;