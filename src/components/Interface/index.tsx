import { useState } from "react";
import styled, { css } from "styled-components";
import { InterfaceProps } from "../../types";
import Logo from "./Logo";
import InformationPanel from "./InformationPanel";
import AlumniPanel from "./AlumniPanel";
import AboutPanel from "./AboutPanel";
import ControlsBar from "./ControlsBar";

const InformationPanels = styled.main<{
  showcaseMode: boolean;
  globeOnlyMode: boolean;
}>`
  position: absolute;
  z-index: ${({ showcaseMode }) => (showcaseMode === true ? -1 : 100)};
  height: 100%;
  ${({ showcaseMode, globeOnlyMode }) =>
    showcaseMode === true &&
    globeOnlyMode === false &&
    css`
      transform: perspective(50vw) rotateX(0deg) rotateY(5deg);
    `}
  transition: all 2s ease-in-out;
`;

const Interface = ({
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
}: InterfaceProps) => {
  const [controlsVisible, setControlsVisible] = useState(true);

  return (
    <>
      <InformationPanels
        showcaseMode={showcaseMode}
        globeOnlyMode={globeOnlyMode}
      >
        <InformationPanel show={showInformationPanel} theme={theme}>
          <AlumniPanel
            alumni={alumni}
            alumniIndex={alumniIndex}
            organisations={organisations}
          />
        </InformationPanel>
        <InformationPanel show={showAboutPanel} theme={theme}>
          <AboutPanel />
        </InformationPanel>
        <Logo globeOnlyMode={globeOnlyMode} />
      </InformationPanels>
      <ControlsBar
        globeRef={globeRef}
        alumni={alumni}
        alumniIndex={alumniIndex}
        setAlumniIndex={setAlumniIndex}
        query={query}
        theme={theme}
        setTheme={setTheme}
        autoPlay={autoPlay}
        setAutoPlay={setAutoPlay}
        shuffleMode={shuffleMode}
        setShuffleMode={setShuffleMode}
        showcaseMode={showcaseMode}
        setShowcaseMode={setShowcaseMode}
        autoRotate={autoRotate}
        setAutoRotate={setAutoRotate}
        altitude={altitude}
        setAltitude={setAltitude}
        showAboutPanel={showAboutPanel}
        setShowAboutPanel={setShowAboutPanel}
        globeOnlyMode={globeOnlyMode}
        setGlobeOnlyMode={setGlobeOnlyMode}
        setShowInformationPanel={setShowInformationPanel}
        controlsVisible={controlsVisible}
        setControlsVisible={setControlsVisible}
      />
    </>
  );
};

export default Interface;
