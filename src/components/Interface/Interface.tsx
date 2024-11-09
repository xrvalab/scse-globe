// import { memo } from "react";
import styled, { keyframes } from "styled-components";
import { GlobeMethods } from "react-globe.gl";

// Images
import buWhite from "../../assets/img/bu-white.png";
import xrvaWhite from "../../assets/img/xrva-white-full.png";
import { useState } from "react";

const Logo = styled.div<{ globeOnlyMode: boolean }>`
  pointer-events: none;
  display: flex;
  position: absolute;
  z-index: 2;
  opacity: ${({ globeOnlyMode }) => (globeOnlyMode ? "0.5" : "1")};
  bottom: ${({ globeOnlyMode }) => (globeOnlyMode ? "25px" : "50px")};
  left: ${({ globeOnlyMode }) => (globeOnlyMode ? "25px" : "50px")};
  width: 900px;
  transition: all ease-in-out 1s;

  & h1 {
    font-weight: 900;
    margin: 0;
    text-transform: uppercase;
    font-size: 1.5em;
    padding-left: 20px;
    border-left: solid 1px white;
  }

  .bangor-university-logo {
    min-width: 200px;
    width: 200px;
    height: 57px;
    margin-right: 20px;
    background-size: 200px;
    background-repeat: no-repeat;
    background-image: url(${buWhite});
  }
`;

const timeline = keyframes`
  0% {
    width: 0px;
  }
  100% {
    width: 194px;
  }
`;

