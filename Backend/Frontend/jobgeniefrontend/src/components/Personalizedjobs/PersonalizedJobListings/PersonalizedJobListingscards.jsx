import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import Logo from "../../../Data/logo.png";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { GetJobDetails } from "../../../actions/user";
import { motion } from "framer-motion";
import "./PersonalizedJobListings.scss";
import PropTypes from "prop-types";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import LocationOnIcon from "@mui/icons-material/LocationOn";
export default function PersonalizedJobListingscards({ job }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <motion.div
      className="card-container2"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => {
        dispatch(GetJobDetails(job));
        navigate("/jobdetails");
      }}
    >
      <Card className="job-card">
        <CardActionArea>
          <CardMedia
            className="employer-logo"
            component="img"
            height="100"
            image={job.employer_logo === null ? Logo : job.employer_logo}
            alt="Employer Logo"
          />
          <CardContent>
            <Typography
              className="job-title"
              gutterBottom
              variant="h5"
              component="div"
            >
              {job.employer_name}
            </Typography>
            <div
              style={{
                display: "flex",
                gap: "3rem",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography
                className="job-position"
                variant="body2"
                color="text.secondary"
                style={{ display: "flex", gap: "0.5rem" }}
              >
                <WorkOutlineIcon style={{ fontSize: "medium" }} />{" "}
                {job.job_title}
              </Typography>

              <div className="remotebtn">
  {job.job_is_remote ? (
    <div className="remote-button">Remote</div> 
  ) : (
    <div className="onsite-button">Onsite</div> 
  )}
</div>
            </div>

            <div
              style={{
                display: "flex",
                gap: "1rem",
                alignItems: "center",
                justifyContent: "center",
                marginTop: "1rem",
                flexDirection: "column",
              }}
            >
              <Typography
                className="job-position"
                variant="body2"
                color="text.secondary"
                style={{ display: "flex", gap: "0.5rem" }}
              >
                <LocationOnIcon style={{ fontSize: "medium" }} /> {job.job_city}
                , {job.job_country}
              </Typography>

              <div className="remotebtn">{job.job_employment_type}</div>
            </div>
          </CardContent>
        </CardActionArea>
      </Card>
    </motion.div>
  );
}
PersonalizedJobListingscards.propTypes = {
  job: PropTypes.shape({
    employer_logo: PropTypes.string,
    employer_name: PropTypes.string.isRequired,
    job_title: PropTypes.string.isRequired,
    job_is_remote: PropTypes.bool,
    job_city: PropTypes.string,
    job_country: PropTypes.string,
    job_employment_type: PropTypes.string,
  }).isRequired,
};
