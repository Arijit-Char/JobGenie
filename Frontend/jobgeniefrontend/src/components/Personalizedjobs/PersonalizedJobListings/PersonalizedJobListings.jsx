import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./PersonalizedJobListings.scss";
import { GetJobListingByKeyword } from "../../../actions/user";
const obj = [
  {
    id: "3754935046",
    title: "Lead Web Engineer",
    url: "https://www.linkedin.com/jobs/view/3754935046",
    referenceId: "GEoMzi4A5/pcDkl0Vfc46g==",
    posterId: "10857195",
    company: {
      name: "Rapid7",
      logo: "https://media.licdn.com/dms/image/C4D0BAQGSxHKxsej2mw/company-logo_200_200/0/1637766743827/rapid7_logo?e=1720656000&v=beta&t=RbnfahGJB0tj-tXj5rTLEGwxNsSginYqYPyQatOPsqQ",
      url: "https://www.linkedin.com/company/rapid7/life",
      staffCountRange: {},
      headquarter: {},
    },
    location: "Prague, Prague, Czechia (Hybrid)",
    type: "Full-time",
    postDate: "3 weeks ago",
  },
  {
    id: "3870554516",
    title: "IT Developer (m/ž)",
    url: "https://www.linkedin.com/jobs/view/3870554516",
    referenceId: "GEoMzi4A5/pcDkl0Vfc46g==",
    posterId: "579802472",
    company: {
      name: "T-Mobile Czech Republic a.s.",
      logo: "https://media.licdn.com/dms/image/D4E0BAQHifdz6rvd-mg/company-logo_200_200/0/1692018048255/t_mobile_czech_republic_a_s__logo?e=1720656000&v=beta&t=uruZqwXHJag78X8OCCcil8BTAZiC1rwEoMDDGNz_wko",
      url: "https://www.linkedin.com/company/t-mobile-czech-republic-a-s-/life",
      staffCountRange: {},
      headquarter: {},
    },
    location: "Prague, Czechia (Hybrid)",
    type: "Full-time",
    postDate: "2 weeks ago",
  },
  {
    id: "3500666760",
    title:
      "Lead / Staff Full Stack Software Engineer (Bangkok based, relocation provided)",
    url: "https://www.linkedin.com/jobs/view/3500666760",
    referenceId: "GEoMzi4A5/pcDkl0Vfc46g==",
    posterId: "243073352",
    company: {
      name: "Agoda",
      logo: "https://media.licdn.com/dms/image/C4D0BAQGBa_7QNZNwpw/company-logo_200_200/0/1656643826660/agoda_logo?e=1720656000&v=beta&t=SSdjbI0iIxqNYnHpgmrj8XdHO_jxm-dwDdQomCn0kjY",
      url: "https://www.linkedin.com/company/agoda/life",
      staffCountRange: {},
      headquarter: {},
    },
    location: "Prague, Prague, Czechia (Hybrid)",
    type: "Full-time",
    postDate: "3 weeks ago",
  },
  {
    id: "3866187868",
    title:
      "Principal Software Engineer, Full Stack (Bangkok based, relocation provided)",
    url: "https://www.linkedin.com/jobs/view/3866187868",
    referenceId: "GEoMzi4A5/pcDkl0Vfc46g==",
    posterId: "243073352",
    company: {
      name: "Agoda",
      logo: "https://media.licdn.com/dms/image/C4D0BAQGBa_7QNZNwpw/company-logo_200_200/0/1656643826660/agoda_logo?e=1720656000&v=beta&t=SSdjbI0iIxqNYnHpgmrj8XdHO_jxm-dwDdQomCn0kjY",
      url: "https://www.linkedin.com/company/agoda/life",
      staffCountRange: {},
      headquarter: {},
    },
    location: "Ostrava, Moravia-Silesia, Czechia (Hybrid)",
    type: "Full-time",
    postDate: "2 weeks ago",
  },
  {
    id: "3855632680",
    title: "Senior JavaScript Developer (video engineering)",
    url: "https://www.linkedin.com/jobs/view/3855632680",
    referenceId: "GEoMzi4A5/pcDkl0Vfc46g==",
    posterId: "5826437",
    company: {
      name: "Stats Perform",
      logo: "https://media.licdn.com/dms/image/C4D0BAQFIB680At5Q0A/company-logo_200_200/0/1630510886435/stats_perform_logo?e=1720656000&v=beta&t=2MPX-8g9dzBqL4_4q4xijeeOcKE3o192qZ__vF_6wlU",
      url: "https://www.linkedin.com/company/stats-perform/life",
      staffCountRange: {},
      headquarter: {},
    },
    location: "Prague, Czechia (Hybrid)",
    type: "Full-time",
    postDate: "3 weeks ago",
  },
  {
    id: "3748553993",
    title: "Java Developer",
    url: "https://www.linkedin.com/jobs/view/3748553993",
    referenceId: "GEoMzi4A5/pcDkl0Vfc46g==",
    posterId: "571530542",
    company: {
      name: "CoolPeople",
      logo: "https://media.licdn.com/dms/image/C560BAQHrXVbenQgr8g/company-logo_200_200/0/1649766554873/coolpeople_logo?e=1720656000&v=beta&t=PlNM4RDjCC0rqjuiYUTLcg9A5hpDaB6eadj43Uvpe_8",
      url: "https://www.linkedin.com/company/coolpeople/life",
      staffCountRange: {},
      headquarter: {},
    },
    location: "Brno, South Moravia, Czechia (Hybrid)",
    type: "Full-time",
    postDate: "1 month ago",
  },
  {
    id: "3770536061",
    title: "PHP Developer",
    url: "https://www.linkedin.com/jobs/view/3770536061",
    referenceId: "GEoMzi4A5/pcDkl0Vfc46g==",
    posterId: "571530542",
    company: {
      name: "CoolPeople",
      logo: "https://media.licdn.com/dms/image/C560BAQHrXVbenQgr8g/company-logo_200_200/0/1649766554873/coolpeople_logo?e=1720656000&v=beta&t=PlNM4RDjCC0rqjuiYUTLcg9A5hpDaB6eadj43Uvpe_8",
      url: "https://www.linkedin.com/company/coolpeople/life",
      staffCountRange: {},
      headquarter: {},
    },
    location: "Prague, Prague, Czechia (Hybrid)",
    type: "Full-time",
    postDate: "1 month ago",
  },
  {
    id: "3862904318",
    title: "Backend Developer",
    url: "https://www.linkedin.com/jobs/view/3862904318",
    referenceId: "GEoMzi4A5/pcDkl0Vfc46g==",
    posterId: "193546613",
    company: {
      name: "CGI",
      logo: "https://media.licdn.com/dms/image/C4E0BAQErzXWSFkn9tQ/company-logo_200_200/0/1663664110809/cgi_logo?e=1720656000&v=beta&t=lj-5WWEbhafSyf5gXdEfB-AOY-_HfkBe9bpT19OxGGw",
      url: "https://www.linkedin.com/company/cgi/life",
      staffCountRange: {},
      headquarter: {},
    },
    location: "Ostrava, Moravia-Silesia, Czechia",
    type: "Full-time",
    postDate: "3 weeks ago",
  },
  {
    id: "3835154976",
    title: "Full stack developer",
    url: "https://www.linkedin.com/jobs/view/3835154976",
    referenceId: "GEoMzi4A5/pcDkl0Vfc46g==",
    posterId: "532012290",
    company: {
      name: "HARTMANN GROUP",
      logo: "https://media.licdn.com/dms/image/C560BAQE7gj_RLhZ6CQ/company-logo_200_200/0/1630654917676/hartmann_group_logo?e=1720656000&v=beta&t=8Jskmur7RN1eL-N8Nlfy3Hsdka-_MHTD8PgmVoyaCWA",
      url: "https://www.linkedin.com/company/hartmann-group/life",
      staffCountRange: {},
      headquarter: {},
    },
    location: "Brno, South Moravia, Czechia",
    type: "Full-time",
    postDate: "1 week ago",
  },
  {
    id: "3831467038",
    title: "Technology Application Developer",
    url: "https://www.linkedin.com/jobs/view/3831467038",
    referenceId: "GEoMzi4A5/pcDkl0Vfc46g==",
    posterId: "221409",
    company: {
      name: "Wolters Kluwer",
      logo: "https://media.licdn.com/dms/image/D4E0BAQErfywMAxM8Bg/company-logo_200_200/0/1704196973549/wolters_kluwer_logo?e=1720656000&v=beta&t=6Iiuw3v1z7WL5Hip1GyMVL9hK2uvo3Vyv0PGYm7_IJo",
      url: "https://www.linkedin.com/company/wolters-kluwer/life",
      staffCountRange: {},
      headquarter: {},
    },
    location: "Prague, Prague, Czechia (On-site)",
    type: "Full-time",
    postDate: "1 month ago",
  },
  {
    id: "3866005196",
    title: "SW & Web Developer (HTML/JS/React/Sharepoint)",
    url: "https://www.linkedin.com/jobs/view/3866005196",
    referenceId: "GEoMzi4A5/pcDkl0Vfc46g==",
    posterId: "197207403",
    company: {
      name: "AURES Holdings",
      logo: "https://media.licdn.com/dms/image/C4E0BAQGPyTGApMWddA/company-logo_200_200/0/1660140229089/aures_holdings_logo?e=1720656000&v=beta&t=dqAmZlTyOw2PjYEUfwXdvu75hEoTXNCnESoZHic2YtU",
      url: "https://www.linkedin.com/company/aures-holdings/life",
      staffCountRange: {},
      headquarter: {},
    },
    location: "Prague, Czechia (Hybrid)",
    type: "Full-time",
    postDate: "2 weeks ago",
  },
  {
    id: "3861577131",
    title:
      "Software Engineer - Shape the future of email templating in world-famous US company",
    url: "https://www.linkedin.com/jobs/view/3861577131",
    referenceId: "GEoMzi4A5/pcDkl0Vfc46g==",
    posterId: "903965568",
    company: {
      name: "Manpower IT Czech Republic",
      logo: "https://media.licdn.com/dms/image/D4E0BAQHJ4trNrpU5IA/company-logo_200_200/0/1689682889561/manpower_it_czech_republic_logo?e=1720656000&v=beta&t=UV9aCF9RVNcVtT3diGX2Do3etjHGNnIQvaPmJgOTVF0",
      url: "https://www.linkedin.com/company/manpower-it-czech-republic/life",
      staffCountRange: {},
      headquarter: {},
    },
    location: "Prague, Czechia (Hybrid)",
    type: "Full-time",
    postDate: "2 weeks ago",
  },
  {
    id: "3864008341",
    title: "Senior Software Engineer - Content Management Services",
    url: "https://www.linkedin.com/jobs/view/3864008341",
    referenceId: "GEoMzi4A5/pcDkl0Vfc46g==",
    posterId: "591345762",
    company: {
      name: "Red Hat",
      logo: "https://media.licdn.com/dms/image/C4E0BAQEto-TydTTIfQ/company-logo_200_200/0/1630583759577/red_hat_logo?e=1720656000&v=beta&t=Lv4g4lGVQJZgPPsZ0N5zgdu0c81qoFFTVKKgb8jWbFQ",
      url: "https://www.linkedin.com/company/red-hat/life",
      staffCountRange: {},
      headquarter: {},
    },
    location: "Brno, South Moravia, Czechia (Remote)",
    type: "Full-time",
    postDate: "1 week ago",
  },
  {
    id: "3860161075",
    title: "Software Engineer Intern",
    url: "https://www.linkedin.com/jobs/view/3860161075",
    referenceId: "GEoMzi4A5/pcDkl0Vfc46g==",
    posterId: "89497881",
    company: {
      name: "Accolade, Inc.",
      logo: "https://media.licdn.com/dms/image/C560BAQGbNynQxkMqOg/company-logo_200_200/0/1656694300052/accolade_inc__logo?e=1720656000&v=beta&t=DJD2Bh_j-jHS0CyyO4GmTNHfsijFMSQZx5oEnU9kLMU",
      url: "https://www.linkedin.com/company/accolade-inc-/life",
      staffCountRange: {},
      headquarter: {},
    },
    location: "Prague, Prague, Czechia (Hybrid)",
    type: "Internship",
    postDate: "4 days ago",
  },
  {
    id: "3874604398",
    title: "Intern as Frontend (Full Stack) Engineer - part time",
    url: "https://www.linkedin.com/jobs/view/3874604398",
    referenceId: "GEoMzi4A5/pcDkl0Vfc46g==",
    posterId: "70206951",
    company: {
      name: "Oracle",
      logo: "https://media.licdn.com/dms/image/D4E0BAQHYCgYovUuPtQ/company-logo_200_200/0/1665755678957/oracle_logo?e=1720656000&v=beta&t=TXJv1e-H00kD29mMsq-_ykWc5o8qZWWSsFjDZU9CVLQ",
      url: "https://www.linkedin.com/company/oracle/life",
      staffCountRange: {},
      headquarter: {},
    },
    location: "Prague, Czechia (On-site)",
    type: "Part-time",
    postDate: "1 week ago",
  },
];
export default function PersonalizedJobListings() {
  // const dispatch = useDispatch();
  const [jobsbykey, setJobsbykey] = useState([]);
  // const job = useSelector((state) => state.joblisting.joblisting);

  // useEffect(() => {
  //   if (jobsbykey.length === 0) {
  //     dispatch(GetJobListingByKeyword(job));
  //   }
  // }, [dispatch, job, jobsbykey]);

  // const jobarray = useSelector(
  //   (state) => state.joblistingbykey.joblistingbykey
  // );

  // useEffect(() => {
  //   if (jobarray && jobarray.error && jobarray.error.data) {
  //     setJobsbykey(jobarray.error.data);
  //   }
  // }, [jobarray]);
  useEffect(() => {
    setJobsbykey(obj);
  }, []);

  console.log(jobsbykey);

  return <div>{}</div>;
}
