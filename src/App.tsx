import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { GlobeMethods } from "react-globe.gl";

// Components
import { Globe, Interface } from "./components";

// Three
import * as THREE from "three";

// Types
import { IData, IRingData } from "./types";

// Datasets
import hexMapPath from "./assets/geojson/ne_110m_admin_0_countries.json";
import markersPath from "./datasets/static-markers.json";
import alumniPath from "./datasets/alumni.json";

// Utils
import { getDistanceFromLatLngInKm } from "./utils";

// Globe display scale-up
const globeScaleUp = 1.55;
// const globeScaleUp = 1.39;

// Default altitude
const defaultAltitude = 1;

// Default Avatar size
const defaultAvatarSize = 30;

// Origin
const origin = markersPath[0];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const arcDashAnimateTime = (d: any) =>
  getDistanceFromLatLngInKm(origin.lat, origin.lng, d.lat, d.lng);
const arcDashInitialGap = 0;

function App() {
  const [globeReady, setGlobeReady] = useState(false);
  const [globeWidth, setGlobeWidth] = useState(
    window.innerWidth * globeScaleUp
  );
  const [globeHeight, setGlobeHeight] = useState(window.innerHeight);
  const [theme, setTheme] = useState(true); // true = light, false = dark
  const [altitude, setAltitude] = useState(defaultAltitude);
  const [autoRotate, setAutoRotate] = useState(true);
  const [autoPlay, setAutoPlay] = useState(true);
  const [globeOnlyMode, setGlobeOnlyMode] = useState(false);
  // const [markerIndex, setMarkerIndex] = useState(0);
  const [alumni] = useState(alumniPath.map((el, id) => ({ ...el, id })));
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
  // const pointAltitude = (d: any) => 0.1;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const pointAltitude = (d: any) => (alumniIndex === d.id ? 0.2 : 0.05);
  // const htmlAltitude = (d: any) => 0.15;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const htmlAltitude = (d: any) => (alumniIndex === d.id ? 0.2 : 0.05);
  const hexPolygonMargin = () => (theme ? 0.7 : 0.7);
  const hexPolygonColor = () => (theme ? 0xc07ec0 : 0x803e80);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const htmlElement = (d: any) => {
    const tooltip = document.createElement("div");
    // tooltip.style.color = theme ? "white" : "#ffd0f6";
    tooltip.style.color = theme ? "#531849" : "#ffd0f6";

    tooltip.classList.add("marker-tooltip");
    tooltip.innerHTML = `${d.name}<br/><span class="location">${d.city}, ${d.country}</span>`;
    const el = document.createElement("div");
    el.appendChild(tooltip);
    el.classList.add("marker");
    el.style.width = `${
      d.id === alumniIndex || d.id === -1
        ? defaultAvatarSize * 1.5
        : defaultAvatarSize
    }px`;
    el.style.height = `${
      d.id === alumniIndex || d.id === -1
        ? defaultAvatarSize * 1.5
        : defaultAvatarSize
    }px`;
    // el.style.opacity = d.id === alumniIndex || d.id === -1 ? "1" : "0";
    el.style.opacity = "1";
    el.style.borderRadius = d.id === -1 ? "0%" : "50%";
    el.style.backgroundImage = `url(/avatars/${d.avatar})`;
    el.style.backgroundRepeat = "no-repeat";
    el.style.border = d.id === -1 ? "none" : "solid 3px white";
    el.style.backgroundSize = `${
      d.id === alumniIndex || d.id === -1
        ? defaultAvatarSize * 1.5
        : defaultAvatarSize
    }px`;
    // el.innerHTML = markerHTML(d, alumniIndex);
    el.style.pointerEvents = "auto";
    el.style.cursor = "pointer";
    el.style.userSelect = "auto";
    // el.style.animation = `fadein ${
    //   d.id === alumniIndex || d.id === -1 ? "0s" : "1s"
    // } ease-in-out`;
    // el.style.animationIterationCount = "1";
    // el.style.animationDelay = `${
    //   d.id === alumniIndex || d.id === -1 ? "0s" : "1s"
    // }`;
    // el.style.animationFillMode = "forwards";
    el.onclick = () => setAlumniIndex(d.id);
    el.onmouseover = () => {
      Array.from(
        el.getElementsByClassName(
          "marker-tooltip"
        ) as HTMLCollectionOf<HTMLElement>
      )[0].style.opacity = "1";
      el.style.width = `${defaultAvatarSize * 2}px`;
      el.style.height = `${defaultAvatarSize * 2}px`;
      el.style.backgroundSize = `${defaultAvatarSize * 2}px`;
    };
    el.onmouseout = () => {
      Array.from(
        el.getElementsByClassName(
          "marker-tooltip"
        ) as HTMLCollectionOf<HTMLElement>
      )[0].style.opacity = "0";
      el.style.width =
        d.id === alumniIndex || d.id === -1
          ? `${defaultAvatarSize * 1.5}px`
          : `${defaultAvatarSize}px`;
      el.style.height =
        d.id === alumniIndex || d.id === -1
          ? `${defaultAvatarSize * 1.5}px`
          : `${defaultAvatarSize}px`;
      el.style.backgroundSize = `${
        d.id === alumniIndex || d.id === -1
          ? defaultAvatarSize * 1.5
          : defaultAvatarSize
      }px`;
    };
    return el;
  };

  useEffect(() => {
    // Data
    setPointsData([...alumni, ...markers].map((d) => Object.assign({}, d)));
    setArcsData(alumni.map((d) => Object.assign({}, d)));
    setHtmlElementsData(
      [...markers, ...alumni].map((d) => Object.assign({}, d))
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
      // Cast globeRef.current!.scene().children[3].children[0].children[0] to Mesh.
      (
        globeRef.current!.scene().children[3].children[0]
          .children[0] as THREE.Mesh
      ).material = new THREE.MeshPhongMaterial({
        color: theme ? 0xffcbff : 0x1b0220,
      });
    }
  }, [globeReady, theme]);

  // Window resize
  useLayoutEffect(() => {
    const handleResize = () => {
      setGlobeWidth(window.innerWidth * globeScaleUp);
      setGlobeHeight(window.innerHeight);
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const calculateFocus = (alumni: any, alumniIndex: number) => {
    return {
      lat:
        alumni[alumniIndex].lat > 0
          ? alumni[alumniIndex].lat - 5
          : alumni[alumniIndex].lat + 5,
      lng: alumni[alumniIndex].lng,
      altitude: alumni[alumniIndex].altitude,
    };
  };

  // Cycle through alumni
  useEffect(() => {
    console.log("alumniIndex", alumniIndex);
    // Update point of view
    globeRef.current!.pointOfView(
      {
        ...calculateFocus(alumni, alumniIndex),
        ...(globeOnlyMode && { altitude }),
      },
      alumni[alumniIndex].transitionTime
    );
    if (autoPlay) {
      const interval = setInterval(() => {
        console.log("alumniIndex", alumniIndex);
        // Next alumni index
        const nextAlumniIndex =
          alumniIndex === alumni.length - 1 ? 0 : alumniIndex + 1;

        // Change point of view
        globeRef.current!.pointOfView(
          {
            ...calculateFocus(alumni, alumniIndex),
            ...(globeOnlyMode && { altitude }),
          },
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
  }, [autoPlay, alumniIndex, alumni, ringsData, altitude, globeOnlyMode]);

  const globeProps = {
    // React
    globeRef,

    // Custom
    globeColor: theme ? 0xffcbff : 0x1b0220,
    setGlobeReady,
    transitionTime: 2000,
    initialPointOfView: calculateFocus(alumni, alumniIndex),

    // Controls
    autoRotate,
    autoRotateSpeed: 0.1,

    // Container Layout
    width: globeWidth,
    height: globeHeight,
    backgroundColor,

    // Globe Layer
    atmosphereColor: theme ? "#ffeeff" : "#9a729b",
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
    pointLabel: "",

    // Arcs Layer
    arcsData,
    arcStartLat: origin.lat,
    arcStartLng: origin.lng,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    arcEndLat: (d: any) => d.lat,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    arcEndLng: (d: any) => d.lng,
    arcColor,
    arcStroke: 0.3,
    arcDashLength: 0.5,
    arcDashGap: 1,
    arcDashAnimateTime,
    arcDashInitialGap,
    arcLabel: "",

    // Rings Layer
    ringsData,
    ringColor,
    ringMaxRadius: 2.5,
    ringPropagationSpeed: 0.75,
    ringRepeatPeriod: 1000,

    // // HTML Layer
    htmlElementsData,
    htmlElement,

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    htmlAltitude,
    // htmlTransitionDuration: () => "1s",
  };

  return (
    <>
      <Interface
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
        globeOnlyMode={globeOnlyMode}
        setGlobeOnlyMode={setGlobeOnlyMode}
      />
      <Globe {...globeProps} />
    </>
  );
}

export default App;
