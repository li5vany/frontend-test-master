import React, {useState, useEffect} from 'react';
import {jobService} from "../../services";

const JobDetail = ({id}) => {

  const [job, setJob] = useState("");

  const getJob = () => {
    jobService().getJob(id)
      .then(res => {
        if (res && res.data) {
          setJob(res.data);
        }
      })
      .catch(error => {
        setJob("");
      });
  };


  useEffect(() => {
    getJob()
  }, [id]);

  return (
    <div className="job-detail">

      {job && <div dangerouslySetInnerHTML={{__html: job}}/>}

    </div>
  )
};

export default JobDetail;