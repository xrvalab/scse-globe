import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { GlobeMethods } from "react-globe.gl";

// Components
import { Globe, Interface, Loader } from "./components";

// Three
import * as THREE from "three";

// Types
import { IAlumniData, IData, IRingData, IOrganisations } from "./types";

// Datasets
import {
  alumniPath,
  organisationsPath,
  markersPath,
  hexMapPath,
} from "./datasets";

// Utils
import { getDistanceFromLatLngInKm } from "./utils";

// Globe Scale Multiplier
const globeScaleUp = 1.49;

// Default altitude
const defaultAltitude = 1;

// Default Avatar size
const defaultAvatarSize = 30;

// Origin
const origin = markersPath[0];

// Colours
import {
  veryLightPink,
  lightPink,
  pink,
  midPink,
  darkPink,
  darkPurple,
  midBlue,
  pinkWithOpacity,
  blueWithOpacity,
} from "./components/misc/colours";

// Multiplier for arc dash animation duration
const arcDashAnimateTimeMultiplier = 2;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const arcDashAnimateTime = (d: any) =>
  getDistanceFromLatLngInKm(origin.lat, origin.lng, d.lat, d.lng) *
  arcDashAnimateTimeMultiplier;
const arcDashInitialGap = 0;

function App() {
  // Query params
  const query = useMemo(() => new URLSearchParams(window.location.search), []);
  const q = {
    // If set, disable zoom and context menu
    display: useMemo(() => query.get("display"), [query]),
    // 0: Light theme, 1: Dark theme
    theme: useMemo(() => query.get("theme"), [query]),
    // Hex resolution: 3 | 4
    hex: useMemo(() => query.get("hex"), [query]),
    // If set, disable the title screen
    notitle: useMemo(() => query.get("notitle"), [query]),
  };

  // State
  const [globeReady, setGlobeReady] = useState(false);
  const [globeWidth, setGlobeWidth] = useState(
    window.innerWidth * globeScaleUp
  );
  const [globeHeight, setGlobeHeight] = useState(window.innerHeight);
  const [theme, setTheme] = useState(
    q.theme ? (q.theme === "1" ? false : true) : true
  );
  const [altitude, setAltitude] = useState(defaultAltitude);
  const [autoRotate, setAutoRotate] = useState(true);
  const [autoPlay, setAutoPlay] = useState(true);
  const [shuffleMode, setShuffleMode] = useState(false);
  const [showcaseMode, setShowcaseMode] = useState(false);
  const [globeOnlyMode, setGlobeOnlyMode] = useState(false);
  // const [markerIndex, setMarkerIndex] = useState(0);
  const [alumni] = useState<IAlumniData[]>(
    alumniPath.map((el, id) => ({ ...el, id }))
  );
  const [markers] = useState(markersPath);
  const [organisations] = useState<IOrganisations>(organisationsPath);
  const [alumniIndex, setAlumniIndex] = useState(0);
  const [backgroundColor] = useState("rgba(0,0,0,0)");
  const [pointsData, setPointsData] = useState<IData[]>([]);
  const [arcsData, setArcsData] = useState<IData[]>([]);
  const [htmlElementsData, setHtmlElementsData] = useState<IData[]>([]);
  const [ringsData, setRingsData] = useState<IRingData[]>([
    { lat: alumni[0].lat, lng: alumni[0].lng },
  ]);
  const [showAboutPanel, setShowAboutPanel] = useState(false);
  const [showInformationPanel, setShowInformationPanel] = useState(true);
  // Hex map
  const hexMap = hexMapPath.features;

  // Points
  const alumniPointActiveColor = pinkWithOpacity;
  const alumniPointColor = blueWithOpacity;

  // Globe Ref
  const globeRef = useRef<GlobeMethods>();

  // Accessors
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const pointColor = (d: any) =>
    d.id === -1
      ? theme
        ? darkPink
        : lightPink
      : alumniIndex === d.id
      ? alumniPointActiveColor
      : alumniPointColor;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const arcColor = (d: any) =>
    alumniIndex === d.id
      ? theme
        ? [darkPink, pink, pink]
        : [lightPink, pink, pink]
      : theme
      ? [darkPink, midBlue, midBlue]
      : [lightPink, midBlue, midBlue];
  const ringColor = () => (theme ? darkPink : pink);
  // const pointAltitude = (d: any) => 0.1;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const pointAltitude = (d: any) =>
    d.id === -1 ? 0.09 : alumniIndex === d.id ? 0.1 : 0.05;
  // const htmlAltitude = (d: any) => 0.15;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const htmlAltitude = (d: any) =>
    d.id === -1 ? 0.09 : alumniIndex === d.id ? 0.1 : 0.05;
  const hexPolygonMargin = () => (theme ? 0.6 : 0.7);
  const hexPolygonColor = () => (theme ? 0xc07ec0 : 0x803e80);

  // FIXME: Use this as the single reference
  const globeEl = Array.from(
    document.querySelectorAll(
      ".scene-container"
    ) as unknown as HTMLCollectionOf<HTMLElement>
  );

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const htmlElement = (d: any) => {
    const tooltip = document.createElement("div");
    tooltip.style.color = theme ? darkPurple : lightPink;
    tooltip.classList.add("marker-tooltip");
    tooltip.innerHTML = `${d.name}<br/><span class="location">${d.city}, ${d.country}</span>`;

    const avatarLarge = defaultAvatarSize / 10;
    const avatarSmall = defaultAvatarSize / 12;

    const avatarSize = `${
      d.id === alumniIndex || d.id === -1 ? avatarLarge : avatarSmall
    }vw`;

    const avatarEl = document.createElement("div");
    avatarEl.appendChild(tooltip);
    avatarEl.classList.add("marker");
    avatarEl.style.width = avatarSize;
    avatarEl.style.height = avatarSize;
    // el.style.opacity = d.id === alumniIndex || d.id === -1 ? "1" : "0";
    avatarEl.style.opacity = "1";
    avatarEl.style.borderRadius = d.id === -1 ? "0%" : "50%";
    avatarEl.style.backgroundImage = `url(avatars/${d.avatar})`;
    avatarEl.style.backgroundRepeat = "no-repeat";
    avatarEl.style.border = d.id === -1 ? "none" : "solid 0.15vw white";
    avatarEl.style.backgroundSize = avatarSize;
    // el.innerHTML = markerHTML(d, alumniIndex);
    avatarEl.style.pointerEvents = "auto";
    avatarEl.style.cursor = "pointer";
    avatarEl.style.userSelect = "auto";
    // el.style.animation = `fadein ${
    //   d.id === alumniIndex || d.id === -1 ? "0s" : "1s"
    // } ease-in-out`;
    // el.style.animationIterationCount = "1";
    // el.style.animationDelay = `${
    //   d.id === alumniIndex || d.id === -1 ? "0s" : "1s"
    // }`;
    // el.style.animationFillMode = "forwards";

    // Click handler
    avatarEl.onclick = () => {
      if (d.id !== -1) {
        setAlumniIndex(d.id);
        setShowInformationPanel(true);
        setShowAboutPanel(false);
        if (globeOnlyMode) {
          setGlobeOnlyMode(false);
          if (globeEl[0]) globeEl[0].style.left = `0px`;

          // document
          //   .getElementsByClassName("scene-container")[0]
          //   ?.classList.toggle("centre");
        }
      }
    };

    // Mouseover handler
    avatarEl.onmouseover = () => {
      Array.from(
        avatarEl.getElementsByClassName(
          "marker-tooltip"
        ) as HTMLCollectionOf<HTMLElement>
      )[0].style.opacity = "1";
      avatarEl.style.width = `${avatarLarge}vw`;
      avatarEl.style.height = `${avatarLarge}vw`;
      avatarEl.style.backgroundSize = `${avatarLarge}vw`;
    };

    // Mouseout handler
    avatarEl.onmouseout = () => {
      Array.from(
        avatarEl.getElementsByClassName(
          "marker-tooltip"
        ) as HTMLCollectionOf<HTMLElement>
      )[0].style.opacity = "0";
      avatarEl.style.width = avatarSize;
      avatarEl.style.height = avatarSize;
      avatarEl.style.backgroundSize = avatarSize;
    };

    // Prevent multi-touch
    if (q.display) {
      avatarEl.addEventListener(
        "touchmove",
        (e) => {
          if (e.touches.length > 1) {
            e.preventDefault();
          }
        },
        { passive: false }
      );
    }

    return avatarEl;
  };

  // Auto rotate speed
  // useEffect(() => {
  //   if (altitude === 1.85 || altitude === 1.9) {
  //     globeRef.current!.controls().autoRotateSpeed = 0.5;
  //   } else {
  //     globeRef.current!.controls().autoRotateSpeed = 0.01;
  //   }
  // }, [globeRef, altitude]);

  // Set globe data
  useEffect(() => {
    // Data
    setPointsData([...alumni, ...markers].map((d) => Object.assign({}, d)));
    setArcsData(alumni.map((d) => Object.assign({}, d)));
    setHtmlElementsData(
      [...markers, ...alumni].map((d) => Object.assign({}, d))
    );
  }, [alumni, markers]);

  // Theme changes
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

  // onGlobeReady
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

  // Disable context menu
  useEffect(() => {
    if (query.get("display")) {
      document.body.style.cursor = "none";
      document.oncontextmenu = () => false;
      document.onselectstart = () => false;
    }
  }, [query]);

  // Window resize
  useLayoutEffect(() => {
    const handleResize = () => {
      setGlobeWidth(window.innerWidth * globeScaleUp);
      setGlobeHeight(window.innerHeight);
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  });

  const calculateFocus = (
    alumni: IAlumniData[],
    alumniIndex: number,
    showcaseMode: boolean
  ) => {
    return {
      lat:
        alumni[alumniIndex].lat > 0
          ? alumni[alumniIndex].lat - 3
          : alumni[alumniIndex].lat + 3,
      lng: alumni[alumniIndex].lng,
      altitude: showcaseMode === true ? 1.7 : alumni[alumniIndex].altitude,
    };
  };

  // Cycle through alumni
  useEffect(() => {
    // Update point of view
    // if (!showcaseMode) {
    globeRef.current!.pointOfView(
      {
        ...calculateFocus(alumni, alumniIndex, showcaseMode),
        ...(globeOnlyMode && { altitude }),
      },
      alumni[alumniIndex].transitionTime
    );
    if (autoPlay) {
      const interval = setInterval(() => {
        // Next alumni index
        const nextAlumniIndex = shuffleMode
          ? Math.floor(Math.random() * alumni.length)
          : alumniIndex === alumni.length - 1
          ? 0
          : alumniIndex + 1;

        // Change point of view
        globeRef.current!.pointOfView(
          {
            ...calculateFocus(alumni, alumniIndex, showcaseMode),
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
      // }
    }
  }, [
    autoPlay,
    showcaseMode,
    shuffleMode,
    alumniIndex,
    alumni,
    ringsData,
    altitude,
    globeOnlyMode,
  ]);

  useEffect(() => {
    setRingsData([
      {
        lat: alumni[alumniIndex].lat,
        lng: alumni[alumniIndex].lng,
      },
    ]);
  }, [alumni, alumniIndex]);

  // Globe Properties
  // Custom Layer
  const globeColor = theme ? 0xffcbff : 0x1b0220;
  const autoRotateSpeed = 0.1;
  const transitionTime = 2000;
  const initialPointOfView = calculateFocus(alumni, alumniIndex, showcaseMode);
  const width = globeWidth;
  const height = globeHeight;
  const atmosphereColor = theme ? veryLightPink : midPink;
  const atmosphereAltitude = 0.5;
  const hexPolygonsData = hexMap;
  const hexPolygonResolution =
    q.hex === "3" || q.hex === "4" ? parseInt(q.hex) : 3;
  const hexPolygonCurvatureResolution = 5;
  const pointResolution = 6;
  const pointRadius = 0.1;
  const pointLabel = "";
  const arcStartLat = origin.lat;
  const arcStartLng = origin.lng;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const arcEndLat = (d: any) => d.lat;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const arcEndLng = (d: any) => d.lng;
  const arcStroke = 0.2;
  const arcDashLength = 0.5;
  const arcDashGap = 1;
  const arcLabel = "";
  const ringMaxRadius = 2.5;
  const ringPropagationSpeed = 0.75;
  const ringRepeatPeriod = 1000;
  const showGraticules = false;
  const showGlobe = true;

  const globeProps = {
    // React
    globeRef,

    // Custom
    globeColor,
    setGlobeReady,
    transitionTime,
    initialPointOfView,

    // Controls
    autoRotate,
    autoRotateSpeed,

    // Container Layout
    width,
    height,
    backgroundColor,

    // Globe Layer
    atmosphereColor,
    atmosphereAltitude,

    // Hex Polygon layer,
    hexPolygonsData,
    hexPolygonResolution,

    hexPolygonCurvatureResolution,
    hexPolygonMargin,
    hexPolygonColor,

    // Points Layer
    pointsData,
    pointResolution,
    pointRadius,
    pointColor,
    pointAltitude,
    pointLabel,

    // Arcs Layer
    arcsData,
    arcStartLat,
    arcStartLng,
    arcEndLat,
    arcEndLng,
    arcColor,
    arcStroke,
    arcDashLength,
    arcDashGap,
    arcDashAnimateTime,
    arcDashInitialGap,
    arcLabel,

    // Rings Layer
    ringsData,
    ringColor,
    ringMaxRadius,
    ringPropagationSpeed,
    ringRepeatPeriod,

    // // HTML Layer
    htmlElementsData,
    htmlElement,

    htmlAltitude,
    showGraticules,
    showGlobe,
  };

  const interfaceProps = {
    globeRef,
    alumni,
    alumniIndex,
    setAlumniIndex,
    organisations,
    query,
    theme,
    setTheme,
    autoPlay,
    setAutoPlay,
    shuffleMode,
    setShuffleMode,
    showcaseMode,
    setShowcaseMode,
    autoRotate,
    setAutoRotate,
    altitude,
    setAltitude,
    globeOnlyMode,
    setGlobeOnlyMode,
    showAboutPanel,
    setShowAboutPanel,
    showInformationPanel,
    setShowInformationPanel,
  };

  return (
    <>
      {!q.notitle && <Loader globeReady={globeReady} theme={theme} />}
      <Interface {...interfaceProps} />
      <Globe {...globeProps} />
    </>
  );
}

export default App;
