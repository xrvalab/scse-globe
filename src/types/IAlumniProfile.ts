import IAlumniData from "./IAlumniData";
import IOrganisations from "./IOrganisations";

interface AlumniProfile {
  alumni: IAlumniData[];
  alumniIndex: number;
  organisations: IOrganisations;
}

export default AlumniProfile;
