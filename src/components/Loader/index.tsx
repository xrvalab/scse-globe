import styled, { keyframes } from "styled-components";
import buWhite from "../../assets/img/bu-white.png";
import { midPink, veryLightPink } from "../misc/colours";

const fadeOut = keyframes`
  0% {
    opacity: 1;
  }
  95% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
`;

const fadeInOut = keyframes`
  0% {
    opacity: 0;
  }
  40% {
    opacity: 0;
  }
  45% {
    opacity: 1;
  }
  95% {
    opacity: 1;
  }
  100% {
    opacity: 0;

  }
`;

const StyledLoader = styled.div<{ globeReady: boolean; theme: boolean }>`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 100%;
  background: ${({ theme }) =>
    theme === true
      ? "linear-gradient(to right, #9688da, #ff92db)"
      : "linear-gradient(to right, #0f0a26, #180a13)"};
  z-index: 1000;
  pointer-events: none;
  user-select: none;
  opacity: ${({ globeReady }) => (globeReady ? "0" : "1")};
  animation: ${fadeOut} ease-in-out 7s;

  h1 {
    width: auto;
    margin: 0px;
    text-transform: uppercase;
    font-size: 12vw;
    line-height: 12vw;
    font-weight: 900;
    margin-top: 4vh;
    background: linear-gradient(to left, #ffedfb, #ffbced);
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    animation: ${fadeInOut} ease-in-out 7s;
    animation-direction: forward;
    /* transform: perspective(50vw) rotateX(15deg) rotateY(0deg); */
    padding-bottom: 15vh;
    /* text-shadow: 0px 0px 10px #ffbced; */
  }

  &:before {
    width: 500vw;
    height: 500vw;
    position: absolute;
    left: -200vw;
    top: 75vh;
    border-radius: 50%;
    background: ${({ theme }) =>
      theme === true
        ? "radial-gradient(circle at center, #ffbced, #ffedfb)"
        : "radial-gradient(circle at center, #0f0a26, #180a13)"};
    box-shadow: ${({ theme }) =>
      theme === true
        ? `0px 0px 25vh ${veryLightPink}`
        : `0px 0px 25vh ${midPink}`};
    content: "";
  }
`;

const Logo = styled.div`
  pointer-events: none;
  display: flex;
  z-index: 2;
  opacity: 1;
  width: 100vw;
  transition: all ease-in-out 1s;
  animation: ${fadeInOut} ease-in-out 7s;
  display: flex;
  justify-content: center;
  align-items: center;
  /* transform: perspective(50vw) rotateX(15deg) rotateY(0deg); */

  & h2 {
    font-weight: 900;
    margin: 0;
    text-transform: uppercase;
    font-size: 1.5vw;
    padding-left: 1.5vw;
    border-left: solid 0.1vw white;
  }

  .bangor-university-logo {
    min-width: 14vw;
    width: 14vw;
    height: 4vw;
    margin-right: 1.5vw;
    background-size: 14vw;
    background-repeat: no-repeat;
    background-image: url(${buWhite});
  }
`;

function Loader({
  globeReady,
  theme,
}: {
  globeReady: boolean;
  theme: boolean;
}) {
  return (
    <StyledLoader globeReady={globeReady} theme={theme}>
      <Logo>
        <div className="bangor-university-logo"></div>
        <h2>
          School of Computer Science
          <br />
          and Engineering
        </h2>
      </Logo>
      <h1>SCSE Globe</h1>
    </StyledLoader>
  );
}
export default Loader;
