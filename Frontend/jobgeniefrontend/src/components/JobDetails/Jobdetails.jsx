import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./Jobdetails.scss";
import { useDispatch, useSelector } from "react-redux";
import { ResumeAnalysis, InterviewQues } from "../../actions/user";

const Jobdetails = () => {
  const dispatch = useDispatch();
  const jobdetails = useSelector((state) => state.jobdetails.jobdetails);
  let analysis = useSelector((state) => state.resumeanalysis.analysis);
  let intques = useSelector((state) => state.interviewques.intques);
  const [activeScreen, setActiveScreen] = useState("job");
  const [jobq, setJobq] = useState("");
  const [jobd, setJobd] = useState("");

  useEffect(() => {
    if (jobdetails) {
      let qualifications = "";
      let jobDescription = "";

      jobdetails.job_highlights.Qualifications.forEach(
        (qualification) => (qualifications += qualification + " ")
      );

      jobdetails.job_description.split(/\n/).forEach((line) => {
        if (line.trim().length > 0) {
          jobDescription += line.trim() + ". ";
        }
      });

      setJobq(qualifications.trim());
      setJobd(jobDescription.trim());
    }
  }, [jobdetails]);

  useEffect(() => {
    if (jobd && jobq) {
      dispatch(ResumeAnalysis(jobd, jobq));
    }
  }, [jobd, jobq, dispatch]);
  useEffect(() => {
    if (jobd && jobq) {
      dispatch(InterviewQues(jobd, jobq));
    }
  }, [jobd, jobq, dispatch]);

  const handleButtonClick = (screen) => {
    setActiveScreen(screen);
  };

  if (
    !jobdetails ||
    !analysis ||
    !analysis.data ||
    !jobq ||
    !jobd ||
    jobq.length < 1 ||
    jobd.length < 1 ||
    !intques ||
    !intques.data
  ) {
    console.log("Loading......");
    return (
      <div style={{ zIndex: "2", color: "white", width: "10rem" }}>
        Loading...
      </div>
    );
  }
  console.log(analysis.data);
  console.log(intques.data);
  analysis = JSON.parse(analysis.data);
  intques = JSON.parse(intques.data);

  console.log(analysis);
  console.log(intques);
  return (
    <div className="component-container">
      <div className="button-container">
        <button onClick={() => handleButtonClick("job")}>Job</button>
        <button onClick={() => handleButtonClick("analysis")}>Analysis</button>
        <button onClick={() => handleButtonClick("interview")}>
          Interview Questions
        </button>
      </div>

      <AnimatePresence exitBeforeEnter={false}>
        {activeScreen === "job" && (
          <motion.div
            key="job"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="screen"
          >
            <div className="job-container">
              <div className="employer-details">
                <img
                  src={jobdetails.employer_logo}
                  alt="Employer Logo"
                  className="employer-logo"
                />
                <div>
                  <h1 className="job-title">
                    {jobdetails.job_title}{" "}
                    {jobdetails.job_is_remote ? "(Remote)" : ""}
                  </h1>
                  <p className="employer-name">{jobdetails.employer_name}</p>
                </div>
              </div>

              <div className="details-container">
                <div className="details-row">
                  <div className="details-column">
                    <p className="detail-label">Location</p>
                    <p className="detail-value">
                      {jobdetails.job_is_remote
                        ? "Work from home"
                        : `${jobdetails.job_city}, ${jobdetails.job_state}, ${jobdetails.job_country}`}
                    </p>
                  </div>
                  <div className="details-column">
                    <p className="detail-label">Employment Type</p>
                    <p className="detail-value">
                      {jobdetails.job_employment_type}
                    </p>
                  </div>
                  <div className="details-column">
                    <p className="detail-label">Start Date</p>
                    <p className="detail-value">Immediately</p>
                  </div>
                </div>

                <div className="details-row">
                  <div className="details-column">
                    <p className="detail-label">Duration</p>
                    <p className="detail-value">3 Months</p>
                  </div>
                  <div className="details-column"></div>
                </div>
              </div>

              <h2 className="responsibilities-title">
                Day-to-day Responsibilities
              </h2>
              <ul className="responsibilities-list">
                {jobdetails.job_highlights.Responsibilities.map(
                  (responsibility, index) => (
                    <li key={index}>{responsibility}</li>
                  )
                )}
              </ul>

              <h2 className="requirements-title">Requirements</h2>
              <ul className="requirements-list">
                {jobdetails.job_highlights.Qualifications.map(
                  (qualification, index) => (
                    <li key={index}>{qualification}</li>
                  )
                )}
              </ul>

              <div className="apply-now-container">
                <a
                  href={jobdetails.job_apply_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="apply-now-button"
                >
                  Apply Now
                </a>
              </div>
            </div>
          </motion.div>
        )}

        {activeScreen === "analysis" && analysis && analysis.length > 0 && (
          <motion.div
            key="analysis"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="screen"
          >
            <div className="analysis-container">
              <h2 className="analysis-title">Resume Analysis</h2>
              <p className="analysis-probability">
                Match Probability: {analysis[0]}%
              </p>
              <div className="analysis-section">
                <h3 className="analysis-section-title">Problems:</h3>
                <ul className="analysis-list">
                  {analysis[1].map((problem, index) => (
                    <li key={index}>{problem}</li>
                  ))}
                </ul>
              </div>
              <div className="analysis-section">
                <h3 className="analysis-section-title">Recommendations:</h3>
                <ul className="analysis-list">
                  {analysis[2].map((recommendation, index) => (
                    <li key={index}>{recommendation}</li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        )}

        {activeScreen === "interview" && intques && intques.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="interview-questions"
          >
            {intques.map((item, index) => (
              <motion.div
                key={index}
                className="card"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <div className="question">{item[0]}</div>
                <div className="answer">{item[1]}</div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Jobdetails;
