import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import logo from "../../../Data/logo.png";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { GetJobDetails } from "../../../actions/user";
import { motion } from "framer-motion";
import "./PersonalizedJobListings.scss";

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
      {console.log(job)}
      <Card className="job-card" sx={{ maxWidth: 345 }}>
        <CardActionArea>
          <CardMedia
            className="employer-logo"
            component="img"
            height="100"
            image={job.employer_logo ? job.employer_logo : logo}
            alt="Employer Logo"
          />
          <CardContent>
            <Typography className="job-title" gutterBottom variant="h5" component="div">
              {job.employer_name}
            </Typography>
            <Typography className="job-location" variant="body2" color="text.secondary">
              {job.job_city}, {job.job_country} ({job.job_employment_type})
            </Typography>
            <Typography className="job-position" variant="body2" color="text.secondary">
              {job.job_title}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </motion.div>
  );
}
