import AlumniData from "./AlumniData";
import Organisations from "./Organisations";

interface AlumniProfile {
  alumni: AlumniData[];
  alumniIndex: number;
  organisations: Organisations;
}

export default AlumniProfile;
