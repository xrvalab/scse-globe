import { useEffect, useRef, useState } from "react";
import { GlobeMethods } from "react-globe.gl";

// Components
import { Globe, Interface } from "./components";

// Three
import * as THREE from "three";

// Types
import { IData, IRingData } from "./types";

// Datasets
import hexMapPath from "./assets/datasets/ne_110m_admin_0_countries.json";
import markersPath from "./assets/datasets/static-markers.json";
import alumniPath from "./assets/datasets/alumni.json";

// Utils
import { getDistanceFromLatLngInKm } from "./utils";

// Globe display scale-up
const globeScaleUp = 1.39;

// Default altitude
const defaultAltitude = 1;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const arcDashAnimateTime = (d: any) =>
  getDistanceFromLatLngInKm(d.startLat, d.startLng, d.endLat, d.endLng);
const arcDashInitialGap = 0;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const markerHTML = (d: any) =>
  `<div style='
    width: 30px;
    height: 30px;
    border-radius: ${d.id === -1 ? "0%" : "50%"};
    background-image:
    url(/avatars/${d.avatar});
    transform: translate(-4px, -4px);
    background-repeat: no-repeat;
    background-size: 30px;
    animation: fadein ${d.id === -1 ? "0s" : "1s"} ease-in-out;
    animation-iteration-count: 1;
    animation-delay: ${d.id === -1 ? "0s" : "1s"};
    opacity: 0;
    animation-fill-mode: forwards;'
  ></div>`;

