import styled, { css } from "styled-components";
import { GlobeMethods } from "react-globe.gl";

// Images
import buWhite from "../assets/img/bu-white.png";
import { useEffect, useState } from "react";

const Logo = styled.div`
  display: flex;
  & h1 {
    font-weight: 900;
    margin: 0;
    text-transform: uppercase;
    font-size: 1.5em;
    padding-left: 20px;
    border-left: solid 1px white;
  }

  .bangor-university-logo {
    width: 200px;
    height: 57px;
    margin-right: 20px;
    background-size: 200px;
    background-repeat: no-repeat;
    background-image: url(${buWhite});
  }
`;

const Button = styled.button(
  () => css`
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.5em;
    color: white;
    min-width: 50px;
    font-weight: bold;
    text-transform: uppercase;
    background: none;
    border: none;
    border-radius: 4px;
    background-color: white;
    display: flex;
    padding: 15px;
    backdrop-filter: blur(10px);
    background-color: rgba(255, 255, 255, 0.1);
    box-shadow: 0px 0px 16px rgba(45, 45, 45, 0.05);
    cursor: pointer;
    margin-right: 10px;

    i + span {
      margin-left: 8px;
    }

    &:last-child {
      margin-right: 0px;
    }
  `
);

const StyledButtonGroup = styled.div`
  display: flex;
  align-self: flex-end;
`;

const ButtonGroup = function ({
  globeRef,
  theme,
  setTheme,
  autoPlay,
  setAutoPlay,
  autoRotate,
  setAutoRotate,
  // altitude,
  // setAltitude,
  showAbout,
  setShowAbout,
}: {
  globeRef: React.MutableRefObject<GlobeMethods | undefined>;
  theme: boolean;
  setTheme: React.Dispatch<React.SetStateAction<boolean>>;
  autoPlay: boolean;
  setAutoPlay: React.Dispatch<React.SetStateAction<boolean>>;
  autoRotate: boolean;
  setAutoRotate: React.Dispatch<React.SetStateAction<boolean>>;
  altitude: number;
  setAltitude: React.Dispatch<React.SetStateAction<number>>;
  showAbout: boolean;
  setShowAbout: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <StyledButtonGroup>
      <Button
        onClick={() => {
          globeRef.current!.pointOfView(
            { lat: 20, lng: 0, altitude: 1.75 },
            5000
          );
        }}
      >
        Reset
      </Button>
      <Button
        onClick={() => {
          globeRef.current!.pointOfView(
            { lat: 53, lng: -4, altitude: 0.25 },
            5000
          );
        }}
      >
        <i className="fas fa-location"></i>
      </Button>
      <Button onClick={() => setAutoPlay(!autoPlay)}>
        {autoPlay ? (
          <i className="fas fa-pause"></i>
        ) : (
          <i className="fas fa-play"></i>
        )}
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
        onClick={() => {
          setTheme(!theme);
        }}
      >
        {theme ? (
          <i className="fas fa-sun"></i>
        ) : (
          <i className="fas fa-moon"></i>
        )}
      </Button>
      <Button
        onClick={() => {
          setShowAbout(!showAbout);
        }}
      >
        {showAbout ? (
          <i className="far fa-info-circle"></i>
        ) : (
          <i className="fas fa-info-circle"></i>
        )}
      </Button>
    </StyledButtonGroup>
  );
};

const StyledInterface = styled.main`
  position: absolute;
  z-index: 5;
  height: 100%;
`;

