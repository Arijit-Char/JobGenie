import React from "react";
import "./Pjobs.scss";

export default function Cards({job}) {
  return (
    <div className="card">
      <h2>{job}</h2>
    </div>
  );
}
