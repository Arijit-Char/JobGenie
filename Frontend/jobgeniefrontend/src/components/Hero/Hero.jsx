import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import toast from "react-hot-toast";
import "./Hero.scss";
import { useDispatch, useSelector } from "react-redux";
import { resumeUpload } from "../../actions/user";
import LoadingScreen from "../Loading Screen/Loading"; 

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

export default function Hero() {
  const { message, error } = useSelector((state) => state.resumeupload);

  const [selectedFile, setSelectedFile] = useState(null);
  const [btnref, setBtnref] = useState(false);
  const [loading, setLoading] = useState(false); 

  const dispatch = useDispatch();

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
    setBtnref(true);
  };

  const handleUpload = () => {
    if (!selectedFile) {
      toast.error("Please select a file");
      return;
    }
    setLoading(true); 
    dispatch(resumeUpload(selectedFile));
  };

  useEffect(() => {
    if (message) {
      setLoading(false); // Hide the loading screen when upload is successful
      toast.success("Resume Uploaded Successfully", {
        position: "bottom-center",
      });
    } else if (error) {
      setLoading(false);
      toast.error(error, {
        position: "bottom-center",
      });
      console.error("Error uploading resume:", error);
    }
  }, [error, message, dispatch]);

  const token = localStorage.getItem("token");

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <div className="hero">
      <div className="bodytext">
        <h1>Upload Your Resume</h1>
        <h2>
          Our System Will Analyze Your Resume and Suggest Jobs Accordingly
        </h2>
      </div>
      <div className="resume">
        {token ? (
          <div className="grpbtn">
            <Button
              component="label"
              role={undefined}
              variant="contained"
              tabIndex={-1}
              startIcon={<CloudUploadIcon />}
              className="choosebtn"
            >
              {btnref ? "File Selected" : "Upload file"}
              <VisuallyHiddenInput type="file" onChange={handleFileChange} />
            </Button>
            <Button
              onClick={handleUpload}
              variant="contained"
              className="uploadbtn"
            >
              Upload
            </Button>
          </div>
        ) : (
          <div
            onClick={() => {
              toast.error("Please Login First", {
                position: "bottom-center",
              });
            }}
          >
            <Button
              variant="contained"
              component="label"
              role={undefined}
              tabIndex={-1}
              startIcon={<CloudUploadIcon />}
              disabled
            >
              Upload file
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
