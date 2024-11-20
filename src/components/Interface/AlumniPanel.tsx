import Avatar from "./Avatar";
import Organisation from "./Organisation";
import LocationPin from "./LocationPin";
import Degrees from "./Degree";
import About from "./About";
import { IAlumniProfile } from "../../types";
import styled, { keyframes } from "styled-components";

const fadein = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

const FadeIn = styled.div<{ delay: string }>`
  animation: ${fadein} ease-in-out 0.5s;
  opacity: 0;
  animation-fill-mode: forwards;
  animation-delay: ${({ delay }) => delay}s;
`;

const AlumniProfile = ({
  alumni,
  alumniIndex,
  organisations,
}: IAlumniProfile) => (
  <>
    <p className="alumni-profile">Alumni Profile</p>
    <FadeIn delay="0" key={`${alumniIndex}n`}>
      <h2>{alumni[alumniIndex].name}</h2>
    </FadeIn>
    <FadeIn delay="0.05" key={`${alumniIndex}a`}>
      <Avatar
        src={"avatars/" + alumni[alumniIndex].avatar}
        alt={alumni[alumniIndex].name}
      />
    </FadeIn>
    <FadeIn delay="0.05" key={`${alumniIndex}o`}>
      <Organisation
        src={
          "organisations/" +
          organisations[alumni[alumniIndex].organisation].icon
        }
        alt={organisations[alumni[alumniIndex].organisation].name}
      />
    </FadeIn>
    <FadeIn delay="0.1" key={`${alumniIndex}j`}>
      <h3>
        {alumni[alumniIndex].jobTitle},{" "}
        <span>{alumni[alumniIndex].organisation}</span>
      </h3>
    </FadeIn>
    <FadeIn delay="0.15" key={`${alumniIndex}l`}>
      <h4>
        <LocationPin className="fas fa-map-marker-alt" />{" "}
        {alumni[alumniIndex].city}, {alumni[alumniIndex].country}
      </h4>
    </FadeIn>
    <FadeIn delay="0.2" key={`${alumniIndex}d`}>
      <Degrees>
        {alumni[alumniIndex].degrees.map((el: string, i: number) => (
          <p key={`degree-${alumniIndex}-${i}`}>
            <span className="fas fa-graduation-cap"></span> {el}
          </p>
        ))}
      </Degrees>
    </FadeIn>
    <FadeIn delay="0.25" key={`${alumniIndex}ab`}>
      <About>
        {alumni[alumniIndex].about.map((el: string, i: number) => (
          <p key={`about-${alumniIndex}-${i}`}>{el}</p>
        ))}
      </About>
    </FadeIn>
  </>
);

export default AlumniProfile;
