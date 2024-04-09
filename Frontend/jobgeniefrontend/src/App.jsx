import "./App.scss";
import Header from "./components/Header/Header";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Hero from "./components/Hero/Hero";
import Registration from "./components/Form/Registration";
import Login from "./components/Form/Login";
import toast, { Toaster } from "react-hot-toast";
import Pjobs from "./components/Personalizedjobs/Pjobs";
import PersonalizedJobListings from "./components/Personalizedjobs/PersonalizedJobListings/PersonalizedJobListings";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/login" element={<Login />} />
        <Route path="/pjobs" element={<Pjobs />} />
        <Route path="/PersonalizedJobListings" element={<PersonalizedJobListings />} />
      </Routes>
      <Toaster />
    </Router>
  );
}

export default App;
