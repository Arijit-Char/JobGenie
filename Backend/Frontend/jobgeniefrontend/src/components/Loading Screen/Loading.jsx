import React, { useState, useEffect } from "react";
import { ThreeDot } from "react-loading-indicators";
import "./Loading.scss";

const LoadingScreen = () => {
  return (
    <>
      <div className="loading-screen">
        <div className="loading-content">
          <ThreeDot variant="bounce" color="#66fcf1" size="large" />
          <div className="loading-text">
            Patience, hustler, we're almost there!
          </div>
        </div>
      </div>
    </>
  );
};

export default LoadingScreen;
