import { useEffect, useRef, useState } from "react";
import { GlobeMethods } from "react-globe.gl";
import Globe from "./components/Globe";
import styled, { css } from "styled-components";
// import * as THREE from "three";

// Datasets
import hexMapPath from "./assets/datasets/ne_110m_admin_0_countries.json";
import markersPath from "./assets/datasets/static-markers.json";
import alumniPath from "./assets/datasets/alumni.json";

// Images
import buWhite from "./assets/img/bu-white.png";

const Button = styled.button(() => css``);

const StyledButtonGroup = styled.div``;

const ButtonGroup = function ({
  globeRef,
}: {
  globeRef: React.MutableRefObject<GlobeMethods | undefined>;
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
            { lat: 53, lng: -4, altitude: 0.5 },
            5000
          );
        }}
      >
        Bangor
      </Button>
      <Button
        onClick={() => {
          globeRef.current!.controls().autoRotate =
            !globeRef.current!.controls().autoRotate;
        }}
      >
        Rotate
      </Button>
    </StyledButtonGroup>
  );
};

const Interface = styled.main`
  position: absolute;
  z-index: 1;
  height: 100%;
`;

const InformationPane = styled.section`
  position: absolute;
  top: 50px;
  left: 50px;
  width: 600px;
  height: calc(100% - 300px);
  border-radius: 12px;
  backdrop-filter: blur(10px);
  background: linear-gradient(
    to bottom left,
    rgba(255, 255, 255, 0.4),
    rgba(255, 255, 255, 0.1)
  );
  box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.025);
  padding: 40px;

  h2 {
    margin: 0px;
    text-transform: uppercase;
    font-size: 5em;
    line-height: 0.9em;
    font-weight: 900;
    text-shadow: 0px 0px 4px rgba(0, 0, 0, 0.2);
  }

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

function App() {
  const theme = true; // FIXME: Currently a compile-time variable, true = light
  // const [markers] = useState(markersPath);
  // const [alumni] = useState(alumniPath);
  // const [markerIndex, setMarkerIndex] = useState(0);
  const [alumniIndex, setAlumniIndex] = useState(0);
  const [backgroundColor] = useState("rgba(0,0,0,0)");
  const [atmosphereColor] = useState(theme ? 0xffeeff : 0x9a729b);
  const [globeColor] = useState(theme ? 0xffcbff : 0x3a173c);
  const [hexPolygonColor] = useState(0xc07ec0);

  // Hex map
  const hexMap = hexMapPath.features;

  // Markers
  const markers = markersPath;

  // Alumni
  const alumni = alumniPath;

  // Globe Ref
  const globeRef = useRef<GlobeMethods>();

  useEffect(() => {
    const body = document.querySelector("body");
    if (body) {
      if (theme) {
        body.style.background = "linear-gradient(to right, #9688da, #ff92db)";
      } else {
        body.style.background = "linear-gradient(to right, #110e1b, #35142a)";
      }
    }
  }, []);

  // Cycle through alumni
  useEffect(() => {
    const interval = setInterval(() => {
      // Next alumni index
      const nextAlumniIndex =
        alumniIndex === alumni.length - 1 ? 0 : alumniIndex + 1;

      // Toggle active
      alumni[alumniIndex].active = false;
      alumni[nextAlumniIndex].active = true;

      // Change point of view
      globeRef.current!.pointOfView(
        alumni[nextAlumniIndex].focus,
        alumni[nextAlumniIndex].transitionTime
      );

      // Update marker index
      setAlumniIndex(alumniIndex === alumni.length - 1 ? 0 : alumniIndex + 1);
    }, alumni[alumniIndex].focusTime);
    return () => clearInterval(interval);
  }, [alumniIndex, alumni]);

  const globeProps = {
    // React
    globeRef,

    // Custom
    globeColor,
    transitionTime: 5000,
    initialPointOfView: alumni[alumniIndex].focus,

    // Controls
    autoRotate: true,
    autoRotateSpeed: 0.25,

    // Container Layout
    width: 2100,
    backgroundColor,

    // Globe Layer
    atmosphereColor,
    atmosphereAltitude: 0.5,
    // onGlobeReady,

    // Hex Polygon layer,
    hexPolygonsData: hexMap,
    hexPolygonResolution: 3, // 4 potentially too high
    hexPolygonCurvatureResolution: 5,
    hexPolygonMargin: 0.6,
    hexPolygonColor,

    // Points Layer
    pointsData: [...markers, ...alumni],
    pointResolution: 6,
    pointRadius: 0.2,
    // pointColor: (d: any) => (d.active ? "#ffe5b9aa" : d.color),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    pointColor: (d: any) => (d.active ? "#13c8ffb9" : "#0e9fcbdc"), // d.color
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    pointAltitude: (d: any) => (d.active ? 0.3 : 0.05),
  };

  return (
    <>
      <Interface>
        <InformationPane>
          <h2>Information Pane Title</h2>
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
        </InformationPane>
      </Interface>
      <Footer>
        <div className="bangor-university-logo"></div>
        <h1>
          School of Computer
          <br />
          Science and Engineering
        </h1>
        <ButtonGroup globeRef={globeRef} />
      </Footer>
      <Globe {...globeProps} />
    </>
  );
}

export default App;
