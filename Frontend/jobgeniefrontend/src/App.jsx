import { useEffect, useMemo, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
// import { loadAll } from "@tsparticles/all"; // if you are going to use `loadAll`, install the "@tsparticles/all" package too.
// import { loadFull } from "tsparticles"; // if you are going to use `loadFull`, install the "tsparticles" package too.
import { loadSlim } from "@tsparticles/slim"; // if you are going to use `loadSlim`, install the "@tsparticles/slim" package too.
// import { loadBasic } from "@tsparticles/basic"; // if you are going to use `loadBasic`, install the "@tsparticles/basic" package too.
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
  // this should be run only once per application lifetime
  useEffect(() => {
    initParticlesEngine(async (engine) => {
      // you can initiate the tsParticles instance (engine) here, adding custom shapes or presets
      // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
      // starting from v2 you can add only the features you need reducing the bundle size
      //await loadAll(engine);
      //await loadFull(engine);
      await loadSlim(engine);
      //await loadBasic(engine);
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
          value: "white",
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
            mode: "repulse",
          },
        },
        modes: {
          push: {
            quantity: 4,
          },
          repulse: {
            distance: 200,
            duration: 0.4,
          },
        },
      },
      particles: {
        color: {
          value: "#ffffff",
        },
        links: {
          color: "#ffffff",
          distance: 150,
          enable: true,
          opacity: 0.5,
          width: 1,
        },
        move: {
          direction: "none",
          enable: true,
          outModes: {
            default: "bounce",
          },
          random: false,
          speed: 6,
          straight: false,
        },
        number: {
          density: {
            enable: true,
          },
          value: 80,
        },
        opacity: {
          value: 0.5,
        },
        shape: {
          type: "circle",
        },
        size: {
          value: { min: 1, max: 5 },
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
          style={{ zIndex: -1 }}
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
