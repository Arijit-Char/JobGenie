import { useEffect, useMemo, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import "./App.scss";
import Header from "./components/Header/Header";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Hero from "./components/Hero/Hero";
import Registration from "./components/Form/Registration";
import Login from "./components/Form/Login";
import { Toaster } from "react-hot-toast";
import Pjobs from "./components/Personalizedjobs/Pjobs";
import PersonalizedJobListings from "./components/Personalizedjobs/PersonalizedJobListings/PersonalizedJobListings";
import Jobdetails from "./components/JobDetails/Jobdetails";

const App = () => {
  const [init, setInit] = useState(false);
  useEffect(() => {
    const storedItem = localStorage.getItem("token");

    if (storedItem) {
      const parsedItem = JSON.parse(storedItem);
      const expirationTime = parsedItem.expires;
      if (expirationTime && expirationTime < new Date().getTime()) {
        localStorage.removeItem("token");
      }
    }
  }, []);
  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const particlesLoaded = (container) => {
    console.log(container);
  };

  const options = useMemo(
    () => ({
      background: {
        color: {
          value: "#0B0C10",
        },
      },
      fpsLimit: 120,

      interactivity: {
        events: {
          onClick: {
            enable: true,
            mode: "push",
          },
          onHover: {
            enable: true,
            mode: "push",
          },
        },
        modes: {
          repulse: {
            distance: 200,
          },
          push: {
            quantity: 4,
          },
          
        },
      },
      particles: {
        color: {
          value: "#1F2833",
          animation: {
            enable: true,
            speed: 20,
            sync: true,
          },
          number: {
            value: 100,
          },
        },
        links: {
          enable: true,
          distance: 120,
          color: "random",
          opacity: 0.4,
          width: 1,
          triangles: {
            enable: true,
            color: "#66FCF1",
            opacity: 0.2,
          },
        },
        move: {
          enable: true,
          speed: 6,
          direction: "none",
          outModes: "out",
        },
        number: {
          density: {
            enable: true,
          },
          value: 70,
        },
        opacity: {
          value: 0.5,
        },
        shape: {
          type: "circle",
        },
        size: {
          value: { min: 1, max: 3 },
        },
      },
      detectRetina: true,
    }),
    []
  );

  if (init) {
    return (
      <Router>
        <Particles
          id="tsparticles"
          particlesLoaded={particlesLoaded}
          options={options}
          style={{ zIndex: -99 }}
        />
        <Header />
        <Routes>
          <Route path="/" element={<Hero />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/login" element={<Login />} />
          <Route path="/pjobs" element={<Pjobs />} />
          <Route path="/jobdetails" element={<Jobdetails />} />
          <Route
            path="/PersonalizedJobListings"
            element={<PersonalizedJobListings />}
          />
        </Routes>
        <Toaster />
      </Router>
    );
  }

  return <> </>;
};

export default App;
