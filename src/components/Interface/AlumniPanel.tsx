import Avatar from "./Avatar";
import Organisation from "./Organisation";
import LocationPin from "./LocationPin";
import Degrees from "./Degree";
import About from "./About";
import { IAlumniProfile } from "../../types";

const AlumniProfile = ({
  alumni,
  alumniIndex,
  organisations,
}: IAlumniProfile) => (
  <>
    <p className="alumni-profile">Alumni Profile</p>
    <h2>{alumni[alumniIndex].name}</h2>
    <Avatar
      src={"avatars/" + alumni[alumniIndex].avatar}
      alt={alumni[alumniIndex].name}
    />
    <Organisation
      src={
        "organisations/" + organisations[alumni[alumniIndex].organisation].icon
      }
      alt={organisations[alumni[alumniIndex].organisation].name}
    />
    <h3>
      {alumni[alumniIndex].jobTitle},{" "}
      <span>{alumni[alumniIndex].organisation}</span>
    </h3>
    <h4>
      <LocationPin className="fas fa-map-marker-alt" />{" "}
      {alumni[alumniIndex].city}, {alumni[alumniIndex].country}
    </h4>
    <Degrees>
      {alumni[alumniIndex].degrees.map((el: string, i: number) => (
        <p key={`degree-${alumniIndex}-${i}`}>
          <span className="fas fa-graduation-cap"></span> {el}
        </p>
      ))}
    </Degrees>
    <About>
      {alumni[alumniIndex].about.map((el: string, i: number) => (
        <p key={`about-${alumniIndex}-${i}`}>{el}</p>
      ))}
    </About>
  </>
);

export default AlumniProfile;
