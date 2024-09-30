import { useEffect, useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./Jobdetails.scss";
import Logo from "../../Data/logo.png";
import { useDispatch, useSelector } from "react-redux";
import { ResumeAnalysis, InterviewQues } from "../../actions/user";
import LoadingScreen from "../Loading Screen/Loading";
const Jobdetails = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const jobdetails = useSelector((state) => state.jobdetails.jobdetails);
  const analysisData = useSelector((state) => state.resumeanalysis.analysis);
  const interviewQuestionsData = useSelector(
    (state) => state.interviewques.intques
  );
  if (!jobdetails) {
    return <LoadingScreen />;
  }
  const [activeScreen, setActiveScreen] = useState("job");
  const [error, setError] = useState(false);
  const jobq = useMemo(() => {
    if (jobdetails) {
      setLoading(true);
      return jobdetails.job_highlights?.Qualifications?.join(" ").trim() || "";
    }
    return "";
  }, [jobdetails]);

  const jobd = useMemo(() => {
    if (jobdetails) {
      return jobdetails.job_description
        .split(/\n/)
        .map((line) => line.trim())
        .filter((line) => line.length > 0)
        .join(". ")
        .trim();
    }
    return "";
  }, [jobdetails]);

  if (!jobq || !jobd) {
    return <LoadingScreen />;
  }

  useEffect(() => {
    if (jobd && jobq) {
      setLoading(true);
      dispatch(ResumeAnalysis(jobd, jobq));
      dispatch(InterviewQues(jobd, jobq));
    }
  }, [jobd, jobq, dispatch, error]);

  const analysis = useMemo(() => {
    if (!analysisData?.data) return [];

    try {
      const parsedData = JSON.parse(analysisData.data);
      setLoading(false);
      return Array.isArray(parsedData) ? parsedData : [];
    } catch (error) {
      setLoading(true);
      console.error("Error parsing analysis data:", error);
      return [];
    }
  }, [analysisData]);

  const intques = useMemo(() => {
    if (!interviewQuestionsData?.data) return [];

    try {
      const parsedData = JSON.parse(interviewQuestionsData.data);
      setLoading(false);
      return Array.isArray(parsedData) ? parsedData : [];
    } catch (error) {
      setLoading(true);
      console.error("Error parsing interview questions data:", error);
      return [];
    }
  }, [interviewQuestionsData]);

  const handleButtonClick = (screen) => setActiveScreen(screen);

  if (
    !intques ||
    !analysis ||
    !Array.isArray(intques) ||
    !Array.isArray(analysis) ||
    !intques.length > 0 ||
    !analysis.length > 0
  ) {
    return <LoadingScreen />;
  }
  if(!Array.isArray(intques) || !Array.isArray(analysis) || !intques.length > 0 || !analysis.length > 0) {
    console.log("Error parsing data");
    setError(!error);
  }
  if (loading) return <LoadingScreen />;

  return (
    <div className="component-container">
      <div className="button-container">
        {["job", "analysis", "interview"].map((screen) => (
          <button key={screen} onClick={() => handleButtonClick(screen)}>
            {screen.charAt(0).toUpperCase() + screen.slice(1)}
          </button>
        ))}
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
                  src={jobdetails.employer_logo===null ? Logo : jobdetails.employer_logo}
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
                </div>
              </div>

              <h2 className="responsibilities-title">
                Day-to-day Responsibilities
              </h2>
              <ul className="responsibilities-list">
                {Array.isArray(jobdetails.job_highlights.Responsibilities) &&
                jobdetails.job_highlights.Responsibilities.length > 0 ? (
                  jobdetails.job_highlights.Responsibilities.map(
                    (responsibility, index) => (
                      <li key={index}>{responsibility}</li>
                    )
                  )
                ) : (
                  <li>Not Found</li>
                )}
              </ul>

              <h2 className="requirements-title">Requirements</h2>
              <ul className="requirements-list">
                {Array.isArray(jobdetails.job_highlights.Qualifications) &&
                jobdetails.job_highlights.Qualifications.length > 0 ? (
                  jobdetails.job_highlights.Qualifications.map(
                    (qualification, index) => (
                      <li key={index}>{qualification}</li>
                    )
                  )
                ) : (
                  <li>Not Found</li>
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
                  {Array.isArray(analysis[1]) ? (
                    analysis[1].map((problem, index) => (
                      <li key={index}>{problem}</li>
                    ))
                  ) : (
                    <li>No problems found</li>
                  )}
                </ul>
              </div>
              <div className="analysis-section">
                <h3 className="analysis-section-title">Recommendations:</h3>
                <ul className="analysis-list">
                  {Array.isArray(analysis[2]) ? (
                    analysis[2].map((recommendation, index) => (
                      <li key={index}>{recommendation}</li>
                    ))
                  ) : (
                    <li>No recommendations found</li>
                  )}
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
            {Array.isArray(intques) ? (
              intques.map((item, index) => (
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
              ))
            ) : (
              <p>No interview questions found</p>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Jobdetails;
