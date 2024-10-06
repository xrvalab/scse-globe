import { useEffect, useRef, useState } from "react";
import { GlobeMethods } from "react-globe.gl";
import Globe from "./components/Globe";
import styled, { css } from "styled-components";

// Three
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
  border-radius: 8px;
  backdrop-filter: blur(10px);
  background: linear-gradient(
    to bottom left,
    rgba(255, 255, 255, 0.1),
    rgba(255, 255, 255, 0.025)
  );
  box-shadow: 0px 0px 16px rgba(45, 45, 45, 0.05);
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

interface IData {
  id: number;
  label: string;
  lat: number;
  lng: number;
  startLat: number;
  startLng: number;
  endLat: number;
  endLng: number;
  focus: {
    lat: number;
    lng: number;
    altitude: number;
  };
  focusTime: number;
  transitionTime: number;
  size: number;
  color: string;
  activeColor: string;
}

function App() {
  const theme = true; // FIXME: Currently a compile-time variable, true = light
  // const [alumni] = useState(alumniPath);
  // const [markerIndex, setMarkerIndex] = useState(0);
  const [alumni] = useState(alumniPath);
  const [markers] = useState(markersPath);
  const [alumniIndex, setAlumniIndex] = useState(0);
  const [backgroundColor] = useState("rgba(0,0,0,0)");
  const [atmosphereColor] = useState(theme ? 0xffeeff : 0x9a729b);
  const [globeColor] = useState(theme ? 0xffcbff : 0x3a173c);
  const [hexPolygonColor] = useState(0xc07ec0);
  const [pointsData, setPointsData] = useState<IData[]>([]);
  const [arcsData, setArcsData] = useState<IData[]>([]);

  // Hex map
  const hexMap = hexMapPath.features;

  // Points
  const alumniPointActiveColor = "#3dd2ffb8";
  const alumniPointColor = "#0e9fcbdc";

  // Globe Ref
  const globeRef = useRef<GlobeMethods>();

  const markerSvg = `<svg viewBox="-4 0 36 36">
    <path fill="currentColor" d="M14,0 C21.732,0 28,5.641 28,12.6 C28,23.963 14,36 14,36 C14,36 0,24.064 0,12.6 C0,5.641 6.268,0 14,0 Z"></path>
    <circle fill="black" cx="14" cy="14" r="7"></circle>
  </svg>`;

  useEffect(() => {
    // Data
    setPointsData([...alumni, ...markers].map((d) => Object.assign({}, d)));
    setArcsData(alumni.map((d) => Object.assign({}, d)));
  }, []);

  useEffect(() => {
    const body = document.querySelector("body");
    if (body) {
      if (theme) {
        body.style.background = "linear-gradient(to right, #9688da, #ff92db)";
      } else {
        body.style.background = "linear-gradient(to right, #110e1b, #35142a)";
      }
    }
  }, [theme]);

  // Cycle through alumni
  useEffect(() => {
    const interval = setInterval(() => {
      // Next alumni index
      const nextAlumniIndex =
        alumniIndex === alumni.length - 1 ? 0 : alumniIndex + 1;

      // Change point of view
      globeRef.current!.pointOfView(
        alumni[nextAlumniIndex].focus,
        alumni[nextAlumniIndex].transitionTime
      );
      // Update marker index
      setAlumniIndex(alumniIndex === alumni.length - 1 ? 0 : alumniIndex + 1);
      // }, alumni[alumniIndex].focusTime); // FIXME: <--
    }, 5000);
    return () => clearInterval(interval);
  }, [alumniIndex, alumni]);

  // Accessors
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const pointColor = (d: any) =>
    alumniIndex === d.id ? alumniPointActiveColor : alumniPointColor;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const pointAltitude = (d: any) => (alumniIndex === d.id ? 0.3 : 0.05);

  const globeProps = {
    // React
    globeRef,

    // Custom
    globeColor,
    transitionTime: 5000,
    initialPointOfView: alumni[alumniIndex].focus,

    // Controls
    autoRotate: true,
    autoRotateSpeed: 0.15,

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
    pointsData,
    pointResolution: 6,
    pointRadius: 0.2,
    pointColor,
    pointAltitude,

    // Arcs Layer
    arcsData,
    arcColor: () => "#35142a",
    arcStroke: 0.2,

    // // HTML Layer
    // htmlElementsData: alumni,
    // // eslint-disable-next-line @typescript-eslint/no-explicit-any
    // htmlElement: (d: any) => {
    //   const el = document.createElement("div");
    //   el.innerHTML = markerSvg;
    //   el.style.color = d.color;
    //   el.style.width = `${d.size}px`;

    //   // el.style['pointer-events'] = 'auto';
    //   el.style.cursor = "pointer";
    //   el.onclick = () => console.info(d);
    //   return el;
    // },
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
