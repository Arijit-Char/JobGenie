import React from "react";
import Cards from "./Cards";
import "./Pjobs.scss";
import { useDispatch, useSelector } from "react-redux";
import { getData } from "../../actions/user";
export default function Pjobs() {
  const token = localStorage.getItem("token");
  const dispatch = useDispatch();
  dispatch(getData());
  const data = useSelector((state) => state.getData);
  console.log(data);

  return (
    <>
      {token ? (
        <div>
          {" "}
          <div className="Pjobs">
            <div className="jobs-page">
              <h1 className="page-heading">
                As per your resume, your personalized jobs
              </h1>
              <div className="card-container">
                <Cards />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>Signup or Login First </div>
      )}
    </>
  );
}
