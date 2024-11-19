import styled from "styled-components";
import buWhite from "../../assets/img/bu-white.png";

const StyledLogo = styled.div<{ globeOnlyMode: boolean }>`
  pointer-events: none;
  display: flex;
  position: absolute;
  z-index: 2;
  opacity: ${({ globeOnlyMode }) => (globeOnlyMode ? "0.5" : "1")};
  bottom: ${({ globeOnlyMode }) => (globeOnlyMode ? "3vh" : "5vh")};
  left: ${({ globeOnlyMode }) => (globeOnlyMode ? "2vw" : "3vw")};
  width: 40vw;
  transition: all ease-in-out 1s;

  & h1 {
    font-weight: 900;
    margin: 0;
    text-transform: uppercase;
    font-size: 1.4vw;
    padding-left: 1.5vw;
    border-left: solid 0.05vw white;
  }

  .bangor-university-logo {
    min-width: 12vw;
    width: 10vw;
    height: 3.5vw;
    margin-right: 1.5vw;
    background-size: 12vw;
    background-repeat: no-repeat;
    background-image: url(${buWhite});
  }
`;

const Logo = ({ globeOnlyMode }: { globeOnlyMode: boolean }) => (
  <StyledLogo globeOnlyMode={globeOnlyMode}>
    <div className="bangor-university-logo"></div>
    <h1>
      School of Computer
      <br />
      Science and Engineering
    </h1>
  </StyledLogo>
);

export default Logo;
