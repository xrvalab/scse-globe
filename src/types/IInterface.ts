import { GlobeMethods } from "react-globe.gl";
import AlumniData from "./AlumniData";
import Organisations from "./Organisations";

interface IInterface {
  globeRef: React.MutableRefObject<GlobeMethods | undefined>;
  alumni: AlumniData[];
  alumniIndex: number;
  setAlumniIndex: React.Dispatch<React.SetStateAction<number>>;
  query: URLSearchParams;
  organisations: Organisations;
  theme: boolean;
  setTheme: React.Dispatch<React.SetStateAction<boolean>>;
  autoPlay: boolean;
  setAutoPlay: React.Dispatch<React.SetStateAction<boolean>>;
  shuffleMode: boolean;
  setShuffleMode: React.Dispatch<React.SetStateAction<boolean>>;
  showcaseMode: boolean;
  setShowcaseMode: React.Dispatch<React.SetStateAction<boolean>>;
  autoRotate: boolean;
  setAutoRotate: React.Dispatch<React.SetStateAction<boolean>>;
  altitude: number;
  setAltitude: React.Dispatch<React.SetStateAction<number>>;
  globeOnlyMode: boolean;
  setGlobeOnlyMode: React.Dispatch<React.SetStateAction<boolean>>;
  showAboutPanel: boolean;
  setShowAboutPanel: React.Dispatch<React.SetStateAction<boolean>>;
  showInformationPanel: boolean;
  setShowInformationPanel: React.Dispatch<React.SetStateAction<boolean>>;
}

export default IInterface;
