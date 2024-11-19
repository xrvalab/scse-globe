import styled, { keyframes } from "styled-components";
import buWhite from "../../assets/img/bu-white.png";

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
  animation-direction: forward;

  h2 {
    width: auto;
    margin: 0px;
    text-transform: uppercase;
    font-size: 14vh;
    line-height: 14vh;
    font-weight: 900;
    margin-bottom: 8vh;
    background: linear-gradient(to left, #ffedfb, #ffbced);
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    animation: ${fadeInOut} ease-in-out 7s;
    animation-direction: forward;
  }
`;

const Logo = styled.div`
  pointer-events: none;
  display: flex;
  z-index: 2;
  opacity: 1;

  width: 610px;
  transition: all ease-in-out 1s;
  animation: ${fadeInOut} ease-in-out 7s;
  animation-direction: forward;

  & h1 {
    font-weight: 900;
    margin: 0;
    text-transform: uppercase;
    font-size: 1.5em;
    padding-left: 20px;
    border-left: solid 1px white;
  }

  .bangor-university-logo {
    min-width: 200px;
    width: 200px;
    height: 57px;
    margin-right: 20px;
    background-size: 200px;
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
      <h2>SCSE Globe</h2>
      <Logo>
        <div className="bangor-university-logo"></div>
        <h1>
          School of Computer Science
          <br />
          and Engineering
        </h1>
      </Logo>
    </StyledLoader>
  );
}
export default Loader;
