import XRVALogo from "./XRVALogo";

const AboutPanel = () => (
  <>
    <h2 className="about">The SCSE Globe</h2>
    <h3>A Data Visualization Experiment</h3>
    <p>
      The School of Computer Science and Engineering (SCSE) Globe presents data
      from the school alumni database and aisstream.io (for vessel tracking).
      The visualization is powered by:
    </p>
    <ul>
      <li>TypeScript</li>
      <li>ReactJS</li>
      <li>WebGL (ThreeJS)</li>
      <li>Globe.GL</li>
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
  </>
);

export default AboutPanel;
