import { useEffect, useRef } from "react";
import styled from "styled-components";
import { IControls, ITimeline } from "../../types";
// import Timeline from "./Timeline";
import Button from "./Button";
import Timeline from "./Timeline";

const Divider = styled.div`
  width: 1vw;
`;

const StyledControls = styled.div<{
  globeOnlyMode: boolean;
  showcaseMode: boolean;
}>`
  position: absolute;
  z-index: 200;
  display: flex;
  align-self: flex-end;
  bottom: ${({ globeOnlyMode, showcaseMode }) =>
    globeOnlyMode || showcaseMode ? "3vh" : "5vh"};
  right: ${({ globeOnlyMode, showcaseMode }) =>
    globeOnlyMode || showcaseMode ? "2vw" : "3vw"};
  opacity: ${({ globeOnlyMode, showcaseMode }) =>
    globeOnlyMode || showcaseMode ? "0.5" : "1"};
  transition: all ease-in-out 1s;
`;

const HideableControls = styled.div<{ controlsVisible: boolean }>`
  display: flex;
  opacity: ${({ controlsVisible }) => (controlsVisible ? "1" : "0")};
  margin-right: ${({ controlsVisible }) => (controlsVisible ? "0px" : "-2vh")};
  transition: all ease-in-out 1s;
  pointer-events: ${({ controlsVisible }) =>
    controlsVisible ? "all" : "none"};
`;

