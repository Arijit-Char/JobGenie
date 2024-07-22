import React, { useEffect } from "react";
import "./Pjobs.scss";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { GetJobListing } from "../../actions/user";

export default function Cards({ job }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <div
      className="card"
      onClick={() => {
        dispatch(GetJobListing(job));
        navigate("/PersonalizedJobListings");
      }}
    >
      <div className="card-content">
        <h2 className="card-title">{job}</h2>
        <p className="card-body">
         Apply for {job} job now
        </p>
        <a href="#" className="button">
          Apply
        </a>
      </div>
    </div>
  );
}