const InformationPanel = styled.section<{ visible: boolean }>`
  position: absolute;
  top: 50px;
  left: ${({ visible }) => (visible ? "50px" : "-1500px")};
  width: 600px;
  height: calc(100% - 300px);
  border-radius: 8px;
  backdrop-filter: blur(10px);
  background: linear-gradient(
    to bottom left,
    rgba(255, 255, 255, 0.1),
    rgba(255, 255, 255, 0.025)
  );
  box-shadow: 0px 0px 16px rgba(45, 45, 45, 0.05);
  padding: 40px;
  transition: left ease-in-out 0.75s;

  h2 {
    margin: 0px;
    text-transform: uppercase;
    font-size: 4.2em;
    line-height: 1em;
    font-weight: 900;
    text-shadow: 0px 0px 4px rgba(0, 0, 0, 0.2);
  }

  h3 {
    font-size: 2em;
    margin: 20px 0px 0px 0px;
    text-shadow: 0px 0px 4px rgba(0, 0, 0, 0.2);
  }

  ul,
  p {
    font-size: 1.25em;
    text-shadow: 0px 0px 4px rgba(0, 0, 0, 0.2);
  }
`;
const Footer = styled.footer`
  display: flex;
  position: absolute;
  z-index: 2;
  bottom: 50px;
  left: 50px;
  width: calc(100% - 100px);
  justify-content: space-between;
`;

const Interface = ({
  globeRef,
  theme,
  setTheme,
  autoPlay,
  setAutoPlay,
  autoRotate,
  setAutoRotate,
  altitude,
  setAltitude,
}: {
  globeRef: React.MutableRefObject<GlobeMethods | undefined>;
  theme: boolean;
  setTheme: React.Dispatch<React.SetStateAction<boolean>>;
  autoPlay: boolean;
  setAutoPlay: React.Dispatch<React.SetStateAction<boolean>>;
  autoRotate: boolean;
  setAutoRotate: React.Dispatch<React.SetStateAction<boolean>>;
  altitude: number;
  setAltitude: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const [showAbout, setShowAbout] = useState(false);
  const [showInformationPanel, setShowInformationPanel] = useState(true);

  useEffect(() => {
    if (showAbout) {
      setShowInformationPanel(false);
    } else {
      setShowInformationPanel(true);
    }
  }, [showAbout]);

  return (
    <>
      <StyledInterface>
        <InformationPanel visible={showInformationPanel}>
          <h2>Information Panel Title</h2>
          <h3>Subtitle/Location</h3>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
            lorem mauris, facilisis ut varius et, rhoncus in felis. Curabitur
            justo metus, euismod blandit nibh vitae, hendrerit commodo nisi.
            Phasellus facilisis eros eget lacus aliquam scelerisque. Maecenas
            pulvinar ex ac urna dignissim, et vulputate urna tincidunt.
            Pellentesque rutrum, ipsum id ornare rhoncus, risus leo vehicula
            leo, vitae vulputate sem libero et lacus. Proin sodales imperdiet
            quam, hendrerit tristique ligula consequat quis. Morbi scelerisque
            risus eget semper fringilla. Sed accumsan eget nisi a gravida. Nulla
            facilisi. Donec est lorem, vestibulum convallis urna ac, mattis
            rhoncus quam. Ut vel lacus nec sapien scelerisque porta id at dolor.
          </p>
        </InformationPanel>
        <InformationPanel visible={showAbout}>
          <h2>About the SCSE Globe</h2>
          <h3>A Data Visualization Experiment</h3>
          <p>
            The School of Computer Science and Engineering Globe presents data
            from the school alumni database and aisstream.io (for vessel
            tracking). The visualization is powered by:
          </p>
          <ul>
            <li>TypeScript</li>
            <li>ReactJS</li>
            <li>WebGL (ThreeJS)</li>
            <li>Globe.GL</li>
            <li>Font Awesome</li>
          </ul>
          <p>Created by Dr Peter Butcher</p>
          <p>Source available: github.io/pbutcher/scse-globe-react-ts</p>
        </InformationPanel>
      </StyledInterface>
      <Footer>
        <Logo>
          <div className="bangor-university-logo"></div>
          <h1>
            School of Computer
            <br />
            Science and Engineering
          </h1>
        </Logo>
        <ButtonGroup
          globeRef={globeRef}
          theme={theme}
          setTheme={setTheme}
          autoPlay={autoPlay}
          setAutoPlay={setAutoPlay}
          autoRotate={autoRotate}
          setAutoRotate={setAutoRotate}
          altitude={altitude}
          setAltitude={setAltitude}
          showAbout={showAbout}
          setShowAbout={setShowAbout}
        />
      </Footer>
    </>
  );
};

export default Interface;
