import { useEffect, useState } from "react";
import Cards from "./Cards";
import "./Pjobs.scss";
import { useDispatch, useSelector } from "react-redux";
import { getData } from "../../actions/user";

export default function Pjobs() {
  const [tjobs, setTjobs] = useState([]);
  const [loading, setLoading] = useState(true);  // Loading state
  const [error, setError] = useState(null);      // Error state
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getData());
  }, [dispatch]);

  const data = useSelector((state) => state.getuser);

  useEffect(() => {
    if (data && data.user && data.user.user && data.user.user.targetedjobs) {
      try {
        setTjobs(data.user.user.targetedjobs);
        setLoading(false);  // Loading complete
      } catch (err) {
        setError("Failed to load jobs");
        setLoading(false);  // Loading complete with error
      }
    }
  }, [data]);

  if (loading) {
    return <div>Loading...</div>;  // Display loading message
  }

  if (error) {
    return <div>Error: {error}</div>;  // Display error message
  }

  if (tjobs.length <= 0) {
    return <div>No jobs available at the moment</div>;
  }

  let actualArray;
  try {
    actualArray = JSON.parse(tjobs[0]);  // Parse the JSON string
  } catch (err) {
    return <div>Error parsing jobs data</div>;  // Handle parsing errors
  }

  const token = localStorage.getItem("token");
  return (
    <>
      {token ? (
        <div className="Pjobs">
          <div className="jobs-page">
            <h1 className="page-heading">
              As per your resume, your personalized jobs
            </h1>
            <div className="card-container">
              {actualArray.map((job, index) => {
                return <Cards key={index} job={job} />;
              })}
            </div>
          </div>
        </div>
      ) : (
        <div>Signup or Login First</div>
      )}
    </>
  );
}