const Button = styled.button<{ theme: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.5em;
  color: white;
  min-width: 60px;
  font-weight: bold;
  text-transform: uppercase;
  background: none;
  border: none;
  border-radius: 4px;
  background-color: white;
  display: flex;
  padding: 15px;
  backdrop-filter: blur(10px);
  /* background-color: rgba(255, 255, 255, 0.1); */
  background: ${({ theme }) =>
    theme === true ? "#35142a2a" : "rgba(255, 255, 255, 0.1)"};
  box-shadow: 0px 0px 16px rgba(45, 45, 45, 0.05);
  cursor: pointer;
  margin-right: 10px;

  i + span {
    margin-left: 8px;
  }

  &:last-child {
    margin-right: 0px;
  }

  &:hover {
    background-color: rgba(255, 255, 255, 0.2);
  }

  &:hover[data-tooltip]::after {
    opacity: 1;
    content: attr(data-tooltip);
    position: absolute;
    transform: translateX(-50%);
    height: 25px;
    line-height: 25px;
    color: white;
    white-space: nowrap;
    font-size: 0.5em;
    /* background-color: rgb(16, 16, 16); */
    border-radius: 2px;
    backdrop-filter: blur(10px);
    /* background-color: rgba(255, 255, 255, 0.2); */
    background: ${({ theme }) =>
      theme === true ? "#35142a2a" : "rgba(255, 255, 255, 0.1)"};
    padding: 0px 10px;
    pointer-events: none;
    z-index: 100;
  }

  &:after {
    transition: opacity 0.2s ease-in-out;
    opacity: 0;
    content: attr(data-tooltip);
    position: absolute;
    top: -35px;
    left: 50%;
    transform: translateX(-50%);
    height: 25px;
    line-height: 25px;
    color: white;
    white-space: nowrap;
    font-size: 0.5em;
    /* background-color: rgb(16, 16, 16); */
    backdrop-filter: blur(10px);
    /* background-color: rgba(255, 255, 255, 0.2); */
    background: ${({ theme }) =>
      theme === true ? "#35142a2a" : "rgba(255, 255, 255, 0.1)"};
    border-radius: 2px;
    padding: 0px 10px;
    pointer-events: none;
    z-index: 100;
  }
`;

const Divider = styled.div`
  width: 20px;
`;

const StyledControls = styled.div<{
  globeOnlyMode: boolean;
}>`
  position: absolute;
  z-index: 200;
  display: flex;
  align-self: flex-end;
  bottom: ${({ globeOnlyMode }) => (globeOnlyMode ? "25px" : "50px")};
  right: ${({ globeOnlyMode }) => (globeOnlyMode ? "25px" : "50px")};
  opacity: ${({ globeOnlyMode }) => (globeOnlyMode ? "0.5" : "1")};
  transition: all ease-in-out 1s;
  /* transform: perspective(1000px) rotateX(0deg) rotateY(-10deg); */
`;

const Controls = function ({
  globeRef,
  alumni,
  alumniIndex,
  setAlumniIndex,
  theme,
  setTheme,
  autoPlay,
  setAutoPlay,
  autoRotate,
  setAutoRotate,
  // altitude,
  setAltitude,
  showAboutPanel,
  setShowAboutPanel,
  globeOnlyMode,
  setGlobeOnlyMode,
  setShowInformationPanel,
}: {
  globeRef: React.MutableRefObject<GlobeMethods | undefined>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  alumni: any[];
  alumniIndex: number;
  setAlumniIndex: React.Dispatch<React.SetStateAction<number>>;
  theme: boolean;
  setTheme: React.Dispatch<React.SetStateAction<boolean>>;
  autoPlay: boolean;
  setAutoPlay: React.Dispatch<React.SetStateAction<boolean>>;
  autoRotate: boolean;
  setAutoRotate: React.Dispatch<React.SetStateAction<boolean>>;
  altitude: number;
  setAltitude: React.Dispatch<React.SetStateAction<number>>;
  showAboutPanel: boolean;
  setShowAboutPanel: React.Dispatch<React.SetStateAction<boolean>>;
  globeOnlyMode: boolean;
  setGlobeOnlyMode: React.Dispatch<React.SetStateAction<boolean>>;
  setShowInformationPanel: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const Timeline = styled.div<{
    visible: boolean;
    theme: boolean;
    focusTime: number;
  }>`
    position: absolute;
    bottom: -22px;
    width: 200px;
    height: 12px;
    border-radius: 6px;
    background-color: ${({ theme }) =>
      theme === true ? "#35142a2a" : "rgba(255, 255, 255, 0.1)"};
    transition: opacity 1s ease-in-out;

    &:before {
      opacity: ${({ visible }) => (visible === true ? "1" : "0")};
      content: "";
      position: absolute;
      height: 6px;
      top: 3px;
      left: 3px;
      width: 0px;
      background-color: white;
      border-radius: 3px;
      animation: ${timeline} ${({ focusTime }) => focusTime}s linear infinite;
    }
  `;

  return (
    <StyledControls globeOnlyMode={globeOnlyMode}>
      <Timeline
        theme={theme}
        visible={autoPlay}
        focusTime={alumni[alumniIndex].focusTime / 1000}
      />
      <Button
        theme={theme}
        data-tooltip="Previous"
        onClick={() =>
          setAlumniIndex(
            alumniIndex === 0 ? alumni.length - 1 : alumniIndex - 1
          )
        }
      >
        <i className="fas fa-step-backward"></i>
      </Button>
      <Button
        theme={theme}
        data-tooltip="Pause"
        onClick={() => setAutoPlay(!autoPlay)}
      >
        {autoPlay ? (
          <i className="fas fa-pause"></i>
        ) : (
          <i className="fas fa-play"></i>
        )}
      </Button>
      <Button
        theme={theme}
        data-tooltip="Next"
        onClick={() =>
          setAlumniIndex(
            alumniIndex === alumni.length - 1 ? 0 : alumniIndex + 1
          )
        }
      >
        <i className="fas fa-step-forward"></i>
      </Button>
      <Divider />
      <Button
        theme={theme}
        data-tooltip={globeOnlyMode ? "Focus Alumni" : "Globe Only"}
        onClick={() => {
          document
            .getElementsByClassName("scene-container")[0]
            ?.classList.toggle("centre");
          if (globeOnlyMode) {
            setGlobeOnlyMode(false);
            if (!showAboutPanel) {
              setShowInformationPanel(true);
            }
          } else {
            setGlobeOnlyMode(true);
            // setAutoPlay(false); // TODO: Decide if this is a good thing or not
            globeRef.current!.pointOfView(
              { lat: 43.229542, lng: -4.12301, altitude: 1.85 },
              2000
            );
            setAltitude(1.85);
            setShowInformationPanel(false);
            setShowAboutPanel(false);
          }
        }}
      >
        {globeOnlyMode ? (
          <i className="fas fa-user-graduate"></i>
        ) : (
          <i className="fas fa-globe-europe"></i>
        )}
      </Button>
      <Button
        theme={theme}
        data-tooltip="Re-centre"
        onClick={() => {
          globeRef.current!.pointOfView(
            { lat: 43.229542, lng: -4.12301, altitude: 1.75 },
            2000
          );
        }}
      >
        <i className="fas fa-location"></i>
      </Button>
      {/* <Button
        onClick={() => {
          setAltitude(altitude >= 0.5 ? altitude - 0.5 : 0);
        }}
      >
        <i className="fas fa-plus"></i>
      </Button>
      <Button
        onClick={() => {
          setAltitude(altitude <= 4.5 ? altitude + 0.5 : 5);
        }}
      >
        <i className="fas fa-minus"></i>
      </Button> */}
      <Button
        theme={theme}
        data-tooltip="Auto Rotate"
        onClick={() => {
          globeRef.current!.controls().autoRotate =
            !globeRef.current!.controls().autoRotate;
          setAutoRotate(!autoRotate);
        }}
      >
        <i className="fas fa-sync fa-stack-1x"></i>
        {autoRotate ? null : <i className="fas fa-slash fa-stack-1x"></i>}
      </Button>
      <Button
        theme={theme}
        data-tooltip="Switch Theme"
        onClick={() => {
          setTheme(!theme);
        }}
      >
        {theme ? (
          <i className="fas fa-moon"></i>
        ) : (
          <i className="fas fa-sun"></i>
        )}
      </Button>
      <Button
        theme={theme}
        data-tooltip="About"
        onClick={() => {
          if (globeOnlyMode) {
            setShowInformationPanel(false);
            setShowAboutPanel(!showAboutPanel);
          } else if (showAboutPanel) {
            setShowAboutPanel(false);
            setShowInformationPanel(true);
          } else if (!showAboutPanel) {
            setShowAboutPanel(true);
            setShowInformationPanel(false);
          }
        }}
      >
        {showAboutPanel ? (
          <i className="far fa-info-circle"></i>
        ) : (
          <i className="fas fa-info-circle"></i>
        )}
      </Button>
    </StyledControls>
  );
};

const StyledInterface = styled.main`
  position: absolute;
  z-index: 100;
  height: 100%;
  /* transform: perspective(1000px) rotateX(0deg) rotateY(3deg); */
`;

const InformationPanel = styled.section<{ show: boolean; theme: boolean }>`
  pointer-events: none;
  position: absolute;
  top: 50px;
  left: ${({ show }) => (show === true ? "50px" : "-2500px")};
  width: 700px;
  height: calc(100% - 300px);
  border-radius: 8px;
  backdrop-filter: blur(10px);
  background: ${({ theme }) =>
    theme === true
      ? "linear-gradient(to bottom left, #35142a7b, #35142a2a)"
      : "linear-gradient(to bottom left,rgba(255, 255, 255, 0.1),rgba(255, 255, 255, 0.025))"};
  box-shadow: 0px 0px 16px rgba(45, 45, 45, 0.05);
  padding: 40px;
  transition: left ease-in-out 0.75s;
  /* overflow: auto; */
  overflow: hidden;

  .alumni-profile {
    text-transform: uppercase;
    font-style: italic;
    margin: 0px 0px 8px 0px;
    margin-left: 5px;
    font-weight: 300;
  }

  h2 {
    &.about {
      width: 100%;
      font-size: 3.5em;
    }
    width: 470px;
    margin: 0px;
    text-transform: uppercase;
    font-size: 4.2em;
    line-height: 0.9em;
    font-weight: 900;
    /* text-shadow: 0px 0px 4px rgba(0, 0, 0, 0.2); */
    /* font-size: 72px; */
    background: linear-gradient(to left, #ffedfb, #ffbced);
    /* background: linear-gradient(to left, #f6cef7, #7f9fca); */
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  h3 {
    font-size: 1.6em;
    margin: 25px 0px 0px 0px;
    text-shadow: 0px 0px 4px rgba(0, 0, 0, 0.2);
    width: 470px;
  }

  h4 {
    font-size: 1.25em;
    margin: 10px 0px 25px 0px;
    text-shadow: 0px 0px 4px rgba(0, 0, 0, 0.2);
    font-weight: 300;
    font-style: italic;
  }

  ul,
  p {
    font-size: 1.25em;
    text-shadow: 0px 0px 4px rgba(0, 0, 0, 0.2);
  }
`;

const Avatar = styled.img`
  position: absolute;
  top: 30px;
  right: 30px;
  border-radius: 50%;
  width: 200px;
  height: 200px;
  border: solid 4px white;
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.2);
`;

const LocationPin = styled.i`
  font-size: 0.9em;
  margin-right: 2px;
`;

const Degrees = styled.div`
  font-weight: bold;

  p {
    margin: 0px;

    span {
      margin-right: 5px;
    }
  }
`;

const About = styled.div`
  border-left: solid 4px white;
  padding-left: 15px;
  margin-top: 25px;
  font-style: italic;

  p {
    font-size: 1.1em;
  }

  p:first-child {
    margin-top: 0px;
  }

  p:last-child {
    margin-bottom: 0px;
  }
`;

const XRVALogo = styled.div`
  display: block;
  background-image: url(${xrvaWhite});
  background-size: 100%;
  width: 300px;
  height: 60px;
  background-repeat: no-repeat;
`;

const Interface = ({
  globeRef,
  alumni,
  alumniIndex,
  setAlumniIndex,
  theme,
  setTheme,
  autoPlay,
  setAutoPlay,
  autoRotate,
  setAutoRotate,
  altitude,
  setAltitude,
  globeOnlyMode,
  setGlobeOnlyMode,
}: {
  globeRef: React.MutableRefObject<GlobeMethods | undefined>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  alumni: any[];
  alumniIndex: number;
  setAlumniIndex: React.Dispatch<React.SetStateAction<number>>;
  theme: boolean;
  setTheme: React.Dispatch<React.SetStateAction<boolean>>;
  autoPlay: boolean;
  setAutoPlay: React.Dispatch<React.SetStateAction<boolean>>;
  autoRotate: boolean;
  setAutoRotate: React.Dispatch<React.SetStateAction<boolean>>;
  altitude: number;
  setAltitude: React.Dispatch<React.SetStateAction<number>>;
  globeOnlyMode: boolean;
  setGlobeOnlyMode: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [showAboutPanel, setShowAboutPanel] = useState(false);
  const [showInformationPanel, setShowInformationPanel] = useState(true);

  return (
    <>
      <StyledInterface>
        <InformationPanel show={showInformationPanel} theme={theme}>
          <p className="alumni-profile">Alumni Profile</p>
          <h2>{alumni[alumniIndex].name}</h2>
          <Avatar
            src={"avatars/" + alumni[alumniIndex].avatar}
            alt={alumni[alumniIndex].name}
          />
          <h3>
            {alumni[alumniIndex].jobTitle},{" "}
            <span>{alumni[alumniIndex].organisation}</span>
          </h3>
          <h4>
            <LocationPin className="fas fa-map-marker-alt" />{" "}
            {alumni[alumniIndex].city}, {alumni[alumniIndex].country}
          </h4>
          <Degrees>
            {alumni[alumniIndex].degrees.map((el: string, i: number) => (
              <p key={`degree-${alumniIndex}-${i}`}>
                <span className="fas fa-graduation-cap"></span> {el}
              </p>
            ))}
          </Degrees>
          <About>
            {alumni[alumniIndex].about.map((el: string, i: number) => (
              <p key={`about-${alumniIndex}-${i}`}>{el}</p>
            ))}
          </About>
        </InformationPanel>
        <InformationPanel show={showAboutPanel} theme={theme}>
          <h2 className="about">The SCSE Globe</h2>
          <h3>A Data Visualization Experiment</h3>
          <p>
            The School of Computer Science and Engineering (SCSE) Globe presents
            data from the school alumni database and aisstream.io (for vessel
            tracking). The visualization is powered by:
          </p>
          <ul>
            <li>TypeScript</li>
            <li>ReactJS</li>
            <li>WebGL (ThreeJS)</li>
            <li>Globe.GL</li>
            <li>Font Awesome</li>
          </ul>
          <h3>Credits</h3>
          <p>
            Special thanks to Yvonne Scutt-Jones and our fantastic alumni for
            contributing content for the alumni database.
          </p>
          <p>
            Source available:{" "}
            <strong>github.com/pbutcher/scse-globe-react-ts</strong>
          </p>
          <p>
            Created by: <strong>Dr Peter Butcher</strong> (XReality,
            Visualization, and Analytics Lab)
          </p>
          <XRVALogo />
        </InformationPanel>
        <Logo globeOnlyMode={globeOnlyMode}>
          <div className="bangor-university-logo"></div>
          <h1>
            School of Computer
            <br />
            Science and Engineering
          </h1>
        </Logo>
      </StyledInterface>
      <Controls
        globeRef={globeRef}
        alumni={alumni}
        alumniIndex={alumniIndex}
        setAlumniIndex={setAlumniIndex}
        theme={theme}
        setTheme={setTheme}
        autoPlay={autoPlay}
        setAutoPlay={setAutoPlay}
        autoRotate={autoRotate}
        setAutoRotate={setAutoRotate}
        altitude={altitude}
        setAltitude={setAltitude}
        showAboutPanel={showAboutPanel}
        setShowAboutPanel={setShowAboutPanel}
        globeOnlyMode={globeOnlyMode}
        setGlobeOnlyMode={setGlobeOnlyMode}
        setShowInformationPanel={setShowInformationPanel}
      />
    </>
  );
};

export default Interface;
