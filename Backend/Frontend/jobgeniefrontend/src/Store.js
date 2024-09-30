import { configureStore } from "@reduxjs/toolkit";
import {
  GetJobListing,
  GetJobListingByKeyword,
  Getuser,
  InterviewQues,
  JobDetails,
  Login,
  Logout,
  Register,
  ResumeAnalysis,
  ResumeUpload,
} from "./reducers/user";

const store = configureStore({
  reducer: {
    register: Register,
    login: Login,
    logout: Logout,
    getuser: Getuser,
    resumeupload: ResumeUpload,
    joblisting: GetJobListing,
    joblistingbykey: GetJobListingByKeyword,
    jobdetails: JobDetails,
    resumeanalysis: ResumeAnalysis,
    interviewques: InterviewQues,
  },
});

export default store;