function App() {
  const [globeReady, setGlobeReady] = useState(false);
  const [theme, setTheme] = useState(true); // true = light, false = dark
  const [altitude, setAltitude] = useState(defaultAltitude);
  const [autoRotate, setAutoRotate] = useState(true);
  const [autoPlay, setAutoPlay] = useState(true);
  // const [markerIndex, setMarkerIndex] = useState(0);
  const [alumni] = useState(alumniPath);
  const [markers] = useState(markersPath);
  const [alumniIndex, setAlumniIndex] = useState(0);
  const [backgroundColor] = useState("rgba(0,0,0,0)");
  const [pointsData, setPointsData] = useState<IData[]>([]);
  const [arcsData, setArcsData] = useState<IData[]>([]);
  const [htmlElementsData, setHtmlElementsData] = useState<IData[]>([]);
  const [ringsData, setRingsData] = useState<IRingData[]>([
    { lat: alumni[0].lat, lng: alumni[0].lng },
  ]);

  // Hex map
  const hexMap = hexMapPath.features;

  // Points
  const alumniPointActiveColor = "#ff80ddcc";
  const alumniPointColor = "#00b3ff7e";

  // Globe Ref
  const globeRef = useRef<GlobeMethods>();

  // Accessors
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const pointColor = (d: any) =>
    d.id === -1
      ? theme
        ? "#954a89"
        : "#ffd0f6"
      : alumniIndex === d.id
      ? alumniPointActiveColor
      : alumniPointColor;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const arcColor = (d: any) =>
    alumniIndex === d.id
      ? theme
        ? ["#954a89", "#ff80dd", "#ff80dd"]
        : ["#ffd0f6", "#ff80dd", "#ff80dd"]
      : theme
      ? ["#954a89", "#0083bb", "#0083bb"]
      : ["#ffd0f6", "#0083bb", "#0083bb"];
  const ringColor = () => (theme ? "#954a89" : "#ff80dd");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const pointAltitude = (d: any) => (alumniIndex === d.id ? 0.2 : 0.05);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const htmlAltitude = (d: any) => (alumniIndex === d.id ? 0.25 : 0.075);
  const hexPolygonMargin = () => (theme ? 0.7 : 0.8);
  const hexPolygonColor = () => (theme ? 0xc07ec0 : 0x803e80);

  useEffect(() => {
    // Data
    setPointsData([...alumni, ...markers].map((d) => Object.assign({}, d)));
    setArcsData(alumni.map((d) => Object.assign({}, d)));
    setHtmlElementsData(
      [...alumni, ...markers].map((d) => Object.assign({}, d))
    );
  }, [alumni, markers]);

  useEffect(() => {
    const body = document.querySelector("body");
    if (body) {
      if (theme) {
        body.style.background = "linear-gradient(to right, #9688da, #ff92db)";
      } else {
        // body.style.background = "linear-gradient(to right, #110e1b, #35142a)";
        body.style.background = "linear-gradient(to right, #0f0a26, #180a13)";
      }
    }
  }, [theme]);

  useEffect(() => {
    if (globeReady) {
      globeRef.current!.scene().children[3].children[0].children[0].material =
        new THREE.MeshPhongMaterial({
          color: theme ? 0xffcbff : 0x1b0220,
        });
    }
  }, [globeReady, theme]);

  // Cycle through alumni
  useEffect(() => {
    if (autoPlay) {
      const interval = setInterval(() => {
        // Next alumni index
        const nextAlumniIndex =
          alumniIndex === alumni.length - 1 ? 0 : alumniIndex + 1;

        // Change point of view
        globeRef.current!.pointOfView(
          { ...alumni[nextAlumniIndex].focus },
          alumni[nextAlumniIndex].transitionTime
        );
        // Update marker index
        setRingsData([
          {
            lat: alumni[nextAlumniIndex].lat,
            lng: alumni[nextAlumniIndex].lng,
          },
        ]);
        setAlumniIndex(nextAlumniIndex);
      }, alumni[alumniIndex].focusTime);
      return () => clearInterval(interval);
    }
  }, [autoPlay, alumniIndex, alumni, ringsData]);

  const globeProps = {
    // React
    globeRef,

    // Custom
    globeColor: theme ? 0xffcbff : 0x1b0220,
    setGlobeReady,
    transitionTime: 5000,
    initialPointOfView: alumni[alumniIndex].focus,

    // Controls
    autoRotate,
    autoRotateSpeed: 0.2,

    // Container Layout
    width: window.innerWidth * globeScaleUp,
    backgroundColor,

    // Globe Layer
    atmosphereColor: theme ? 0xffeeff : 0x9a729b,
    atmosphereAltitude: 0.5,
    // onGlobeReady,

    // Hex Polygon layer,
    hexPolygonsData: hexMap,
    hexPolygonResolution: 3, // 4 potentially too high
    hexPolygonCurvatureResolution: 5,
    hexPolygonMargin,
    hexPolygonColor,

    // Points Layer
    pointsData,
    pointResolution: 6,
    pointRadius: 0.2,
    pointColor,
    pointAltitude,

    // Arcs Layer
    arcsData,
    arcColor,
    arcStroke: 0.3,
    arcDashLength: 0.5,
    arcDashGap: 1,
    arcDashAnimateTime,
    arcDashInitialGap,

    // Rings Layer
    ringsData,
    ringColor,
    ringMaxRadius: 2.5,
    ringPropagationSpeed: 0.75,
    ringRepeatPeriod: 1000,

    // // HTML Layer
    htmlElementsData,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    htmlElement: (d: any) => {
      const el = document.createElement("div");
      el.style.opacity = d.id === alumniIndex || d.id === -1 ? "1" : "0";
      el.innerHTML = markerHTML(d);
      el.style.color = d.color;
      el.style.width = `${d.size}px`;

      el.style.pointerEvents = "auto";
      el.style.cursor = "pointer";
      el.style.userSelect = "auto";
      el.onclick = () => console.info(d);
      return el;
    },
    htmlAltitude,
    htmlTransitionDuration: 1000,
  };

  return (
    <>
      <Interface
        globeRef={globeRef}
        theme={theme}
        setTheme={setTheme}
        autoPlay={autoPlay}
        setAutoPlay={setAutoPlay}
        autoRotate={autoRotate}
        setAutoRotate={setAutoRotate}
        altitude={altitude}
        setAltitude={setAltitude}
      />
      <Globe {...globeProps} />
    </>
  );
}

export default App;
