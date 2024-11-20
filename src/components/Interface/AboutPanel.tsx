import styled from "styled-components";
import XRVALogo from "./XRVALogo";

const StyledAboutPanel = styled.div`
  p,
  ul {
    font-size: 1.2em;
  }
`;

const AboutPanel = () => (
  <StyledAboutPanel>
    <h2 className="about">The SCSE Globe</h2>
    <h3>A Data Visualization Experiment</h3>
    <p>
      The School of Computer Science and Engineering (SCSE) Globe presents data
      from the school alumni database and aisstream.io (for vessel tracking).
      The visualization is powered by:
    </p>
    <ul>
      <li>Vite</li>
      <li>TypeScript</li>
      <li>React</li>
      <li>Three.js</li>
      <li>Globe.GL (react-globe-gl)</li>
      <li>Font Awesome</li>
    </ul>
    <h3>Credits</h3>
    <p>
      Special thanks to Yvonne Scutt-Jones and our fantastic alumni for
      contributing content for the alumni database.
    </p>
    <p>
      Source available: <strong>github.com/pbutcher/scse-globe-react-ts</strong>
    </p>
    <p>
      Created by: <strong>Dr Peter Butcher</strong> (XReality, Visualization,
      and Analytics Lab)
    </p>
    <XRVALogo />
  </StyledAboutPanel>
);

export default AboutPanel;
