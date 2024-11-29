import { GlobeMethods } from "react-globe.gl";
import AlumniData from "./AlumniData";

interface Controls {
  globeRef: React.MutableRefObject<GlobeMethods | undefined>;
  alumni: AlumniData[];
  alumniIndex: number;
  setAlumniIndex: React.Dispatch<React.SetStateAction<number>>;
  query: URLSearchParams;
  theme: boolean;
  setTheme: React.Dispatch<React.SetStateAction<boolean>>;
  autoPlay: boolean;
  setAutoPlay: React.Dispatch<React.SetStateAction<boolean>>;
  autoRotate: boolean;
  setAutoRotate: React.Dispatch<React.SetStateAction<boolean>>;
  shuffleMode: boolean;
  setShuffleMode: React.Dispatch<React.SetStateAction<boolean>>;
  showcaseMode: boolean;
  setShowcaseMode: React.Dispatch<React.SetStateAction<boolean>>;
  altitude: number;
  setAltitude: React.Dispatch<React.SetStateAction<number>>;
  showAboutPanel: boolean;
  setShowAboutPanel: React.Dispatch<React.SetStateAction<boolean>>;
  globeOnlyMode: boolean;
  setGlobeOnlyMode: React.Dispatch<React.SetStateAction<boolean>>;
  setShowInformationPanel: React.Dispatch<React.SetStateAction<boolean>>;
  controlsVisible: boolean;
  setControlsVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

export default Controls;
