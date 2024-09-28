import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./PersonalizedJobListings.scss";
import { GetJobListingByKeyword } from "../../../actions/user";
import PersonalizedJobListingscards from "./PersonalizedJobListingscards";
import LoadingScreen from "../../Loading Screen/Loading";

export default function PersonalizedJobListings() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false); 
  const job = useSelector((state) => state.joblisting.joblisting);
  const jobarray = useSelector(
    (state) => state.joblistingbykey.joblistingbykey
  );

  useEffect(() => {
    if (job) {
      setLoading(true); 
      dispatch(GetJobListingByKeyword(job));
    }
  }, [dispatch, job]);

  const jobsbykey = useMemo(() => {
    if (jobarray && jobarray.data && jobarray.data.data) {
      setLoading(false); 
      return jobarray.data.data;
    }
    return [];
  }, [jobarray]);

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <div className="perjobliscard">
      {jobsbykey.length === 0 ? (
        <div>No jobs available</div>
      ) : (
        jobsbykey.map((job) => (
          <div className="card2" key={job.job_id}>
            <PersonalizedJobListingscards job={job} />
          </div>
        ))
      )}
    </div>
  );
}