const Controls = function ({
  globeRef,
  alumni,
  alumniIndex,
  setAlumniIndex,
  query,
  theme,
  setTheme,
  autoPlay,
  setAutoPlay,
  autoRotate,
  setAutoRotate,
  shuffleMode,
  setShuffleMode,
  showcaseMode,
  setShowcaseMode,
  setAltitude,
  showAboutPanel,
  setShowAboutPanel,
  globeOnlyMode,
  setGlobeOnlyMode,
  setShowInformationPanel,
  controlsVisible,
  setControlsVisible,
}: IControls) {
  const controlsRef = useRef() as React.MutableRefObject<HTMLInputElement>;

  const TimelineInstance = ({
    theme,
    visible,
    focusTime,
    globeOnlyMode,
    showcaseMode,
  }: ITimeline) => (
    <Timeline
      theme={theme}
      visible={visible}
      focusTime={focusTime}
      globeOnlyMode={globeOnlyMode}
      showcaseMode={showcaseMode}
    />
  );

  useEffect(() => {
    const handleTouchMove = (e: TouchEvent) => {
      if (query.get("display")) {
        if (e.touches.length > 1) {
          e.preventDefault();
        }
      }
    };

    const controlsRefCopy = controlsRef.current!;
    // Prevent multi-touch
    controlsRefCopy.addEventListener("touchmove", handleTouchMove, {
      passive: false,
    });
    return () =>
      controlsRefCopy.removeEventListener("touchmove", handleTouchMove);
  }, [query]);

  const globeEl = Array.from(
    document.querySelectorAll(
      ".scene-container"
    ) as unknown as HTMLCollectionOf<HTMLElement>
  );

  return (
    <StyledControls
      ref={controlsRef}
      globeOnlyMode={globeOnlyMode}
      showcaseMode={showcaseMode}
    >
      <HideableControls controlsVisible={controlsVisible}>
        <TimelineInstance
          theme={theme}
          visible={autoPlay}
          focusTime={alumni[alumniIndex].focusTime / 1000}
          globeOnlyMode={globeOnlyMode}
          showcaseMode={showcaseMode}
        />
        <Button
          theme={theme}
          data-tooltip="Previous"
          onClick={() => {
            setAlumniIndex(
              shuffleMode
                ? Math.floor(Math.random() * alumni.length)
                : alumniIndex === 0
                ? alumni.length - 1
                : alumniIndex - 1
            );
          }}
        >
          <i className="fas fa-step-backward"></i>
        </Button>
        <Button
          theme={theme}
          data-tooltip={autoPlay ? "Pause" : "Play"}
          onClick={() => setAutoPlay(!autoPlay)}
        >
          {autoPlay ? (
            <i className="fas fa-pause"></i>
          ) : (
            <i className="fas fa-play"></i>
          )}
        </Button>
        <Button
          theme={theme}
          data-tooltip="Next"
          onClick={() => {
            setAlumniIndex(
              shuffleMode
                ? Math.floor(Math.random() * alumni.length)
                : alumniIndex === alumni.length - 1
                ? 0
                : alumniIndex + 1
            );
          }}
        >
          <i className="fas fa-step-forward"></i>
        </Button>
        <Button
          theme={theme}
          data-tooltip={shuffleMode ? "Loop" : "Shuffle"}
          onClick={() => setShuffleMode(!shuffleMode)}
        >
          {shuffleMode ? (
            <i className="fas fa-repeat"></i>
          ) : (
            <i className="fas fa-random"></i>
          )}
        </Button>
        <Divider />
        <Button theme={theme} data-tooltip="Layers" onClick={() => {}}>
          <i className="fas fa-layer-group"></i>
        </Button>
        <Button
          theme={theme}
          data-tooltip={globeOnlyMode ? "Show Information Panel" : "Globe Only"}
          onClick={() => {
            setShowcaseMode(false);

            // Centre globe
            if (globeEl[0])
              globeEl[0].style.left = `-${
                (window.innerWidth * 1.49 - window.innerWidth) / 2
              }px`;

            if (globeOnlyMode) {
              setGlobeOnlyMode(false);
              setShowAboutPanel(false);
              setShowInformationPanel(true);

              if (globeEl[0]) globeEl[0].style.left = `0px`;
            } else {
              setGlobeOnlyMode(true);
              globeRef.current!.pointOfView(
                { lat: 43.229542, lng: -4.12301, altitude: 1.85 },
                2000
              );
              setAltitude(1.85);
              setShowInformationPanel(false);
              setShowAboutPanel(false);
            }
          }}
        >
          {globeOnlyMode ? (
            <i className="fas fa-info-square"></i>
          ) : (
            <i className="fas fa-globe-europe"></i>
          )}
        </Button>
        <Button
          theme={theme}
          data-tooltip="Re-centre"
          onClick={() => {
            globeRef.current!.pointOfView(
              { lat: 43.229542, lng: -4.12301, altitude: 1.9 },
              2000
            );
          }}
        >
          <i className="fas fa-location"></i>
        </Button>
        <Button
          theme={theme}
          data-tooltip={
            autoRotate
              ? "Stop Globe Auto Rotation"
              : "Start Globe Auto Rotation"
          }
          onClick={() => {
            globeRef.current!.controls().autoRotate =
              !globeRef.current!.controls().autoRotate;
            setAutoRotate(!autoRotate);
          }}
        >
          <i className="fas fa-sync fa-stack-1x"></i>
          {autoRotate ? <i className="fas fa-slash fa-stack-1x"></i> : null}
        </Button>
        <Button
          theme={theme}
          data-tooltip={theme ? "Dark Mode" : "Light Mode"}
          onClick={() => setTheme(!theme)}
        >
          {theme ? (
            <i className="fas fa-moon"></i>
          ) : (
            <i className="fas fa-sun"></i>
          )}
        </Button>
        <Button
          theme={theme}
          data-tooltip={
            showcaseMode === true ? "Exit Showcase Mode" : "Enter Showcase Mode"
          }
          onClick={() => {
            if (globeEl[0]) globeEl[0].style.left = `0px`;

            if (!showcaseMode) {
              setControlsVisible(!controlsVisible);
              if (!showAboutPanel) setShowInformationPanel(true);
              setGlobeOnlyMode(false);
            }
            setShowcaseMode(!showcaseMode);
            globeRef.current!.pointOfView(
              {
                lat: alumni[alumniIndex].lat,
                lng: alumni[alumniIndex].lng,
                altitude: 1.9,
              },
              2000
            );
          }}
        >
          <i className="fas fa-camera fa-stack-1x"></i>
          {showcaseMode === true ? (
            <i className="fas fa-slash fa-stack-1x"></i>
          ) : null}
        </Button>
        <Button
          theme={theme}
          data-tooltip={showAboutPanel ? "Hide About" : "About"}
          onClick={() => {
            if (globeOnlyMode) {
              setShowInformationPanel(false);
              setShowAboutPanel(!showAboutPanel);
            } else if (showAboutPanel) {
              setShowAboutPanel(false);
              setShowInformationPanel(true);
            } else if (!showAboutPanel) {
              setShowAboutPanel(true);
              setShowInformationPanel(false);
            }
          }}
        >
          {showAboutPanel ? (
            <i className="far fa-question-circle"></i>
          ) : (
            <i className="fas fa-question-circle"></i>
          )}
        </Button>
        <Divider />
      </HideableControls>
      <Button
        theme={theme}
        data-tooltip={
          controlsVisible === true ? "Hide Controls" : "Show Controls"
        }
        onClick={() => {
          if (controlsVisible) {
            setControlsVisible(false);
          } else {
            setControlsVisible(true);
          }
        }}
      >
        {controlsVisible ? (
          <i className="fas fa-arrow-from-left"></i>
        ) : (
          <i className="fas fa-arrow-from-right"></i>
        )}
      </Button>
    </StyledControls>
  );
};

export default Controls;
