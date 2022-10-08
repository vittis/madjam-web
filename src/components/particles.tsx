import { useCallback } from "react";
import { default as ReactParticles } from "react-tsparticles";
import { loadFull } from "tsparticles";
import type { Container, Engine } from "tsparticles-engine";

const Particles = () => {
  const particlesInit = useCallback(async (engine: Engine) => {
    console.log(engine);

    // you can initialize the tsParticles instance (engine) here, adding custom shapes or presets
    // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
    // starting from v2 you can add only the features you need reducing the bundle size
    await loadFull(engine);
  }, []);

  const particlesLoaded = useCallback(
    async (container: Container | undefined) => {
      await console.log(container);
    },
    []
  );
  return (
    <ReactParticles
      id="tsparticles"
      className="particles-wrapper"
      init={particlesInit}
      loaded={particlesLoaded}
      options={{
        backgroundMode: {
          enable: true,
        },
        fpsLimit: 60,
        particles: {
          number: {
            value: 45,
            density: {
              enable: true,
              value_area: 1000,
            },
          },
          color: {
            value: "#fff",
          },
          size: {
            value: 2,
            random: true,
          },
          line_linked: {
            enable: false,
            distance: 60,
            color: "#fff",
            opacity: 0.3,
            width: 1,
          },
          move: {
            enable: true,
            speed: 1,
            direction: "top",
            random: true,
          },
        },
        interactivity: {
          detect_on: "window",
          events: {
            onhover: {
              enable: true,
              mode: "bubble",
            },
          },
          modes: {
            bubble: {
              distance: 350,
              size: 0,
              duration: 2,
              opacity: 0,
              speed: 3,
            },
          },
        },
        retina_detect: true,
      }}
    />
  );
};

export default Particles;
