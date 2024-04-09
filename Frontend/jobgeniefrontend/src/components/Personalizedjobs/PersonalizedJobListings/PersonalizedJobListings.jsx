import React from "react";
import { useSelector } from "react-redux";
import "./PersonalizedJobListings.scss";
export default function PersonalizedJobListings() {
  const jobs = useSelector((state) => state.joblisting.joblisting);

  return <div>{jobs}</div>;
}
